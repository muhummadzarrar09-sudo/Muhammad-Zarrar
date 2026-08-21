"use client";

import { useEffect, useRef } from "react";

const LINES = [
  "Most websites don't fail loudly.",
  "They fail quietly —",
  "a slow load here, a blank page to Google there,",
  "money leaking out of flows nobody ever audited.",
];

const FINAL_LINE = "We find the leaks. Then we build the fix.";

/**
 * CSS scroll-driven manifesto — no GSAP, no external deps.
 * Uses animation-timeline: view() when available, otherwise
 * IntersectionObserver adds .in-view. Respects reduced-motion.
 */
export function PinnedManifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll(".manifesto-line").forEach((l) =>
        l.classList.add("in-view")
      );
      return;
    }

    // If browser supports view timeline, let CSS handle it
    if (CSS.supports("animation-timeline: view()")) return;

    const lines = el.querySelectorAll<HTMLElement>(".manifesto-line");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -12% 0px" }
    );
    lines.forEach((l) => io.observe(l));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="manifesto"
      id="manifesto"
      data-tl="Manifesto"
      aria-label="The manifesto"
      ref={rootRef}
    >
      <div className="manifesto-sticky">
        <div className="manifesto-inner">
          <span className="manifesto-kicker">The Manifesto — 0 trackers needed</span>
          {LINES.map((line) => (
            <p className="manifesto-line" key={line}>
              {line}
            </p>
          ))}
          <p className="manifesto-line manifesto-final">{FINAL_LINE}</p>
        </div>
      </div>
    </section>
  );
}
