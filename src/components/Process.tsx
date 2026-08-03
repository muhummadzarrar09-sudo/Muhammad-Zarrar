import { process as processData } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";

export default function Process() {
  return (
    <section id="process" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="04"
          label="Process"
          title={
            <>
              How I like to
              <br />
              <span className="italic text-clay">actually work.</span>
            </>
          }
        />
        <Reveal delay={0.08} className="max-w-sm">
          <p className="text-[14px] leading-relaxed text-muted">
            No big agency deck. Just 4 simple steps I keep coming back to. Research first, then
            build small and ship.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {processData.map((s, i) => (
          <Reveal key={s.no} delay={i * 0.06}>
            <div className="human-card flex h-full flex-col rounded-[1.4rem] border border-line bg-surface p-7">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl font-light tracking-tightest text-clay/30">
                  {s.no}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">{s.role}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight">{s.title}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{s.body}</p>

              {/* Human note */}
              <div className="mt-auto pt-6 font-mono text-[10px] leading-relaxed text-faint">
                {i === 0 && "I ask a lot of dumb questions here."}
                {i === 1 && "If I can't sketch it on paper, I don't start coding."}
                {i === 2 && "Motion only if it helps understanding."}
                {i === 3 && "Ship, then listen, then fix."}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.16} className="mt-10">
        <div className="rounded-[1.2rem] border border-line bg-canvas-deep/50 px-6 py-5 font-mono text-xs leading-relaxed text-muted">
          My belief: great software is 30% code, 70% understanding the problem. So I spend more time
          listening than typing at the start.
        </div>
      </Reveal>
    </section>
  );
}
