"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Premium cinematic scroll progress bar.
 * Subtle, elegant, Awwwards style — warm spark accent.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[200] h-[1px] pointer-events-none">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-spark via-spark to-ember"
        style={{ width }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
