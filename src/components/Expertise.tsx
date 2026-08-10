import { expertise } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import VoiceDemo from "@/components/ui/VoiceDemo";

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

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {expertise.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.08} className="h-full">
            <div className="human-card flex h-full flex-col rounded-2xl border border-line-strong/40 bg-surface p-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">0{gi + 1} — {g.group}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{g.blurb}</p>

              <ul className="mt-6 space-y-2.5">
                {g.skills.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 text-sm text-ink-soft">
                    <span className="h-px w-3 shrink-0 bg-line" />
                    <span>{s.name}</span>
                    {s.highlight && (
                      <span className="ml-auto font-mono text-xs text-clay-deep">{s.highlight}</span>
                    )}
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

      {/* Omni — live voice-agent demo */}
      <Reveal delay={0.24} className="mt-6">
        <VoiceDemo />
      </Reveal>
    </section>
  );
}
