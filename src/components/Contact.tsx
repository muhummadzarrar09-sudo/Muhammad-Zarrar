import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile, socials } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { Staple } from "@/components/Brutalist";
import Signature from "@/components/ui/Signature";
import { Mail, Copy, Check, ExternalLink, Send } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  type: string;
  message: string;
};

type FormErrors = Partial<Record<keyof Pick<FormState, "name" | "email" | "message">, string>>;

const emptyForm: FormState = { name: "", email: "", type: "Product", message: "" };
const TYPES = ["Product", "AI Agent", "Voice", "Consulting", "Other"];

const EASE = [0.25, 1, 0.5, 1] as const;

function buildMailto(form: FormState) {
  const subject = `Project — ${form.type} — ${form.name}`;
  const body = [
    `Hey Zarrar,`,
    ``,
    `I found your portfolio and wanted to reach out about a ${form.type.toLowerCase()} project.`,
    ``,
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    `Type: ${form.type}`,
    ``,
    `Message:`,
    form.message.trim(),
    ``,
    `— ${form.name.trim()}`,
  ].join("\n");
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function validate(form: FormState): FormErrors {
  const e: FormErrors = {};
  if (!form.name.trim()) e.name = "Your name?";
  else if (form.name.length > 80) e.name = "Shorter name please.";
  if (!form.email.trim()) e.email = "Email so I can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "That email looks off.";
  if (!form.message.trim()) e.message = "Tell me a bit about it.";
  else if (form.message.length > 1000) e.message = "A bit shorter — under 1000 chars.";
  return e;
}

/* ------------------------------------------------------------------ */
/* Envelope — variant choreography                                     */
/*                                                                     */
/* Story: closed → hover (whimsical peek) → opening (flap swings,     */
/* seal breaks) → LIFTED (letter slides out, gets picked up toward    */
/* the viewer while the envelope falls back) → the letter settles     */
/* into the form. After send it returns as "sealed".                  */
/* ------------------------------------------------------------------ */

const letterVariants = {
  closed: { y: 0, scale: 1, rotate: 0 },
  hover: { y: -22, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
  opening: { y: -46, transition: { duration: 0.34, delay: 0.1, ease: EASE } },
  // Picked up — slides fully out and comes toward you
  lifted: {
    y: -132,
    scale: 1.28,
    rotate: -2,
    transition: { duration: 0.46, ease: EASE },
  },
  sealed: { y: 0, scale: 1, rotate: 0 },
};

// Envelope shell — recedes and fades while the letter is presented
const bodyGroupVariants = {
  closed: { scale: 1, y: 0, opacity: 1 },
  hover: {},
  opening: {},
  lifted: { scale: 0.88, y: 30, opacity: 0, transition: { duration: 0.42, delay: 0.06, ease: EASE } },
  sealed: { scale: 1, y: 0, opacity: 1 },
};

const flapVariants = {
  closed: { rotateX: 0 },
  hover: { rotateX: -16, transition: { type: "spring" as const, stiffness: 210, damping: 17 } },
  opening: { rotateX: -172, transition: { duration: 0.38, ease: EASE } },
  lifted: { rotateX: -172 },
  sealed: { rotateX: 0 },
};

const sealVariants = {
  closed: { scale: 1, rotate: 0, opacity: 1 },
  hover: { scale: 1.06, rotate: -3, transition: { type: "spring" as const, stiffness: 320, damping: 11 } },
  opening: { scale: 0.55, rotate: -28, opacity: 0, transition: { duration: 0.26, ease: "easeIn" as const } },
  lifted: { scale: 0.55, opacity: 0 },
  sealed: { scale: [1.9, 1], opacity: [0, 1], rotate: 0, transition: { duration: 0.5, delay: 0.35, ease: "easeOut" as const } },
};

const stampVariants = {
  closed: { opacity: 0, scale: 1.3 },
  hover: { opacity: 0, scale: 1.3 },
  opening: { opacity: 0, scale: 1.3 },
  lifted: { opacity: 0, scale: 1.3 },
  sealed: { opacity: [0, 1], scale: [1.25, 1], transition: { duration: 0.4, delay: 0.62, ease: "easeOut" as const } },
};

function EnvelopeBody() {
  return (
    <div className="relative w-full">
      {/* The letter — peeks on hover, then gets picked up and shown to you */}
      <motion.div
        variants={letterVariants}
        className="absolute inset-x-10 top-2 z-10 h-24 rounded-md border border-line bg-canvas shadow-md"
      >
        <div className="mx-auto mt-3 w-2/3 space-y-1.5">
          <div className="h-px bg-line-strong/60" />
          <div className="h-px w-5/6 bg-line" />
          <div className="h-px w-4/6 bg-line/70" />
        </div>
        <div className="mt-2.5 text-center font-display italic text-[11px] text-ink-soft/80">
          hey — got a minute?
        </div>
      </motion.div>

      {/* Envelope shell — falls away when the letter is lifted */}
      <motion.div variants={bodyGroupVariants} className="relative z-20" style={{ perspective: "1100px" }}>
        {/* Envelope body */}
        <div className="relative aspect-[8/5] w-full overflow-hidden rounded-2xl border border-line-strong bg-surface lift">
          {/* Back seams */}
          <svg
            className="absolute inset-0 h-full w-full text-line"
            viewBox="0 0 100 62"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 62 L50 30 L100 62" stroke="currentColor" strokeWidth="0.4" opacity="0.7" />
          </svg>

          {/* Address block */}
          <div className="absolute inset-x-0 bottom-0 top-[52%] grid place-items-center">
            <div className="text-center font-mono">
              <div className="text-[9px] uppercase tracking-[0.3em] text-faint">to —</div>
              <div className="mt-1 font-display text-[16px] italic leading-tight text-ink-soft">
                someone with an idea
              </div>
              <div className="mt-2 text-[9px] uppercase tracking-[0.22em] text-faint">
                from — zarrar · rawalpindi
              </div>
            </div>
          </div>
        </div>

        {/* Flap */}
        <motion.div
          variants={flapVariants}
          style={{
            transformOrigin: "50% 0%",
            backfaceVisibility: "hidden",
            clipPath: "polygon(0 0, 100% 0, 50% 94%)",
          }}
          className="absolute inset-x-0 top-0 z-20 h-[56%] rounded-t-2xl bg-surface-2"
        >
          {/* Postage stamp riding the flap */}
          <div className="absolute right-[9%] top-[13%] rotate-[4deg] border border-dashed border-line-strong bg-surface px-2 py-1.5 text-center shadow-sm">
            <div className="font-caption text-[8px] font-bold uppercase tracking-[0.14em] text-clay-deep">First</div>
            <div className="font-caption text-[8px] font-bold uppercase tracking-[0.14em] text-clay-deep">Class</div>
          </div>
        </motion.div>

        {/* Wax seal */}
        <motion.div
          variants={sealVariants}
          className="absolute left-1/2 top-[45%] z-30 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-clay-deep font-caption text-[12px] font-bold tracking-[0.08em] text-canvas"
          style={{ boxShadow: "0 4px 10px -2px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(252,250,247,0.18)" }}
        >
          MZ
        </motion.div>

        {/* DRAFT SEALED stamp — only in sealed state */}
        <motion.div
          variants={stampVariants}
          className="pointer-events-none absolute left-1/2 top-[26%] z-40 -translate-x-1/2 rotate-[-8deg] rounded-[4px] border-[1.5px] border-clay-deep/80 bg-surface/60 px-3 py-1 font-caption text-[11px] font-bold uppercase tracking-[0.18em] text-clay-deep"
        >
          Draft sealed
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [phase, setPhase] = useState<"closed" | "opening" | "lifted" | "open">("closed");
  const [copied, setCopied] = useState(false);
  const [lastMailto, setLastMailto] = useState("");
  const timers = useRef<number[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const reduce = !!useReducedMotion();

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => clearTimeout(id));
  }, []);

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k in errors) setErrors((c) => ({ ...c, [k]: undefined }));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      const id = window.setTimeout(() => setCopied(false), 1800);
      timers.current.push(id);
    } catch {
      setCopied(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const mailto = buildMailto(form);
    if (mailto.length > 2000) {
      setErrors({ message: "Too long for email draft — shorten a bit." });
      return;
    }
    setLastMailto(mailto);
    setStatus("sent");
    try {
      window.location.href = mailto;
    } catch {
      // keep fallback link visible
    }
  };

  const reset = () => {
    setForm(emptyForm);
    setErrors({});
    setStatus("idle");
    setLastMailto("");
  };

  /* Closed envelope → click → flap opens → letter is picked up toward
     you (lifted) → it settles into the form. */
  const openEnvelope = () => {
    if (phase !== "closed") return;
    if (reduce) {
      setPhase("open");
      return;
    }
    setPhase("opening");
    // Flap swings open first…
    timers.current.push(window.setTimeout(() => setPhase("lifted"), 420));
    // …letter is held up for a beat, then settles into the form.
    timers.current.push(window.setTimeout(() => setPhase("open"), 1150));
  };

  /* "Unseal + send another" → straight back to the open letter/form */
  const unseal = () => {
    reset();
    setPhase("open");
  };

  /* Put the cursor on the name field once the letter has unfolded */
  useEffect(() => {
    if (phase !== "open" || status !== "idle") return;
    const id = window.setTimeout(
      () => nameRef.current?.focus({ preventScroll: true }),
      reduce ? 50 : 400
    );
    return () => window.clearTimeout(id);
  }, [phase, status, reduce]);

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            index="05"
            label="Contact"
            title={
              <>
Have a product problem
                <br />
                <span className="italic text-clay-deep">worth solving?</span>
              </>
            }
          />
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-[48ch] text-[16px] leading-[1.7] text-ink-soft text-pretty">
              I take on a small number of focused engagements at a time. If you&apos;re turning a real workflow into a product, validating an MVP, or untangling a difficult technical problem, send the context. I read every email myself and reply within a day or two.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="mt-8 space-y-4">
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-canvas hover:bg-clay-deep"
              >
                <Mail size={14} strokeWidth={1.8} />
                Email me
              </a>
              <button
                type="button"
                onClick={copy}
                className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm ${copied ? "border-clay-deep bg-clay-wash text-ink" : "border-line bg-surface text-ink-soft hover:border-clay-soft"}`}
              >
                {copied ? <Check size={14} strokeWidth={1.8} /> : <Copy size={14} strokeWidth={1.8} />}
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>

            <div className="font-mono text-xs text-muted">
              <div>{profile.email}</div>
              <div className="mt-1">{profile.location} • Usually replies in ~24h</div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-12 border-t border-line pt-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-4">
              Elsewhere
            </div>
            <div className="flex flex-wrap gap-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint group-hover:text-muted">
                    {s.label}
                  </div>
                  <div className="mt-1 link-underline text-sm text-ink-soft group-hover:text-ink inline-flex items-center gap-1">
                    {s.handle} <ExternalLink size={10} strokeWidth={1.8} />
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          {/* perspective so the form letter visibly "unfolds" toward you */}
          <div style={{ perspective: "1400px" }}>
          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
              <motion.div
                key="sealed"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
              >
                {/* Envelope closes again — flap down, wax seal stamped on */}
                <motion.div
                  initial="closed"
                  animate="sealed"
                  className="mx-auto w-full max-w-[480px]"
                >
                  <div aria-hidden="true">
                    <EnvelopeBody />
                  </div>
                </motion.div>

                <div role="status" className="mt-8 text-center">
                  <h3 className="font-display text-2xl tracking-tight">Draft sealed.</h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
                    Your email app should have a draft open. Envelope sealed. If not, use the link
                    below. I&apos;ll reply soon.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {lastMailto && (
                      <a
                        href={lastMailto}
                        className="rounded-full bg-ink px-5 py-2.5 text-sm text-canvas hover:bg-clay-deep"
                      >
                        Open again
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={unseal}
                      className="rounded-full border border-line px-5 py-2.5 text-sm text-ink-soft hover:border-clay-soft"
                    >
                      Unseal + send another
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : phase === "open" ? (
              <motion.div
                key="form"
                /* The presented letter settles down into place as the form */
                style={{ transformOrigin: "50% 0%" }}
                initial={{ opacity: 0, scale: 1.06, y: -20, rotateX: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: 14, scale: 0.985, transition: { duration: 0.2 } }}
                transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
              >
                <form
                  onSubmit={submit}
                  className="notebook-page relative space-y-5 rounded-2xl border border-line-strong bg-surface p-6 pt-9 sm:p-8 sm:pt-10"
                  noValidate
                >
                  <Staple />
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    Write the note — it opens in your email app
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="mb-1.5 block font-mono text-[11px] text-muted">
                        YOUR NAME
                      </label>
                      <input
                        id="c-name"
                        ref={nameRef}
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        maxLength={80}
                        placeholder="Zarrar"
                        aria-describedby={errors.name ? "c-name-error" : undefined}
                        aria-invalid={!!errors.name}
                        className="w-full rounded-xl border border-line-strong bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/80 focus:border-clay-deep focus:ring-2 ring-clay-deep/30 focus:outline-none"
                      />
                      {errors.name && <p id="c-name-error" className="mt-1 text-xs text-error" role="alert">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="c-email" className="mb-1.5 block font-mono text-[11px] text-muted">
                        EMAIL
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        maxLength={120}
                        placeholder="you@company.com"
                        aria-describedby={errors.email ? "c-email-error" : undefined}
                        aria-invalid={!!errors.email}
                        className="w-full rounded-xl border border-line-strong bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/80 focus:border-clay-deep focus:ring-2 ring-clay-deep/30 focus:outline-none"
                      />
                      {errors.email && <p id="c-email-error" className="mt-1 text-xs text-error" role="alert">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <div className="mb-1.5 font-mono text-[11px] text-muted">WHAT ARE WE BUILDING?</div>
                    <div className="flex flex-wrap gap-2">
                      {TYPES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => set("type", t)}
                          className={`min-h-[44px] rounded-full border px-4 py-2.5 font-mono text-xs transition-colors ${
                            form.type === t
                              ? "border-clay-deep bg-clay-deep text-canvas"
                              : "border-line-strong bg-surface-2 text-muted hover:border-clay-deep hover:text-ink"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-msg" className="mb-1.5 block font-mono text-[11px] text-muted">
                      TELL ME ABOUT IT
                    </label>
                    <textarea
                      id="c-msg"
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      maxLength={1000}
                      rows={5}
                      placeholder="I'm building a..."
                      aria-describedby={errors.message ? "c-msg-error" : undefined}
                      aria-invalid={!!errors.message}
                      className="w-full resize-none rounded-xl border border-line-strong bg-surface-2 px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-ink-soft/80 focus:border-clay-deep focus:ring-2 ring-clay-deep/30 focus:outline-none"
                    />
                    <div className="mt-1.5 flex justify-between">
                      <div>{errors.message && <span id="c-msg-error" className="text-xs text-error" role="alert">{errors.message}</span>}</div>
                      <div className="font-mono text-[10px] text-faint">{form.message.length}/1000</div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-clay-deep"
                  >
                    <Send size={14} strokeWidth={1.8} />
                    Open email draft
                  </button>

                  <p className="font-mono text-[10px] leading-relaxed text-faint text-center">
                    No backend, no tracking. This just opens your email app with the text pre-filled. If it
                    doesn&apos;t open, copy the email above.
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="envelope"
                /* Letter keeps coming toward the camera as we cut away */
                exit={{ opacity: 0, scale: 1.12, y: -30, transition: { duration: reduce ? 0 : 0.22, ease: EASE } }}
              >
                <motion.button
                  type="button"
                  onClick={openEnvelope}
                  aria-label="Open the envelope — reveal the contact form"
                  className="group mx-auto block w-full max-w-[480px] cursor-pointer text-left"
                  initial="closed"
                  animate={phase}
                  whileHover={!reduce && phase === "closed" ? "hover" : undefined}
                  transition={reduce ? { duration: 0 } : undefined}
                >
                  {/* Whole envelope lifts as one unit on hover */}
                  <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <EnvelopeBody />
                  </div>
                </motion.button>
                <div className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
                  {phase === "opening" ? "opening…" : phase === "lifted" ? "— for you —" : "— click to open —"}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-line-soft bg-canvas-deep/40 px-4 py-3 font-mono text-[11px] leading-relaxed text-muted">
            Prefer async? Email directly at <span className="text-ink">{profile.email}</span> — I read every one.
          </div>

          {/* What happens next — the close */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { no: "01", title: "You write", body: "Two sentences is enough — what you're building and what's stuck." },
              { no: "02", title: "I reply within a day", body: "Usually faster. A straight answer, not a sales sequence." },
              { no: "03", title: "A short call, then a plan", body: "Fifteen minutes to decide if it's a fit — no pressure either way." },
            ].map((s) => (
              <div
                key={s.no}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">
                  {s.no}
                </div>
                <div className="mt-2 font-display text-[15px] font-medium tracking-tight text-ink">
                  {s.title}
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Sign the notebook */}
        <Signature />
      </div>
    </section>
  );
}
