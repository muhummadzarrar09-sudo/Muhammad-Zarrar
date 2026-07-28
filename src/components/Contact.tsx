import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import { profile, socials } from "@/data/portfolio";
import { sound } from "@/lib/sound";
import { MagneticButton, Reveal } from "@/components/primitives";
import { KineticText } from "@/components/KineticText";
import { CinematicChapter } from "@/components/CinematicChapter";
import { CinematicSpacer } from "@/components/CinematicSpacer";
import { CinematicLoadingFrame } from "@/components/LazyFallback";


type FormState = {
  name: string;
  email: string;
  type: string;
  message: string;
};

type FormErrors = Partial<Record<keyof Pick<FormState, "name" | "email" | "message">, string>>;

const emptyForm: FormState = { name: "", email: "", type: "Product Engineering", message: "" };
const PROJECT_TYPES = ["Product Engineering", "Applied AI", "Design & Motion", "Consulting"];

function buildMailto(form: FormState) {
  const subject = `Project Inquiry — ${form.type}`;
  const body = [
    "Hi Muhammad,",
    "",
    "I came from your portfolio and would like to discuss a project.",
    "",
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    `Project type: ${form.type}`,
    "",
    "Message:",
    form.message.trim(),
    "",
    "Best,",
    form.name.trim(),
  ].join("\n");

  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  else if (form.name.length > 80) errors.name = "Name must be under 80 characters.";
  if (!form.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Please enter a valid email address.";
  else if (form.email.length > 120) errors.email = "Email must be under 120 characters.";
  if (!form.message.trim()) errors.message = "Please describe the project briefly.";
  else if (form.message.length > 1000) errors.message = "Message must be under 1000 characters.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "transmitting" | "success">("idle");
  const [txLog, setTxLog] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [lastMailto, setLastMailto] = useState("");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current = [];
  };

  const schedule = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timers.current = timers.current.filter((item) => item !== timer);
      callback();
    }, delay);
    timers.current.push(timer);
  };

  useEffect(() => clearTimers, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      sound.chime();
      setCopied(true);
      schedule(() => setCopied(false), 1800);
    } catch {
      // Clipboard failed — do not navigate away; keep email visible as fallback
      setCopied(false);
      // Fallback UI will show the mailto link in success state; no destructive navigation
    }
  };

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k in errors) setErrors((current) => ({ ...current, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.click();
    clearTimers();

    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      sound.pew();
      return;
    }

    const mailto = buildMailto(form);
    if (mailto.length > 2000) {
      setErrors({ message: "Message too long for email draft. Please shorten it (under ~1000 chars)." });
      sound.pew();
      return;
    }

    setLastMailto(mailto);
    setStatus("transmitting");
    setTxLog([]);
    setErrors({});

    const logs = [
      "$ validating project signal...",
      "> encoding inquiry into email draft",
      "> attaching sender details",
      "> opening your mail client",
      "> email draft ready ✓",
    ];

    logs.forEach((log, i) => {
      schedule(() => {
        setTxLog((p) => [...p, log]);
        if (log.includes("✓")) {
          sound.chime();
          try {
            window.location.href = mailto;
          } catch {
            // Fallback: keep success state visible with manual link
          }
          schedule(() => setStatus("success"), 420);
        } else {
          sound.pew();
        }
      }, (i + 1) * 520);
    });
  };

  const reset = () => {
    clearTimers();
    setForm(emptyForm);
    setStatus("idle");
    setTxLog([]);
    setErrors({});
    setLastMailto("");
  };

  const starterMailto = `mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}&body=${encodeURIComponent(profile.emailBody)}`;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-ink px-6 py-16 text-canvas sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-spark/30 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-circuit/30 blur-[90px]" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] items-start">
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

            <div className="mt-12">
              <Suspense fallback={<CinematicLoadingFrame label="Loading scroll sculpture" title="The form moves with you." />}>
              </Suspense>
            </div>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-canvas/60">
                I’m open to product engineering, applied AI and design-led builds.
                Let’s make something that feels alive.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href={starterMailto} className="bg-spark text-canvas hover:bg-canvas hover:text-ink">
                Start conversation
              </MagneticButton>
              <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-canvas/20 px-6 py-3.5 text-sm text-canvas/80 hover:border-canvas/50">
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </div>

            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-canvas/10 pt-8">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target={s.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas/40">{s.label}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-canvas/90 group-hover:text-spark">
                    <span className="link-underline">{s.handle}</span> ↗
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="relative min-h-[480px] rounded-2xl border border-canvas/12 bg-canvas/[0.03] p-7 sm:p-8">
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.form key="form" onSubmit={submit} className="space-y-6" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block font-mono text-xs text-canvas/40 mb-1.5">YOUR NAME</label>
                      <input
                        id="contact-name"
                        required
                        maxLength={80}
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        className="w-full rounded-lg border border-canvas/15 bg-canvas/5 px-4 py-3 text-canvas placeholder:text-canvas/30 focus:border-spark/70"
                        placeholder="Name"
                      />
                      {errors.name && <p id="contact-name-error" className="mt-1.5 text-xs text-spark-soft">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block font-mono text-xs text-canvas/40 mb-1.5">EMAIL</label>
                      <input
                        id="contact-email"
                        required
                        maxLength={120}
                        value={form.email}
                        type="email"
                        onChange={(e) => set("email", e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        className="w-full rounded-lg border border-canvas/15 bg-canvas/5 px-4 py-3 text-canvas placeholder:text-canvas/30 focus:border-spark/70"
                        placeholder="you@studio.com"
                      />
                      {errors.email && <p id="contact-email-error" className="mt-1.5 text-xs text-spark-soft">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <div className="block font-mono text-xs text-canvas/40 mb-2" id="contact-type-label">WHAT ARE WE BUILDING?</div>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="contact-type-label">
                      {PROJECT_TYPES.map((t) => (
                        <button type="button"
                          key={t}
                          role="radio"
                          aria-checked={form.type === t}
                          onClick={() => set("type", t)}
                          className={`rounded-full px-5 py-1.5 text-xs font-mono transition ${form.type === t ? "bg-spark text-canvas" : "bg-canvas/5 text-canvas/60 hover:bg-canvas/10"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-mono text-xs text-canvas/40 mb-1.5">TELL ME ABOUT IT</label>
                    <textarea
                      id="contact-message"
                      required
                      maxLength={1000}
                      rows={4}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className="w-full rounded-lg border border-canvas/15 bg-canvas/5 p-4 text-canvas placeholder:text-canvas/30 focus:border-spark/70"
                      placeholder="I’m building a..."
                    />
                    {errors.message && <p id="contact-message-error" className="mt-1.5 text-xs text-spark-soft">{errors.message}</p>}
                  </div>

                  <button type="submit" className="w-full py-4 bg-canvas text-ink rounded-full font-medium text-sm tracking-wide hover:bg-spark hover:text-canvas transition">OPEN EMAIL DRAFT</button>
                </motion.form>
              )}

              {status === "transmitting" && (
                <div className="font-mono text-sm text-canvas/70 space-y-3 pt-3" aria-live="polite">
                  {txLog.map((line, i) => (
                    <div key={i} className={line.includes("✓") ? "text-volt" : ""}>{line}</div>
                  ))}
                </div>
              )}

              {status === "success" && (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="text-6xl mb-5">✦</div>
                  <KineticText text="Draft ready." mode="stagger" className="font-display text-3xl tracking-tight" />
                  <p className="mt-4 max-w-xs text-sm text-canvas/60">
                    Your email app should now contain the project details. If it did not open, use the fallback link below.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    {lastMailto && <a href={lastMailto} className="text-xs underline">Open email draft again</a>}
                    <button type="button" onClick={reset} className="text-xs underline">Send another</button>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}