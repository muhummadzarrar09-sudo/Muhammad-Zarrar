import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { biz } from "@/business/data";
import { MagneticButton, RevealWords } from "@/components/primitives";
import { MockWindow } from "@/business/ui";

const EASE = [0.22, 1, 0.36, 1] as const;

function FauxDashboard() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">This week</span>
        <span className="rounded-full bg-circuit/15 px-2 py-0.5 text-[10px] font-medium text-circuit">+38% leads</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[["Bookings", "126"], ["Leads", "84"], ["Reply", "3m"]].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-line bg-canvas p-2.5">
            <div className="text-lg font-semibold text-ink">{v}</div>
            <div className="text-[10px] text-muted">{k}</div>
          </div>
        ))}
      </div>
      <div className="flex h-14 items-end gap-1.5 rounded-lg border border-line bg-canvas p-2">
        {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-spark to-ember"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.07, duration: 0.6, ease: EASE }}
          />
        ))}
      </div>
    </div>
  );
}

function FauxBooking() {
  return (
    <div className="space-y-2.5">
      <div className="text-[11px] font-medium text-ink">Book appointment</div>
      {["09:00 — Free", "11:30 — Free", "14:00 — Taken"].map((t, i) => {
        const [time, st] = t.split(" — ");
        return (
          <div
            key={t}
            className={`flex items-center justify-between rounded-lg border border-line px-2.5 py-1.5 text-[11px] ${
              i === 2 ? "bg-canvas text-muted" : "bg-canvas text-ink-soft"
            }`}
          >
            <span>{time}</span>
            <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${i === 2 ? "bg-line text-muted" : "bg-circuit/15 text-circuit"}`}>{st}</span>
          </div>
        );
      })}
      <div className="rounded-lg bg-spark py-1.5 text-center text-[11px] font-medium text-canvas">
        Confirm on WhatsApp
      </div>
    </div>
  );
}

export default function BusinessHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={ref} className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 pt-28 pb-16 sm:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        {/* LEFT — copy */}
        <motion.div style={{ y }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-circuit" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Available · Booking projects</span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-light leading-[0.98] tracking-tightest text-balance">
            <RevealWords text="I build websites, apps & AI systems that turn" delay={0.25} />
            <br />
            <RevealWords text="attention into revenue." className="italic text-spark" delay={0.7} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty"
          >
            {biz.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton onClick={() => scrollTo("work")} cursorLabel="Explore" className="bg-ink text-canvas hover:bg-spark">
              View my work <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton onClick={() => scrollTo("contact")} variant="outline" cursorLabel="Contact">
              Start a project
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted"
          >
            <span>Age {biz.age}</span>
            <span className="h-1 w-1 rounded-full bg-muted" />
            <span>Full-stack + AI</span>
            <span className="h-1 w-1 rounded-full bg-muted" />
            <span>Ships in days</span>
          </motion.div>
        </motion.div>

        {/* RIGHT — floating mockup cluster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: EASE }}
          className="relative hidden h-[440px] overflow-hidden lg:block"
        >
          <motion.div className="absolute left-0 top-2 w-[74%]" animate={{ y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
            <MockWindow title="dashboard — zarrar.studio">
              <FauxDashboard />
            </MockWindow>
          </motion.div>
          <motion.div className="absolute bottom-2 right-0 w-[56%]" animate={{ y: [0, 12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
            <MockWindow title="bookings">
              <FauxBooking />
            </MockWindow>
          </motion.div>
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spark/15 blur-[80px]" />
        </motion.div>
      </div>
    </section>
  );
}
