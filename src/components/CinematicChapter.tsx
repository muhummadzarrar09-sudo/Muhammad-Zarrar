"use client";

import { CinematicImage } from "./CinematicImage";
import { KineticText } from "./KineticText";

/**
 * Cinematic Chapter — a full narrative block with image + text.
 * Designed for strong storytelling.
 */

interface CinematicChapterProps {
  image: string;
  chapter: string;
  title: string;
  body: string;
  variant?: "parallax" | "slowZoom";
}

export function CinematicChapter({ 
  image, 
  chapter, 
  title, 
  body, 
  variant = "slowZoom" 
}: CinematicChapterProps) {
  return (
    <div className="relative my-20 h-[520px] md:h-[580px] rounded-3xl overflow-hidden">
      <CinematicImage 
        src={image} 
        variant={variant} 
        intensity={1.1}
        className="h-full w-full" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/90" />
      
      <div className="absolute inset-0 flex items-center px-8 md:px-16">
        <div className="max-w-2xl">
          <div className="font-mono text-xs tracking-[4px] text-spark mb-3">{chapter}</div>
          <KineticText 
            text={title} 
            mode="refined" 
            className="font-display text-[44px] md:text-[56px] leading-[1.0] tracking-[-2.6px] text-canvas" 
          />
          <p className="mt-6 max-w-lg text-xl text-canvas/70 leading-snug">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
