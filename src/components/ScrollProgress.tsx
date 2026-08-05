"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll progress bar — subtle, warm clay accent.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setShow(window.scrollY > 80);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[200] h-[1px] pointer-events-none">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-clay via-clay to-clay-deep"
        style={{ width }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
