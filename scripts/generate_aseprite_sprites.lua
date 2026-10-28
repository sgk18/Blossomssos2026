-- ============================================================================
-- Blossoms SOS 2026 — Aseprite 2D Sprite Generator
-- Generates authentic pixel-art .aseprite files & sprite sheets using Aseprite:
--   1. sakura_blossoms.aseprite (32x32, 4 color variants x 8 frames)
--   2. sakura_petals.aseprite   (20x20, 4 color variants x 8 3D-tumble frames)
--   3. sakura_branch.aseprite   (144x104, 6-frame breeze-swaying cherry bough)
--   4. white_pigeon.aseprite    (64x64, 8-frame wingbeat + glide white dove)
-- ============================================================================

local OUT_ASE = "public/sprites/aseprite/"
local OUT_DIR = "public/sprites/"

app.fs.makeAllDirectories(OUT_ASE)
app.fs.makeAllDirectories(OUT_DIR)

-- Helper: RGBA Color constructor
local function rgba(r, g, b, a)
  return app.pixelColor.rgba(r, g, b, a or 255)
end

-- Safe pixel plotter with alpha blending support
local function putPx(img, x, y, col)
  local ix = math.floor(x + 0.5)
  local iy = math.floor(y + 0.5)
  if ix < 0 or iy < 0 or ix >= img.width or iy >= img.height then return end
  local a = app.pixelColor.rgbaA(col)
  if a <= 0 then return end
  if a == 255 then
    img:drawPixel(ix, iy, col)
  else
    local dst = img:getPixel(ix, iy)
    local da = app.pixelColor.rgbaA(dst)
    if da == 0 then
      img:drawPixel(ix, iy, col)
    else
      local sa = a / 255.0
      local inv = 1.0 - sa
      local r = math.floor(app.pixelColor.rgbaR(col) * sa + app.pixelColor.rgbaR(dst) * inv + 0.5)
      local g = math.floor(app.pixelColor.rgbaG(col) * sa + app.pixelColor.rgbaG(dst) * inv + 0.5)
      local b = math.floor(app.pixelColor.rgbaB(col) * sa + app.pixelColor.rgbaB(dst) * inv + 0.5)
      local na = math.min(255, math.floor(a + da * inv + 0.5))
      img:drawPixel(ix, iy, rgba(r, g, b, na))
    end
  end
end

-- Bresenham pixel line with optional thickness
local function drawLine(img, x0, y0, x1, y1, col, radius)
  x0, y0 = math.floor(x0 + 0.5), math.floor(y0 + 0.5)
  x1, y1 = math.floor(x1 + 0.5), math.floor(y1 + 0.5)
  local dx = math.abs(x1 - x0)
  local sx = x0 < x1 and 1 or -1
  local dy = -math.abs(y1 - y0)
  local sy = y0 < y1 and 1 or -1
  local err = dx + dy
  local r = radius or 0
  while true do
    if r <= 0 then
      putPx(img, x0, y0, col)
    else
      for oy = -math.ceil(r), math.ceil(r) do
        for ox = -math.ceil(r), math.ceil(r) do
          if ox * ox + oy * oy <= r * r + 0.25 then
            putPx(img, x0 + ox, y0 + oy, col)
          end
        end
      end
    end
    if x0 == x1 and y0 == y1 then break end
    local e2 = 2 * err
    if e2 >= dy then err = err + dy; x0 = x0 + sx end
    if e2 <= dx then err = err + dx; y0 = y0 + sy end
  end
end

-- Filled pixel circle
local function fillCircle(img, cx, cy, r, col)
  local minX, maxX = math.floor(cx - r - 1), math.ceil(cx + r + 1)
  local minY, maxY = math.floor(cy - r - 1), math.ceil(cy + r + 1)
  for y = minY, maxY do
    for x = minX, maxX do
      local dx, dy = x - cx, y - cy
      if dx * dx + dy * dy <= r * r then
        putPx(img, x, y, col)
      end
    end
  end
end

