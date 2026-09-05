# Logo Replacement Guide — where the real logo plugs in

## Status

The mark shipping today (`public/images/logo-mark.svg`) is an **observational
rebuild** of the clay ZS logo, drawn against the reference artwork the client
supplied in chat.

> **RESOLVED 2026-09-05:** after four failed chat-attachment attempts, the
> original was landed via GitHub web upload as **`public/images/source-logo.png`**
> (500×500, black ground). The rebuild above remains the small-size vector
> cut; the pixel original is now the reference master.

### Transparent cut (social / anywhere use)

`public/images/logo-mark-transparent-1024.png` — the vector rebuild rendered
to 1024×1024 on **true transparency** (no ground). Verified legible on putty,
black and white (`/home/user/social/zs-proof-3-grounds.png` in the session
workspace). Regenerate at any size:

```bash
node scripts/render_svg.mjs public/images/logo-mark.svg out.png 2048
```

The fourth chat attachment attempt (2026-09-05) also failed to land bytes.
To get a pixel-perfect trace of the original black-ground artwork, land the
file at `public/images/source-logo.png` — the most reliable route is to drag
it into the repo through GitHub's web UI and commit it, which bypasses the
chat attachment path entirely. Then run the swap procedure at the bottom of
file and every surface regenerates.

## The two-mark problem — resolved

There used to be **two different logos** shipping as one brand:

| Where | What it drew |
| --- | --- |
| `src/components/logo.tsx` (header + footer) | A rounded-rect aura tile, `rx=9`, flat Z, accent dot |
| `public/images/logo-mark.svg` (`/about`, `404`) | The clay ZS monogram |

They shared no geometry, no corner language and no colour treatment. The
header mark's `rx=9` also contradicted the 2px radius system, and its accent
dot sat at 2.80:1 against its own tile — under the 3:1 minimum.

`logo.tsx` now draws the **same ZS mark**, so there is one brand across every
touchpoint.

## Two variants, one mark

The mark ships in two cuts. This is deliberate, not duplication.

| File | Use | Why |
| --- | --- | --- |
| `public/images/logo-mark.svg` | **≥64px** — `/about`, `404`, PWA icons, apple-icon, OG | Full detail: cream inline, maroon drop shade, dark keyline, copper gradient |
| `public/images/logo-mark-small.svg` | **<64px** — favicon, header, footer | Two flat colours, no inline, no shade, no keyline |

The reason is measured, not aesthetic: rendered at 32px, the full mark's
pinstripes and keyline blur into a single brown mass and the letterforms stop
reading. The small variant keeps the identical skeleton and proportions and
drops only what cannot survive the pixel grid.

`src/components/logo.tsx` inlines the small variant rather than fetching the
`.svg`, so the header costs no extra request.

## Plug-in points

| File | Role | Variant |
| --- | --- | --- |
| `public/images/logo-mark.svg` | Canonical vector | full |
| `public/images/logo-mark-small.svg` | Small-size cut | small |
| `public/favicon.svg` | Copy of the canonical vector | full |
| `src/app/icon.svg` | Next.js file-convention favicon (`/icon.svg`) | full |
| `src/app/apple-icon.png` | Apple touch icon, 180px | full |
| `public/favicon.ico` | Legacy favicon, 32 + 48 multi-size ICO | **small** |
| `public/icons/icon-192.png` | PWA manifest icon | full |
| `public/icons/icon-512.png` | PWA manifest icon | full |
| `public/icons/icon-maskable-512.png` | PWA maskable, safe-zone padded | full |
| `src/app/layout.tsx` (~line 71) | Organization schema `logo:` → `/icons/icon-192.png` | — |
| `src/app/about/page.tsx` (~line 91) | On-page placement #1 (until `public/images/portrait.jpg` exists) | full |
| `src/app/not-found.tsx` (~line 12) | On-page placement #2 — the 404 mark, 88px | full |
| `src/components/logo.tsx` | Header + footer lockup, 34/36px | small, inlined |

The **full** mark appears on-page exactly twice by design (about + 404). Keep
it that way — the wordmark plus the small mark own the header and footer.

## Regenerating the rasters

Every raster derives from the canonical vector. After any change to
`logo-mark.svg`:

```bash
node scripts/build-logo-assets.mjs   # svg copies + all PNGs
python3 -c "
from PIL import Image
Image.open('/tmp/fav48.png').save('public/favicon.ico', sizes=[(32,32),(48,48)])"
npm run build
```

`scripts/build-logo-assets.mjs` owns the padding values (icons 24, maskable
62, ICO 8) and the `#2A0001` ground, so they no longer live in a comment.

> **Note:** the ICO should be built from `logo-mark-small.svg`, not the
> canonical vector — see the variants section above.

## If the source PNG ever lands

Drop it at `public/images/source-logo.png`, then:

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

# 2. vectorize (pip install vtracer)
python3 -c "
import vtracer
vtracer.convert_image_to_svg_py('/tmp/logo-transparent.png',
    'public/images/logo-mark.svg',
    {'filter_speckle': 8, 'color_precision': 6, 'path_precision': 6})"

# 3. regenerate every raster
node scripts/build-logo-assets.mjs
```

Then redraw `logo-mark-small.svg` to match the traced geometry — it is a
hand-simplified cut and does not regenerate automatically. Check it at 32px
before committing.

## Notes

- Palette (also the brand tokens): rust `#b3573a`, copper
  `#d97b3f → #ef9d5c`, cream `#f2e2c4`, maroon `#611a0c`, eclipse ground
  `#2A0001`. These map to `--ember-*` and `--ground-*` in `globals.css`.
- `scripts/generate-assets.mjs` owns only the OG images. It now composites
  the canonical monogram (`public/images/logo-mark.svg`, rendered via
  resvg) instead of the old geometric glyph — do not use it for icons.
- `scripts/logo_geom.py` / `scripts/emit_logo_svg.py` generated the *previous*
  parametric rebuild, which has been replaced. They are superseded by the
  hand-authored SVG and are kept only for reference.
