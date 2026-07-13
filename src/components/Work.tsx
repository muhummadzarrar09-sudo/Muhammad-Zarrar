import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { projects, type Project } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { useTilt3D } from "@/hooks/useTilt3D";
import { sound } from "@/lib/sound";

const EASE = [0.22, 1, 0.36, 1] as const;

/* 3D-tilted featured project card with glare */
function FeaturedCard({ p, i }: { p: Project; i: number }) {
  const { ref, move, leave } = useTilt3D(10);

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={p.url}
      target="_blank"
      rel="noreferrer"
      data-cursor="view"
      data-cursor-label="Open ↗"
      onMouseMove={move as unknown as React.MouseEventHandler}
      onMouseLeave={leave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ delay: i * 0.12, duration: 0.9, ease: EASE }}
      className="tilt-card group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface lift"
    >
      {/* visual area */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `radial-gradient(120% 120% at 20% 0%, ${p.accent}22, transparent 60%), radial-gradient(100% 100% at 100% 100%, ${p.accent}33, transparent 55%)`,
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-40" />

        {/* decorative oversized index */}
        <span
          className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[7rem] font-light leading-none tracking-tightest opacity-[0.05]"
          aria-hidden
        >
          0{i + 1}
        </span>

        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: p.accent }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            {p.tag}
          </span>
        </div>
        <div className="absolute bottom-4 right-5 font-mono text-xs text-muted">
          {p.year}
        </div>
        <h3 className="absolute bottom-4 left-5 font-display text-5xl font-light tracking-tightest text-ink sm:text-6xl">
          {p.name}
        </h3>
      </div>

      {/* body */}
      <div className="relative z-10 flex flex-1 flex-col gap-4 p-6">
        <p className="text-base leading-relaxed text-ink-soft text-pretty">
          {p.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

/* Row-style card for the remaining projects */
function Row({ p, i }: { p: Project; i: number }) {
  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      data-cursor="view"
      data-cursor-label="Open ↗"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ delay: i * 0.06, duration: 0.7, ease: EASE }}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-6 transition-colors hover:bg-surface/60 sm:gap-8"
    >
      <span className="font-mono text-xs text-muted">0{i + 3}</span>
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-spark sm:text-3xl">
            {p.name}
          </h3>
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: p.accent }}
          />
        </div>
        <p className="mt-1 truncate text-sm text-muted">{p.blurb}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden font-mono text-xs text-muted sm:block">
          {p.year}
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-spark group-hover:bg-spark group-hover:text-canvas">
          <span className="transition-transform duration-300 group-hover:rotate-45">
            ↗
          </span>
        </span>
      </div>
    </motion.a>
  );
}

/* Plays a subtle whoosh when the section enters the viewport */
function useSectionWhoosh() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const fired = useRef(false);
  useEffect(() => {
    if (inView && !fired.current) {
      fired.current = true;
      sound.whoosh();
    }
  }, [inView]);
  return ref;
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const sectionRef = useSectionWhoosh();

  return (
    <section id="work" ref={sectionRef} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      {/* decorative background number */}
      <span
        className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8"
        aria-hidden
      >
        03
      </span>

      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="03"
          label="Selected Work"
          title={
            <>
              Things I've
              <br />
              <span className="italic text-spark">built & shipped.</span>
            </>
          }
        />
        <Reveal delay={0.1}>
          <a
            href="https://github.com/muhummadzarrar09-sudo"
            target="_blank"
            rel="noreferrer"
            className="link-underline font-mono text-sm text-ink-soft"
          >
            View all on GitHub ↗
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {featured.map((p, i) => (
          <FeaturedCard key={p.name} p={p} i={i} />
        ))}
      </div>

      <div className="mt-14 border-t border-line">
        {rest.map((p, i) => (
          <Row key={p.name} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
