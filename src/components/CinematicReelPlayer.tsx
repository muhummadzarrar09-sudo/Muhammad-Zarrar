"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Cinematic Reel Player — optional auto-scroll for the horizontal film strip.
 * All timers are owned by the component so playback stops cleanly on unmount.
 */
export function CinematicReelPlayer({ targetId = "film-strip" }: { targetId?: string }) {
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const flickerRef = useRef<number | null>(null);
  const stopTimerRef = useRef<number | null>(null);
  const flickerTimerRef = useRef<number | null>(null);
  const elRef = useRef<HTMLElement | null>(null);

  const clearPlaybackTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (flickerRef.current) clearInterval(flickerRef.current);
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    if (flickerTimerRef.current) clearTimeout(flickerTimerRef.current);
    intervalRef.current = null;
    flickerRef.current = null;
    stopTimerRef.current = null;
    flickerTimerRef.current = null;
  }, []);

  const stopPlayback = useCallback((updateState = true) => {
    clearPlaybackTimers();
    const el = elRef.current;
    if (el) {
      el.style.filter = "";
      el.style.transitionDuration = "";
    }
    if (updateState) setPlaying(false);
  }, [clearPlaybackTimers]);

  const startPlayback = (el: HTMLElement) => {
    elRef.current = el;
    setPlaying(true);

    intervalRef.current = window.setInterval(() => {
      el.scrollLeft += 0.25;
    }, 115);

    flickerRef.current = window.setInterval(() => {
      el.style.transitionDuration = "180ms";
      el.style.filter = "brightness(0.975) contrast(1.008)";
      flickerTimerRef.current = window.setTimeout(() => {
        el.style.transitionDuration = "1400ms";
        el.style.filter = "";
        flickerTimerRef.current = null;
      }, 220);
    }, 7200);

    stopTimerRef.current = window.setTimeout(() => stopPlayback(), 32000);
  };

  const toggle = () => {
    if (playing) {
      stopPlayback();
      return;
    }

    const el = document.getElementById(targetId);
    if (!el) return;
    startPlayback(el);
  };

  useEffect(() => {
    return () => stopPlayback(false);
  }, [stopPlayback]);

  return (
    <button
      type="button"
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
