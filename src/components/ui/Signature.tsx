import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/portfolio";

/**
 * Signature — the notebook's last page.
 *
 * Default: a drawn "— Zarrar" with a hand-drawn underline that draws itself
 * as it scrolls into view. If `profile.signature` points at an image
 * (e.g. "/images/signature.png" — transparent background, dark ink), that
 * real signature is shown instead, sliding in with the same timing.
 * Static (and instant) under reduced motion.
 */
export default function Signature() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const reveal = reduced
    ? { duration: 0 }
    : { duration: 1.1, ease: "easeOut" as const, delay: 0.25 };

  return (
    <div ref={ref} className="mt-16 flex flex-col items-center text-center">
      {profile.signature ? (
        <motion.img
          src={profile.signature}
          alt={`Handwritten signature — ${profile.name}`}
          className="h-16 w-auto max-w-[220px] object-contain sm:h-20"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={reveal}
        />
      ) : (
        <>
          <span className="font-display text-3xl font-light italic tracking-human text-ink sm:text-4xl">
            — Zarrar
          </span>
          <svg
            viewBox="0 0 220 12"
            className="mt-1 h-3 w-48 text-clay-deep/70 sm:w-56"
            fill="none"
            aria-hidden="true"
          >
            <motion.path
              d="M 4 8 Q 20 2, 36 6 T 70 7 T 104 5 T 138 7 T 172 5 T 216 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="0.5 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 1.4, ease: "easeInOut", delay: 0.3 }
              }
            />
          </svg>
        </>
      )}
      <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
        Signed by hand in Rawalpindi
      </span>
    </div>
  );
}
