import { useEffect, useRef, useState } from "react";
import { profile, socials } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";

type FormState = {
  name: string;
  email: string;
  type: string;
  message: string;
};

type FormErrors = Partial<Record<keyof Pick<FormState, "name" | "email" | "message">, string>>;

const emptyForm: FormState = { name: "", email: "", type: "Product", message: "" };
const TYPES = ["Product", "AI Agent", "Voice", "Consulting", "Other"];

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

export default function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [copied, setCopied] = useState(false);
  const [lastMailto, setLastMailto] = useState("");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => timers.current.forEach((id) => clearTimeout(id));
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

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            index="05"
            label="Contact"
            title={
              <>
                Have an idea worth
                <br />
                <span className="italic text-clay">building?</span>
              </>
            }
          />
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-[48ch] text-[16px] leading-[1.7] text-ink-soft text-pretty">
              I&apos;m taking 1-2 projects at a time. If you have something real you want to ship —
              an AI agent, a voice flow, a dashboard, a product — just email me. I read everything
              myself and reply within a day or two.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="mt-8 space-y-4">
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-canvas hover:bg-clay-deep"
              >
                Email me
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm text-ink-soft hover:border-clay-soft"
              >
                {copied ? "Copied ✓" : "Copy email"}
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
                  <div className="mt-1 link-underline text-sm text-ink-soft group-hover:text-ink">
                    {s.handle} ↗
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="rounded-[1.8rem] border border-line bg-surface p-6 sm:p-8 lift">
            {status === "idle" ? (
              <form onSubmit={submit} className="space-y-5" noValidate>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                  Write me a note — it opens in your email
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="mb-1.5 block font-mono text-[11px] text-muted">
                      YOUR NAME
                    </label>
                    <input
                      id="c-name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      maxLength={80}
                      placeholder="Zarrar"
                      className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-clay-soft focus:outline-none"
                    />
                    {errors.name && <p className="mt-1 text-xs text-clay-deep">{errors.name}</p>}
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
                      className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-clay-soft focus:outline-none"
                    />
                    {errors.email && <p className="mt-1 text-xs text-clay-deep">{errors.email}</p>}
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
                        className={`rounded-full border px-4 py-1.5 font-mono text-xs transition ${
                          form.type === t
                            ? "border-clay bg-clay text-canvas"
                            : "border-line bg-canvas text-muted hover:border-clay-soft hover:text-ink"
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
                    className="w-full resize-none rounded-xl border border-line bg-canvas px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-faint focus:border-clay-soft focus:outline-none"
                  />
                  <div className="mt-1.5 flex justify-between">
                    <div>{errors.message && <span className="text-xs text-clay-deep">{errors.message}</span>}</div>
                    <div className="font-mono text-[10px] text-faint">{form.message.length}/1000</div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-canvas transition-colors hover:bg-clay-deep"
                >
                  Open email draft
                </button>

                <p className="font-mono text-[10px] leading-relaxed text-faint text-center">
                  No backend, no tracking. This just opens your email app with the text pre-filled. If it
                  doesn&apos;t open, copy the email above.
                </p>
              </form>
            ) : (
              <div className="py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-clay-wash text-clay">
                  ✓
                </div>
                <h3 className="mt-5 font-display text-2xl tracking-tight">Draft ready.</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
                  Your email app should have a draft open. If not, use the link below. I&apos;ll reply soon.
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
                    onClick={reset}
                    className="rounded-full border border-line px-5 py-2.5 text-sm text-ink-soft hover:border-clay-soft"
                  >
                    Send another
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-line-soft bg-canvas-deep/40 px-4 py-3 font-mono text-[11px] leading-relaxed text-muted">
            Prefer async? Email directly at <span className="text-ink">{profile.email}</span> — I read every one.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
