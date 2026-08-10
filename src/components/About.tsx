import { profile, github } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { Staple } from "@/components/Brutalist";

const principles = [
  { k: "ship", v: "Ship fast, then refine — real feedback beats perfect plans" },
  { k: "systems", v: "Systems over shortcuts — typed, auditable, boring where it matters" },
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
            Built for the messy,
            <br />
            <span className="italic text-clay-deep">important parts</span>
            <br /> of a product.
          </>
        }
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-[60ch] relative">
          <Reveal>
            <p className="font-display text-[1.7rem] font-light leading-[1.3] tracking-tight text-ink text-balance sm:text-[1.9rem]">
              I&apos;m {profile.name} — an independent product engineer from Rawalpindi who helps turn complicated workflows into software people can actually work with.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 space-y-5 text-[16px] leading-[1.8] text-ink-soft text-pretty sm:text-[18px]">
              <p>
                I care about the point where an ambitious idea meets the annoying reality: unclear requirements, tricky edge cases, fragile data, and people who need the thing to feel obvious. That&apos;s where product work gets real.
              </p>
              <p className="text-muted">
                That&apos;s why you&apos;ll see Kotlin Android beside Python voice agents and TypeScript product systems in my work. The stack follows the problem — not the other way around.
              </p>
              <p>
                My job is not to add technology for its own sake. It&apos;s to make the useful path feel <span className="text-ink font-medium">clear, dependable, and worth coming back to.</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 rounded-2xl border border-line-strong bg-surface p-5 notebook-page">
              <Staple />
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep flex items-center gap-2">
                How I work
              </div>
              <ul className="mt-3 space-y-3">
                {principles.map((p) => (
                  <li key={p.k} className="flex gap-3 text-[15px] leading-[1.6] text-ink-soft">
                    <span className="mt-[8px] h-px w-5 shrink-0 bg-clay/40" />
                    <span>{p.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="space-y-5 relative">
          <Reveal delay={0.12}>
            <div className="rounded-3xl border border-line-strong bg-surface/90 p-6 lift notebook-page">
              <Staple />
              <div className="flex items-center gap-3">
                <img src={profile.avatar} alt={profile.name} className="h-10 w-10 rounded-full border border-line-strong" />
                <div>
                  <div className="font-display text-[15px] font-medium leading-none">{profile.name}</div>
                  <div className="mt-1 font-mono text-[11px] text-muted">
                    {profile.location} · {profile.bio}
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3 font-mono text-xs text-muted">
                <div className="flex justify-between">
                  <span>Focus</span>
                  <span className="text-ink">Full-stack + AI + Mobile</span>
                </div>
                <div className="flex justify-between">
                  <span>Stack</span>
                  <span className="text-ink">TS, Kotlin, Python, Supabase</span>
                </div>
                <div className="flex justify-between">
                  <span>Now</span>
                  <span className="text-clay-deep">LOCK-IN · SwingFrame · Recto</span>
                </div>
                <div className="h-px bg-line-strong" />
                <div className="text-[12px] leading-relaxed text-ink-soft">
                  {profile.availability}. {github.totalRepos} public repos, {github.recentCommits30d} pushes in the last 30 days.
                </div>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm text-canvas transition-colors hover:bg-clay-deep"
              >
                Email me — {profile.email}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
