-- ============================================================================
-- Blossoms SOS 2026 — Aseprite 2D Pastel Sakura & Butterfly Sprite Generator
-- Generates authentic pixel-art .ase files & sprite sheets using Aseprite CLI:
--   1. sakura_blossoms.ase (32x32, 4 pastel variants x 8 frames)
--   2. sakura_petals.ase   (20x20, 4 pastel variants x 8 3D-tumble frames)
--   3. sakura_branch.ase   (144x104, 6-frame breeze-swaying pastel cherry bough)
--   4. butterflies.ase     (48x48, 4 pastel/Onyx variants x 8 flutter/glide frames)
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

local function applyOutline(img, outlineCol)
  local w, h = img.width, img.height
  local toOutline = {}
  for y = 0, h - 1 do
    for x = 0, w - 1 do
      if app.pixelColor.rgbaA(img:getPixel(x, y)) == 0 then
        local touches = false
        if x > 0 and app.pixelColor.rgbaA(img:getPixel(x - 1, y)) > 160 then touches = true end
        if x < w - 1 and app.pixelColor.rgbaA(img:getPixel(x + 1, y)) > 160 then touches = true end
        if y > 0 and app.pixelColor.rgbaA(img:getPixel(x, y - 1)) > 160 then touches = true end
        if y < h - 1 and app.pixelColor.rgbaA(img:getPixel(x, y + 1)) > 160 then touches = true end
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
-- DREAMY PASTEL SAKURA PALETTES
-- ============================================================================
local SAKURA_PALETTES = {
  { -- 1. Pastel Baby Blush Sakura
    name    = "pastel_blush",
    tip     = rgba(255, 250, 252),
    light   = rgba(255, 232, 241),
    mid     = rgba(255, 206, 224),
    deep    = rgba(244, 172, 198),
    star    = rgba(226, 138, 170),
    outline = rgba(186, 118, 146, 185),
    stamen  = rgba(255, 242, 178),
    anther  = rgba(242, 204, 118),
  },
  { -- 2. Pastel Lilac-Wisteria Sakura
    name    = "pastel_lilac",
    tip     = rgba(252, 250, 255),
    light   = rgba(238, 228, 255),
    mid     = rgba(218, 202, 248),
    deep    = rgba(190, 168, 236),
    star    = rgba(162, 136, 218),
    outline = rgba(132, 110, 180, 185),
    stamen  = rgba(255, 244, 186),
    anther  = rgba(240, 206, 124),
  },
  { -- 3. Pastel Rose-Peach Blossom
    name    = "pastel_peach",
    tip     = rgba(255, 251, 248),
    light   = rgba(255, 234, 226),
    mid     = rgba(255, 208, 196),
    deep    = rgba(244, 178, 164),
    star    = rgba(224, 146, 134),
    outline = rgba(184, 122, 114, 185),
    stamen  = rgba(255, 245, 188),
    anther  = rgba(238, 200, 116),
  },
  { -- 4. Pastel Pearl-Mint White Onyx Sakura
    name    = "pastel_pearl",
    tip     = rgba(255, 255, 255),
    light   = rgba(246, 244, 253),
    mid     = rgba(232, 226, 246),
    deep    = rgba(214, 202, 236),
    star    = rgba(222, 176, 202),
    outline = rgba(152, 138, 182, 175),
    stamen  = rgba(255, 243, 182),
    anther  = rgba(236, 202, 120),
  }
}

