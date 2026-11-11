#!/usr/bin/env bash
# Regenerates the TTF mirrors used by the image generators.
#
# Why: resvg (the rasteriser behind every OG card and the palette card) reads
# TTF/OTF only. Pointing it at the site's woff2 files fails silently and
# renders the fallback system sans — which is exactly what shipped before
# this was caught. The site keeps shipping woff2; these are build-time only.
#
# One-time setup:  pip install fonttools brotli
set -euo pipefail
cd "$(dirname "$0")/../../"

python3 - <<'PY'
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

# Variable fonts default to their heaviest instance in resvg (Fraunces' default
# wght is 900), so the faces below are instanced at the weights the site uses.
JOBS = [
    ("fraunces-latin-wght-normal.woff2", "fraunces-500.ttf", {"wght": 500}),
    ("fraunces-latin-wght-italic.woff2", "fraunces-italic-400.ttf", {"wght": 400}),
    ("inter-latin-wght-normal.woff2", "inter-400.ttf", {"wght": 400}),
    ("inter-latin-wght-normal.woff2", "inter-600.ttf", {"wght": 600}),
    ("montserrat-latin-800-normal.woff2", "montserrat-latin-800-normal.ttf", None),
]

for src, out, axes in JOBS:
    font = TTFont(f"src/fonts/{src}")
    font.flavor = None
    if axes:
        font = instantiateVariableFont(font, axes)
    font.save(f"scripts/fonts/{out}")
    print(f"✓ scripts/fonts/{out}")
PY
