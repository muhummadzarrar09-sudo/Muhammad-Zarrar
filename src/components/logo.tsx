/**
 * The ZS monogram — actual clay logo, small-size cut.
 * Full mark (public/images/logo-mark.svg) has 3-layer S terminals and cream pinstripes.
 * Below 64px those collapse into a blob at 32px — verified — so this small variant
 * keeps the same skeleton and proportions, flat colors only.
 * Header + footer inline this, no extra request, no tracker.
 */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      aria-hidden="true"
      focusable="false"
    >
      {/* Z — cream slab, exact geometry from actual logo */}
      <path
        d="M150,152 H320 V192 L232,314 H320 V356 H150 V314 L240,192 H150 Z"
        fill="#f2e2c4"
      />
      {/* S — copper, double-stroke for legibility at 16px, knocked out with ground */}
      <path
        d="M368,214 C366,184 338,160 310,166 C284,172 268,195 276,217 C284,240 316,252 337,266 C359,281 371,305 359,329 C346,354 311,362 285,348 C269,339 261,323 260,310"
        fill="none"
        stroke="#2a0001"
        strokeWidth="48"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M368,214 C366,184 338,160 310,166 C284,172 268,195 276,217 C284,240 316,252 337,266 C359,281 371,305 359,329 C346,354 311,362 285,348 C269,339 261,323 260,310"
        fill="none"
        stroke="#da7134"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
