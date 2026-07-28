"use client";

import { useEffect } from "react";

/**
 * Cinematic projector audio cues — now respects user opt-in via SoundContext.
 * Previously auto-started ambient, causing state desync and autoplay violations.
 * Now it only tracks large scroll jumps for future cues, without starting audio.
 */
export function CinematicProjectorAudio() {
  useEffect(() => {
    // No auto-start of ambient — SoundContext is single source of truth.
    // Track large scroll jumps only if future audio cues are desired.
    let lastScroll = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastScroll) > 680) {
        lastScroll = y;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}

export default CinematicProjectorAudio;
