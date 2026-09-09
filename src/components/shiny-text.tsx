"use client";

import { useEffect, useRef } from "react";

/**
 * ShinyText — React Bits `ShinyText`, tailored to the Putty Gallery.
 *
 * A copper sheen sweeps across on-ink display text whenever it enters the
 * viewport (reversible, like Reveal — scroll back and it re-plays).
 *
 * House amendments vs upstream:
 * - CSS-only sweep (upstream uses motion tombstone; this needs no dep).
 * - One sweep per entry, never an idle loop (ambient quota stays spent).
 * - Copper-on-ink ramp instead of the default white/silver.
 * - `.is-live` is only ever added client-side: no-JS and reduced-motion
 *   readers get plain bone text with full contrast.
 */
export function ShinyText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("is-live");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Re-adding the class after a committed removal restarts the
          // keyframes — the re-entry re-play falls out for free.
          entry.target.classList.toggle("is-shine", entry.isIntersecting);
        }
      },
      { threshold: 0.4, rootMargin: "-6% 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`shiny-text ${className}`.trim()}>
      {text}
    </span>
  );
}
