import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base warm parchment */}
      <div className="absolute inset-0 bg-canvas" />

      {/* Drifting aurora blobs — warm cream + a whisper of spark & circuit */}
      <motion.div
        className="absolute -left-[15%] -top-[10%] h-[55vw] w-[55vw] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,170,110,0.55), transparent 62%)",
        }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 80, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-12%] top-[8%] h-[42vw] w-[42vw] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,77,23,0.18), transparent 60%)",
        }}
        animate={{ x: [0, -50, 30, 0], y: [0, 60, 20, 0], scale: [1, 1.12, 0.94, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-18%] left-[25%] h-[46vw] w-[46vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(28,93,79,0.20), transparent 62%)",
        }}
        animate={{ x: [0, 40, -40, 0], y: [0, -30, -60, 0], scale: [1, 0.92, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Faint dot grid for editorial structure */}
      <div
        className="absolute inset-0 dot-grid opacity-[0.5]"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 85%)",
        }}
      />

      {/* Warm vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 0%, transparent 50%, rgba(23,21,15,0.05) 100%), linear-gradient(to bottom, transparent 70%, rgba(23,21,15,0.06))",
        }}
      />
    </div>
  );
}
