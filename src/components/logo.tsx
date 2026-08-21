/**
 * The ZS monogram — the one brand mark.
 *
 * This used to draw a completely different logo from the one on /about and
 * /404: a rounded-rect aura tile (rx=9, against a 2px radius system) with a
 * flat Z and an accent dot. Two marks shipped as one brand. Resolved — this
 * is now the small-size variant of public/images/logo-mark.svg, sharing its
 * skeleton, proportions and palette.
 *
 * Detail is dropped deliberately: below ~64px the full mark's cream inline,
 * maroon shade and dark keyline collapse into a brown blob. Verified at
 * 32px. Above that size, use the full mark (see .monogram-mark).
 */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="138 127 264 264"
      aria-hidden="true"
      focusable="false"
    >
      {/* Z — solid cream slab */}
      <path
        d="M150,150 H322 V193 L232,314 H322 V357 H150 V314 L240,193 H150 Z"
        fill="#f2e2c4"
      />
      {/* S — copper, knocked out of the Z with a ground-coloured keyline */}
      <path
        d="M366,212 C364,182 336,158 308,164 C282,170 266,193 274,215
           C282,238 314,250 335,264 C357,279 369,303 357,327
           C344,352 309,360 283,346 C267,337 259,321 258,308"
        fill="none"
        stroke="#2a0001"
        strokeWidth="46"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M366,212 C364,182 336,158 308,164 C282,170 266,193 274,215
           C282,238 314,250 335,264 C357,279 369,303 357,327
           C344,352 309,360 283,346 C267,337 259,321 258,308"
        fill="none"
        stroke="#da7134"
        strokeWidth="30"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
