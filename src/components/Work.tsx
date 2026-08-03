import { projects } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { Fold, Staple, Marginalia, Stamp, Redline } from "@/components/Brutalist";

export default function Work() {
  const featured = projects.filter((p) => p.featured); // 3 working: Recto, SwingFrame, LOCK-IN client

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="03"
          label="Selected work"
          title={
            <>
              Working now —
              <br />
              <span className="italic text-clay">only 3 for now.</span>
            </>
          }
        />
        <Reveal delay={0.08}>
          <a
            href="https://github.com/muhummadzarrar09-sudo?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-mono text-sm text-ink-soft"
          >
            View all projects ↗
          </a>
        </Reveal>
      </div>

      {/* Featured — brutalist notebook pages */}
      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className="relative">
            <div className="relative">
              {/* Marginalia — handwritten notes outside card */}
              {p.name === "Recto" && (
                <Marginalia side="right">
                  Aug 1 — 35 commits
                  <br />"so if it crashes we now know why"
                  <br />
                  <span className="font-mono text-[10px] not-italic text-faint">→ console mirroring</span>
                </Marginalia>
              )}
              {p.name === "SwingFrame" && (
                <Marginalia side={i === 1 ? "left" : "right"}>
                  graffiti human golfer
                  <br />launcher icon
                  <br />
                  <span className="font-mono text-[10px] not-italic text-faint">Phase 1 & 2 Jul31</span>
                </Marginalia>
              )}
              {p.name === "LOCK-IN" && (
                <Marginalia side="right">
                  <Redline oldText="personal OS" newText="CLIENT PROJECT" />
                  <br />
                  <span className="mt-1 block font-mono text-[10px] not-italic text-faint">
                    TheStandard is predecessor
                  </span>
                </Marginalia>
              )}

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="notebook-page human-card group relative flex h-full flex-col p-7 sm:p-8 pt-10"
              >
                <Staple />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: p.accent || "var(--color-clay)" }} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{p.tag}</span>
                    <span className="font-mono text-[11px] text-faint">• {p.year}</span>
                  </div>
                  <Stamp>{p.name === "LOCK-IN" ? "CLIENT" : "WORKING"}</Stamp>
                </div>

                <h3 className="mt-6 font-display text-[1.9rem] font-light leading-[1.05] tracking-tightest">{p.name}</h3>
                <p className="mt-2 text-[13px] font-medium text-clay leading-snug typewriter">{p.blurb}</p>

                <p className="mt-4 text-[14px] leading-relaxed text-ink-soft text-pretty">{p.description}</p>

                <div className="mt-5 rounded-xl border border-dashed border-line-soft bg-canvas px-4 py-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Outcome — honest</div>
                  <div className="mt-1 text-[13px] leading-relaxed text-ink-soft typewriter">{p.outcome}</div>
                </div>

                <div className="mt-auto pt-6 flex items-center gap-2 font-mono text-[10px] text-faint">
                  <span className="h-px w-4 bg-line" />
                  <span>live — {p.url.replace("https://github.com/", "")}</span>
                </div>
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12} className="mt-10">
        <div className="rounded-[1.2rem] border border-dashed border-line bg-canvas-deep/50 px-6 py-5 typewriter">
          <div className="flex gap-3 text-[13px] leading-relaxed text-ink-soft">
            <span className="mt-2 h-px w-6 shrink-0 bg-clay/50" />
            <p className="max-w-3xl">
              Only 3 working builds for now (Recto Aug1, SwingFrame Aug1, LOCK-IN client Jul30). Older —{" "}
              <span className="text-ink">forms, TheStandard (predecessor of LOCK-IN), retailflow demo (catalog demo), Omni, TheDesiEdit</span> — live in GitHub via{" "}
              <a
                href="https://github.com/muhummadzarrar09-sudo?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted"
              >
                View all projects
              </a>
              . No pills, just name + honest description per your note. <span className="text-clay">[brutalist notebook — staple + redline + marginalia]</span>
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-12">
        <div className="mx-auto max-w-2xl text-center font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          — working builds only — p.03 — unfolded —
        </div>
      </Reveal>

      <Fold label="end of work — fold back" />
    </section>
  );
}
