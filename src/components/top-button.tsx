"use client";

import { glideTo } from "./smooth-nav";

/**
 * Back to top — the long pages end deep in the footer; this glides the
 * whole walk back to the first room through Lenis (plain smooth scroll
 * as fallback). Sits in the footer's bottom rail.
 */
export function TopButton() {
  return (
    <button
      type="button"
      className="footer-top"
      onClick={() => glideTo(0)}
      aria-label="Back to top"
    >
      <span className="diamond" aria-hidden="true" />
      Back to top
    </button>
  );
}
