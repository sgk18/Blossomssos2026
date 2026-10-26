# Blossoms SOS — Aseprite Pixel-Art System & Pipeline Specification

## 1. Creative Direction & Philosophy

Pixel art is an intentional, handcrafted signature of the new Blossoms School of Sciences website. 

### Core Tenets
- **Minimal, Restrained Accents**: Sprites are charming rewards for curiosity and subtle identity markers—never overwhelming arcade clutter.
- **Strict Brand Palette**: Every sprite is drawn using the official 5-color palette as the primary palette, with only three approved supporting shades:
  - `Sunset Orange`: `#F36B2E` (Primary warm accent)
  - `Mango`: `#F59A1E` (Secondary warm highlight)
  - `Ocean Water`: `#C4E7E5` (Luminous cool accent / foliage)
  - `Brilliant Blue`: `#253C96` (Deep structural shadow)
  - `Oiler Navy`: `#19244E` (Outlines and deep contrast)
  - *Supporting Shades*: `#FFFFFF` (Pure specular highlight), `#141D3F` (Deep boundary shadow), `#E05A1D` (Shaded terracotta).
- **Consistent Pixel Density**: No mixed pixel resolutions ("mixels"). All sprites in a given category share identical grid density.
- **Crisp Edges**: Rendered in the browser with `image-rendering: pixelated; image-rendering: crisp-edges;`.

---

## 2. Sprite Motif Master Catalog

| Category | Sprite Name | Canvas Dimensions | Type | Idle Frames | Reaction Frames | Motif & Symbolism |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Flora (General)** | `flower-blossom` | 24 × 24 px | Interactive | 4 frames | 6 frames (Bloom) | Seedling that blooms upon user interaction |
| **Fauna (General)** | `butterfly` | 24 × 24 px | Ambient | 4 frames | 4 frames | Delicate pollinator crossing section boundaries |
| **Art** | `brush-palette` | 32 × 32 px | Badge / Decor | 4 frames | 6 frames | Paintbrush creating a splash of Sunset Orange |
| **Literary** | `quill-book` | 32 × 32 px | Badge / Decor | 4 frames | 4 frames | Open parchment with fluttering quill |
| **Music** | `acoustic-note` | 32 × 32 px | Badge / Decor | 4 frames | 6 frames | Clef with rhythmic audio ripple |
| **Theatre** | `theatre-mask` | 32 × 32 px | Badge / Decor | 4 frames | 6 frames | Tragedy/Comedy twin masks with expressive eyes |
| **Dance** | `dancer-motion` | 48 × 48 px | Character | 8 frames | 8 frames | Classical dancer holding mudra gesture |
| **Science & AI** | `spark-circuit` | 24 × 24 px | Accent | 4 frames | 4 frames | Binary pulse uniting nature and science |
| **Achievements** | `trophy-medal` | 32 × 32 px | Badge | 4 frames | — | Shimmering gold/orange laurel trophy |

---

## 3. Asset Specifications & File Conventions

### Directory Layout
```
src/assets/sprites/
├── source/                      # Editable .aseprite original master files
│   ├── flower-blossom.aseprite
│   ├── butterfly.aseprite
│   ├── brush-palette.aseprite
│   ├── quill-book.aseprite
│   ├── acoustic-note.aseprite
│   ├── theatre-mask.aseprite
│   └── dancer-motion.aseprite
├── sheets/                      # Exported horizontal PNG sprite sheets
│   ├── flower-blossom-sheet.png
│   ├── butterfly-sheet.png
│   └── ...
└── meta/                        # Exported JSON frame coordinate data
    ├── flower-blossom.json
    └── ...
```

### Canvas & Frame Conventions
- **Origin & Pivot**: Bottom-center `(width/2, height)` for grounded characters and plants; center-center `(width/2, height/2)` for badges, masks, and flying fauna.
- **Export Format**: Horizontal strip PNG (`--sheet-pack` or `--sheet-type horizontal`).
- **Background**: 100% transparent alpha channel (`RGBA` mode).
- **Color Mode**: Indexed or RGBA strictly locked to the brand palette.

---

## 4. Aseprite CLI Automated Build Pipeline

The development environment has Aseprite installed at:
`C:\projects\aseprite\build\bin\aseprite.exe`

### Automated Export Command (PowerShell)
To batch export `.aseprite` source files into optimized PNG sprite sheets and JSON metadata:

```powershell
$ASEPRITE = "C:\projects\aseprite\build\bin\aseprite.exe"
$SRC_DIR = "src\assets\sprites\source"
$SHEET_DIR = "public\sprites"

Get-ChildItem "$SRC_DIR\*.aseprite" | ForEach-Object {
    $baseName = $_.BaseName
    & $ASEPRITE -b $_.FullName `
        --sheet "$SHEET_DIR\$baseName-sheet.png" `
        --data "$SHEET_DIR\$baseName.json" `
        --format json-array `
        --sheet-type horizontal
    Write-Host "Exported sprite sheet for $baseName"
}
```

---

## 5. Accessibility Contract for Pixel Art

1. **Decorative Exemption**: Background and static decorative sprites are rendered with `aria-hidden="true"`.
2. **Interactive Operability**: Any sprite acting as an Easter egg or button must use `<button>` semantics, support `Enter` and `Space` keyboard keys, and provide a clear 2px focus ring.
3. **Motion Sensitivity**: Under `@media (prefers-reduced-motion: reduce)`, all sprite animation timers are deactivated, locking the sprite immediately to its static resting frame (Frame 0).
4. **Visibility Awareness**: Animations pause automatically via `document.visibilityState` when the user leaves the tab, preventing GPU/CPU battery drain.
