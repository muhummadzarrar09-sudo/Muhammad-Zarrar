import { motion } from "framer-motion";
import { profile, socials } from "@/data/portfolio";
import { MagneticButton } from "@/components/primitives";

const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}&body=${encodeURIComponent(profile.emailBody)}`;

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink px-6 py-16 text-canvas sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-spark/20 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-circuit/25 blur-[90px]" />

        <div className="relative">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-canvas/50">
            <span className="text-spark">05</span> • Transmission
          </div>

          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.8rem,8vw,5.5rem)] font-light leading-[0.9] tracking-tightest">
            Idea worth<br />
            <span className="italic text-spark">building?</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-canvas/60 text-pretty">
            Product engineering, applied AI, design-led builds. No template. No noise. Just signal.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href={mailto} className="bg-spark text-canvas hover:bg-canvas hover:text-ink">
              Start transmission →
            </MagneticButton>
            <div className="rounded-full border border-canvas/15 px-5 py-3.5 font-mono text-sm text-canvas/60">
              {profile.email}
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-10 border-t border-canvas/10 pt-8">
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="group">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-canvas/40">{s.label}</div>
                <div className="mt-1 text-canvas/80 group-hover:text-spark transition">{s.handle} ↗</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        Signal locked • {profile.location} • {new Date().getFullYear()}
      </div>
    </section>
  );
}
