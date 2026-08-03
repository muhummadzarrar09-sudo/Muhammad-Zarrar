import { profile, stats } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { Marginalia, Staple, Stamp } from "@/components/Brutalist";

const principles = [
  { k: "ship", v: "Ship fast, then refine — real feedback > perfect plan" },
  { k: "systems", v: "Systems over shortcuts — typed, auditable, boring in the right places" },
  { k: "human", v: "Human first — if it confuses someone, it's not done" },
  { k: "use", v: "If it doesn't get used, it doesn't matter — dogfood it" },
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
        <div className="max-w-[60ch] relative">
          <Marginalia side="left">
            compiling....
            <br />
            <span className="font-mono text-[10px] not-italic text-faint">GitHub bio — still accurate</span>
          </Marginalia>

          <Reveal>
            <p className="font-display text-[1.7rem] font-light leading-[1.3] tracking-tight text-ink text-balance sm:text-[1.9rem] typewriter">
              I&apos;m {profile.name} — a full-stack, AI & mobile engineer from Rawalpindi who got hooked on making computers
              do the boring stuff so people don&apos;t have to.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 space-y-5 text-[16px] leading-[1.8] text-ink-soft text-pretty typewriter">
              <p>
                I started breaking things at 2am, copying snippets I didn&apos;t fully get. Over time I stopped chasing
                frameworks and chased <span className="text-ink">useful</span> — does it solve a real problem? Will it
                still work in 6 months without me babysitting it? That&apos;s why you see Kotlin Android next to Python voice
                agents on my GitHub.
              </p>
              <p className="text-muted">
                Day-to-day now is TypeScript + Next.js + Supabase (LOCK-IN: CLIENT PROJECT — 121 commits Jul 30, auth
                audits, RLS hardening, Cloudflare — not personal OS), Kotlin Android (SwingFrame golf video engine + AI
                diagnostics — shipped phase 1 & 2 Jul 31), and Python voice (Omni: push-to-talk, local AI, 14 test
                suites). Plus latest Aug 1: Recto — 35 commits, console errors side-by-side so crashes are visible — and
                Jul 22-23 TheStandard enrollment v2 + retailflow Marigold & Clay storefront + TheDesiEdit GSAP/Lenis
                landing.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 rounded-[1.2rem] border border-line bg-surface p-5 notebook-page">
              <Staple />
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay flex items-center gap-2">
                How I work now — Aug 2026 <Stamp>BRUTALIST</Stamp>
              </div>
              <ul className="mt-3 space-y-3">
                {principles.map((p) => (
                  <li key={p.k} className="flex gap-3 text-[13.5px] leading-[1.6] text-ink-soft typewriter">
                    <span className="mt-[8px] h-px w-5 shrink-0 bg-clay/40" />
                    <span>{p.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="space-y-5 relative">
          <Marginalia side="right">
            p.01 — about
            <br />
            latest commits Aug1
            <br />
            <span className="font-mono text-[10px] not-italic text-faint">Rawalpindi, PK</span>
          </Marginalia>

          <Reveal delay={0.12}>
            <div className="rounded-[1.6rem] border border-line bg-surface/90 p-6 lift notebook-page">
              <Staple />
              <div className="flex items-center gap-3">
                <img src={profile.avatar} alt="" className="h-10 w-10 rounded-full border border-line" />
                <div>
                  <div className="font-display text-[15px] font-medium leading-none">{profile.name}</div>
                  <div className="mt-1 font-mono text-[11px] text-muted">
                    {profile.location} • {profile.bio}
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3 font-mono text-xs text-muted">
                <div className="flex justify-between">
                  <span>Focus</span>
                  <span className="text-ink">Full-stack + AI + Mobile</span>
                </div>
                <div className="flex justify-between">
                  <span>Stack live</span>
                  <span className="text-ink">TS, Kotlin, Python, Supabase</span>
                </div>
                <div className="flex justify-between">
                  <span>Now</span>
                  <span className="text-clay">Recto / SwingFrame / CLIENT</span>
                </div>
                <div className="h-px bg-line-soft" />
                <div className="text-[12px] leading-relaxed text-ink-soft">
                  {profile.availability}. Latest by commit: Recto Aug1, SwingFrame Aug1, forms Jul30, LOCK-IN CLIENT
                  Jul30, TheStandard Jul23, retailflow Jul22, Omni Jul19, TheDesiEdit Jul16.
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
            <div className="rounded-[1.6rem] border border-dashed border-line bg-canvas-deep/40 p-6 typewriter">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Live stats — GitHub Aug 2 2026</div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl font-light">
                      {s.value}
                      {s.suffix}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wide text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[12px] leading-relaxed text-muted">
                Ordered by latest commit (not pinned): Recto Aug1, SwingFrame Aug1, forms Jul30, LOCK-IN CLIENT Jul30,
                TheStandard Jul23 (predecessor of LOCK-IN), retailflow Jul22 demo (how I build catalogs), Omni Jul19,
                TheDesiEdit Jul16.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
