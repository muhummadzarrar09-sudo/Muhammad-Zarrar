import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects, type Project } from "@/data/portfolio";
import { SectionHeading } from "@/components/primitives";

function SSSCard({ p, i, total }: { p: Project; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 20%"] });

  // SSS stack: each card sticks and shrinks as next arrives
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.5], ["blur(16px)", "blur(0px)"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? 1.2 : -1.2, 0]);

  // sticky scaling for previous cards
  const stickyScale = 1 - (total - i - 1) * 0.04;

  return (
    <div ref={ref} className="sticky top-[18vh] pb-[10vh]" style={{ zIndex: i }}>
      <motion.div style={{ scale, y, rotate }} className="group relative will-change-transform">
        <a href={p.url} target="_blank" rel="noreferrer" className="block">
          <div className="mb-4 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="text-spark">0{i + 1}</span>
            <span className="h-px w-12 bg-line" />
            <span className="text-ink">{p.tag} • {p.year}</span>
            <span className="ml-auto hidden sm:inline">project_{p.name.toLowerCase()} • {p.accent}</span>
          </div>

          <motion.div
            style={{ scale: stickyScale }}
            className="relative overflow-hidden rounded-[1.8rem] border border-line bg-surface aspect-[16/10.2] shadow-[0_30px_90px_-30px_rgba(23,21,15,0.35),0_0_0_1px_rgba(255,255,255,0.6)_inset]"
          >
            <motion.div style={{ scale: imgScale, filter: blur }} className="absolute inset-0">
              <div className="absolute inset-0 opacity-90" style={{ background: `radial-gradient(125% 125% at 12% 8%, ${p.accent}20, transparent 58%), radial-gradient(95% 95% at 88% 92%, ${p.accent}28, transparent 60%)` }} />
              <div className="absolute inset-0 dot-grid opacity-[0.28]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/30" />
              {/* huge watermark */}
              <div className="absolute inset-0 grid place-items-center">
                <motion.span
                  style={{ y: useTransform(scrollYProgress, [0, 1], ["22%", "-22%"]) }}
                  className="font-display text-[clamp(4rem,14vw,11rem)] font-light tracking-tightest opacity-[0.035] select-none"
                >
                  {p.name}
                </motion.span>
              </div>
              {/* RGB split on hover via filter */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 mix-blend-screen pointer-events-none" style={{ background: `linear-gradient(90deg, ${p.accent}15 0%, transparent 50%, ${p.accent}15 100%)` }} />
            </motion.div>

            {/* content */}
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h3 className="font-display text-[clamp(2rem,5.5vw,3.8rem)] font-light leading-[0.9] tracking-tight text-canvas [text-shadow:0_1px_20px_rgba(0,0,0,0.35)]">
                    {p.name}
                  </h3>
                  <p className="mt-3 max-w-[56ch] text-[14px] leading-[1.55] text-canvas/75 text-pretty line-clamp-3">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] text-canvas/70 backdrop-blur">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-canvas backdrop-blur group-hover:bg-spark group-hover:border-spark group-hover:text-canvas transition">
                  ↗
                </div>
              </div>
            </div>

            <div className="absolute left-6 top-6 h-2 w-2 rounded-full shadow-[0_0_12px_currentColor]" style={{ background: p.accent, color: p.accent }} />
          </motion.div>
        </a>
      </motion.div>
    </div>
  );
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading index="03" label="Proof • SSS" title={<>Built & shipped.<br /><span className="italic text-spark">Sticky stack • No slides.</span></>} />
        <div className="font-mono text-xs text-muted">scroll ↓ each proj pins</div>
      </div>

      <div className="mt-16">
        {featured.map((p, i) => (
          <SSSCard key={p.name} p={p} i={i} total={featured.length} />
        ))}
      </div>

      <div className="mt-24 border-t border-line">
        {rest.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group flex items-center justify-between border-b border-line py-7 hover:bg-surface/50 transition px-2"
          >
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-xs text-muted">0{i + 3}</span>
              <h4 className="font-display text-3xl font-light group-hover:text-spark transition">{p.name}</h4>
              <span className="hidden md:inline font-mono text-xs text-muted max-w-[34ch] truncate">{p.blurb}</span>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-line group-hover:bg-ink group-hover:text-canvas transition">↗</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
