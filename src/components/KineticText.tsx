"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CERTAINTY KINETIC TYPOGRAPHY
 * 
 * Deliberate. Confident. Premium.
 * Every movement is measured, slow, and certain.
 * No randomness. No chaos. No "strong" flair.
 * 
 * This is motion that says: "We know exactly what we are doing."
 * 
 * Modes:
 * - "stagger"  → Precise, confident letter-by-letter reveal
 * - "refined"  → THE certainty signature (slow, weighted, elegant)
 * - "scrub"    → Linear, predictable, cinematic scroll
 */

interface KineticTextProps {
  text: string;
  className?: string;
  mode?: "stagger" | "refined" | "scrub";
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "p" | "span";
  scrollTrigger?: boolean;
}

export function KineticText({
  text,
  className = "",
  mode = "stagger",
  delay = 0,
  stagger = 0.016,
  as = "span",
  scrollTrigger = true,
}: KineticTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = text.split("");
    lettersRef.current = [];
    el.innerHTML = "";

    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.whiteSpace = "pre";
      el.appendChild(span);
      lettersRef.current.push(span);
    });

    const letters = lettersRef.current;

    const ctx = gsap.context(() => {
      // Always start from a grounded, certain state
      gsap.set(letters, {
        y: 32,
        opacity: 0,
        scale: 0.986,
      });

      // STAGGER — Precise, confident reveal
      if (mode === "stagger") {
        const tl = gsap.timeline({ delay });

        const anim = tl.to(letters, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.78,
          ease: "power3.out",
          stagger,
        });

        if (scrollTrigger) {
          anim.scrollTrigger = ScrollTrigger.create({
            trigger: el,
            start: "top 86%",
            toggleActions: "play none none reverse",
          });
        }
      }

      // REFINED — THE CERTAINTY SIGNATURE
      // This is the "we are completely certain" motion.
      // Slow. Grounded. Weighted. No flair. No randomness.
      // Every letter arrives with confidence.
      if (mode === "refined") {
        const tl = gsap.timeline({ delay });

        letters.forEach((letter, i) => {
          const centerOffset = (i - (letters.length - 1) / 2) * 0.45;

          tl.to(
            letter,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.35,           // deliberately slow = absolute certainty
              ease: "power2.out",
            },
            i * stagger * 1.05 + Math.abs(centerOffset) * 0.008
          );
        });

        if (scrollTrigger) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            once: true,
          });
        }
      }

      // SCRUB — Controlled, linear, certain cinematic motion
      if (mode === "scrub") {
        letters.forEach((letter, i) => {
          const progress = i / Math.max(1, letters.length - 1);
          const yValue = (progress - 0.5) * 11; // very controlled

          gsap.to(letter, {
            y: yValue,
            scale: 0.987 + progress * 0.026,
            scrollTrigger: {
              trigger: el,
              start: "top 83%",
              end: "bottom 28%",
              scrub: 2.2,
            },
          });

          // Certain, clean settle
          gsap.to(letter, {
            y: 0,
            scale: 1,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 60%",
              end: "bottom 22%",
              scrub: 2.9,
            },
          });
        });
      }
    }, el);

    return () => ctx.revert();
  }, [text, mode, delay, stagger, scrollTrigger]);

  const Tag = as as any;

  return (
    <Tag
      ref={containerRef as any}
      className={`kinetic-text inline-block overflow-hidden align-bottom ${className}`}
      aria-label={text}
    />
  );
}
