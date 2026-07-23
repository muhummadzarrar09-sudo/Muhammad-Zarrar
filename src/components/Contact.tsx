import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profile, socials } from "@/data/portfolio";
import { sound } from "@/lib/sound";
import { MagneticButton, Reveal } from "@/components/primitives";
import { KineticText } from "@/components/KineticText";
import { CinematicChapter } from "@/components/CinematicChapter";
import { CinematicSculpture } from "@/components/CinematicSculpture";
import { ScrollReactiveSculpture } from "@/components/ScrollReactiveSculpture";
import { CinematicSpacer } from "@/components/CinematicSpacer";

const EASE = [0.22, 1, 0.36, 1] as const;

type FormState = {
  name: string;
  email: string;
  type: string;
  message: string;
};

const emptyForm: FormState = { name: "", email: "", type: "Product Engineering", message: "" };
const PROJECT_TYPES = ["Product Engineering", "Applied AI", "Design & Motion", "Consulting"];

export default function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<any>({});
  const [status, setStatus] = useState<"idle" | "transmitting" | "success">("idle");
  const [txLog, setTxLog] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(profile.email);
    sound.chime();
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.click();

    if (!form.name || !form.email || !form.message) {
      sound.pew();
      return;
    }

    setStatus("transmitting");
    setTxLog([]);

    const logs = [
      "$ initializing cinematic transmission...",
      "> encoding kinetic payload",
      "> locking into editorial orbit",
      "> delivering to Muhammad Zarrar",
      "> signal received ✓",
    ];

    logs.forEach((log, i) => {
      setTimeout(() => {
        setTxLog((p) => [...p, log]);
        if (log.includes("✓")) {
          sound.chime();
          setTimeout(() => setStatus("success"), 420);
        } else sound.pew();
      }, (i + 1) * 620);
    });
  };

  const reset = () => {
    setForm(emptyForm);
    setStatus("idle");
    setTxLog([]);
  };

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}&body=${encodeURIComponent(profile.emailBody)}`;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-ink px-6 py-16 text-canvas sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-spark/30 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-circuit/30 blur-[90px]" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] items-start">
          {/* LEFT — cinematic headline */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-canvas/50">
                <span className="text-spark">05</span>
                <span className="h-px w-8 bg-canvas/20" />
                <span>Contact</span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-xl font-display text-[clamp(2.4rem,6.2vw,4.1rem)] font-light leading-[1.02] tracking-tightest text-balance">
                Have an idea worth
                <br />
                <KineticText text="building?" mode="refined" className="italic text-spark" scrollTrigger={false} />
              </h2>
            </Reveal>

            <div className="mt-8">
              <CinematicChapter 
                image="/images/cinematic-07.jpg"
                chapter="FINAL TRANSMISSION"
                title="Let’s make something that feels alive."
                body="Send a signal. I’ll answer with clarity."
                variant="slowZoom"
              />
            </div>

            <CinematicSpacer height={110} />

            {/* Final cinematic 3D — scroll-reactive sculpture */}
            <div className="mt-12">
              <ScrollReactiveSculpture />
            </div>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-canvas/60">
                I’m open to product engineering, applied AI and design-led builds.
                Let’s make something that feels alive.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href={mailto} className="bg-spark text-canvas hover:bg-canvas hover:text-ink">
                Start conversation
              </MagneticButton>
              <button onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-canvas/20 px-6 py-3.5 text-sm text-canvas/80 hover:border-canvas/50">
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </div>

            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-canvas/10 pt-8">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="group">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas/40">{s.label}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-canvas/90 group-hover:text-spark">
                    <span className="link-underline">{s.handle}</span> ↗
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — cinematic transmitter form */}
          <div className="relative min-h-[480px] rounded-2xl border border-canvas/12 bg-canvas/[0.03] p-7 sm:p-8">
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.form key="form" onSubmit={submit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono text-xs text-canvas/40 mb-1.5">YOUR NAME</label>
                      <input value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full rounded-lg border border-canvas/15 bg-canvas/5 px-4 py-3 text-canvas placeholder:text-canvas/30 focus:border-spark/70" placeholder="Name" />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-canvas/40 mb-1.5">EMAIL</label>
                      <input value={form.email} type="email" onChange={(e) => set("email", e.target.value)} className="w-full rounded-lg border border-canvas/15 bg-canvas/5 px-4 py-3 text-canvas placeholder:text-canvas/30 focus:border-spark/70" placeholder="you@studio.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-canvas/40 mb-2">WHAT ARE WE BUILDING?</label>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((t) => (
                        <button type="button" key={t} onClick={() => set("type", t)} className={`rounded-full px-5 py-1.5 text-xs font-mono transition ${form.type === t ? "bg-spark text-canvas" : "bg-canvas/5 text-canvas/60 hover:bg-canvas/10"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-canvas/40 mb-1.5">TELL ME ABOUT IT</label>
                    <textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} className="w-full rounded-lg border border-canvas/15 bg-canvas/5 p-4 text-canvas placeholder:text-canvas/30 focus:border-spark/70" placeholder="I’m building a..." />
                  </div>

                  <button type="submit" className="w-full py-4 bg-canvas text-ink rounded-full font-medium text-sm tracking-wide hover:bg-spark hover:text-canvas transition">TRANSMIT SIGNAL</button>
                </motion.form>
              )}

              {status === "transmitting" && (
                <div className="font-mono text-sm text-canvas/70 space-y-3 pt-3">
                  {txLog.map((line, i) => (
                    <div key={i} className={line.includes("✓") ? "text-volt" : ""}>{line}</div>
                  ))}
                </div>
              )}

              {status === "success" && (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="text-6xl mb-5">✦</div>
                  <KineticText text="Signal locked." mode="stagger" className="font-display text-3xl tracking-tight" />
                  <p className="mt-4 max-w-xs text-sm text-canvas/60">I’ll get back to you within a day.</p>
                  <button onClick={reset} className="mt-8 text-xs underline">Send another</button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