-- Selective outline pass: adds crisp 4-connected pixel outline around opaque pixels
local function applyOutline(img, outlineCol)
  local w, h = img.width, img.height
  local toOutline = {}
  for y = 0, h - 1 do
    for x = 0, w - 1 do
      if app.pixelColor.rgbaA(img:getPixel(x, y)) == 0 then
        local touches = false
        if x > 0 and app.pixelColor.rgbaA(img:getPixel(x - 1, y)) > 180 then touches = true end
        if x < w - 1 and app.pixelColor.rgbaA(img:getPixel(x + 1, y)) > 180 then touches = true end
        if y > 0 and app.pixelColor.rgbaA(img:getPixel(x, y - 1)) > 180 then touches = true end
        if y < h - 1 and app.pixelColor.rgbaA(img:getPixel(x, y + 1)) > 180 then touches = true end
        if touches then
          table.insert(toOutline, { x, y })
        end
      end
    end
  end
  for _, pt in ipairs(toOutline) do
    putPx(img, pt[1], pt[2], outlineCol)
  end
end

-- ============================================================================
-- 1. SAKURA BLOSSOMS (32x32, 4 color palettes x 8 frames = 32 frames)
-- ============================================================================
local SAKURA_PALETTES = {
  { -- Classic Japanese Somei-Yoshino Sakura Pink
    name = "sakura_classic",
    tip     = rgba(255, 245, 249),
    light   = rgba(255, 206, 224),
    mid     = rgba(255, 158, 192),
    deep    = rgba(235, 94, 145),
    star    = rgba(196, 43, 102),
    outline = rgba(138, 40, 82, 230),
    stamen  = rgba(255, 218, 74),
    anther  = rgba(240, 140, 0),
  },
  { -- Vivid Festival Yaezakura Rose-Magenta
    name = "sakura_vivid",
    tip     = rgba(255, 228, 242),
    light   = rgba(255, 143, 191),
    mid     = rgba(255, 82, 152),
    deep    = rgba(214, 36, 110),
    star    = rgba(158, 19, 78),
    outline = rgba(112, 18, 59, 235),
    stamen  = rgba(255, 230, 102),
    anther  = rgba(255, 165, 0),
  },
  { -- Team Onyx Wisteria-Lavender Blossom
    name = "sakura_lavender",
    tip     = rgba(250, 245, 255),
    light   = rgba(224, 206, 255),
    mid     = rgba(186, 156, 245),
    deep    = rgba(138, 92, 226),
    star    = rgba(92, 50, 168),
    outline = rgba(68, 36, 122, 230),
    stamen  = rgba(255, 224, 92),
    anther  = rgba(235, 152, 18),
  },
  { -- Warm Sunset Coral Sakura
    name = "sakura_coral",
    tip     = rgba(255, 246, 240),
    light   = rgba(255, 198, 182),
    mid     = rgba(255, 138, 122),
    deep    = rgba(228, 78, 78),
    star    = rgba(176, 40, 56),
    outline = rgba(124, 32, 46, 230),
    stamen  = rgba(255, 232, 98),
    anther  = rgba(230, 126, 0),
  }
}

