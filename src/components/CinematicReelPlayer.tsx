"use client";

import { useRef, useState, useEffect } from "react";

/**
 * Cinematic Reel Player — full film projector simulation.
 * Always-on permanent slow projector experience.
 * Slow deliberate auto-scroll + subtle projector flicker.
 */
export function CinematicReelPlayer({ targetId = "film-strip" }: { targetId?: string }) {
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const flickerRef = useRef<number | null>(null);
  const elRef = useRef<HTMLElement | null>(null);

  const toggle = () => {
    const el = document.getElementById(targetId);
    if (!el) return;
    elRef.current = el;

    if (playing) {
      stopPlayback();
      return;
    }

    setPlaying(true);
    startPlayback();
  };

  const startPlayback = () => {
    const el = elRef.current;
    if (!el) return;

    // ULTRA-SLOW, luxurious projector auto-scroll (QUALITY, not anxiety)
    // ~2.5–3px per second — calm, editorial, expensive film-like
    intervalRef.current = window.setInterval(() => {
      if (el) {
        el.scrollLeft += 0.25;
      }
    }, 115);

    // Extremely rare, ultra-subtle projector "heartbeat"
    // Once every ~7.2 seconds — soft, almost imperceptible, pure quality
    flickerRef.current = window.setInterval(() => {
      if (el) {
        el.style.transitionDuration = "180ms";
        el.style.filter = "brightness(0.975) contrast(1.008)";
        setTimeout(() => {
          if (el) {
            el.style.transitionDuration = "1400ms";
            el.style.filter = "";
          }
        }, 220);
      }
    }, 7200);

    // Auto stop after a full, unhurried cinematic pass
    setTimeout(() => {
      if (playing) stopPlayback();
    }, 32000);
  };

  const stopPlayback = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (flickerRef.current) {
      clearInterval(flickerRef.current);
      flickerRef.current = null;
    }
    const el = elRef.current;
    if (el) {
      el.style.filter = "";
      el.style.transitionDuration = "";
    }
    setPlaying(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (flickerRef.current) clearInterval(flickerRef.current);
    };
  }, []);

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 rounded-full border px-6 py-2 text-sm font-mono tracking-widest transition-all ${
        playing 
          ? "border-spark bg-spark text-canvas" 
          : "border-line hover:border-spark/60 hover:text-spark"
      }`}
    >
      {playing ? "■ STOP PROJECTOR REEL" : "▶ PLAY THE FILM REEL"}
    </button>
  );
}
