import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Custom cursor — clay dot (snappy) + trailing ring (laggy spring).
 * - Mounts only for fine pointers (never touch) and not under reduced motion.
 * - Hides the native cursor while active via the `cursor-active` html class.
 * - Ring swells over interactive elements (`a`, `button`, `[data-hover]`).
 */
export default function CustomCursor() {
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 1400, damping: 70, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 1400, damping: 70, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 240, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 240, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovered(
        !!target?.closest?.(
          "a, button, [data-hover], [role='button'], input, textarea, select, label"
        )
      );
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("cursor-active");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[300]" aria-hidden="true">
      {/* Dot — tracks the pointer tightly */}
      <motion.div style={{ x: dotX, y: dotY }} className="absolute left-0 top-0">
        <motion.div
          animate={{ opacity: visible ? 1 : 0, scale: hovered ? 0.6 : 1 }}
          transition={{ duration: 0.25 }}
          className="-ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-clay-deep"
        />
      </motion.div>

      {/* Ring — lags behind, swells over interactives */}
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.div
          animate={{ opacity: visible ? 1 : 0, scale: hovered ? 1.9 : 1 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-ink/45"
        />
      </motion.div>
    </div>
  );
}