-- Draw a single notched sakura flower on `img` centered at (cx, cy)
local function drawSakuraFlower(img, cx, cy, radius, rotAngle, tiltX, pal, shimmerPhase)
  -- Sample pixel grid with supersampled notched-petal polar SDF for crisp pixel art
  local maxR = math.ceil(radius + 3)
  for py = math.floor(cy - maxR), math.ceil(cy + maxR) do
    for px = math.floor(cx - maxR), math.ceil(cx + maxR) do
      -- Undo 3D tilt around Y axis for gentle tumbling
      local dx = (px - cx) / math.max(0.42, tiltX)
      local dy = (py - cy)
      local dist = math.sqrt(dx * dx + dy * dy)
      if dist <= radius * 1.12 and dist >= 0.5 then
        local theta = math.atan(dy, dx) - rotAngle
        -- 5 petals: map angle into [-pi/5, pi/5]
        local sector = (math.pi * 2) / 5
        local localA = ((theta + math.pi * 4) % sector) - (sector * 0.5)
        local normA = math.abs(localA) / (sector * 0.5) -- 0 at petal center, 1 at gap between petals

        -- Sakura petal outer envelope with signature V-notch at normA near 0!
        local envelope = math.cos(normA * math.pi * 0.48)
        local notch = 0.0
        if normA < 0.22 then
          notch = (1.0 - normA / 0.22) * 0.20
        end
        local petalR = radius * (0.28 + 0.78 * envelope - notch)

        -- Slight gap separation between adjacent petals
        if dist <= petalR and not (normA > 0.88 and dist > radius * 0.42) then
          local t = dist / petalR -- 0 at center, 1 at outer edge
          -- Pixel-art stepped color ramp with subtle Bayer checkerboard dither
          local dither = ((px + py) % 2 == 0) and 0.04 or -0.04
          local td = t + dither
          -- Directional top-left sunlit highlight
          local lightBias = (-dx * 0.35 - dy * 0.35) / radius * 0.12
          td = td + lightBias

          local col
          if td < 0.26 then
            col = pal.star
          elseif td < 0.44 then
            col = pal.deep
          elseif td < 0.70 then
            col = pal.mid
          elseif td < 0.88 then
            col = pal.light
          else
            col = pal.tip
          end
          putPx(img, px, py, col)
        end
      elseif dist < 0.5 then
        putPx(img, px, py, pal.star)
      end
    end
  end

  -- Soft selective outline around the flower silhouette
  applyOutline(img, pal.outline)

  -- Crisp center calyx & radiating stamen filaments + golden anthers
  fillCircle(img, cx, cy, 1.6, pal.star)
  local numStamens = 5
  for s = 0, numStamens - 1 do
    local sa = rotAngle + (s * math.pi * 2 / numStamens) + (math.pi / 5)
    local slen = radius * 0.36 + ((s % 2 == 0) and 0.8 or 0.0)
    local sx = cx + math.cos(sa) * slen * tiltX
    local sy = cy + math.sin(sa) * slen
    -- Thin light filament pixel
    local mx = cx + math.cos(sa) * (slen * 0.55) * tiltX
    local my = cy + math.sin(sa) * (slen * 0.55)
    putPx(img, mx, my, pal.tip)
    -- Golden anther dot (shimmers slightly across frames)
    local antherCol = ((s + shimmerPhase) % 2 == 0) and pal.stamen or pal.anther
    putPx(img, sx, sy, antherCol)
  end
  putPx(img, cx, cy, pal.stamen)
end

do
  local totalFrames = #SAKURA_PALETTES * 8
  local spr = Sprite(32, 32, ColorMode.RGB)
  for f = 2, totalFrames do spr:newEmptyFrame() end

  local frameIdx = 1
  for pIdx, pal in ipairs(SAKURA_PALETTES) do
    local startF = frameIdx
    for step = 0, 7 do
      spr.frames[frameIdx].duration = 0.12
      local img = Image(32, 32, ColorMode.RGB)
      local rot = (step / 8.0) * (math.pi * 2 / 5) -- Seamless 1/5th symmetry loop!
      local tilt = 0.84 + 0.16 * math.cos((step / 8.0) * math.pi * 2)
      drawSakuraFlower(img, 15.5, 15.5, 12.2, rot, tilt, pal, step)
      spr:newCel(spr.layers[1], spr.frames[frameIdx], img)
      frameIdx = frameIdx + 1
    end
    local tag = spr:newTag(startF, frameIdx - 1)
    tag.name = pal.name
  end

  spr:saveAs(OUT_ASE .. "sakura_blossoms.ase")
  spr:close()
end

