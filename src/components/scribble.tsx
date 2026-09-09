import type { ReactNode } from "react";

/**
 * A hand-drawn clay underline for hero accent words. The stroke rests
 * fully drawn — no-JS and reduced-motion readers see the finished mark —
 * and motion-capable browsers draw it once on load. Decorative: the word
 * carries the meaning, the ink just points at it.
 */
export function Scribble({ children }: { children: ReactNode }) {
  return (
    <span className="scribble">
      {children}
      <svg
        viewBox="0 0 120 12"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M4 8 C 30 3, 55 10, 78 6 S 108 4, 116 7" pathLength={1} />
      </svg>
    </span>
  );
}
