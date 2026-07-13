import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";

const LINES = [
  "Local retail runs on memory, WhatsApp pictures, registers.",
  "I build systems that turn that noise into signal.",
  "From database to pixel — researched, branded, engineered as one.",
  "Applied AI when it helps. No AI for hype.",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);

  return (
    <section id="about" ref={ref} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-36">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.02]">01</span>

      <SectionHeading
        index="01"
        label="Origin"
        title={
          <>
            Signal over noise.<br />
            <span className="italic text-spark">System over shortcut.</span>
          </>
        }
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Reveal>
            <p className="font-display text-[clamp(1.5rem,4vw,2.2rem)] font-light leading-[1.15] tracking-tight text-ink text-balance">
              I'm {profile.name} — engineer who treats product like a small studio treats a film: research, identity, layout, motion as one continuous transmission.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4 border-l border-line pl-6">
            {LINES.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-sm leading-relaxed text-ink-soft"
              >
                <span className="text-spark">—</span> {line}
              </motion.p>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-2">
              {["Research before pixels", "Systems > shortcuts", "Motion with meaning", "Ship, then refine"].map((p) => (
                <span key={p} className="rounded-full border border-line bg-surface/70 px-4 py-2 text-sm text-ink-soft backdrop-blur">
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div style={{ x, opacity }} className="relative hidden lg:block">
          <div className="sticky top-32 overflow-hidden rounded-3xl border border-line bg-surface/60 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(23,21,15,0.2)]">
            <div className="aspect-[4/5] relative">
              <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-canvas/70">Location • Mode</div>
                <div className="mt-1 font-display text-xl font-light leading-tight text-canvas">{profile.location} • Decoding • Building</div>
                <div className="mt-3 h-px w-full bg-canvas/20" />
                <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-canvas/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse" />
                  Signal locked — {profile.availability}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
