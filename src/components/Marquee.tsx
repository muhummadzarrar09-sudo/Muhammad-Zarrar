"use client";

import { marquee } from "@/data/portfolio";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Cinematic marquee — Awwwards style.
 * Slow, weighted, slightly breathing movement.
 * Reacts to scroll direction for extra life.
 */
export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  const row = [...marquee, ...marquee];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Ultra-slow, luxurious horizontal drift — pure quality
    // 62+ seconds for the full loop. Calm. Expensive. Certain.
    const anim = gsap.to(el, {
      x: "-50%",
      duration: 62,
      ease: "none",
      repeat: -1,
    });

    // Scroll influence — slower when scrolling down
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      lastY = currentY;

      if (Math.abs(delta) > 1) {
        const speed = delta > 0 ? 0.6 : 1.4;
        anim.timeScale(speed);
        setTimeout(() => {
          if (anim) anim.timeScale(1);
        }, 800);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      anim.kill();
    };
  }, []);

  return (
    <section aria-hidden className="relative flex overflow-hidden border-y border-line bg-surface/40 py-6">
      <div
        ref={containerRef}
        className="flex shrink-0 items-center gap-9 whitespace-nowrap pr-9 will-change-transform"
        style={{ width: "200%" }}
      >
        {row.map((m, i) => (
          <span key={i} className="flex items-center gap-9">
            <span className="font-display text-[26px] font-light tracking-[-1.2px] text-ink/75 sm:text-4xl">
              {m}
            </span>
            <span className="text-spark/70">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
