import { projects } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";

export default function Work() {
  const featured = projects.filter((p) => p.featured); // only 3 working per user: Recto, SwingFrame, LOCK-IN client

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
            href="https://github.com/muhummadzarrar09-sudo?tab=repositories&sort=stargazers"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-mono text-sm text-ink-soft"
          >
            View all projects ↗
          </a>
        </Reveal>
      </div>

      {/* Featured — only 3 working, no pills */}
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="human-card group relative flex h-full flex-col rounded-[1.6rem] border border-line bg-surface p-7 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: p.accent || "var(--color-clay)" }} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{p.tag}</span>
                  <span className="font-mono text-[11px] text-faint">• {p.year}</span>
                </div>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-all group-hover:border-clay group-hover:bg-clay group-hover:text-canvas">
                  ↗
                </span>
              </div>

              <h3 className="mt-6 font-display text-[1.9rem] font-light leading-[1.05] tracking-tightest">{p.name}</h3>
              <p className="mt-2 text-[13px] font-medium text-clay leading-snug">{p.blurb}</p>

              <p className="mt-4 text-[14px] leading-relaxed text-ink-soft text-pretty">{p.description}</p>

              <div className="mt-5 rounded-xl border border-line-soft bg-canvas px-4 py-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Outcome</div>
                <div className="mt-1 text-[13px] leading-relaxed text-ink-soft">{p.outcome}</div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Small note — older builds accessible via View all */}
      <Reveal delay={0.12} className="mt-10">
        <div className="rounded-[1.2rem] border border-dashed border-line bg-canvas-deep/50 px-6 py-5">
          <div className="flex gap-3 text-[13px] leading-relaxed text-ink-soft">
            <span className="mt-2 h-px w-6 shrink-0 bg-clay/50" />
            <p className="max-w-3xl">
              Only showing 3 working builds for now (Recto Aug1, SwingFrame Aug1, LOCK-IN client Jul30). Older ones —{" "}
              <span className="text-ink">
                forms, TheStandard (predecessor of LOCK-IN), retailflow demo (how I build catalogs), Omni, TheDesiEdit
              </span>{" "}
              — live in GitHub. Tap <span className="font-mono text-xs">View all projects</span> to see absolutely latest
              by commit date. No pills, just name + honest description per your note.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Personal end note */}
      <Reveal delay={0.2} className="mt-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">— working builds only —</div>
          <p className="mt-4 font-display text-[18px] leading-relaxed text-muted text-pretty">
            3 for now. The rest is history you can scroll on GitHub.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
