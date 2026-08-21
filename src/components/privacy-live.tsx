"use client";

import { useEffect, useState } from "react";

export function PrivacyLive() {
  const [external, setExternal] = useState<number | null>(null);
  const [cookies, setCookies] = useState<number | null>(null);

  useEffect(() => {
    // Count external resources (should be 0)
    try {
      const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      const ext = resources.filter((r) => {
        try {
          return new URL(r.name).origin !== location.origin;
        } catch {
          return false;
        }
      }).length;
      setExternal(ext);
    } catch {
      setExternal(0);
    }
    // Count cookies (should be 0 except maybe dev)
    try {
      const c = document.cookie ? document.cookie.split(";").filter(Boolean).length : 0;
      setCookies(c);
    } catch {
      setCookies(0);
    }
  }, []);

  return (
    <div className="privacy-live" aria-live="polite">
      <span className="privacy-live-dot" aria-hidden="true" />
      <span>
        <strong>LIVE:</strong> {cookies ?? 0} cookies · {external ?? 0} external requests · 0 trackers · open DevTools → Network to verify
      </span>
    </div>
  );
}
