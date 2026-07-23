import { motion } from "framer-motion";

/**
 * Warm, softly glowing particles that drift across the canvas — independent of
 * scroll — so the page feels alive even when you're reading and not scrolling.
 * Inspired by the floating dust motes in Auros / Cursor design systems.
 */
const DOTS = [
  { x: "8%", y: "18%", s: 3, d: 18, dl: 0 },
  { x: "22%", y: "55%", s: 2.5, d: 24, dl: 3 },
  { x: "45%", y: "12%", s: 2, d: 20, dl: 6 },
  { x: "62%", y: "72%", s: 3.5, d: 22, dl: 1.5 },
  { x: "78%", y: "35%", s: 2, d: 26, dl: 8 },
  { x: "88%", y: "60%", s: 2.5, d: 19, dl: 4 },
  { x: "35%", y: "82%", s: 2, d: 21, dl: 10 },
  { x: "55%", y: "42%", s: 3, d: 23, dl: 2 },
  { x: "15%", y: "90%", s: 2, d: 25, dl: 7 },
  { x: "92%", y: "15%", s: 2.5, d: 17, dl: 5 },
  { x: "5%", y: "45%", s: 1.5, d: 28, dl: 9 },
  { x: "70%", y: "88%", s: 2, d: 20, dl: 11 },
];

export default function AmbientParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5]" aria-hidden>
      {DOTS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.s,
            height: p.s,
            background:
              i % 3 === 0
                ? "rgba(255,77,23,0.22)"
                : i % 3 === 1
                  ? "rgba(185,242,74,0.18)"
                  : "rgba(255,179,71,0.20)",
          }}
          animate={{
            y: [0, -30, 15, -20, 0],
            x: [0, 12, -8, 6, 0],
            opacity: [0, 0.7, 0.4, 0.8, 0],
          }}
          transition={{
            duration: p.d * 1.65,   // ultra-slow, luxurious breathing — quality, not movement
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.dl,
          }}
        />
      ))}
    </div>
  );
}
