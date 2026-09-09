/**
 * Phase glyphs — one honest tool per pipeline phase. Audit gets the lens,
 * Findings the written scroll, Build the hammer, Launch the flag. Drawn in
 * the house 24-grid voice; the phase numeral keeps its seat beside them.
 */
const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const GLYPHS = [
  /* 01 Audit — the lens. */
  <>
    <circle cx="11" cy="11" r="6" {...STROKE} />
    <line x1="15.5" y1="15.5" x2="20" y2="20" {...STROKE} />
  </>,
  /* 02 Findings — the written scroll. */
  <>
    <path d="M6 3.5h7l4 4v13H6z" {...STROKE} />
    <path d="M13 3.5v4h4" {...STROKE} />
    <line x1="9" y1="12.5" x2="15" y2="12.5" {...STROKE} />
    <line x1="9" y1="15.5" x2="14" y2="15.5" {...STROKE} />
  </>,
  /* 03 Build — the hammer. */
  <>
    <path d="M12.5 5.5l6 6-3.5 3.5-6-6z" {...STROKE} />
    <line x1="11" y1="13.5" x2="5" y2="19.5" {...STROKE} />
  </>,
  /* 04 Launch — the flag. */
  <>
    <line x1="6" y1="21" x2="6" y2="4" {...STROKE} />
    <path d="M6 4.5h11l-2.5 3.5 2.5 3.5H6" {...STROKE} />
  </>,
];

export function PhaseGlyph({ index }: { index: number }) {
  const glyph = GLYPHS[index];
  if (!glyph) return null;
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {glyph}
    </svg>
  );
}
