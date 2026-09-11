"use client";

import type { ReactNode } from "react";
import { wipeJump } from "@/lib/jump";

/**
 * A "skip to" control that loads the destination instead of fast-forwarding
 * through it. Drops the route curtain, teleports, lifts — the same treatment
 * a real navigation gets. See src/lib/jump.ts for the reasoning.
 *
 * Renders a button, not an anchor: there is no URL to share for "the next
 * room", and a button can't be middle-clicked into a state we don't handle.
 */
export function JumpLink({
  to,
  className,
  label,
  children,
}: {
  to: string;
  className?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      onClick={() => wipeJump(to)}
    >
      {children}
    </button>
  );
}

/** The footer's back-to-top ring. */
export function BackToTop({ className = "footer-top" }: { className?: string }) {
  return (
    <JumpLink to="#top" className={className} label="Back to top">
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19.5v-15m-6.5 6.5L12 4.5l6.5 6.5"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </JumpLink>
  );
}