-- ============================================================================
-- 1. PASTEL SAKURA BLOSSOMS (32x32, 4 pastel variants x 8 frames = 32 frames)
-- ============================================================================
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
          if td < 0.23 then
            col = pal.star
          elseif td < 0.42 then
            col = pal.deep
          elseif td < 0.68 then
            col = pal.mid
          elseif td < 0.87 then
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

  applyOutline(img, pal.outline)

  fillCircle(img, cx, cy, 1.5, pal.star)
  local numStamens = 5
  for s = 0, numStamens - 1 do
    local sa = rotAngle + (s * math.pi * 2 / numStamens) + (math.pi / 5)
    local slen = radius * 0.36 + ((s % 2 == 0) and 0.8 or 0.0)
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
  local totalFrames = #SAKURA_PALETTES * 8
  local spr = Sprite(32, 32, ColorMode.RGB)
  for f = 2, totalFrames do spr:newEmptyFrame() end

  local frameIdx = 1
  for _, pal in ipairs(SAKURA_PALETTES) do
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
-- 2. PASTEL FALLING SAKURA PETALS (20x20, 4 variants x 8 3D-tumble frames)
-- ============================================================================
local function drawTumblingPetal(img, cx, cy, step, pal)
  local phase = (step / 8.0) * math.pi * 2
  local cosP = math.cos(phase)
  local sinP = math.sin(phase)
  local widthScale = math.max(0.22, math.abs(cosP))
  local curl = sinP * 2.2
  local rot = math.sin(phase) * 0.28 - 0.35

  local cosR, sinR = math.cos(rot), math.sin(rot)
  local len = 7.2
  local maxW = 5.2

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
            col = (grad < 0.55) and pal.tip or pal.light
          elseif cosP >= 0 then
            if grad < 0.32 then col = pal.tip
            elseif grad < 0.68 then col = pal.light
            elseif grad < 0.88 then col = pal.mid
            else col = pal.deep end
          else
            if grad < 0.28 then col = pal.light
            elseif grad < 0.68 then col = pal.mid
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
-- 3. PASTEL CHERRY BLOSSOM BOUGH (144x104, 6-frame breeze sway)
-- ============================================================================
local function drawTinyBud(img, cx, cy, pal)
  fillCircle(img, cx, cy, 2.6, pal.deep)
  fillCircle(img, cx - 0.6, cy - 0.6, 1.8, pal.light)
  putPx(img, cx - 1, cy - 1, pal.tip)
  putPx(img, cx + 1, cy + 2, rgba(112, 168, 126))
  putPx(img, cx, cy + 2, rgba(88, 140, 102))
end

