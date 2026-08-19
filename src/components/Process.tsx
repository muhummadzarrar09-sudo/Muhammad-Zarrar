import { CheckCircle2 } from "lucide-react";
import { process as processData, profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";

const goodFit = [
  "You have a real workflow, customer problem, or product decision to improve.",
  "You want a thoughtful builder involved in the technical and product details.",
  "You value a useful first release over a long list of impressive features.",
];

/**
 * Process — pxpush "Benefits" pattern: every step is a full-width row
 * divided by hairlines — Nº number left, title middle, body right.
 * Rows fill softly on hover. Same content, quieter chrome.
 */
export default function Process() {
  return (
    <section id="process" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="Nº004"
          label="Working together"
          meta="How engagements run"
          title={
            <>
              Clear thinking.
              <br />
              <span className="italic text-clay-deep">Useful momentum.</span>
            </>
          }
        />
        <Reveal delay={0.08} className="max-w-sm">
          <p className="text-[14px] leading-relaxed text-muted">
            I keep engagements deliberately small, direct, and close to the actual product. You get working proof early—not a black box or a bloated agency process.
          </p>
        </Reveal>
      </div>

      {/* The numbered rows */}
      <div className="mt-14 border-t border-line-strong">
        {processData.map((s, i) => (
          <Reveal key={s.no} delay={i * 0.05}>
            <div className="group grid grid-cols-1 gap-3 border-b border-line-strong px-1 py-8 transition-colors duration-300 hover:bg-canvas-deep/50 md:grid-cols-[7rem_1.1fr_1.4fr] md:items-baseline md:gap-10 md:px-4">
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-clay-deep">
                Nº00{i + 1}
              </span>
              <div>
                <h3 className="font-sans text-[1.35rem] font-bold uppercase leading-tight tracking-[-0.01em] text-ink">
                  {s.title}
                </h3>
                <span className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  {s.role}
                </span>
              </div>
              <div>
                <p className="text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-faint">
                  {i === 0 && "// The goal is a better decision, not more meetings."}
                  {i === 1 && "// You should be able to react to something real."}
                  {i === 2 && "// The unglamorous parts are part of the job."}
                  {i === 3 && "// A launch should leave you with clarity, not dependency."}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.16} className="mt-10">
        <div className="grid gap-8 rounded-2xl border border-line-strong bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_0.88fr] notebook-page">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">A good fit</div>
            <h3 className="mt-3 font-display text-3xl font-light leading-tight tracking-tight sm:text-4xl">
              The best work starts with a problem that matters.
            </h3>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink-soft">
              I&apos;m not the right fit for a vague feature factory. I&apos;m at my best when we can make a focused, meaningful piece of software genuinely easier to use.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-7 rounded-xl border border-line bg-canvas-deep/50 p-5">
            <ul className="space-y-4">
              {goodFit.map((item) => (
                <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-ink-soft">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-clay-deep" size={16} strokeWidth={1.8} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Project context")}`}
              className="btn-brutal btn-brutal-solid self-start"
            >
              Send project context
              <span aria-hidden="true" className="text-[0.95em]">↗</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
