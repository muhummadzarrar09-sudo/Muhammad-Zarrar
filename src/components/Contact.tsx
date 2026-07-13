import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profile, socials } from "@/data/portfolio";
import { sound } from "@/lib/sound";
import { MagneticButton, Reveal } from "@/components/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

type FormState = {
  name: string;
  email: string;
  type: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  type: "Product Engineering",
  message: "",
};

const PROJECT_TYPES = [
  "Product Engineering",
  "Applied AI",
  "Design & Motion",
  "Consulting",
];

export default function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "transmitting" | "success">("idle");
  const [txLog, setTxLog] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      sound.chime();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k !== "type" && errors[k]) {
      setErrors((e) => ({ ...e, [k]: undefined }));
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name";
    
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address";
    }
    
    if (!form.message.trim()) {
      nextErrors.message = "Please tell me a bit about your project goals";
    } else if (form.message.trim().length < 10) {
      nextErrors.message = "Please provide a slightly longer description (min 10 chars)";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.click();
    
    if (!validate()) {
      sound.pew(); // Error indicator
      return;
    }

    // Start animated sequence
    setStatus("transmitting");
    setTxLog([]);

    const logs = [
      "$ initializing secure transmitter...",
      "> packaging payload (payload.json)...",
      "> allocating satellite network relay...",
      "> broadcasting packet to muhummadzarrar09@gmail.com...",
      "> receipt acknowledged by remote server...",
      "> transmission successful ✓",
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTxLog((prev) => [...prev, log]);
        if (log.includes("✓")) {
          sound.chime(); // Celebration
          setTimeout(() => {
            setStatus("success");
          }, 400);
        } else {
          sound.pew(); // Quick cyber tick
        }
      }, (index + 1) * 550);
    });
  };

  const resetForm = () => {
    sound.click();
    setForm(emptyForm);
    setErrors({});
    setStatus("idle");
    setTxLog([]);
  };

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    profile.emailSubject,
  )}&body=${encodeURIComponent(profile.emailBody)}`;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink px-6 py-16 text-canvas sm:px-12 sm:py-20">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-spark/30 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-circuit/30 blur-[90px]" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] items-start">
          {/* LEFT — identity & text */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-canvas/50">
                <span className="text-spark">05</span>
                <span className="h-px w-8 bg-canvas/20" />
                <span>Contact</span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-xl font-display text-[clamp(2.3rem,6vw,4rem)] font-light leading-[1.02] tracking-tightest text-balance">
                Have an idea worth{" "}
                <span className="italic text-spark">building?</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-canvas/60 text-pretty">
                I’m open to product engineering, applied AI and design-led builds.
                Tell me what you’re making — let’s lock in the signal.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticButton
                  href={mailto}
                  variant="solid"
                  cursorLabel="Compose"
                  className="bg-spark text-canvas hover:bg-canvas hover:text-ink"
                >
                  Start quick conversation ↗
                </MagneticButton>
                <button
                  onClick={copy}
                  data-hover
                  data-cursor-label="Copy email"
                  className="inline-flex items-center gap-2 rounded-full border border-canvas/20 px-6 py-3.5 text-sm font-medium text-canvas/80 transition-colors hover:border-canvas/50 hover:text-canvas"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="ok"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                      >
                        Copied ✓
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                      >
                        Copy email
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-canvas/35">
                ✦ Launches your mail client with a detailed brief template
              </p>
            </Reveal>

            {/* socials */}
            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-canvas/10 pt-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas/40">
                    {s.label}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-canvas/90 transition-colors group-hover:text-spark">
                    <span className="link-underline">{s.handle}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — functional contact form & visual transmitter states */}
          <div className="relative min-h-[460px] rounded-2xl border border-canvas/12 bg-canvas/[0.03] p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {/* IDLE state — clean inputs */}
              {status === "idle" && (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="space-y-5"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Your name" error={errors.name}>
                      <input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="e.g. Zarrar"
                        className={inputStyle}
                      />
                    </Field>
                    <Field label="Email address" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="e.g. name@domain.com"
                        className={inputStyle}
                      />
                    </Field>
                  </div>

                  <Field label="Project Focus">
                    <div className="flex flex-wrap gap-2 mt-1">
                      {PROJECT_TYPES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => set("type", t)}
                          className={`rounded-full px-4 py-2 text-xs font-mono transition-all duration-300 ${
                            form.type === t
                              ? "bg-spark text-canvas border border-spark shadow-md shadow-spark/15"
                              : "bg-canvas/5 text-canvas/60 border border-canvas/12 hover:border-canvas/30 hover:text-canvas"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="What are you building?" error={errors.message}>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Briefly describe your goals, features, or timeline..."
                      className={`${inputStyle} resize-none`}
                    />
                  </Field>

                  <button
                    type="submit"
                    data-hover
                    data-cursor-label="Transmit"
                    className="w-full relative flex items-center justify-center gap-2 rounded-full bg-canvas text-ink py-4 text-sm font-semibold hover:bg-spark hover:text-canvas transition-all duration-300 shadow-xl shadow-ink/20"
                  >
                    <span>Transmit Signal</span>
                    <span className="font-mono text-xs">📡</span>
                  </button>
                </motion.form>
              )}

              {/* TRANSMITTING state — cyber logging */}
              {status === "transmitting" && (
                <motion.div
                  key="transmitting"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="flex h-full flex-col justify-between font-mono text-[12px] text-canvas/70"
                >
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-2 text-spark">
                      <span className="h-2 w-2 rounded-full bg-spark animate-ping" />
                      <span className="uppercase tracking-[0.2em] font-semibold">Broadcasting signal</span>
                    </div>
                    <div className="h-px w-full bg-canvas/15 my-4" />
                    <div className="space-y-2 leading-relaxed text-canvas/50">
                      {txLog.map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={log.includes("✓") ? "text-volt font-medium" : ""}
                        >
                          {log}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-16 flex items-center justify-between border-t border-canvas/10 pt-4 text-[10px] text-canvas/30 uppercase tracking-widest">
                    <span>Sat-relay locked</span>
                    <span className="animate-pulse">TX power 100%</span>
                  </div>
                </motion.div>
              )}

              {/* SUCCESS state */}
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="relative grid h-16 w-16 place-items-center rounded-full bg-volt/10 text-volt border border-volt/25">
                    <span className="absolute inset-0 rounded-full bg-volt/20 animate-ping opacity-60" />
                    <span className="text-2xl">✓</span>
                  </div>

                  <h3 className="mt-6 font-display text-3xl font-light tracking-tight text-canvas">
                    Signal Locked
                  </h3>
                  
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-canvas/60 text-pretty">
                    Your transmission has bypassed the noise and arrived directly in Muhammad Zarrar's ledger. He will decipher and respond via email within 24 hours.
                  </p>

                  <div className="h-px w-24 bg-canvas/15 my-6" />

                  <button
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 rounded-full border border-canvas/20 px-6 py-2.5 text-xs font-mono text-canvas/70 hover:border-canvas/50 hover:text-canvas transition"
                  >
                    <span>Transmit new signal</span>
                    <span>↺</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputStyle =
  "w-full rounded-lg border border-canvas/15 bg-canvas/5 px-3.5 py-2.5 text-sm text-canvas placeholder-canvas/30 outline-none transition-all duration-300 focus:border-spark/50 focus:bg-canvas/[0.08]";

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="block text-left w-full">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-canvas/40">
        {label}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1 font-mono text-[10px] text-spark font-medium"
          >
            ⚠️ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
