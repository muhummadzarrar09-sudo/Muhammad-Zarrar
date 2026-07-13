import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from "framer-motion";
import { useRef, useEffect } from "react";
import { profile, stats } from "@/data/portfolio";
import { MagneticButton } from "@/components/primitives";
import Terminal from "@/components/Terminal";
import { navigate } from "@/router";
import ShaderField from "@/components/ShaderField";

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_INOUT = [0.83, 0, 0.17, 1] as const;

// Char stagger for SSS kinetic type
function KineticTitle({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const chars = text.split("");
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", rotateX: -25, filter: "blur(10px)" }}
          animate={{ y: "0%", rotateX: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.025 }}
          className="inline-block will-change-transform [transform-origin:bottom]"
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}

function GlassChip({
  children,
  className = "",
  delay = 0,
  speed = 1,
  skew,
  mouseX,
  mouseY,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  speed?: number;
  skew?: any;
  mouseX?: any;
  mouseY?: any;
}) {
  const x = useTransform(mouseX ?? 0, [-1, 1], [-8 * speed, 8 * speed]);
  const yFloat = useTransform(mouseY ?? 0, [-1, 1], [-6 * speed, 6 * speed]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 1.1, ease: EASE }}
      style={{ x, y: yFloat, skewX: skew }}
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -14 * speed, 0], rotate: [0, speed * 1.4, 0] }}
        transition={{ duration: 6.5 + speed, repeat: Infinity, ease: "easeInOut", delay: delay * 0.2 }}
        className="flex items-center gap-2.5 rounded-full border border-white/50 bg-white/75 px-4 py-2.5 shadow-[0_12px_40px_-12px_rgba(23,21,15,0.22),0_0_0_1px_rgba(255,255,255,0.7)_inset] backdrop-blur-2xl backdrop-saturate-[1.6]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 });
  const scale = useTransform(smooth, [0, 1], [1, 1.35]);
  const y = useTransform(smooth, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(smooth, [0, 0.65, 1], [1, 1, 0]);
  const blur = useTransform(smooth, [0, 1], ["blur(0px)", "blur(28px)"]);
  const contentScale = useTransform(smooth, [0, 0.55], [1, 0.92]);
  const contentY = useTransform(smooth, [0, 0.55], ["0%", "-10%"]);
  const vel = useVelocity(smooth);
  const skew = useTransform(vel, [-1.2, 1.2], [-6, 6]);

  // mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const mX1 = useTransform(mouseX, [-1, 1], [12, -12]);
  const mY1 = useTransform(mouseY, [-1, 1], [10, -10]);
  const mX2 = useTransform(mouseX, [-1, 1], [-10, 10]);

  return (
    <section ref={containerRef} className="relative h-[220vh] w-full">
      <div className="sticky top-0 flex h-[100vh] w-full items-center overflow-hidden">
        {/* SSS Shader BG */}
        <motion.div style={{ scale, y, filter: blur, opacity }} className="absolute inset-0">
          <ShaderField />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,transparent_35%,rgba(23,21,15,0.055)_100%)]" />
        </motion.div>

        {/* Content */}
        <div className="relative mx-auto w-full max-w-[1650px] px-5 sm:px-8">
          <motion.div style={{ scale: contentScale, y: contentY, skewX: skew }} className="grid items-center gap-12 lg:grid-cols-[1.38fr_0.9fr]">
            {/* LEFT */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.8, ease: EASE }}
                className="mb-7 inline-flex items-center gap-3 rounded-full border border-line bg-surface/80 px-4 py-1.5 backdrop-blur-xl"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-circuit" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Signal • {profile.availability.toLowerCase()} • Rawalpindi → Remote</span>
                <span className="ml-1 h-3 w-px bg-line" />
                <span className="font-mono text-[10px] text-spark">2026 Transmission v3</span>
              </motion.div>

              <h1 className="font-display text-[clamp(3.6rem,12vw,10.8rem)] font-light leading-[0.84] tracking-tightest">
                <span className="block">
                  <KineticTitle text="Muhammad" delay={0.12} />
                </span>
                <span className="block">
                  <KineticTitle text="Zarrar" className="italic text-spark" delay={0.32} />
                </span>
              </h1>

              <motion.div style={{ x: mX1, y: mY1 }} className="relative">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.62, duration: 0.9, ease: EASE }}
                  className="mt-8 max-w-[46ch] text-[19px] leading-[1.5] text-ink-soft text-pretty"
                >
                  <span className="text-ink font-medium">{profile.role}</span>. {profile.tagline} <span className="text-ink">Noise → signal. Register → system.</span>
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78, duration: 0.8 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <MagneticButton href="#work" cursorLabel="Proof">View proof <span>↘</span></MagneticButton>
                <MagneticButton href="#contact" variant="outline">Start signal</MagneticButton>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.8 }} className="mt-6 flex items-center gap-2">
                <button onClick={() => navigate("/business")} className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-xs text-muted hover:text-ink transition">
                  Retail & clinics: Zarrar.Solutions <span className="text-spark group-hover:translate-x-1 transition">→</span>
                </button>
                <span className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-muted">
                  <span className="h-px w-8 bg-line" /> scroll to decode
                </span>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-10 grid max-w-[380px] grid-cols-3 gap-4 border-t border-line-soft pt-6">
                {stats.slice(0, 3).map((s) => (
                  <div key={s.label} className="space-y-1">
                    <div className="font-display text-[24px] font-light leading-none tracking-tight tabular-nums">
                      {s.value}
                      <span className="text-spark">{s.suffix}</span>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] leading-tight text-muted">{s.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Glass chips */}
              <GlassChip className="left-[-8%] top-[4%] hidden xl:flex" delay={1.0} speed={0.7} skew={skew} mouseX={mouseX} mouseY={mouseY}>
                <span className="h-2 w-2 rounded-full bg-circuit animate-pulse" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">Live • Decoding</span>
              </GlassChip>
              <GlassChip className="right-[-2%] top-[-8%] hidden lg:flex" delay={1.15} speed={1.2} skew={skew} mouseX={mouseX} mouseY={mouseY}>
                <span className="font-mono text-[10px] text-muted">Voice systems</span>
                <span className="h-px w-5 bg-line" />
                <span className="font-mono text-[10px] font-medium">OMNI JARVIS</span>
              </GlassChip>
              <GlassChip className="right-[-10%] bottom-[20%] hidden xl:flex" delay={1.3} speed={0.55} skew={skew} mouseX={mouseX} mouseY={mouseY}>
                <span className="font-mono text-[10px] text-muted">Earth • Remote-first • {new Date().getFullYear()}</span>
              </GlassChip>
            </div>

            {/* RIGHT — Terminal SSS glass */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateY: -12 }}
              animate={{ opacity: 1, y: 0, rotateY: -10 }}
              transition={{ delay: 0.4, duration: 1.3, ease: EASE_INOUT }}
              style={{ x: mX2, perspective: 1400 }}
              className="relative hidden lg:block"
            >
              <motion.div style={{ y: useTransform(smooth, [0, 1], ["0%", "-14%"]), rotateX: useTransform(mouseY, [-1, 1], [4, -4]) }} className="[transform-style:preserve-3d]">
                <div className="absolute -inset-12 -z-10 rounded-[2.5rem] bg-spark/12 blur-[70px]" />
                <div className="absolute -inset-6 -z-10 rounded-[1.8rem] bg-gradient-to-br from-white/60 to-white/10 blur-[1px]" />
                <div className="relative overflow-hidden rounded-[1.8rem] border border-white/55 bg-white/68 shadow-[0_24px_80px_-20px_rgba(23,21,15,0.3),0_0_0_1px_rgba(255,255,255,0.8)_inset] backdrop-blur-[24px]">
                  <Terminal />
                </div>
              </motion.div>

              {/* commit pill */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.25, duration: 0.8 }} className="absolute -right-8 top-[52%] hidden xl:block">
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="w-[200px] rounded-2xl border border-line bg-surface/90 p-3.5 shadow-2xl backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wide text-muted">commit • 2h ago</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-spark animate-pulse" />
                  </div>
                  <div className="mt-2 font-mono text-[11px] font-medium leading-tight text-ink">feat: scroll-zoom hero<br />SSS+ signal field</div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-line"><motion.div className="h-full bg-spark" initial={{ width: 0 }} animate={{ width: "84%" }} transition={{ delay: 1.5, duration: 0.9 }} /></div>
                    <span className="font-mono text-[9px] text-muted">84%</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* scroll cue line */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} style={{ opacity }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">Scroll • Decode • Build</span>
          <span className="relative h-12 w-px overflow-hidden bg-line"><motion.span className="absolute top-0 h-6 w-full bg-spark" animate={{ y: [-24, 52] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} /></span>
        </motion.div>
      </div>
    </section>
  );
}
