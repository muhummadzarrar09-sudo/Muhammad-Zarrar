"use client";

import { useEffect, useState } from "react";

const DAY_COLOR = "#C4C3B6";
const NIGHT_COLOR = "#1b1914";

function paintThemeColor(night: boolean) {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", night ? NIGHT_COLOR : DAY_COLOR);
}

/**
 * Night-at-the-museum switch. Paints `data-theme` on <html>, persists to
 * localStorage, and keeps the browser chrome in sync. SSR renders the day
 * icon on both sides (no hydration mismatch); the effect reconciles with
 * whatever the head guard already applied. Respects a stored choice first,
 * then the OS preference — decided once, in the guard.
 */
export function ThemeToggle() {
  const [night, setNight] = useState(false);

  useEffect(() => {
    setNight(document.documentElement.dataset.theme === "night");
  }, []);

  const toggle = () => {
    const next = !night;
    setNight(next);
    if (next) {
      document.documentElement.dataset.theme = "night";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem("zs-theme", next ? "night" : "day");
    } catch {
      /* private mode — the theme still works for the session */
    }
    paintThemeColor(next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={night}
      aria-label={night ? "Switch to day theme" : "Switch to night theme"}
      title={night ? "Day at the museum" : "Night at the museum"}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {night ? (
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7" />
          </g>
        ) : (
          <path
            d="M20 13.6A8.2 8.2 0 0 1 10.4 4 8.2 8.2 0 1 0 20 13.6Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