-- ============================================================================
-- 2. FALLING SAKURA PETALS (20x20, 4 variants x 8 3D-tumble frames = 32 frames)
-- ============================================================================
local function drawTumblingPetal(img, cx, cy, step, pal)
  -- step 0..7 represents a full 3D flip + curl cycle of a single notched sakura petal
  local phase = (step / 8.0) * math.pi * 2
  local cosP = math.cos(phase)
  local sinP = math.sin(phase)
  local widthScale = math.max(0.22, math.abs(cosP))
  local curl = sinP * 2.2 -- curved camber when viewed from side!
  local rot = math.sin(phase) * 0.28 - 0.35

  local cosR, sinR = math.cos(rot), math.sin(rot)
  local len = 7.2
  local maxW = 5.2

  for py = 1, img.height - 2 do
    for px = 1, img.width - 2 do
      -- Transform into petal local coords: u across width, v along length (-len..+len)
      local rx = (px - cx) * cosR + (py - cy) * sinR
      local ry = -(px - cx) * sinR + (py - cy) * cosR

      local v = ry / len -- -1 (notched top tip) to +1 (pointed base)
      if v >= -1.05 and v <= 1.05 then
        -- Curved spine offset from wind curl
        local spineOffset = curl * (1.0 - v * v) * 0.45
        local localX = (rx - spineOffset) / widthScale

        -- Heart-notched sakura petal width profile
        local halfW = maxW * math.sin(math.acos(math.max(-1, math.min(1, v * 0.92))))
        -- Taper toward bottom base (v -> 1)
        halfW = halfW * (1.0 - 0.38 * math.max(0, v))

        -- Signature V-notch at top center (v < -0.58)
        local inNotch = false
        if v < -0.58 and math.abs(localX) < 1.8 then
          local notchDepth = (-0.58 - v) / 0.42
          if math.abs(localX) < notchDepth * 1.65 then
            inNotch = true
          end
        end

        if not inNotch and math.abs(localX) <= halfW then
          local dither = ((px + py) % 2 == 0) and 0.05 or -0.05
          -- Backside of petal (cosP < 0) is slightly deeper rose; edge catches bright rim light
          local grad = (v + 1.0) * 0.5 + dither -- 0 at tip, 1 at base
          local col
          if widthScale < 0.36 then
            -- Crescent side-edge catches bright highlight
            col = (grad < 0.55) and pal.tip or pal.light
          elseif cosP >= 0 then
            if grad < 0.30 then col = pal.tip
            elseif grad < 0.65 then col = pal.light
            elseif grad < 0.88 then col = pal.mid
            else col = pal.deep end
          else
            if grad < 0.25 then col = pal.light
            elseif grad < 0.65 then col = pal.mid
            else col = pal.deep end
          end
          putPx(img, px, py, col)
        end
      end
    end
  end

  applyOutline(img, pal.outline)
end

do
  local totalFrames = #SAKURA_PALETTES * 8
  local spr = Sprite(20, 20, ColorMode.RGB)
  for f = 2, totalFrames do spr:newEmptyFrame() end

  local frameIdx = 1
  for _, pal in ipairs(SAKURA_PALETTES) do
    local startF = frameIdx
    for step = 0, 7 do
      spr.frames[frameIdx].duration = 0.10
      local img = Image(20, 20, ColorMode.RGB)
      drawTumblingPetal(img, 10, 10, step, pal)
      spr:newCel(spr.layers[1], spr.frames[frameIdx], img)
      frameIdx = frameIdx + 1
    end
    local tag = spr:newTag(startF, frameIdx - 1)
    tag.name = pal.name .. "_petal"
  end

  spr:saveAs(OUT_ASE .. "sakura_petals.ase")
  spr:close()
end

-- ============================================================================
-- 3. CHERRY BLOSSOM BOUGH / GARDEN BRANCH (144x104, 6-frame breeze sway)
--    Origin at top-left (0, 0) reaching out & down like an overhanging sakura tree!
-- ============================================================================
local function drawTinyBud(img, cx, cy, pal)
  fillCircle(img, cx, cy, 2.6, pal.deep)
  fillCircle(img, cx - 0.6, cy - 0.6, 1.8, pal.light)
  putPx(img, cx - 1, cy - 1, pal.tip)
  putPx(img, cx + 1, cy + 2, rgba(55, 125, 65))
  putPx(img, cx, cy + 2, rgba(40, 95, 50))
end

