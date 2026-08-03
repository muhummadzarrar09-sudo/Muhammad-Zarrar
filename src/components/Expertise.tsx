import { expertise } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";

export default function Expertise() {
  return (
    <section id="expertise" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          index="02"
          label="Expertise"
          title={
            <>
              What I&apos;m good at —<br />
              <span className="italic text-clay">and what I enjoy.</span>
            </>
          }
        />
        <Reveal delay={0.08} className="max-w-xs">
          <p className="text-[14px] leading-relaxed text-muted">
            I move between product, AI, and systems, but I like being responsible
            from database to pixel.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {expertise.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.08} className="h-full">
            <div className="human-card flex h-full flex-col rounded-[1.4rem] border border-line bg-surface p-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">0{gi + 1} — {g.group}</div>
              <h3 className="mt-3 font-display text-[1.4rem] font-medium leading-tight tracking-tight">
                {g.group}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{g.blurb}</p>

              <ul className="mt-6 space-y-2.5">
                {g.skills.map((s) => (
                  <li key={s.name} className="flex items-center justify-between gap-3 text-[13px] text-ink-soft">
                    <span className="flex items-center gap-2">
                      <span className="h-px w-3 bg-line" />
                      {s.name}
                    </span>
                    <span className="font-mono text-[10px] text-faint">{s.level}%</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-wide text-faint">
                Worked in production, not just tutorials.
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Personal tools note */}
      <Reveal delay={0.2} className="mt-8">
        <div className="rounded-[1.2rem] border border-line-soft bg-canvas-deep/60 px-6 py-4 font-mono text-xs text-muted sm:flex sm:items-center sm:justify-between">
          <span>Current favorite stack: TypeScript + React + Python + Postgres + Lenis? nope, native scroll now.</span>
          <span className="mt-2 hidden text-ink-soft sm:mt-0 sm:block">— less is more</span>
        </div>
      </Reveal>
    </section>
  );
}