local function drawPixelLeaf(img, cx, cy, angle, len)
  -- Soft pastel sage-mint leaves
  local cDark  = rgba(92, 148, 110)
  local cMid   = rgba(132, 192, 148)
  local cLight = rgba(182, 228, 192)
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

  -- Soft muted rosewood-plum bark to match pastel blossoms
  local barkOutline = rgba(76, 52, 68, 225)
  local barkDark    = rgba(102, 72, 90)
  local barkMid     = rgba(132, 98, 116)
  local barkLight   = rgba(164, 130, 148)

  local palBlush = SAKURA_PALETTES[1]
  local palLilac = SAKURA_PALETTES[2]
  local palPeach = SAKURA_PALETTES[3]
  local palPearl = SAKURA_PALETTES[4]

  for step = 0, 5 do
    spr.frames[step + 1].duration = 0.18
    local img = Image(144, 104, ColorMode.RGB)

    local sway = math.sin((step / 6.0) * math.pi * 2) * 2.2
    local swayY = math.cos((step / 6.0) * math.pi * 2) * 1.4

    -- Soft pastel sakura cloud puffs behind twigs
    local bgClusters = {
      { 26, 22, 11 }, { 52, 28, 12 }, { 78, 34 + swayY * 0.5, 11 },
      { 104 + sway * 0.6, 42 + swayY * 0.7, 10 }, { 36, 52, 10 },
      { 68 + sway * 0.4, 58 + swayY * 0.5, 9 }
    }
    for _, cl in ipairs(bgClusters) do
      fillCircle(img, cl[1], cl[2], cl[3], rgba(246, 198, 218, 200))
      fillCircle(img, cl[1] - 2, cl[2] - 2, cl[3] * 0.75, rgba(255, 232, 242, 225))
    end

    drawPixelLeaf(img, 18, 34, 1.15, 11)
    drawPixelLeaf(img, 46, 14, 0.35, 12)
    drawPixelLeaf(img, 64, 44 + swayY * 0.4, 1.35, 11)
    drawPixelLeaf(img, 92 + sway * 0.5, 24 + swayY * 0.5, 0.25, 11)
    drawPixelLeaf(img, 116 + sway * 0.8, 48 + swayY * 0.8, 0.85, 10)
    drawPixelLeaf(img, 32, 66 + swayY * 0.4, 1.65, 10)

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
      drawLine(img, a[1], a[2], b[1], b[2], barkOutline, a[3] + 0.9)
      drawLine(img, a[1], a[2], b[1], b[2], barkDark, a[3])
      drawLine(img, a[1], a[2] - 1, b[1], b[2] - 1, barkMid, math.max(0.8, a[3] - 1.2))
      drawLine(img, a[1], a[2] - 2, b[1], b[2] - 2, barkLight, math.max(0, a[3] - 2.3))
    end

    drawLine(img, 24, 16, 36, 46, barkDark, 2.0)
    drawLine(img, 36, 46, 44 + sway * 0.4, 72 + swayY * 0.6, barkDark, 1.2)
    drawLine(img, 24, 15, 36, 45, barkMid, 1.0)

    drawLine(img, 58, 28, 72 + sway * 0.3, 56 + swayY * 0.5, barkDark, 1.7)
    drawLine(img, 72 + sway * 0.3, 56 + swayY * 0.5, 86 + sway * 0.6, 76 + swayY * 0.8, barkDark, 1.0)
    drawLine(img, 68, 30, 96 + sway * 0.5, 20 + swayY * 0.4, barkDark, 1.3)

    local blossoms = {
      {  8, 11, 9.2, 0.7, palLilac },
      { 18, 22, 9.8, 0.2, palBlush },
      { 36, 15, 8.8, 0.9, palPearl },
      { 28, 35, 8.5, 0.5, palBlush },
      { 54, 29, 10.4, 0.4, palBlush },
      { 65, 20, 8.6, 1.1, palLilac },
      { 37, 50, 9.2, 1.1, palPeach },
      { 44 + sway * 0.4, 72 + swayY * 0.6, 8.4, 0.6, palBlush },
      { 77 + sway * 0.3, 35 + swayY * 0.4, 9.8, 0.1, palLilac },
      { 72 + sway * 0.3, 58 + swayY * 0.5, 8.8, 0.8, palBlush },
      { 96 + sway * 0.5, 20 + swayY * 0.4, 8.4, 0.5, palPearl },
      { 104 + sway * 0.6, 42 + swayY * 0.7, 9.6, 1.0, palBlush },
      { 115 + sway * 0.75, 34 + swayY * 0.8, 7.8, 0.2, palPeach },
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

    drawTinyBud(img, 133 + sway, 51 + swayY, palLilac)
    drawTinyBud(img, 106 + sway * 0.5, 17 + swayY * 0.4, palBlush)
    drawTinyBud(img, 48 + sway * 0.4, 83 + swayY * 0.7, palBlush)
    drawTinyBud(img, 93 + sway * 0.7, 84 + swayY * 0.9, palPeach)

    spr:newCel(spr.layers[1], spr.frames[step + 1], img)
  end

  local tag = spr:newTag(1, 6)
  tag.name = "breeze_sway"

  spr:saveAs(OUT_ASE .. "sakura_branch.ase")
  spr:close()
end

-- ============================================================================
-- 4. PASTEL & WHITE ONYX BUTTERFLIES (48x48, 4 variants x 8 frames = 32 frames)
--    Inspired by the "Flames to Flight / White Onyx Ignites" butterflies!
-- ============================================================================
local BUTTERFLY_PALETTES = {
  { -- 1. White Onyx & Pastel Lavender Swallowtail
    name    = "onyx_lavender",
    inner   = rgba(255, 255, 255),
    mid     = rgba(235, 226, 255),
    outer   = rgba(196, 178, 242),
    rim     = rgba(114, 92, 178),
    outline = rgba(76, 56, 134, 225),
    spot    = rgba(255, 255, 255),
    body    = rgba(72, 52, 122),
  },
  { -- 2. Pastel Sakura Blush Butterfly
    name    = "pastel_rose",
    inner   = rgba(255, 248, 251),
    mid     = rgba(255, 214, 230),
    outer   = rgba(246, 172, 202),
    rim     = rgba(196, 114, 148),
    outline = rgba(142, 74, 104, 220),
    spot    = rgba(255, 250, 252),
    body    = rgba(118, 62, 88),
  },
  { -- 3. Pastel Sky-Periwinkle Morpho
    name    = "pastel_sky",
    inner   = rgba(248, 252, 255),
    mid     = rgba(212, 230, 255),
    outer   = rgba(174, 204, 250),
    rim     = rgba(122, 146, 214),
    outline = rgba(84, 102, 168, 220),
    spot    = rgba(255, 255, 255),
    body    = rgba(76, 88, 142),
  },
  { -- 4. Pastel Peach-Buttercream Swallowtail
    name    = "pastel_apricot",
    inner   = rgba(255, 253, 244),
    mid     = rgba(255, 232, 196),
    outer   = rgba(252, 196, 162),
    rim     = rgba(206, 132, 116),
    outline = rgba(154, 88, 82, 220),
    spot    = rgba(255, 252, 242),
    body    = rgba(126, 72, 68),
  }
}

-- Draw one butterfly wing pair (forewing + swallowtail hindwing) on a 48x48 sub-image
-- `wingLift`: vertical Y scale/projection (-0.85 down-cup to +1.0 high dorsal clap)
-- `wingSpan`: horizontal X reach (0.35 closed upright to 1.0 wide open)
local function drawButterflyWingSet(pal, wingSpan, wingLift, isFarWing)
  local wImg = Image(48, 48, ColorMode.RGB)
  -- Thorax anchor at (25, 26), body tilted at -32 degrees (head toward top-right)
  local ax, ay = 25.0, 26.0

  -- Wing local basis vectors:
  -- uVec points outward-up-left from body spine; vVec points forward along body spine
  local flapAngle = -1.95 + (1.0 - wingLift) * 0.95 + (isFarWing and 0.24 or 0.0)
  local ux = math.cos(flapAngle) * (isFarWing and wingSpan * 0.82 or wingSpan)
  local uy = math.sin(flapAngle)
  -- Forward axis along body (toward head at top-right)
  local vx, vy = 0.78, -0.62

  local det = ux * vy - uy * vx
  if math.abs(det) < 0.08 then
    return wImg
  end

  for py = 2, 45 do
    for px = 2, 45 do
      local dx = px - ax
      local dy = py - ay
      -- Solve dx = u * ux + v * vx, dy = u * uy + v * vy
      local u = (dx * vy - dy * vx) / det -- outward distance from body (0..18)
      local v = (ux * dy - uy * dx) / det -- along-body (-14 tail .. +14 head)

      if u >= 0.0 and u <= 19.5 then
        local inForewing = false
        local inHindwing = false
        local normDist = 0.0

        -- 1. Sweeping Forewing lobe (reaches outward & forward toward head/apex)
        local fwCenterV = 2.5 + u * 0.36
        local fwHalfV = 6.8 * math.sin(math.min(1.0, u / 17.5) * math.pi * 0.86) + 1.4
        if u <= 17.5 and math.abs(v - fwCenterV) <= fwHalfV then
          inForewing = true
          normDist = math.max(u / 17.5, math.abs(v - fwCenterV) / (fwHalfV + 0.5))
        end

        -- 2. Rounded Hindwing lobe + delicate swallowtail projection
        local hwCenterV = -4.2 - u * 0.22
        local hwHalfV = 5.4 * math.sin(math.min(1.0, u / 13.5) * math.pi * 0.88) + 1.2
        if u <= 13.5 and math.abs(v - hwCenterV) <= hwHalfV then
          inHindwing = true
          local hd = u / 13.5
          if not inForewing or hd < normDist then
            normDist = hd
          end
        end

        -- Petite swallowtail tip at outer hindwing corner
        if u >= 11.0 and u <= 15.8 and math.abs(v - (-7.2 - (u - 11.0) * 0.35)) <= 1.25 then
          inHindwing = true
          normDist = 0.92
        end

        if inForewing or inHindwing then
          local dither = ((px + py) % 2 == 0) and 0.04 or -0.04
          local d = normDist + dither

          local col
          if isFarWing then
            col = (d < 0.62) and pal.mid or pal.outer
          else
            if d < 0.36 then
              col = pal.inner
            elseif d < 0.68 then
              col = pal.mid
            elseif d < 0.86 then
              col = pal.outer
            else
              col = pal.rim
            end

            -- Delicate pearl marginal dots near forewing tip!
            if inForewing and u > 12.2 and u < 15.2 then
              if math.abs(v - (fwCenterV + 2.2)) < 1.0 or math.abs(v - (fwCenterV - 1.6)) < 0.95 then
                col = pal.spot
              end
            end
          end

          putPx(wImg, px, py, col)
        end
      end
    end
  end

  applyOutline(wImg, pal.outline)
  return wImg
end

local function compositeImg(dst, src)
  for y = 0, src.height - 1 do
    for x = 0, src.width - 1 do
      local c = src:getPixel(x, y)
      if app.pixelColor.rgbaA(c) > 0 then
        putPx(dst, x, y, c)
      end
    end
  end
end

do
  local totalFrames = #BUTTERFLY_PALETTES * 8
  local spr = Sprite(48, 48, ColorMode.RGB)
  for f = 2, totalFrames do spr:newEmptyFrame() end

  -- 8-frame butterfly wing-flutter + brief glide cycle:
  -- { wingSpan, wingLift, bobY }
  local FLUTTER_POSES = {
    { 0.95,  0.72,  0 }, -- 0: Wide graceful open V
    { 0.68,  0.92,  1 }, -- 1: Folding upward
    { 0.42,  1.05,  1 }, -- 2: Upright dorsal clap (wings together overhead!)
    { 0.76,  0.80,  0 }, -- 3: Snapping open
    { 1.00,  0.42, -1 }, -- 4: Full glorious spread
    { 0.88, -0.35, -2 }, -- 5: Sweeping low downstroke (body lifts!)
    { 0.94,  0.55, -1 }, -- 6: Soaring open glide 1
    { 0.98,  0.64,  0 }, -- 7: Soaring open glide 2
  }

  local frameIdx = 1
  for _, pal in ipairs(BUTTERFLY_PALETTES) do
    local startF = frameIdx
    for step = 1, 8 do
      local pose = FLUTTER_POSES[step]
      spr.frames[frameIdx].duration = (step >= 7) and 0.14 or 0.08
      local img = Image(48, 48, ColorMode.RGB)
      local bob = pose[3]

      -- 1. Far Wing Pair (behind body)
      local farWing = drawButterflyWingSet(pal, pose[1], pose[2], true)
      for y = 0, 47 do
        for x = 0, 47 do
          local c = farWing:getPixel(x, y)
          if app.pixelColor.rgbaA(c) > 0 then
            putPx(img, x + 2, y + bob - 1, c)
          end
        end
      end

      -- 2. Slender Segmented Butterfly Body (Thorax, Abdomen, Head & Curled Antennae)
      drawLine(img, 19, 31 + bob, 31, 21 + bob, pal.body, 1.3)
      fillCircle(img, 32, 20 + bob, 1.8, pal.body)
      -- Tiny white eye sparkle
      putPx(img, 33, 19 + bob, pal.spot)
      -- Two delicate curled antennae reaching forward
      drawLine(img, 33, 19 + bob, 37, 13 + bob, pal.outline, 0)
      drawLine(img, 33, 20 + bob, 39, 17 + bob, pal.outline, 0)
      putPx(img, 38, 13 + bob, pal.body)
      putPx(img, 40, 17 + bob, pal.body)

      -- 3. Foreground Near Wing Pair
      local nearWing = drawButterflyWingSet(pal, pose[1], pose[2], false)
      for y = 0, 47 do
        for x = 0, 47 do
          local c = nearWing:getPixel(x, y)
          if app.pixelColor.rgbaA(c) > 0 then
            putPx(img, x, y + bob, c)
          end
        end
      end

      spr:newCel(spr.layers[1], spr.frames[frameIdx], img)
      frameIdx = frameIdx + 1
    end
    local tag = spr:newTag(startF, frameIdx - 1)
    tag.name = pal.name
  end

  spr:saveAs(OUT_ASE .. "butterflies.ase")
  spr:close()
end

print("All Pastel Sakura & Butterfly Aseprite sprites generated!")