local function drawPixelLeaf(img, cx, cy, angle, len)
  local cDark  = rgba(38, 102, 54)
  local cMid   = rgba(64, 156, 82)
  local cLight = rgba(122, 212, 132)
  local cosA, sinA = math.cos(angle), math.sin(angle)
  for py = math.floor(cy - len - 2), math.ceil(cy + len + 2) do
    for px = math.floor(cx - len - 2), math.ceil(cx + len + 2) do
      local u = (px - cx) * cosA + (py - cy) * sinA
      local v = -(px - cx) * sinA + (py - cy) * cosA
      if u >= 0 and u <= len then
        local t = u / len
        local hw = math.sin(t * math.pi) * (len * 0.34)
        if math.abs(v) <= hw then
          if math.abs(v) < 0.6 then
            putPx(img, px, py, cLight)
          elseif v < 0 then
            putPx(img, px, py, cMid)
          else
            putPx(img, px, py, cDark)
          end
        end
      end
    end
  end
end

do
  local spr = Sprite(144, 104, ColorMode.RGB)
  for f = 2, 6 do spr:newEmptyFrame() end

  local barkOutline = rgba(42, 20, 32)
  local barkDark    = rgba(68, 36, 52)
  local barkMid     = rgba(98, 56, 74)
  local barkLight   = rgba(132, 82, 102)

  local palClassic = SAKURA_PALETTES[1]
  local palVivid   = SAKURA_PALETTES[2]

  for step = 0, 5 do
    spr.frames[step + 1].duration = 0.18
    local img = Image(144, 104, ColorMode.RGB)

    -- Gentle sinusoidal breeze offset at outer twigs
    local sway = math.sin((step / 6.0) * math.pi * 2) * 2.2
    local swayY = math.cos((step / 6.0) * math.pi * 2) * 1.4

    -- 1. Background soft sakura cloud clusters (layered depth behind wood)
    local bgClusters = {
      { 26, 22, 11 }, { 52, 28, 12 }, { 78, 34 + swayY * 0.5, 11 },
      { 104 + sway * 0.6, 42 + swayY * 0.7, 10 }, { 36, 52, 10 },
      { 68 + sway * 0.4, 58 + swayY * 0.5, 9 }
    }
    for _, cl in ipairs(bgClusters) do
      fillCircle(img, cl[1], cl[2], cl[3], rgba(242, 145, 182, 220))
      fillCircle(img, cl[1] - 2, cl[2] - 2, cl[3] * 0.75, rgba(255, 196, 218, 235))
    end

    -- 2. Fresh spring sakura leaves peeking around clusters
    drawPixelLeaf(img, 18, 34, 1.15, 11)
    drawPixelLeaf(img, 46, 14, 0.35, 12)
    drawPixelLeaf(img, 64, 44 + swayY * 0.4, 1.35, 11)
    drawPixelLeaf(img, 92 + sway * 0.5, 24 + swayY * 0.5, 0.25, 11)
    drawPixelLeaf(img, 116 + sway * 0.8, 48 + swayY * 0.8, 0.85, 10)
    drawPixelLeaf(img, 32, 66 + swayY * 0.4, 1.65, 10)

    -- 3. Gnarled Cherry Bark Main Bough & Sub-twigs
    local trunkPts = {
      { 0, 8, 5.5 },
      { 22, 15, 4.5 },
      { 46, 24, 3.6 },
      { 72, 31 + swayY * 0.35, 2.8 },
      { 98 + sway * 0.5, 40 + swayY * 0.65, 2.0 },
      { 124 + sway * 0.9, 47 + swayY * 0.9, 1.2 },
    }
    -- Draw dark bark core then sunlit upper bark edge
    for i = 1, #trunkPts - 1 do
      local a, b = trunkPts[i], trunkPts[i + 1]
      drawLine(img, a[1], a[2], b[1], b[2], barkOutline, a[3] + 1.0)
      drawLine(img, a[1], a[2], b[1], b[2], barkDark, a[3])
      drawLine(img, a[1], a[2] - 1, b[1], b[2] - 1, barkMid, math.max(0.8, a[3] - 1.2))
      drawLine(img, a[1], a[2] - 2, b[1], b[2] - 2, barkLight, math.max(0, a[3] - 2.4))
    end

    -- Lower hanging sub-branch 1
    drawLine(img, 24, 16, 36, 46, barkDark, 2.2)
    drawLine(img, 36, 46, 44 + sway * 0.4, 72 + swayY * 0.6, barkDark, 1.3)
    drawLine(img, 24, 15, 36, 45, barkMid, 1.0)

    -- Middle sub-branch 2
    drawLine(img, 58, 28, 72 + sway * 0.3, 56 + swayY * 0.5, barkDark, 1.8)
    drawLine(img, 72 + sway * 0.3, 56 + swayY * 0.5, 86 + sway * 0.6, 76 + swayY * 0.8, barkDark, 1.0)

    -- Upper twig
    drawLine(img, 68, 30, 96 + sway * 0.5, 20 + swayY * 0.4, barkDark, 1.4)

    -- 4. Foreground Hero Sakura Blossoms along the branches!
    local blossoms = {
      {  8, 11, 9.2, 0.7, palVivid },
      { 18, 22, 9.8, 0.2, palClassic },
      { 36, 15, 8.8, 0.9, palVivid },
      { 28, 35, 8.5, 0.5, palClassic },
      { 54, 29, 10.4, 0.4, palClassic },
      { 65, 20, 8.6, 1.1, palClassic },
      { 37, 50, 9.2, 1.1, palClassic },
      { 44 + sway * 0.4, 72 + swayY * 0.6, 8.4, 0.6, palVivid },
      { 77 + sway * 0.3, 35 + swayY * 0.4, 9.8, 0.1, palVivid },
      { 72 + sway * 0.3, 58 + swayY * 0.5, 8.8, 0.8, palClassic },
      { 96 + sway * 0.5, 20 + swayY * 0.4, 8.4, 0.5, palClassic },
      { 104 + sway * 0.6, 42 + swayY * 0.7, 9.6, 1.0, palClassic },
      { 115 + sway * 0.75, 34 + swayY * 0.8, 7.8, 0.2, palClassic },
      { 124 + sway * 0.9, 48 + swayY * 0.9, 8.0, 0.3, palVivid },
      { 86 + sway * 0.6, 76 + swayY * 0.8, 7.8, 0.7, palClassic },
    }
    for idx, b in ipairs(blossoms) do
      local sub = Image(26, 26, ColorMode.RGB)
      drawSakuraFlower(sub, 12.5, 12.5, b[3], b[4] + sway * 0.03, 0.95, b[5], step + idx)
      local ox = math.floor(b[1] - 12.5 + 0.5)
      local oy = math.floor(b[2] - 12.5 + 0.5)
      for sy = 0, 25 do
        for sx = 0, 25 do
          local c = sub:getPixel(sx, sy)
          if app.pixelColor.rgbaA(c) > 0 then
            putPx(img, ox + sx, oy + sy, c)
          end
        end
      end
    end

    -- 5. Unopened sakura buds at twig tips
    drawTinyBud(img, 133 + sway, 51 + swayY, palVivid)
    drawTinyBud(img, 106 + sway * 0.5, 17 + swayY * 0.4, palClassic)
    drawTinyBud(img, 48 + sway * 0.4, 83 + swayY * 0.7, palClassic)
    drawTinyBud(img, 93 + sway * 0.7, 84 + swayY * 0.9, palVivid)

    spr:newCel(spr.layers[1], spr.frames[step + 1], img)
  end

  local tag = spr:newTag(1, 6)
  tag.name = "breeze_sway"

  spr:saveAs(OUT_ASE .. "sakura_branch.ase")
  spr:close()
