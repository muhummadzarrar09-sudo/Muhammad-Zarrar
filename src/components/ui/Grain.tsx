import { motion, useReducedMotion } from "framer-motion";

/**
 * Film grain — a subtle, tileable SVG-noise overlay.
 * Drifts imperceptibly (60s loop); static under reduced motion.
 * Blend mode `overlay` keeps it visible in both light and dark themes.
 */
export default function Grain() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[150] overflow-hidden"
    >
      <motion.div
        className="grain-overlay absolute -inset-6 opacity-[0.07] mix-blend-overlay"
        animate={
          reduced
            ? undefined
            : { x: [0, -24, -8, -32, 0], y: [0, -16, -32, -8, 0] }
        }
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
