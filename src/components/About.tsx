import { profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";

const principles = [
  { k: "ship", v: "Ship fast, then refine — real feedback > perfect plan" },
  { k: "systems", v: "Systems over shortcuts — typed, maintainable, boring in the right places" },
  { k: "human", v: "Human first — if it confuses someone, it's not done" },
  { k: "use", v: "If it doesn't get used, it doesn't matter" },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        index="01"
        label="About"
        title={
          <>
            Part engineer,
            <br />
            <span className="italic text-clay">part human trying</span>
            <br /> to make things work.
          </>
        }
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-[60ch]">
          <Reveal>
            <p className="font-display text-[1.7rem] font-light leading-[1.3] tracking-tight text-ink text-balance sm:text-[1.9rem]">
              I&apos;m {profile.name} — a full-stack developer from Rawalpindi who got
              hooked on making computers do the boring stuff so people don&apos;t have to.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 space-y-5 text-[16px] leading-[1.8] text-ink-soft text-pretty">
              <p>
                I started like most of us — breaking things, Googling at 2am, copying
                snippets I didn&apos;t fully understand. Over time I stopped chasing
                frameworks and started chasing <span className="text-ink">useful</span>. 
                Does it solve a real problem? Can someone non-technical actually use it?
                Will it still work in 6 months without me babysitting it?
              </p>
              <p className="text-muted">
                My day-to-day is TypeScript, React, Python, and a lot of messing with
                LLMs, voice, and browser automation. I&apos;ve been building voice agents
                that listen properly, dashboards that don&apos;t make you want to close
                the tab, and booking / catalog systems for real businesses that need to
                make money this week, not next year.
              </p>
              <p className="text-muted">
                Outside code — I like quiet mornings, long walks, and taking notes that
                I&apos;ll never organize. I&apos;m learning to write more, ship smaller,
                and leave things simpler than I found them.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 rounded-[1.2rem] border border-line bg-surface p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">How I work</div>
              <ul className="mt-3 space-y-3">
                {principles.map((p) => (
                  <li key={p.k} className="flex gap-3 text-[13.5px] leading-[1.6] text-ink-soft">
                    <span className="mt-[8px] h-px w-5 shrink-0 bg-clay/40" />
                    <span>{p.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="space-y-5">
          <Reveal delay={0.12}>
            <div className="rounded-[1.6rem] border border-line bg-surface/90 p-6 lift">
              <div className="flex items-center gap-3">
                <img src={profile.avatar} alt="" className="h-10 w-10 rounded-full border border-line" />
                <div>
                  <div className="font-display text-[15px] font-medium leading-none">{profile.name}</div>
                  <div className="mt-1 font-mono text-[11px] text-muted">{profile.location} • Remote-first</div>
                </div>
              </div>
              <div className="mt-5 space-y-3 font-mono text-xs text-muted">
                <div className="flex justify-between">
                  <span>Focus</span>
                  <span className="text-ink">Full-stack + AI systems</span>
                </div>
                <div className="flex justify-between">
                  <span>Stack</span>
                  <span className="text-ink">TS, React, Python</span>
                </div>
                <div className="flex justify-between">
                  <span>Now</span>
                  <span className="text-clay">Omni voice agent</span>
                </div>
                <div className="h-px bg-line-soft" />
                <div className="text-[12px] leading-relaxed text-ink-soft">
                  Available for select projects — I take 1-2 at a time, so I can actually go
                  deep. Best way to reach me is email.
                </div>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-ink px-4 py-2.5 text-sm text-canvas transition-colors hover:bg-clay-deep"
              >
                Email me — {profile.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-[1.6rem] border border-dashed border-line bg-canvas-deep/40 p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Small facts</div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <div className="font-display text-2xl font-light">14+</div>
                  <div className="font-mono text-[10px] uppercase tracking-wide text-muted">Repos shipped</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-light">6</div>
                  <div className="font-mono text-[10px] uppercase tracking-wide text-muted">AI systems</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-light">Rawalpindi</div>
                  <div className="font-mono text-[10px] uppercase tracking-wide text-muted">Based, remote</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-light">100%</div>
                  <div className="font-mono text-[10px] uppercase tracking-wide text-muted">Hand-built</div>
                </div>
              </div>
              <p className="mt-4 text-[12px] leading-relaxed text-muted">
                No templates. No theme-forest. Just me, a lot of commits, and trying to get the details right.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
