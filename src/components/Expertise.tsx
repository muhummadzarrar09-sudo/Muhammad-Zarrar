import { expertise } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";

export default function Expertise() {
  return (
    <section id="expertise" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          index="Nº002"
          label="Expertise"
          meta="Capability index"
          title={
            <>
              What I&apos;m good at —<br />
              <span className="italic text-clay-deep">and what I enjoy.</span>
            </>
          }
        />
        <Reveal delay={0.08} className="max-w-xs">
          <p className="text-[14px] leading-relaxed text-muted">
            I move between product, AI, and systems — I like being responsible
            from database to pixel.
          </p>
        </Reveal>
      </div>

      {/* Swiss hairline table — one frame, columns divided by rules */}
      <Reveal delay={0.05} className="mt-14">
        <div className="border border-line-strong bg-surface">
          <div className="grid md:grid-cols-3 md:divide-x md:divide-line">
            {expertise.map((g, gi) => (
              <div
                key={g.group}
                className="flex flex-col gap-5 border-b border-line p-7 last:border-b-0 md:border-b-0"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em]">
                  <span className="font-semibold text-clay-deep">Nº00{gi + 1}</span>
                  <span className="text-faint"> /</span>
                  <span className="text-muted"> {g.group}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted">{g.blurb}</p>

                <ul className="mt-auto divide-y divide-line-soft border-t border-line-soft">
                  {g.skills.map((s) => (
                    <li
                      key={s.name}
                      className="group flex items-center justify-between gap-3 py-2.5 text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-line-strong transition-colors group-hover:bg-clay-deep" />
                        {s.name}
                      </span>
                      {s.highlight && (
                        <span className="text-right font-mono text-[11px] text-clay-deep">{s.highlight}</span>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  Worked in production, not just tutorials.
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
