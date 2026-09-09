"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * The 10-second self-check — five honest toggles and a directional
 * verdict. A quiz, not a diagnosis: every verdict points at the free
 * mini-audit for the real evidence. Pure state, no motion, screen-reader
 * announced via the polite live region.
 */
const CHECKS = [
  "Your homepage takes more than 3 seconds on mobile data",
  "There's no WhatsApp button above the fold",
  "Google shows the wrong title — or no pages at all",
  "Nobody filled in your contact form this month",
  "You couldn't say where visitors drop off",
];

function verdict(count: number) {
  if (count === 0)
    return "Suspiciously healthy. Send the link — we'll confirm it in writing.";
  if (count <= 2)
    return "Small leaks. The mini-audit names all five within 24 hours.";
  return "Leaking. The audit pays for itself — and the first five findings are free.";
}

export function SelfCheck() {
  const [on, setOn] = useState<boolean[]>(CHECKS.map(() => false));
  const count = on.filter(Boolean).length;

  return (
    <div className="selfcheck">
      <div className="selfcheck-chips" role="group" aria-label="Leak checklist">
        {CHECKS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={`q-chip${on[i] ? " is-on" : ""}`}
            aria-pressed={on[i]}
            onClick={() =>
              setOn((prev) => prev.map((v, j) => (j === i ? !v : v)))
            }
          >
            {label}
          </button>
        ))}
      </div>
      <div className="inset-panel selfcheck-verdict" aria-live="polite">
        <p className="selfcheck-count">
          {count} of {CHECKS.length} leaking
        </p>
        <p className="selfcheck-words">{verdict(count)}</p>
        <Link href="#request" className="btn btn-primary btn-sm">
          Request the mini-audit
        </Link>
      </div>
    </div>
  );
}
