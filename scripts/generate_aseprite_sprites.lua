-- ============================================================================
-- Blossoms SOS 2026 — Aseprite 2D Sprite Generator (Pastel Blossoms & Butterflies)
-- Generates authentic pixel-art .ase files & sprite sheets using Aseprite CLI:
--   1. sakura_blossoms.ase (32x32, 4 soft pastel sakura variants x 8 frames)
--   2. sakura_petals.ase   (20x20, 4 bright-pink & white blended variants x 8 frames)
--   3. sakura_branch.ase   (144x104, 6-frame pastel cherry blossom garden bough)
--   4. butterflies.ase     (48x48, 3 butterfly variants x 8 silky wing-flutter frames)
-- ============================================================================

local OUT_ASE = "public/sprites/aseprite/"
local OUT_DIR = "public/sprites/"

app.fs.makeAllDirectories(OUT_ASE)
app.fs.makeAllDirectories(OUT_DIR)

local function rgba(r, g, b, a)
  return app.pixelColor.rgba(r, g, b, a or 255)
end

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

-- Soft translucent outline pass so sprites blend naturally into #FFDBC3 peach & lavender BG
local function applyOutline(img, outlineCol, alphaThreshold)
  local thresh = alphaThreshold or 150
  local w, h = img.width, img.height
  local toOutline = {}
  for y = 0, h - 1 do
    for x = 0, w - 1 do
      if app.pixelColor.rgbaA(img:getPixel(x, y)) == 0 then
        local touches = false
        if x > 0 and app.pixelColor.rgbaA(img:getPixel(x - 1, y)) > thresh then touches = true end
        if x < w - 1 and app.pixelColor.rgbaA(img:getPixel(x + 1, y)) > thresh then touches = true end
        if y > 0 and app.pixelColor.rgbaA(img:getPixel(x, y - 1)) > thresh then touches = true end
        if y < h - 1 and app.pixelColor.rgbaA(img:getPixel(x, y + 1)) > thresh then touches = true end
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
-- 1. PASTEL CHERRY BLOSSOM FLOWERS (32x32, 4 soft pastel palettes x 8 frames)
-- ============================================================================
local PASTEL_FLOWER_PALETTES = {
  { -- 1. Soft Pastel Blush Sakura
    name    = "pastel_blush",
    tip     = rgba(255, 250, 252, 245),
    light   = rgba(255, 224, 236, 245),
    mid     = rgba(255, 194, 216, 245),
    deep    = rgba(244, 156, 188, 245),
    star    = rgba(226, 118, 160, 250),
    outline = rgba(214, 134, 166, 145),
    stamen  = rgba(255, 236, 162, 255),
    anther  = rgba(242, 186, 96, 255),
  },
  { -- 2. Soft Pastel Lilac-Lavender Sakura
    name    = "pastel_lilac",
    tip     = rgba(252, 249, 255, 245),
    light   = rgba(235, 224, 255, 245),
    mid     = rgba(210, 192, 250, 245),
    deep    = rgba(182, 158, 236, 245),
    star    = rgba(148, 118, 214, 250),
    outline = rgba(152, 128, 208, 145),
    stamen  = rgba(255, 238, 168, 255),
    anther  = rgba(238, 184, 98, 255),
  },
  { -- 3. Pastel Peach-Rose Blossom (harmonizes directly with #FFDBC3)
    name    = "pastel_peach_rose",
    tip     = rgba(255, 251, 248, 245),
    light   = rgba(255, 226, 216, 245),
    mid     = rgba(255, 196, 188, 245),
    deep    = rgba(242, 158, 154, 245),
    star    = rgba(222, 122, 126, 250),
    outline = rgba(212, 132, 134, 140),
    stamen  = rgba(255, 238, 166, 255),
    anther  = rgba(240, 180, 92, 255),
  },
  { -- 4. Pastel Pearl-White & Whisper Pink Blossom
    name    = "pastel_pearl",
    tip     = rgba(255, 255, 255, 248),
    light   = rgba(255, 242, 248, 245),
    mid     = rgba(250, 218, 232, 245),
    deep    = rgba(236, 184, 208, 245),
    star    = rgba(214, 142, 178, 250),
    outline = rgba(202, 146, 176, 135),
    stamen  = rgba(255, 236, 158, 255),
    anther  = rgba(238, 182, 96, 255),
  },
}

local function drawSakuraFlower(img, cx, cy, radius, rotAngle, tiltX, pal, shimmerPhase)
  local maxR = math.ceil(radius + 3)
  for py = math.floor(cy - maxR), math.ceil(cy + maxR) do
    for px = math.floor(cx - maxR), math.ceil(cx + maxR) do
      local dx = (px - cx) / math.max(0.42, tiltX)
      local dy = (py - cy)
      local dist = math.sqrt(dx * dx + dy * dy)
      if dist <= radius * 1.12 and dist >= 0.5 then
        local theta = math.atan(dy, dx) - rotAngle
        local sector = (math.pi * 2) / 5
        local localA = ((theta + math.pi * 4) % sector) - (sector * 0.5)
        local normA = math.abs(localA) / (sector * 0.5)

        local envelope = math.cos(normA * math.pi * 0.48)
        local notch = 0.0
        if normA < 0.22 then
          notch = (1.0 - normA / 0.22) * 0.20
        end
        local petalR = radius * (0.28 + 0.78 * envelope - notch)

        if dist <= petalR and not (normA > 0.88 and dist > radius * 0.42) then
          local t = dist / petalR
          local dither = ((px + py) % 2 == 0) and 0.04 or -0.04
          local lightBias = (-dx * 0.35 - dy * 0.35) / radius * 0.12
          local td = t + dither + lightBias

          local col
          if td < 0.24 then
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

  applyOutline(img, pal.outline, 160)

  fillCircle(img, cx, cy, 1.5, pal.star)
  local numStamens = 5
  for s = 0, numStamens - 1 do
    local sa = rotAngle + (s * math.pi * 2 / numStamens) + (math.pi / 5)
    local slen = radius * 0.35 + ((s % 2 == 0) and 0.7 or 0.0)
    local sx = cx + math.cos(sa) * slen * tiltX
    local sy = cy + math.sin(sa) * slen
    local mx = cx + math.cos(sa) * (slen * 0.55) * tiltX
    local my = cy + math.sin(sa) * (slen * 0.55)
    putPx(img, mx, my, pal.tip)
    local antherCol = ((s + shimmerPhase) % 2 == 0) and pal.stamen or pal.anther
    putPx(img, sx, sy, antherCol)
  end
  putPx(img, cx, cy, pal.stamen)
end

do
  local totalFrames = #PASTEL_FLOWER_PALETTES * 8
  local spr = Sprite(32, 32, ColorMode.RGB)
  for f = 2, totalFrames do spr:newEmptyFrame() end

  local frameIdx = 1
  for _, pal in ipairs(PASTEL_FLOWER_PALETTES) do
    local startF = frameIdx
    for step = 0, 7 do
      spr.frames[frameIdx].duration = 0.12
      local img = Image(32, 32, ColorMode.RGB)
      local rot = (step / 8.0) * (math.pi * 2 / 5)
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
-- 2. BRIGHT PINK & WHITE BLENDED PETALS (20x20, 4 variants x 8 tumble frames)
--    Soft translucent edge feathering (no dark outlines!) so bright pink &
--    crisp white petals blend seamlessly with the warm #FFDBC3 background.
-- ============================================================================
local PETAL_PALETTES = {
  { -- 1. Bright Sakura Pink & Crisp White Tip
    name    = "bright_pink_white",
    tip     = rgba(255, 255, 255, 248),
    light   = rgba(255, 206, 230, 242),
    mid     = rgba(255, 108, 176, 238),
    deep    = rgba(244, 62, 146, 235),
    outline = rgba(252, 142, 192, 125),
  },
  { -- 2. Pure Luminous White with Bright Pink Base Blush
    name    = "white_pink_blush",
    tip     = rgba(255, 255, 255, 250),
    light   = rgba(255, 246, 251, 245),
    mid     = rgba(255, 198, 224, 240),
    deep     = rgba(255, 104, 174, 235),
    outline = rgba(255, 188, 216, 120),
  },
  { -- 3. Radiant Flamingo-Sakura Bright Pink
    name    = "radiant_bright_pink",
    tip     = rgba(255, 244, 250, 246),
    light   = rgba(255, 148, 198, 242),
    mid     = rgba(255, 82, 162, 238),
    deep    = rgba(236, 42, 132, 235),
    outline = rgba(248, 118, 178, 125),
  },
  { -- 4. Snow White Onyx Petal with Soft Rose Whisper
    name    = "snow_white_petal",
    tip     = rgba(255, 255, 255, 252),
    light   = rgba(255, 250, 253, 246),
    mid     = rgba(255, 226, 238, 240),
    deep    = rgba(255, 152, 198, 232),
    outline = rgba(245, 192, 212, 115),
  },
}

local function drawTumblingPetal(img, cx, cy, step, pal)
  local phase = (step / 8.0) * math.pi * 2
  local cosP = math.cos(phase)
  local sinP = math.sin(phase)
  local widthScale = math.max(0.24, math.abs(cosP))
  local curl = sinP * 2.2
  local rot = math.sin(phase) * 0.28 - 0.35

  local cosR, sinR = math.cos(rot), math.sin(rot)
  local len = 7.4
  local maxW = 5.3

  for py = 1, img.height - 2 do
    for px = 1, img.width - 2 do
      local rx = (px - cx) * cosR + (py - cy) * sinR
      local ry = -(px - cx) * sinR + (py - cy) * cosR

      local v = ry / len
      if v >= -1.05 and v <= 1.05 then
        local spineOffset = curl * (1.0 - v * v) * 0.45
        local localX = (rx - spineOffset) / widthScale

        local halfW = maxW * math.sin(math.acos(math.max(-1, math.min(1, v * 0.92))))
        halfW = halfW * (1.0 - 0.38 * math.max(0, v))

        local inNotch = false
        if v < -0.58 and math.abs(localX) < 1.8 then
          local notchDepth = (-0.58 - v) / 0.42
          if math.abs(localX) < notchDepth * 1.65 then
            inNotch = true
          end
        end

        if not inNotch and math.abs(localX) <= halfW then
          local dither = ((px + py) % 2 == 0) and 0.05 or -0.05
          local grad = (v + 1.0) * 0.5 + dither
          local col
          if widthScale < 0.36 then
            col = (grad < 0.58) and pal.tip or pal.light
          elseif cosP >= 0 then
            if grad < 0.32 then col = pal.tip
            elseif grad < 0.62 then col = pal.light
            elseif grad < 0.85 then col = pal.mid
            else col = pal.deep end
          else
            if grad < 0.28 then col = pal.tip
            elseif grad < 0.60 then col = pal.light
            else col = pal.mid end
          end
          putPx(img, px, py, col)
        end
      end
    end
  end

  -- Soft feathered translucent edge so petals melt naturally into the peach/lavender bg
  applyOutline(img, pal.outline, 160)
end

do
  local totalFrames = #PETAL_PALETTES * 8
  local spr = Sprite(20, 20, ColorMode.RGB)
  for f = 2, totalFrames do spr:newEmptyFrame() end

  local frameIdx = 1
  for _, pal in ipairs(PETAL_PALETTES) do
    local startF = frameIdx
    for step = 0, 7 do
      spr.frames[frameIdx].duration = 0.10
      local img = Image(20, 20, ColorMode.RGB)
      drawTumblingPetal(img, 10, 10, step, pal)
      spr:newCel(spr.layers[1], spr.frames[frameIdx], img)
      frameIdx = frameIdx + 1
    end
    local tag = spr:newTag(startF, frameIdx - 1)
    tag.name = pal.name
  end

  spr:saveAs(OUT_ASE .. "sakura_petals.ase")
  spr:close()
end

-- ============================================================================
-- 3. PASTEL CHERRY BLOSSOM BOUGH (144x104, 6-frame breeze sway)
-- ============================================================================
local function drawTinyBud(img, cx, cy)
  fillCircle(img, cx, cy, 2.5, rgba(255, 118, 178, 240))
  fillCircle(img, cx - 0.6, cy - 0.6, 1.7, rgba(255, 224, 238, 245))
  putPx(img, cx - 1, cy - 1, rgba(255, 255, 255, 250))
  putPx(img, cx + 1, cy + 2, rgba(112, 178, 128, 220))
end

local function drawPastelLeaf(img, cx, cy, angle, len)
  local cDark  = rgba(96, 158, 114, 215)
  local cMid   = rgba(134, 196, 148, 225)
  local cLight = rgba(182, 228, 190, 230)
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

  -- Soft warm muted plum-wood tones so the branch feels airy and pastel
  local barkOutline = rgba(92, 56, 74, 200)
  local barkDark    = rgba(118, 76, 96, 225)
  local barkMid     = rgba(148, 102, 122, 230)
  local barkLight   = rgba(182, 138, 156, 235)

  local palBlush = PASTEL_FLOWER_PALETTES[1]
  local palLilac = PASTEL_FLOWER_PALETTES[2]
  local palPearl = PASTEL_FLOWER_PALETTES[4]

  for step = 0, 5 do
    spr.frames[step + 1].duration = 0.18
    local img = Image(144, 104, ColorMode.RGB)

    local sway = math.sin((step / 6.0) * math.pi * 2) * 2.2
    local swayY = math.cos((step / 6.0) * math.pi * 2) * 1.4

    -- Soft pastel sakura cloud clusters in background
    local bgClusters = {
      { 26, 22, 11 }, { 52, 28, 12 }, { 78, 34 + swayY * 0.5, 11 },
      { 104 + sway * 0.6, 42 + swayY * 0.7, 10 }, { 36, 52, 10 },
      { 68 + sway * 0.4, 58 + swayY * 0.5, 9 }
    }
    for _, cl in ipairs(bgClusters) do
      fillCircle(img, cl[1], cl[2], cl[3], rgba(255, 206, 226, 175))
      fillCircle(img, cl[1] - 2, cl[2] - 2, cl[3] * 0.75, rgba(255, 238, 246, 195))
    end

    drawPastelLeaf(img, 18, 34, 1.15, 11)
    drawPastelLeaf(img, 46, 14, 0.35, 12)
    drawPastelLeaf(img, 64, 44 + swayY * 0.4, 1.35, 11)
    drawPastelLeaf(img, 92 + sway * 0.5, 24 + swayY * 0.5, 0.25, 11)
    drawPastelLeaf(img, 116 + sway * 0.8, 48 + swayY * 0.8, 0.85, 10)
    drawPastelLeaf(img, 32, 66 + swayY * 0.4, 1.65, 10)

    local trunkPts = {
      { 0, 8, 5.2 },
      { 22, 15, 4.3 },
      { 46, 24, 3.4 },
      { 72, 31 + swayY * 0.35, 2.6 },
      { 98 + sway * 0.5, 40 + swayY * 0.65, 1.9 },
      { 124 + sway * 0.9, 47 + swayY * 0.9, 1.2 },
    }
    for i = 1, #trunkPts - 1 do
      local a, b = trunkPts[i], trunkPts[i + 1]
      drawLine(img, a[1], a[2], b[1], b[2], barkOutline, a[3] + 0.8)
      drawLine(img, a[1], a[2], b[1], b[2], barkDark, a[3])
      drawLine(img, a[1], a[2] - 1, b[1], b[2] - 1, barkMid, math.max(0.8, a[3] - 1.2))
      drawLine(img, a[1], a[2] - 2, b[1], b[2] - 2, barkLight, math.max(0, a[3] - 2.4))
    end

    drawLine(img, 24, 16, 36, 46, barkDark, 2.0)
    drawLine(img, 36, 46, 44 + sway * 0.4, 72 + swayY * 0.6, barkDark, 1.2)
    drawLine(img, 58, 28, 72 + sway * 0.3, 56 + swayY * 0.5, barkDark, 1.6)
    drawLine(img, 72 + sway * 0.3, 56 + swayY * 0.5, 86 + sway * 0.6, 76 + swayY * 0.8, barkDark, 1.0)
    drawLine(img, 68, 30, 96 + sway * 0.5, 20 + swayY * 0.4, barkDark, 1.3)

    local blossoms = {
      {  8, 11, 9.2, 0.7, palPearl },
      { 18, 22, 9.8, 0.2, palBlush },
      { 36, 15, 8.8, 0.9, palPearl },
      { 28, 35, 8.5, 0.5, palBlush },
      { 54, 29, 10.4, 0.4, palBlush },
      { 65, 20, 8.6, 1.1, palLilac },
      { 37, 50, 9.2, 1.1, palPearl },
      { 44 + sway * 0.4, 72 + swayY * 0.6, 8.4, 0.6, palBlush },
      { 77 + sway * 0.3, 35 + swayY * 0.4, 9.8, 0.1, palPearl },
      { 72 + sway * 0.3, 58 + swayY * 0.5, 8.8, 0.8, palLilac },
      { 96 + sway * 0.5, 20 + swayY * 0.4, 8.4, 0.5, palBlush },
      { 104 + sway * 0.6, 42 + swayY * 0.7, 9.6, 1.0, palPearl },
      { 115 + sway * 0.75, 34 + swayY * 0.8, 7.8, 0.2, palBlush },
      { 124 + sway * 0.9, 48 + swayY * 0.9, 8.0, 0.3, palLilac },
      { 86 + sway * 0.6, 76 + swayY * 0.8, 7.8, 0.7, palBlush },
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

    drawTinyBud(img, 133 + sway, 51 + swayY)
    drawTinyBud(img, 106 + sway * 0.5, 17 + swayY * 0.4)
    drawTinyBud(img, 48 + sway * 0.4, 83 + swayY * 0.7)
    drawTinyBud(img, 93 + sway * 0.7, 84 + swayY * 0.9)

    spr:newCel(spr.layers[1], spr.frames[step + 1], img)
  end

  local tag = spr:newTag(1, 6)
  tag.name = "breeze_sway"

  spr:saveAs(OUT_ASE .. "sakura_branch.ase")
  spr:close()
end

-- ============================================================================
-- 4. 2D ANIMATED BUTTERFLIES (48x48, 3 variants x 8 silky flutter frames)
--    Inspired by the "Flames to Flight — White Onyx Ignites" butterflies!
-- ============================================================================
local BUTTERFLY_PALETTES = {
  { -- 1. White Onyx Pearl & Pastel Lavender Morpho
    name    = "white_onyx_butterfly",
    inner   = rgba(255, 255, 255, 250),
    mid     = rgba(242, 236, 255, 248),
    outer   = rgba(196, 180, 242, 245),
    rim     = rgba(118, 96, 186, 235),
    spot    = rgba(255, 255, 255, 255),
    body    = rgba(84, 62, 138, 245),
    outline = rgba(98, 76, 158, 175),
  },
  { -- 2. Bright Pink & Crisp White Sakura Swallowtail
    name    = "pink_white_butterfly",
    inner   = rgba(255, 255, 255, 252),
    mid     = rgba(255, 182, 216, 248),
    outer   = rgba(255, 92, 166, 245),
    rim     = rgba(226, 52, 132, 235),
    spot    = rgba(255, 255, 255, 255),
    body    = rgba(138, 52, 96, 245),
    outline = rgba(214, 78, 142, 165),
  },
  { -- 3. Pastel Lilac & Amethyst Slogan Butterfly
    name    = "pastel_amethyst_butterfly",
    inner   = rgba(248, 242, 255, 250),
    mid     = rgba(212, 194, 252, 248),
    outer   = rgba(156, 128, 232, 245),
    rim     = rgba(92, 68, 168, 238),
    spot    = rgba(255, 245, 252, 255),
    body    = rgba(68, 44, 122, 248),
    outline = rgba(92, 68, 162, 175),
  },
}

-- Draw one butterfly wing pair (forewing + scalloped hindwing) with signed projection `proj`
-- `proj < 0` projects above the butterfly's back; `proj > 0` projects downward/outward!
local function drawButterflyHalf(img, cx, cy, bodyAngle, proj, pal, isFarWing)
  local cosB, sinB = math.cos(bodyAngle), math.sin(bodyAngle)
  local dirSign = (proj >= 0) and 1 or -1
  local spanScale = math.max(0.28, math.abs(proj))

  for py = 1, img.height - 2 do
    for px = 1, img.width - 2 do
      local dx = px - cx
      local dy = py - cy
      local u = dx * cosB + dy * sinB
      local vRaw = -dx * sinB + dy * cosB
      local v = (vRaw * dirSign) / spanScale

      if v >= 0.4 and v <= 17.5 then
        -- 1. Forewing: sweeps forward & out in a graceful Monarch/Morpho tear-arc
        local fwU = u - (1.8 + v * 0.34)
        local fwW = 6.2 * math.sin(math.min(1.0, v / 15.8) * math.pi * 0.86)
        local inForewing = (v <= 15.8) and (math.abs(fwU) <= fwW)

        -- 2. Hindwing: rounded scalloped petal-like lower wing sweeping back
        local hwU = u - (-3.2 - v * 0.16)
        local hwBase = 5.4 * math.sin(math.min(1.0, v / 12.2) * math.pi * 0.88)
        -- Delicate scallop wave along outer hindwing margin
        local scallop = math.sin(hwU * 1.4) * 0.45
        local inHindwing = (v <= 12.2) and (math.abs(hwU) <= hwBase + scallop)

        if inForewing or inHindwing then
          local spanNorm = inForewing and (v / 15.8) or (v / 12.2)
          local edgeDist = inForewing
            and (fwW - math.abs(fwU))
            or ((hwBase + scallop) - math.abs(hwU))

          local dither = ((px + py) % 2 == 0) and 0.04 or -0.04
          local t = spanNorm + dither

          local col
          -- Crisp ornamental wing-rim border + luminous submarginal pearl spots!
          if edgeDist < 1.05 and spanNorm > 0.45 then
            col = pal.rim
          elseif inForewing and spanNorm > 0.72 and spanNorm < 0.86 and math.abs(fwU - 1.2) < 1.35 then
            col = pal.spot
          elseif inForewing and spanNorm > 0.62 and spanNorm < 0.75 and math.abs(fwU + 1.4) < 1.1 then
            col = pal.spot
          elseif t < 0.36 then
            col = pal.inner
          elseif t < 0.70 then
            col = isFarWing and pal.mid or pal.mid
          elseif t < 0.90 then
            col = pal.outer
          else
            col = pal.rim
          end

          putPx(img, px, py, col)
        end
      end
    end
  end
end

do
  local totalFrames = #BUTTERFLY_PALETTES * 8
  local spr = Sprite(48, 48, ColorMode.RGB)
  for f = 2, totalFrames do spr:newEmptyFrame() end

  -- 8-frame silky butterfly flutter cycle:
  -- { projUpper (always < 0, above back), projNear (+ open down-right -> - clapped up-left!), bodyBobY }
  local FLUTTER = {
    { -0.96,  0.88,  0.0 }, -- 1. Full open sunning/glide
    { -0.90,  0.46, -0.5 }, -- 2. Upstroke sweep start
    { -0.84, -0.52, -1.0 }, -- 3. Near wing sweeping upward above back
    { -0.88, -0.82, -1.4 }, -- 4. Tall graceful overhead wing clap!
    { -0.84, -0.46, -0.7 }, -- 5. Power opening sweep from overhead
    { -0.90,  0.48,  0.4 }, -- 6. Downstroke lift surge
    { -0.95,  0.85,  0.8 }, -- 7. Outstretched glide 1
    { -0.93,  0.80,  0.4 }, -- 8. Gentle glide ripple
  }

  local bodyAngle = -0.48 -- Facing gracefully up-right
  local cosB, sinB = math.cos(bodyAngle), math.sin(bodyAngle)

  local frameIdx = 1
  for _, pal in ipairs(BUTTERFLY_PALETTES) do
    local startF = frameIdx
    for step = 1, 8 do
      local fl = FLUTTER[step]
      spr.frames[frameIdx].duration = (step >= 7) and 0.13 or 0.085
      local img = Image(48, 48, ColorMode.RGB)

      local cx = 24
      local cy = 27 + fl[3]

      -- 1. Far/Upper Wing Pair
      drawButterflyHalf(img, cx, cy, bodyAngle, fl[1], pal, true)

      -- 2. Slender Butterfly Thorax, Abdomen & Head
      drawLine(
        img,
        cx - cosB * 6.5, cy - sinB * 6.5,
        cx + cosB * 6.0, cy + sinB * 6.0,
        pal.body, 1.15
      )
      local headX, headY = cx + cosB * 6.5, cy + sinB * 6.5
      drawLine(img, headX, headY, headX + 4, headY - 6, pal.body, 0)
      drawLine(img, headX, headY, headX + 7, headY - 2, pal.body, 0)
      putPx(img, headX + 4, headY - 6, pal.rim)
      putPx(img, headX + 7, headY - 2, pal.rim)

      -- 3. Near/Foreground Wing Pair (claps overhead when fl[2] < 0, opens wide when fl[2] > 0!)
      local nearWing = Image(48, 48, ColorMode.RGB)
      drawButterflyHalf(nearWing, cx, cy, bodyAngle, fl[2], pal, false)
      applyOutline(nearWing, pal.outline, 160)
      for wy = 0, 47 do
        for wx = 0, 47 do
          local wc = nearWing:getPixel(wx, wy)
          if app.pixelColor.rgbaA(wc) > 0 then
            putPx(img, wx, wy, wc)
          end
        end
      end

      -- Soft outer silhouette outline so butterfly reads crisply while staying pastel
      applyOutline(img, pal.outline, 160)

      spr:newCel(spr.layers[1], spr.frames[frameIdx], img)
      frameIdx = frameIdx + 1
    end
    local tag = spr:newTag(startF, frameIdx - 1)
    tag.name = pal.name
  end

  spr:saveAs(OUT_ASE .. "butterflies.ase")
  spr:close()
end

print("Generated pastel sakura blossoms, bright pink/white petals, pastel branch, and butterflies!")
