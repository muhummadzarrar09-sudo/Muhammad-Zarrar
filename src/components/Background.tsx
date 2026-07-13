import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-canvas" />
      {/* Restraint: 2 blobs only, low opacity — Fable */}
      <motion.div
        className="absolute -left-[20%] -top-[15%] h-[50vw] w-[50vw] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(255,170,110,0.32), transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] top-[20%] h-[38vw] w-[38vw] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,77,23,0.14), transparent 65%)" }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 dot-grid opacity-[0.28] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent_80%)]" />
    </div>
  );
}
