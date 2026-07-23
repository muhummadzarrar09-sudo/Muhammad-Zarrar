"use client";

import { useState } from "react";
import { sound } from "@/lib/sound";

/**
 * Cinematic Sequence Player — FULL PERMANENT CINEMATIC EXPERIENCE
 * Slow deliberate journey through the entire film.
 * Cinematic mode (slow scroll + grain + vignette) is ALWAYS default — no toggle needed.
 */
export function CinematicSequence() {
  const [isPlaying, setIsPlaying] = useState(false);

  const playSequence = async () => {
    setIsPlaying(true);

    // Gentle cinematic chime to start the film
    sound.chime();

    const sections = [
      { id: "top", delay: 1650 },
      { id: "about", delay: 3100 },
      { id: "work", delay: 2750 },
      { id: "film-strip", delay: 4100 },
      { id: "process", delay: 2950 },
      { id: "expertise", delay: 2450 },
      { id: "contact", delay: 3300 },
    ];

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      await new Promise(resolve => setTimeout(resolve, section.delay));
    }

    // Beautiful closing moment + return to top
    await new Promise(resolve => setTimeout(resolve, 1500));
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Final soft chime on arrival
    setTimeout(() => {
      sound.chime();
      setIsPlaying(false);
    }, 2300);
  };

  return (
    <button
      onClick={playSequence}
      disabled={isPlaying}
      className="group inline-flex items-center gap-3 rounded-full border border-spark/40 bg-spark/5 px-9 py-4 text-sm font-mono tracking-[2.2px] text-spark transition-all hover:bg-spark hover:text-canvas active:scale-[0.985] disabled:opacity-60"
    >
      <span>{isPlaying ? "✦ THE FILM IS PLAYING" : "▶ PLAY THE FULL CINEMATIC EXPERIENCE"}</span>
      <span className="text-lg transition group-hover:translate-x-0.5">→</span>
    </button>
  );
}
