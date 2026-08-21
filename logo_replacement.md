# Logo Replacement Guide — where the real logo plugs in

The monogram shipped on the site (`public/images/logo-mark.svg`) is a **vector
rebuild** of the clay ZS logo, produced because the original PNG never landed
in the workspace (chat-attachment glitch — the file bytes were never delivered
to the sandbox). It is parametric: `scripts/logo_geom.py` →
`scripts/emit_logo_svg.py`.

When the **real artwork** is ready, drop the original PNG at:

```
public/images/source-logo.png
```

(e.g. drag it into the repo on GitHub's web UI, or commit it locally.)
Then run the swap below — every surface regenerates from that one file.

## Plug-in points (what reads the logo today)

| File | Role |
| --- | --- |
| `public/images/logo-mark.svg` | Canonical vector. Used on-page and as `public/favicon.svg` |
| `src/app/icon.svg` | Next.js file-convention favicon (served as `/icon.svg`) |
| `src/app/apple-icon.png` | Apple touch icon (180px raster) |
| `public/favicon.ico` | Legacy favicon (32 + 48 px, multi-size ICO) |
| `public/icons/icon-192.png` | PWA manifest icon — `src/app/manifest.ts` |
| `public/icons/icon-512.png` | PWA manifest icon — `src/app/manifest.ts` |
| `public/icons/icon-maskable-512.png` | PWA maskable icon (safe-zone padded) |
| `src/app/layout.tsx` (~line 71) | Organization schema `logo:` → `/icons/icon-192.png` |
| `src/app/about/page.tsx` (~line 91) | On-page placement #1 — monogram card (until `public/images/portrait.jpg` exists) |
| `src/app/not-found.tsx` (~line 12) | On-page placement #2 — the 404 mark |

The logo appears **exactly twice on-page** by design (about + 404). Keep it
that way when swapping — don't sprinkle it into the header/footer; the
wordmark owns those.

## Swap procedure (pixel-perfect trace)

```bash
# 1. background removal (black ground -> alpha, keeps maroon shadows)
python3 - <<'EOF'
from PIL import Image
src = Image.open("public/images/source-logo.png").convert("RGBA")
w, h = src.size
px = src.load()
out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
op = out.load()
for y in range(h):
    for x in range(w):
        r, g, b, _ = px[x, y]
        m = max(r, g, b); redness = r - b
        if m <= 22 and redness <= 12: continue
        if m < 70 and redness <= 20:
            a = int(255 * (m - 22) / 48)
            if a <= 0: continue
            op[x, y] = (r, g, b, min(255, a))
        else:
            op[x, y] = (r, g, b, 255)
out.save("/tmp/logo-transparent.png")
EOF

# 2. vectorize (pip install vtracer pillow)
python3 -c "
import vtracer
vtracer.convert_image_to_svg_py('/tmp/logo-transparent.png',
    'public/images/logo-mark.svg',
    {'filter_speckle': 8, 'color_precision': 6, 'path_precision': 6})"

# 3. regenerate every raster from the new SVG
node scripts/render_svg.mjs public/images/logo-mark.svg /tmp/icon-padded.svg-wrap 1 # (see below)
```

For step 3, regenerate the rasters exactly like the current set was built —
wrap the traced SVG on the eclipse ground with padding, then rasterize:

```bash
# padded variants (pad values used today: icons 24, maskable 62, ico 8)
#   <svg viewBox="..."><rect fill="#2A0001"/>…traced paths…</svg>
node scripts/render_svg.mjs <padded-24.svg>  public/icons/icon-512.png 512
node scripts/render_svg.mjs <padded-24.svg>  public/icons/icon-192.png 192
node scripts/render_svg.mjs <padded-62.svg>  public/icons/icon-maskable-512.png 512
node scripts/render_svg.mjs <padded-24.svg>  src/app/apple-icon.png 180
node scripts/render_svg.mjs <padded-8.svg>   /tmp/fav32.png 32
node scripts/render_svg.mjs <padded-8.svg>   /tmp/fav48.png 48
python3 -c "
from PIL import Image
a = Image.open('/tmp/fav32.png'); b = Image.open('/tmp/fav48.png')
b.save('public/favicon.ico', sizes=[(32,32),(48,48)])"
cp public/images/logo-mark.svg public/favicon.svg
cp public/images/logo-mark.svg src/app/icon.svg
```

Then `npm run build`, eyeball `/about` and any 404, commit, done.

## Notes

- `scripts/generate-assets.mjs` still contains the **old geometric glyph**
  icon generator (pre-monogram). It now only owns the OG images; do not use it
  to regenerate icons — the monogram pipeline above supersedes it.
- Palette of the rebuild (also the brand tokens): rust `#b3573a`, copper
  `#d97b3f → #ef9d5c`, cream `#f2e2c4`, maroon `#611a0c`, eclipse ground
  `#2A0001`.
- The rebuild's geometry lives in `scripts/logo_geom.py`; tweak + rerun
  `scripts/emit_logo_svg.py` to adjust the vector without the source PNG.
