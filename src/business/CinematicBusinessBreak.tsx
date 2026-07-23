"use client";

import { CinematicImage } from "@/components/CinematicImage";

/**
 * Cinematic break specifically for the Business (more cinematic, calmer) route.
 * Slower, more editorial, premium studio feel.
 */
export function CinematicBusinessBreak({ 
  image, 
  label, 
  headline 
}: { 
  image: string; 
  label: string; 
  headline: string;
}) {
  return (
    <div className="relative my-16 h-[380px] rounded-3xl overflow-hidden">
      <CinematicImage 
        src={image} 
        variant="slowZoom" 
        intensity={0.7}
        className="h-full w-full" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-ink/85" />
      
      <div className="absolute inset-0 flex items-center px-8 md:px-14">
        <div className="max-w-2xl">
          <div className="font-mono text-xs tracking-[4px] text-spark mb-3">{label}</div>
          <div className="font-display text-[42px] md:text-[52px] leading-[1.02] tracking-[-1.8px] text-canvas">
            {headline}
          </div>
        </div>
      </div>
    </div>
  );
}
