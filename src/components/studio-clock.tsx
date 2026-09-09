"use client";

import { useEffect, useState } from "react";

/**
 * Live Rawalpindi studio time. SSR renders a static placeholder (no
 * hydration mismatch); the client fills it in, then ticks every 30s.
 * A clock is information, not decoration — but under reduced motion it
 * still renders once and parks, out of courtesy.
 */
export function StudioClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Karachi",
    });
    setTime(fmt.format(new Date()));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setTime(fmt.format(new Date())), 30000);
    return () => window.clearInterval(t);
  }, []);

  return <span className="studio-clock">Studio time — {time ?? "··:··"} PKT</span>;
}
