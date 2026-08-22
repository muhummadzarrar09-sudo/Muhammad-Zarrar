"use client";

import { useEffect, useRef } from "react";

const LINES = [
  "You're not behind.",
  "You're running a real business",
  "on a site that never got diagnosed.",
  "Tell us what's going on.",
];

const FINAL_LINE = "We'll meet you there.";

/**
 * Manifesto folio. CSS sticky holds the frame (see globals).
 * With motion on, letters write with the wheel in src/motion/manifesto.ts.
 * Without it: CSS view-timeline, then IntersectionObserver.
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

    let io: IntersectionObserver | undefined;
    const arm = () => {
      if (document.documentElement.classList.contains("has-motion")) return;
      if (CSS.supports("animation-timeline: view()")) return;
      const lines = el.querySelectorAll<HTMLElement>(".manifesto-line");
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("in-view");
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -12% 0px" }
      );
      lines.forEach((l) => io!.observe(l));
    };
    const t = window.setTimeout(arm, 120);
    return () => {
      window.clearTimeout(t);
      io?.disconnect();
    };
  }, []);

  return (
    <section
      className="manifesto"
      id="manifesto"
      data-tl="With you"
      data-motion
      aria-label="A note"
      ref={rootRef}
    >
      <div className="manifesto-sticky">
        <div className="manifesto-inner">
          <span className="manifesto-kicker">A note</span>
          {LINES.map((line) => (
            <p className="manifesto-line" key={line}>
              <span className="type-src">{line}</span>
              <span className="type-out" aria-hidden="true" />
            </p>
          ))}
          <p className="manifesto-line manifesto-final">
            <span className="type-src">{FINAL_LINE}</span>
            <span className="type-out" aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}
