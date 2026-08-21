import sys

from PIL import Image, ImageDraw

sys.path.insert(0, __file__.rsplit("/", 1)[0])
from logo_geom import SPEC, ORDER

SIZE = 500

ARCS = ("s_arc_cream", "s_arc_copper", "s_arc_rust", "s_term")


def draw_spec(path_out, bg="#050505", size=SIZE):
    img = Image.new("RGB", (size, size), bg)
    d = ImageDraw.Draw(img)
    scale = size / SIZE

    for key in ORDER:
        item = SPEC[key]
        if item[0] == "poly":
            _, geom, color = item
            xy = [(x * scale, y * scale) for x, y in geom]
            d.polygon(xy, fill=color)
        elif item[0] == "arc":
            _, (cx, cy, r, a0, a1), w, color = item
            w = int(round(w * scale))
            bbox = [(cx - r) * scale, (cy - r) * scale, (cx + r) * scale, (cy + r) * scale]
            d.arc(bbox, a0, a1, fill=color, width=w)
        else:
            _, geom, w, color = item
            w = int(round(w * scale))
            xy = [(x * scale, y * scale) for x, y in geom]
            d.line(xy, fill=color, width=w, joint="curve")
    img.save(path_out)
    print("saved", path_out)


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "/tmp/logo_preview.png"
    bg = sys.argv[2] if len(sys.argv) > 2 else "#050505"
    draw_spec(out, bg)