end

-- ============================================================================
-- 4. MAJESTIC WHITE ONYX PIGEON / DOVE IN FLIGHT (64x64, 8 frames)
--    Facing right, soaring slightly upward with full layered pixel-art feathers!
-- ============================================================================
local function fillEllipseRot(img, cx, cy, rx, ry, angle, col)
  local cosA, sinA = math.cos(angle), math.sin(angle)
  local maxR = math.max(rx, ry) + 2
  for py = math.floor(cy - maxR), math.ceil(cy + maxR) do
    for px = math.floor(cx - maxR), math.ceil(cx + maxR) do
      local u = (px - cx) * cosA + (py - cy) * sinA
      local v = -(px - cx) * sinA + (py - cy) * cosA
      if (u * u) / (rx * rx) + (v * v) / (ry * ry) <= 1.0 then
        putPx(img, px, py, col)
      end
    end
  end
end

-- Draw a curved feathered wing from shoulder (sx, sy) to elbow (ex, ey) to tip (tx, ty)
local function drawFeatheredWing(img, sx, sy, ex, ey, tx, ty, spreadDir, isFarWing)
  local cPure    = rgba(255, 255, 255)
  local cCream   = rgba(246, 243, 255)
  local cLavSoft = rgba(218, 210, 242)
  local cLavDeep = rgba(182, 168, 222)

  local baseCol  = isFarWing and cLavSoft or cPure
  local shadeCol = isFarWing and cLavDeep or cCream

  -- Leading wing bone (humerus -> radius -> primary tip)
  drawLine(img, sx, sy, ex, ey, baseCol, isFarWing and 2.6 or 3.2)
  drawLine(img, ex, ey, tx, ty, baseCol, isFarWing and 1.8 or 2.4)

  -- Fan 6 primary & secondary flight feathers radiating from the wing bone!
  local numFeathers = isFarWing and 5 or 7
  for i = 0, numFeathers - 1 do
    local t = i / (numFeathers - 1) -- 0 near tip (primaries), 1 near body (secondaries)
    -- Anchor point along the wing arm
    local ax, ay
    if t < 0.55 then
      local u = t / 0.55
      ax = tx * (1 - u) + ex * u
      ay = ty * (1 - u) + ey * u
    else
      local u = (t - 0.55) / 0.45
      ax = ex * (1 - u) + sx * u
      ay = ey * (1 - u) + sy * u
    end

    -- Feather length & trailing direction (sweeping backward and slightly downward/upward)
    local flen = (1.0 - t * 0.38) * (isFarWing and 11.5 or 14.5)
    local fAngle = math.pi * 0.92 + (t - 0.3) * 0.35 * spreadDir
    local fx = ax + math.cos(fAngle) * flen
    local fy = ay + math.sin(fAngle) * flen

    drawLine(img, ax, ay, fx, fy, (i % 2 == 0) and baseCol or shadeCol, isFarWing and 1.3 or 1.7)
    -- Crisp bright feather tip pixel
    putPx(img, fx, fy, isFarWing and cLavSoft or cPure)
  end

  -- Bright sunlit leading edge on near wing
  if not isFarWing then
    drawLine(img, sx, sy - 1, ex, ey - 1, cPure, 1.2)
    drawLine(img, ex, ey - 1, tx, ty, cPure, 1.0)
  end
