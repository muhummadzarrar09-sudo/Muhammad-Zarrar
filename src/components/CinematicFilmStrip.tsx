"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Full cinematic horizontal film-strip.
 * This is the "kinetic cinema" moment.
 * Scroll horizontally through beautiful cinematic stills + captions.
 */

const filmFrames = [
  { 
    src: "/images/cinematic-01.jpg", 
    label: "01 — ORIGIN", 
    title: "Research before pixels" 
  },
  { 
    src: "/images/cinematic-02.jpg", 
    label: "02 — SYSTEMS", 
    title: "Everything is connected" 
  },
  { 
    src: "/images/cinematic-03.jpg", 
    label: "03 — CRAFT", 
    title: "Light. Shadow. Intention." 
  },
  { 
    src: "/images/cinematic-04.jpg", 
    label: "04 — MOTION", 
    title: "Movement with meaning" 
  },
  { 
    src: "/images/cinematic-05.jpg", 
    label: "05 — DEPTH", 
    title: "From model to pixel" 
  },
  { 
    src: "/images/cinematic-06.jpg", 
    label: "06 — DETAIL", 
    title: "The seams disappear" 
  },
  { 
    src: "/images/cinematic-07.jpg", 
    label: "07 — LAUNCH", 
    title: "Ship with certainty" 
  },
];

export function CinematicFilmStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: "x",
  });

  const progress = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  // PERMANENT but ultra-gentle cinematic drift — QUALITY over movement.
  // Stops on user interaction for calm, deliberate experience.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf: number | null = null;
    let paused = false;

    const drift = () => {
      if (!paused && el) {
        // Extremely slow, elegant drift — barely perceptible, luxurious
        // Quality > motion. This is a still film, not a video.
        el.scrollLeft += 0.048;
      }
      raf = requestAnimationFrame(drift);
    };

    const pauseDrift = () => { paused = true; };
    const resumeDrift = () => { paused = false; };

    // Pause on any interaction for calm, high-quality feel
    el.addEventListener('mouseenter', pauseDrift);
    el.addEventListener('mousedown', pauseDrift);
    el.addEventListener('touchstart', pauseDrift);
    el.addEventListener('mouseleave', resumeDrift);
    el.addEventListener('mouseup', resumeDrift);

    raf = requestAnimationFrame(drift);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('mouseenter', pauseDrift);
      el.removeEventListener('mousedown', pauseDrift);
      el.removeEventListener('touchstart', pauseDrift);
      el.removeEventListener('mouseleave', resumeDrift);
      el.removeEventListener('mouseup', resumeDrift);
    };
  }, []);

  return (
    <div className="relative my-24">
      {/* Section header */}
      <div className="flex items-baseline justify-between px-5 mb-8">
        <div>
          <div className="font-mono text-xs tracking-[3px] text-spark">THE REEL</div>
          <div className="font-display text-5xl tracking-[-1.8px]">A cinematic journey through craft.</div>
        </div>
        <div className="hidden md:block font-mono text-xs text-muted tracking-widest">DRAG / SCROLL →</div>
      </div>

      {/* Horizontal film strip — pure cinema */}
      <div 
        ref={containerRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-12 hide-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {filmFrames.map((frame, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-[92vw] md:w-[580px] snap-center relative rounded-3xl overflow-hidden group"
          >
            <div className="relative aspect-[16/10]">
              <img 
                src={frame.src} 
                alt={frame.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3200ms] group-hover:scale-[1.022]" 
              />
              
              {/* Heavy cinematic grading */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent" />

              {/* Film frame look */}
              <div className="absolute inset-0 border border-white/8" />

              <div className="absolute bottom-0 left-0 p-8 md:p-11 text-canvas">
                <div className="font-mono text-[10px] tracking-[5px] text-spark/70 mb-3">{frame.label}</div>
                <div className="font-display text-[34px] md:text-[42px] leading-[1.02] tracking-[-1.8px]">
                  {frame.title}
                </div>
              </div>

              {/* Rich film grain */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#0000000a_1px,transparent_1px)] bg-[length:2px_2px]" />
            </div>
          </div>
        ))}
      </div>

      {/* Elegant progress bar */}
      <div className="mt-2 h-px bg-line mx-5">
        <motion.div 
          className="h-px bg-spark" 
          style={{ width: progress }} 
        />
      </div>

      <div className="text-center mt-4 font-mono text-[10px] tracking-widest text-muted">7 STILL FRAMES • ONE STORY</div>
    </div>
  );
}
