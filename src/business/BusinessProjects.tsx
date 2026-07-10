import { motion } from "framer-motion";
import { bizProjects, type BizProject } from "@/business/data";
import { Reveal, SectionHeading } from "@/components/primitives";
import { useTilt3D } from "@/hooks/useTilt3D";

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectCard({ p, i }: { p: BizProject; i: number }) {
  const { ref, move, leave } = useTilt3D(10);
  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={p.github}
      target="_blank"
      rel="noreferrer"
      onMouseMove={move as unknown as React.MouseEventHandler}
      onMouseLeave={leave}
      data-cursor="view"
      data-cursor-label="Open ↗"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ delay: (i % 3) * 0.1, duration: 0.8, ease: EASE }}
      className="tilt-card group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface lift"
    >
      {/* visual */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(120% 120% at 20% 0%, ${p.accent}22, transparent 60%), radial-gradient(100% 100% at 100% 100%, ${p.accent}33, transparent 55%)` }}
        />
        <div className="dot-grid absolute inset-0 opacity-40" />
        <span className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-[6rem] font-light leading-none tracking-tightest text-ink/[0.05]" aria-hidden>
          0{i + 1}
        </span>
        <div className="absolute inset-x-5 bottom-4 flex items-end justify-between">
          <h3 className="font-display text-4xl font-light tracking-tightest text-ink sm:text-5xl">{p.name}</h3>
          <span className="rounded-full px-2.5 py-1 text-[10px] font-medium" style={{ background: `${p.accent}22`, color: p.accent }}>
            {p.status}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="relative z-10 flex flex-1 flex-col gap-4 p-6">
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted">{p.tag}</div>
        <p className="text-sm leading-relaxed text-ink-soft text-pretty">{p.problem}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.features.map((f) => (
            <span key={f} className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-muted">{f}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <div className="flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span key={t} className="font-mono text-[10px] text-muted">{t}</span>
            ))}
          </div>
          <span className="text-[11px] text-spark">Code ↗</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function BusinessProjects() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8" aria-hidden>
        02
      </span>
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="02"
          label="Featured work"
          title={
            <>
              Real systems,
              <br />
              <span className="italic text-spark">shipped & working.</span>
            </>
          }
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">
            A few of the full-stack and AI systems I've designed, built and shipped end to end.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bizProjects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
