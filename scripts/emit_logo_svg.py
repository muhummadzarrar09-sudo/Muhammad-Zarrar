"""Emit the production vector logo from logo_geom.SPEC -> public/images/logo-mark.svg"""
import math
import sys

sys.path.insert(0, __file__.rsplit("/", 1)[0])
from logo_geom import SPEC, ORDER, COPPER_HI

GRAD_ON = {"z_copper", "s_sliver", "s_bowl_copper", "s_spine_sheen"}
# the S family flows — rendered as smooth Catmull-Rom curves, not mitred polylines
CURVE_ON = {"s_ribbon", "s_bowl_copper", "s_cross_under", "s_bowl_copper_under", "s_spine_sheen", "s_spine_sheen_under"}


def smooth_path(pts):
    """Catmull-Rom -> cubic beziers for a flowing ribbon centerline."""
    p = [pts[0]] + list(pts) + [pts[-1]]
    d = f"M {pts[0][0]} {pts[0][1]}"
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += (
            f" C {c1[0]:.1f} {c1[1]:.1f}, {c2[0]:.1f} {c2[1]:.1f}, "
            f"{p2[0]} {p2[1]}"
        )
    return d


def arc_path(cx, cy, r, a0, a1):
    p0 = (cx + r * math.cos(math.radians(a0)), cy + r * math.sin(math.radians(a0)))
    p1 = (cx + r * math.cos(math.radians(a1)), cy + r * math.sin(math.radians(a1)))
    large = 1 if (a1 - a0) > 180 else 0
    return (
        f"M {p0[0]:.1f} {p0[1]:.1f} A {r} {r} 0 {large} 1 {p1[0]:.1f} {p1[1]:.1f}"
    )


def line_path(pts):
    return "M " + " L ".join(f"{x} {y}" for x, y in pts)


def emit(out_path, pad=0, bg=None):
    parts = []
    for key in ORDER:
        item = SPEC[key]
        kind = item[0]
        stroke = "url(#cu)" if key in GRAD_ON else item[-1]
        if kind == "poly":
            _, geom, color = item
            pts = " ".join(f"{x},{y}" for x, y in geom)
            parts.append(f'<polygon points="{pts}" fill="{color}"/>')
        elif kind == "arc":
            _, (cx, cy, r, a0, a1), w, _ = item
            d = arc_path(cx, cy, r, a0, a1)
            parts.append(
                f'<path d="{d}" fill="none" stroke="{stroke}" stroke-width="{w}"/>'
            )
        else:
            _, geom, w, _ = item
            if key in CURVE_ON:
                d = smooth_path(geom)
                parts.append(
                    f'<path d="{d}" fill="none" stroke="{stroke}" stroke-width="{w}" '
                    f'stroke-linejoin="round" stroke-linecap="round"/>'
                )
            else:
                d = line_path(geom)
                parts.append(
                    f'<path d="{d}" fill="none" stroke="{stroke}" stroke-width="{w}" '
                    f'stroke-linejoin="miter" stroke-linecap="butt"/>'
                )

    vb = f"{140 - pad} {140 - pad} {240 + 2 * pad} {240 + 2 * pad}"
    rect = (
        f'<rect x="{140 - pad}" y="{140 - pad}" width="{240 + 2 * pad}" '
        f'height="{240 + 2 * pad}" fill="{bg}"/>'
        if bg
        else ""
    )
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="Zarrar.Solutions monogram">
  <defs>
    <linearGradient id="cu" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{COPPER_HI}"/>
      <stop offset=".55" stop-color="#d97b3f"/>
      <stop offset="1" stop-color="#a34a24"/>
    </linearGradient>
  </defs>
  {rect}
  {chr(10).join('  ' + p for p in parts)}
</svg>
'''
    with open(out_path, "w") as f:
        f.write(svg)
    print("wrote", out_path, len(svg), "bytes")


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "public/images/logo-mark.svg"
    pad = int(sys.argv[2]) if len(sys.argv) > 2 else 0
    bg = sys.argv[3] if len(sys.argv) > 3 else None
    emit(out, pad, bg)
