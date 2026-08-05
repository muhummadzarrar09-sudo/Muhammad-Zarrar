"use client";
import { useMemo } from "react";
import { cn } from "@/utils/cn";

/**
 * Background Beams — Aceternity UI
 * Source: ui.aceternity.com/components/background-beams
 * MIT License
 */
export function BackgroundBeams({ className }: { className?: string }) {
  const beamCount = 5;
  const beams = useMemo(() => Array.from({ length: beamCount }, (_, i) => i), []);

  return (
    <div className={cn("absolute inset-0 h-full w-full", className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {beams.map((i) => (
          <line
            key={i}
            x1={100 + i * 100}
            y1="0"
            x2={100 + i * 100}
            y2="600"
            stroke={`url(#beamGradient${i})`}
            strokeWidth="1"
            opacity="0.15"
          />
        ))}
        <defs>
          {beams.map((i) => (
            <linearGradient key={i} id={`beamGradient${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C46B4D" stopOpacity="0" />
              <stop offset="50%" stopColor="#C46B4D" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C46B4D" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}
