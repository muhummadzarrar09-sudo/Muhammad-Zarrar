"""Single source of truth for the ZS monogram geometry.

Used twice:
  1. preview_logo.py  -> renders a PIL raster so we can iterate visually
  2. emit_logo_svg.py -> emits the production SVG (strokes/gradients)

Coordinates live on a 500x500 canvas matching the original artwork.
"""

# palette sampled from the clay logo
RUST = "#b3573a"
RUST_DEEP = "#9c4526"
MAROON = "#611a0c"
COPPER_MID = "#d97b3f"
COPPER_HI = "#ef9d5c"
CREAM = "#f2e2c4"
BLACK = "#0a0403"

# ---- Z as a sharp filled polygon (top bar, diagonal, bottom bar)
Z_POLY = [
    (150, 150),
    (300, 150),
    (208, 300),
    (250, 300),
    (250, 346),
    (150, 346),
    (150, 330),
    (256, 196),
    (150, 196),
]

# ---- strokes: list points -> polyline; tuple of 5 -> arc (cx, cy, r, a0, a1)
Z_PIN = [(168, 190), (262, 190), (168, 302)]                       # cream pinline
Z_PIN_BOTTOM = [(168, 332), (230, 332)]                            # cream on bottom bar
Z_COPPER = [(281, 200), (188, 324)]                                # copper band on diagonal
Z_MAROON = [(295, 207), (202, 331)]                                # dark edge on diagonal

S_ARC_CREAM = (317, 206, 49, -80, 25)
S_ARC_COPPER = (317, 206, 38, -80, 30)
S_ARC_RUST = (317, 206, 26, -78, 35)
S_SLIVER = [(309, 158), (323, 212)]                                # copper diagonal sliver

# S spine crossing the Z diagonal, then sweeping into the bottom bowl
S_RIBBON = [
    (323, 212),
    (306, 238),
    (277, 254),
    (254, 270),
    (243, 292),
    (248, 316),
    (274, 336),
    (308, 340),
    (336, 327),
    (348, 300),
    (341, 276),
    (318, 265),
]
# black separation under the crossing part of the ribbon
S_CROSS_UNDER = [(323, 212), (306, 238), (277, 254)]

# inner copper band on the bowl
S_BOWL_COPPER = [
    (246, 300),
    (252, 320),
    (278, 337),
    (308, 339),
    (331, 327),
    (340, 303),
    (334, 283),
]

# maroon outer rim hugging the bowl's right/bottom outside edge
S_RIM = (297, 299, 52, -30, 112)

# cream crescent terminal inside the bowl bottom
S_TERM = (294, 308, 27, 30, 150)

# copper sheen along the spine's inner (top-left) edge
S_SPINE_SHEEN = [(316, 224), (300, 247), (277, 261), (258, 272)]

# cream stub cap where the bowl begins
S_STUB = [(242, 290), (247, 303)]

SPEC = {
    "z_poly": ("poly", Z_POLY, RUST),
    "z_pin": ("line", Z_PIN, 7, CREAM),
    "z_pin_bottom": ("line", Z_PIN_BOTTOM, 6, CREAM),
    "z_copper_under": ("line", Z_COPPER, 19, BLACK),
    "z_copper": ("line", Z_COPPER, 12, COPPER_MID),
    "z_maroon_under": ("line", Z_MAROON, 13, BLACK),
    "z_maroon": ("line", Z_MAROON, 7, MAROON),
    "s_cross_under": ("line", S_CROSS_UNDER, 38, BLACK),
    "s_ribbon": ("line", S_RIBBON, 29, RUST),
    "s_bowl_copper_under": ("line", S_BOWL_COPPER, 25, BLACK),
    "s_bowl_copper": ("line", S_BOWL_COPPER, 17, COPPER_MID),
    "s_rim_under": ("arc", S_RIM, 14, BLACK),
    "s_rim": ("arc", S_RIM, 8, MAROON),
    "s_spine_sheen_under": ("line", S_SPINE_SHEEN, 13, BLACK),
    "s_spine_sheen": ("line", S_SPINE_SHEEN, 7, COPPER_MID),
    "s_stub": ("line", S_STUB, 8, CREAM),
    "s_term_under": ("arc", S_TERM, 14, BLACK),
    "s_term": ("arc", S_TERM, 9, CREAM),
    "s_sliver_under": ("line", S_SLIVER, 16, BLACK),
    "s_sliver": ("line", S_SLIVER, 9, COPPER_MID),
    "s_arc_cream": ("arc", S_ARC_CREAM, 10, CREAM),
    "s_arc_copper": ("arc", S_ARC_COPPER, 11, COPPER_MID),
    "s_arc_rust": ("arc", S_ARC_RUST, 12, RUST),
}

# draw order (painter's algorithm)
ORDER = [
    "z_poly",
    "z_pin",
    "z_pin_bottom",
    "z_copper_under",
    "z_copper",
    "z_maroon_under",
    "z_maroon",
    "s_cross_under",
    "s_ribbon",
    "s_rim_under",
    "s_rim",
    "s_spine_sheen_under",
    "s_spine_sheen",
    "s_bowl_copper_under",
    "s_bowl_copper",
    "s_stub",
    "s_term_under",
    "s_term",
    "s_sliver_under",
    "s_sliver",
    "s_arc_cream",
    "s_arc_copper",
    "s_arc_rust",
]
