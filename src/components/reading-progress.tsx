"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-linked reading hairline for note pages. Pure derived state from
 * scroll position (input-driven, like the timeline rail), so it runs under
 * reduced motion too; absent without JS. Sits under the route bar.
 */
export function ReadingProgress({ target }: { target: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    const el = document.querySelector(target);
    if (!bar || !el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const done =
        total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      bar.style.transform = `scaleX(${done.toFixed(3)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div ref={ref} className="reading-fill" />
    </div>
  );
}
