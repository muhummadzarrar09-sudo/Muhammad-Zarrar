"use client";

import { useEffect, useRef } from "react";

/**
 * RotatingText — React Bits RotatingText, landed.
 *
 * Upstream cycles forever (a timer loop). This one cycles ONCE per
 * viewport entry and rests on the final word: a correction, not a
 * carousel — so it spends nothing from the ambient quota. SSR renders
 * the final word (SEO + no-JS safe); each swap pops on a 450ms keyframe.
 * Skipped entirely under prefers-reduced-motion.
 */
export function RotatingText({
  words,
  className = "",
  intervalMs = 450,
}: {
  /** Last word wins — it is the resting (and SSR) state. */
  words: string[];
  className?: string;
  intervalMs?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const final = words[words.length - 1] ?? "";

  useEffect(() => {
    const el = ref.current;
    if (!el || words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timers: number[] = [];
    let cancelled = false;

    const play = () => {
      for (const t of timers) window.clearTimeout(t);
      timers = [];
      words.forEach((word, i) => {
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;
            el.textContent = word;
            el.classList.remove("is-swap");
            void (el as HTMLElement).offsetWidth;
            el.classList.add("is-swap");
          }, i * intervalMs)
        );
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) play();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      for (const t of timers) window.clearTimeout(t);
      el.textContent = final;
    };
  }, [words.join("|"), intervalMs, final]);

  return (
    <em ref={ref as never} className={`rot ${className}`.trim()}>
      {final}
    </em>
  );
}
