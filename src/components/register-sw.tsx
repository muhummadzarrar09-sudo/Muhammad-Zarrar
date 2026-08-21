"use client";

import { useEffect } from "react";

/** Registers the PWA service worker (pass-through; keeps the app installable). */
export function RegisterSw() {
  useEffect(() => {
    if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* installability degrades gracefully without SW support */
      });
    }
  }, []);
  return null;
}
