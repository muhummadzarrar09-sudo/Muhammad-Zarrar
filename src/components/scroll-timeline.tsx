"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { wipeJump } from "@/lib/jump";

type Marker = { id: string; label: string; top: number };

/**
 * The scroll timeline — replaces the native scrollbar (which is hidden in
 * CSS). A right-edge rail with scroll-progress fill and diamond markers for
 * each section that opts in via [data-tl]. Markers are real buttons:
 * keyboard-focusable, labelled, click-to-jump.
 */
export function ScrollTimeline() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [pct, setPct] = useState(0);
  const lastPct = useRef(-1);

  /* Rebuild markers whenever the route renders new sections. */
  useEffect(() => {
    const collect = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("section[data-tl]")
      );
      setMarkers(
        sections
          .map((el) => ({
            id: el.id || el.getAttribute("data-tl") || "",
            label: el.getAttribute("data-tl") || "",
            top: max > 0 ? Math.min(1, Math.max(0, el.offsetTop / max)) : 0,
          }))
          .filter((m) => m.id)
      );
    };
    const t = setTimeout(collect, 60);
    window.addEventListener("resize", collect);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", collect);
    };
  }, [pathname]);

  /* Progress fill + active section, rAF-throttled. */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
      const rounded = Math.round(p * 100);
      if (rounded !== lastPct.current) {
        lastPct.current = rounded;
        setPct(rounded);
      }
      const mid = window.scrollY + window.innerHeight * 0.4;
      let current: string | null = null;
      for (const el of document.querySelectorAll<HTMLElement>("section[data-tl]")) {
        if (el.offsetTop <= mid) current = el.id || el.getAttribute("data-tl");
      }
      setActive(current);
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
  }, [pathname, markers]);

  /* Markers used to `motion:scrollTo`, which travelled the whole page at
     speed and dragged every pinned scene along for the ride. A jump is a
     load now: curtain down, teleport, curtain up. */
  function jump(id: string) {
    wipeJump(`#${id}`);
  }

  return (
    <div className="scroll-timeline" ref={rootRef} aria-label="Page scroll timeline">
      <div className="tl-readout" aria-hidden="true">
        <span className="tl-index">
          {markers.length
            ? `${String(
                Math.max(
                  1,
                  markers.findIndex((m) => m.id === active) + 1
                )
              ).padStart(2, "0")}/${String(markers.length).padStart(2, "0")}`
            : "--/--"}
        </span>
        <span className="tl-pct">{pct}%</span>
      </div>
      <div className="tl-track">
        <div className="tl-fill" ref={fillRef} />
        {markers.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`tl-marker ${active === m.id ? "active" : ""}`}
            style={{ top: `${m.top * 100}%` }}
            onClick={() => jump(m.id)}
            aria-label={`Jump to ${m.label}`}
          >
            <span className="tl-label">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
