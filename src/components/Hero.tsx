import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { MagneticButton, RevealWords } from "@/components/primitives";
import Terminal from "@/components/Terminal";
import { navigate } from "@/router";

const EASE = [0.16, 1, 0.3, 1] as const;

/* A floating glass status chip — keeps the hero alive without clutter */
function FloatChip({
  children,
  pos,
  delay,
}: {
  children: React.ReactNode;
  pos: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: EASE }}
      className={`absolute z-20 ${pos}`}
    >
      <div
        className="animate-float flex items-center gap-2 rounded-xl border border-white/45 bg-white/35 px-3 py-2 shadow-lg shadow-ink/10 backdrop-blur-md"
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function TerminalStage() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] [perspective:1200px]">
      <Terminal />

      {/* single floating status accent — the terminal lists the rest */}
      <FloatChip pos="-top-5 -left-6" delay={0.9}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-circuit" />
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
          Online
        </span>
      </FloatChip>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 pt-28 pb-16 sm:px-8"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* LEFT — identity */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-circuit" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              {profile.availability}
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(3.2rem,11vw,8.5rem)] font-light leading-[0.92] tracking-tightest">
            <RevealWords text="Muhammad" delay={0.05} />
            <br />
            <RevealWords text="Zarrar" className="italic text-spark" delay={0.25} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty sm:text-xl"
          >
            {profile.role}. {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#work" cursorLabel="Explore">
              View selected work
              <span aria-hidden>↘</span>
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline" cursorLabel="Contact">
              Get in touch
            </MagneticButton>
          </motion.div>

          {/* Entry point to the local-business / clinics sub-site */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
            onClick={() => navigate("/business")}
            data-hover
            data-cursor-label="Open"
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2 text-xs text-muted backdrop-blur transition-colors hover:border-spark/50 hover:text-ink"
          >
            <span>For clinics & local businesses</span>
            <span className="font-medium text-spark transition-transform duration-300 group-hover:translate-x-0.5">
              View the studio site →
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted"
          >
            <span>{profile.location}</span>
            <span className="h-1 w-1 rounded-full bg-muted" />
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              @{profile.handle}
            </a>
          </motion.div>
        </div>

        {/* RIGHT — the live terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: EASE }}
          className="hidden lg:block"
        >
          <TerminalStage />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute left-0 top-0 h-4 w-full bg-spark"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
