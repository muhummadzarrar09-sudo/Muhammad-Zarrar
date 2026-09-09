"use client";

import { useEffect, useRef } from "react";

/**
 * ScrambleText — React Bits `ScrambledText`, tailored to the Putty Gallery.
 *
 * The label decodes like a diagnostic readout: code-glyphs churn, then the
 * real text settles left-to-right, once, when scrolled into view.
 *
 * House amendments vs upstream:
 * - SSR renders the FINAL text (SEO + no-JS safe); JS only enhances.
 * - One-shot via IntersectionObserver (upstream replays on hover).
 * - Code-glyph charset (`<>/\{}[]`) instead of alphanumeric noise.
 * - Skipped entirely under prefers-reduced-motion.
 * - Zero deps (upstream uses gsap; a rAF loop is all this needs).
 */
const GLYPHS = "<>/\\{}[]=+*#$%&";
const SETTLE_INSTANT = new Set([" ", "·", ".", ",", "—", "-", "/", "'"]);

type Props = {
  text: string;
  className?: string;
  as?: "span" | "p";
  /** ms each character holds before settling. */
  charMs?: number;
};

export function ScrambleText({ text, className, as, charMs = 22 }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as ?? "span") as "span";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let frame = 0;
    const final = text;
    const total = Math.min(420 + final.length * charMs, 1200);

    const render = (startedAt: number, now: number) => {
      const elapsed = now - startedAt;
      const settled = Math.floor((elapsed / total) * (final.length + 1));
      let out = "";
      for (let i = 0; i < final.length; i++) {
        const ch = final[i];
        if (i < settled || SETTLE_INSTANT.has(ch)) {
          out += ch;
        } else {
          // Re-roll the noise every 3rd frame — a buzz, not a strobe.
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      el.textContent = out;
      if (settled <= final.length) {
        frame += 1;
        raf = requestAnimationFrame((t) => render(startedAt, t));
      } else {
        el.textContent = final;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          raf = requestAnimationFrame((t) => render(t, t));
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      if (ref.current) ref.current.textContent = final;
    };
  }, [text, charMs]);

  return (
    <Tag ref={ref as never} className={className}>
      {text}
    </Tag>
  );
}