end

do
  local spr = Sprite(64, 64, ColorMode.RGB)
  for f = 2, 8 do spr:newEmptyFrame() end

  -- 8-frame wingbeat + soaring glide poses:
  -- { bobY, nearElbowX, nearElbowY, nearTipX, nearTipY, farElbowX, farElbowY, farTipX, farTipY, spreadDir }
  local POSES = {
    -- 1. High upstroke peak (wings swept majestically overhead in a V)
    {  1,  33, 20,  24,  6,   36, 19,  31,  5,  1.0 },
    -- 2. Power downstroke start (wings snapping forward & wide)
    {  0,  36, 22,  30, 11,   39, 20,  38,  9,  0.8 },
    -- 3. Mid downstroke (sweeping outward & below body level)
    { -1,  35, 36,  25, 42,   39, 24,  35, 17, -0.2 },
    -- 4. Deep downstroke (near wing swept low beneath chest, body surges high!)
    { -2,  34, 40,  25, 53,   38, 27,  33, 22, -0.6 },
    -- 5. Wrist recovery fold (wing tucking slightly on way back up)
    { -1,  31, 35,  20, 42,   36, 25,  30, 19, -0.3 },
    -- 6. Rising upstroke (feather tips trailing gracefully)
    {  0,  32, 24,  21, 14,   36, 21,  30, 10,  0.6 },
    -- 7. Outstretched soaring glide 1
    { -1,  34, 24,  22, 15,   38, 22,  33, 11,  0.7 },
    -- 8. Outstretched soaring glide 2 (subtle feather tip breeze flex)
    { -1,  34, 25,  21, 17,   38, 22,  32, 12,  0.7 },
  }

  local cWhite     = rgba(255, 255, 255)
  local cBodyShade = rgba(226, 220, 246)
  local cBellyDeep = rgba(196, 186, 228)
  local cOutline   = rgba(78, 56, 132, 235)
  local cBeak      = rgba(235, 138, 148)
  local cEyeGold   = rgba(255, 190, 40)
  local cEyePupil  = rgba(42, 24, 78)
  local cFoot      = rgba(222, 118, 136)

  for step = 1, 8 do
    local p = POSES[step]
    spr.frames[step].duration = (step >= 7) and 0.16 or 0.09
    local img = Image(64, 64, ColorMode.RGB)

    local by = 33 + p[1] -- Body vertical center with natural wingbeat bob!

    -- 1. Far Wing (behind body)
    drawFeatheredWing(img, 36, by - 3, p[6], p[7] + p[1], p[8], p[9] + p[1], p[10], true)

    -- 2. Fanned Dove Tail Feathers (radiating left-back from rump)
    for t = -2, 2 do
      local ta = math.pi + t * 0.13 + 0.08
      local tx = 23 + math.cos(ta) * 13.5
      local ty = (by + 2) + math.sin(ta) * 13.5
      drawLine(img, 24, by + 1, tx, ty, (t % 2 == 0) and cWhite or cBodyShade, 1.6)
    end

    -- 3. Sleek Aerodynamic Dove Body, Proud Puffed Breast & Rounded Head
    -- Underbelly shadow layer first
    fillEllipseRot(img, 34, by + 2.2, 11.5, 5.2, -0.18, cBellyDeep)
    fillEllipseRot(img, 34, by + 1.0, 11.5, 5.0, -0.18, cBodyShade)
    -- Sunlit pure white upper body & breast
    fillEllipseRot(img, 34.5, by - 0.2, 11.0, 4.4, -0.18, cWhite)
    -- Proud rounded pigeon breast
    fillCircle(img, 42.5, by - 0.5, 4.5, cBodyShade)
    fillCircle(img, 42.5, by - 1.2, 4.2, cWhite)
    -- Graceful neck & head
    fillCircle(img, 45.5, by - 4.2, 3.6, cWhite)
    fillCircle(img, 47.5, by - 6.0, 3.4, cWhite)

    -- Tucked coral-rose feet beneath tail base
    drawLine(img, 29, by + 5, 25, by + 6, cFoot, 0.8)

    -- 4. Foreground Near Wing (drawn on sub-layer with soft lavender contour so it reads crisply over white torso!)
    local wingImg = Image(64, 64, ColorMode.RGB)
    drawFeatheredWing(wingImg, 35, by - 1, p[2], p[3] + p[1], p[4], p[5] + p[1], p[10], false)
    applyOutline(wingImg, rgba(138, 118, 194, 215))
    for wy = 0, 63 do
      for wx = 0, 63 do
        local wc = wingImg:getPixel(wx, wy)
        if app.pixelColor.rgbaA(wc) > 0 then
          putPx(img, wx, wy, wc)
        end
      end
    end

    -- 5. Crisp pixel-art selective outline around the entire dove silhouette!
    applyOutline(img, cOutline)

    -- 6. Sleek Tapered Dove Bill & Expressive Eye
    putPx(img, 51, by - 6, cBeak)
    putPx(img, 51, by - 5, cBeak)
    putPx(img, 52, by - 5, cBeak)
    putPx(img, 53, by - 5, cOutline)
    putPx(img, 48, by - 7, cEyeGold)
    putPx(img, 49, by - 7, cEyePupil)
    putPx(img, 48, by - 8, cWhite)

    spr:newCel(spr.layers[1], spr.frames[step], img)
  end

  local flapTag = spr:newTag(1, 6)
  flapTag.name = "flap"
  local glideTag = spr:newTag(7, 8)
  glideTag.name = "glide"

  spr:saveAs(OUT_ASE .. "white_pigeon.ase")
  spr:close()
end

print("All Aseprite 2D sprites generated successfully!")
