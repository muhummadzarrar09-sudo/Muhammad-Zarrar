import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile, stats } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { KineticText } from "@/components/KineticText";
import { CinematicChapter } from "@/components/CinematicChapter";
import { CinematicSpacer } from "@/components/CinematicSpacer";
import { sound } from "@/lib/sound";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const principles = [
  "Research before pixels",
  "Systems over shortcuts",
  "Motion with meaning",
  "Ship, then refine",
];

/* Plays a subtle whoosh when the section enters the viewport */
function useWhoosh() {
  const ref = useRef<HTMLElement>(null);
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

export default function About() {
  const sectionRef = useWhoosh();
  return (
    <section id="about" ref={sectionRef} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      {/* decorative background number */}
      <span
        className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8"
        aria-hidden
      >
        01
      </span>
      <SectionHeading
        index="01"
        label="About"
        title={
          <>
            <KineticText text="Part engineer," mode="stagger" delay={0.02} />
            <br />
            <KineticText 
              text="part design-obsessive." 
              mode="refined" 
              delay={0.38} 
              className="italic text-spark" 
            />
          </>
        }
      />

      {/* FULL CINEMATIC CHAPTER — Origin */}
      <CinematicChapter 
        image="/images/cinematic-02.jpg"
        chapter="CHAPTER 01 — ORIGIN"
        title="I treat every project like a small film."
        body="Research. Light. Shadow. Intention. Every decision is directed with certainty."
        variant="slowZoom"
      />

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <Reveal>
          <p className="font-display text-2xl font-light leading-snug tracking-tight text-ink text-balance sm:text-[1.7rem]">
            I’m {profile.name} — a full-stack developer who treats every product
            like a small studio would: research, branding, layout and motion
            working as one.
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft text-pretty">
            My work lives where applied AI meets careful engineering. I build
            autonomous agents that listen and act, voice interfaces that feel
            natural, and full-stack products engineered from the database to the
            last pixel.
          </p>

          <div className="mt-9 flex flex-wrap gap-2.5">
            {principles.map((p) => (
              <span
                key={p}
                className="rounded-full border border-line bg-surface/70 px-4 py-2 text-sm text-ink-soft"
              >
                {p}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative h-full min-h-[280px] overflow-hidden rounded-3xl">
            <img
              src="/images/cinematic-06.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80" />
          </div>
        </Reveal>
      </div>

      {/* Extra cinematic beat after About */}
      <div className="mt-12">
        <CinematicChapter 
          image="/images/cinematic-01.jpg"
          chapter="INTERLUDE"
          title="The work is the story."
          body="Not the pixels. Not the code. The feeling when someone uses it and it just works — quietly, beautifully."
          variant="parallax"
        />
      </div>

      <CinematicSpacer height={140} />

      {/* Cinematic closer for About */}
      <CinematicChapter 
        image="/images/cinematic-06.jpg"
        chapter="THE DETAILS"
        title="The seams disappear."
        body="Craft is not decoration. It is the story itself."
        variant="parallax"
      />

      {/* Final cinematic frame for the chapter */}
      <div className="mt-8 text-center text-xs font-mono tracking-[3px] text-muted">— END OF CHAPTER 01 —</div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-canvas px-6 py-8"
          >
            <div className="font-display text-4xl font-light tracking-tightest text-ink sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm text-muted">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
