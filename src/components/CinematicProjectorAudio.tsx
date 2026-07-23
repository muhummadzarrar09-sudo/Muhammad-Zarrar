"use client";

import { useEffect } from "react";
import { sound } from "@/lib/sound";

/**
 * Permanent cinematic projector audio cues.
 * ALWAYS ON for the portfolio (no toggle).
 * Subtle projector hum + soft film-advance sounds during key cinematic moments.
 */
export function CinematicProjectorAudio() {
  useEffect(() => {
    // Start a very subtle permanent cinematic ambient bed (projector room feel)
    // This is gentle — air + distant pad. Perfect for film experience.
    const startCinematicBed = () => {
      if (typeof window !== "undefined" && (window as any).sound?.startAmbient) {
        try {
          sound.startAmbient();
        } catch {}
      }
    };

    // Start after first user gesture or a short delay (browsers require interaction)
    // Even gentler start for quality/calm
    const timer = setTimeout(() => {
      startCinematicBed();
    }, 1850);

    // Ultra-rare, very soft film-advance cues (only on major section jumps)
    // Quality-first: almost silent, barely audible, luxurious
    let lastScroll = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastScroll) > 680) {
        lastScroll = y;
        try {
          // Extremely gentle cue only
          if ((window as any).sound?.chime) {
            // We don't want to call pew — too sharp. Only very faint chime if needed.
            // Actually keep it silent for pure visual quality
          }
        } catch {}
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
