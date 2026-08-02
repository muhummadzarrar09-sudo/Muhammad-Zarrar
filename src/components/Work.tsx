import { projects } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="03"
          label="Selected work"
          title={
            <>
              Things I&apos;ve built
              <br />
              <span className="italic text-clay">and shipped.</span>
            </>
          }
        />
        <Reveal delay={0.08}>
          <a
            href="https://github.com/muhummadzarrar09-sudo"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-mono text-sm text-ink-soft"
          >
            All repos on GitHub ↗
          </a>
        </Reveal>
      </div>

      {/* Featured — journal style */}
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
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

              <h3 className="mt-6 font-display text-[1.9rem] font-light leading-[1.05] tracking-tightest">
                {p.name}
              </h3>
              <p className="mt-2 text-[13px] font-medium text-clay">{p.blurb}</p>

              <p className="mt-4 text-[14px] leading-relaxed text-ink-soft text-pretty">{p.description}</p>

              <div className="mt-5 rounded-xl border border-line-soft bg-canvas px-4 py-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Outcome</div>
                <div className="mt-1 text-[13px] leading-relaxed text-ink-soft">{p.outcome}</div>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.proof.map((proof) => (
                  <span key={proof} className="rounded-full border border-line bg-canvas-deep/60 px-3 py-1 font-mono text-[10px] text-ink-soft">
                    {proof}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full bg-canvas-deep px-3 py-1 font-mono text-[10px] text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Small note */}
      <Reveal delay={0.12} className="mt-10">
        <div className="rounded-[1.2rem] border border-dashed border-line bg-canvas-deep/50 px-6 py-5">
          <div className="flex gap-3 text-[13px] leading-relaxed text-ink-soft">
            <span className="mt-2 h-px w-6 shrink-0 bg-clay/50" />
            <p className="max-w-3xl">
              These are public repos, but the interesting part is what you don&apos;t see in the
              README — edge cases, error handling, the 3am fixes because someone actually depends on it.
              If you want the story behind one, email me.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Rest — minimal log */}
      <div className="mt-16 border-t border-line">
        <div className="py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          More builds — compact log
        </div>
        <div className="divide-y divide-line">
          {rest.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.04}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 transition-colors hover:bg-surface/60 sm:gap-8"
              >
                <span className="font-mono text-xs text-faint">0{i + 3}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-display text-xl font-medium tracking-tight group-hover:text-clay sm:text-2xl">
                      {p.name}
                    </h3>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                    <span className="hidden font-mono text-[11px] text-muted sm:block">{p.tag}</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-muted">{p.outcome}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden font-mono text-xs text-muted sm:block">{p.year}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-clay group-hover:text-clay">
                    ↗
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Personal end note */}
      <Reveal delay={0.2} className="mt-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">— end of work —</div>
          <p className="mt-4 font-display text-[18px] leading-relaxed text-muted text-pretty">
            I don&apos;t have hundreds of projects. I have a few I cared about and actually finished.
            That feels more honest.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
