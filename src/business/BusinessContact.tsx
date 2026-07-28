import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { biz } from "@/business/data";
import { MagneticButton, Reveal } from "@/components/primitives";
import Dropdown from "@/business/Dropdown";

const EASE = [0.22, 1, 0.36, 1] as const;

type FormState = {
  name: string;
  business: string;
  type: string;
  phone: string;
  need: string;
  message: string;
};

const empty: FormState = { name: "", business: "", type: "Clothing store", phone: "", need: "Website", message: "" };

const BUSINESS_TYPES = ["Clothing store", "Boutique", "Clinic", "Salon", "Academy", "Cosmetics", "Other"];
const NEEDS = ["Website", "Retail catalog system", "Booking system", "Dashboard / admin panel", "Automation", "MVP build"];

export default function BusinessContact() {
  const [form, setForm] = useState<FormState>(empty);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const MAX_NAME = 80;
  const MAX_BUSINESS = 100;
  const MAX_PHONE = 30;
  const MAX_MESSAGE = 500;

  const schedule = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timers.current = timers.current.filter((item) => item !== timer);
      callback();
    }, delay);
    timers.current.push(timer);
  };

  useEffect(() => {
    return () => timers.current.forEach((timer) => clearTimeout(timer));
  }, []);

  const validate = (f: FormState): Partial<Record<keyof FormState, string>> => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!f.name.trim()) e.name = "Name is required.";
    else if (f.name.length > MAX_NAME) e.name = `Name must be under ${MAX_NAME} chars.`;
    if (f.business.length > MAX_BUSINESS) e.business = `Business name must be under ${MAX_BUSINESS} chars.`;
    if (f.phone.length > MAX_PHONE) e.phone = `Phone must be under ${MAX_PHONE} chars.`;
    if (f.message.length > MAX_MESSAGE) e.message = `Message must be under ${MAX_MESSAGE} chars.`;
    return e;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    const raw =
      `Assalamualaikum Zarrar.Solutions,\n\n` +
      `Name: ${form.name.trim() || "—"}\n` +
      `Business: ${form.business.trim() || "—"}\n` +
      `Business type: ${form.type || "—"}\n` +
      `Phone/WhatsApp: ${form.phone.trim() || "—"}\n` +
      `Need: ${form.need || "—"}\n` +
      `Message: ${form.message.trim() || "—"}`;

    const text = encodeURIComponent(raw);
    const url = `https://wa.me/${biz.whatsapp}?text=${text}`;
    if (url.length > 1800) {
      setErrors({ message: "Message too long for WhatsApp link. Please shorten it." });
      return;
    }
    try {
      const opened = window.open(url, "_blank", "noopener,noreferrer");
      if (!opened) {
        setFallbackUrl(url);
      }
    } catch {
      setFallbackUrl(url);
    }
    setSent(true);
    schedule(() => setSent(false), 3500);
  };

  const setField = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k in errors) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(biz.email);
      setCopied(true);
      schedule(() => setCopied(false), 1800);
    } catch {
      setFallbackUrl(`mailto:${biz.email}`);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink px-6 py-16 text-canvas sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-spark/30 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-circuit/30 blur-[90px]" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-canvas/50">
                <span className="text-spark">06</span>
                <span className="h-px w-8 bg-canvas/20" />
                <span>Contact</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-md font-display text-[clamp(2.3rem,5.5vw,3.8rem)] font-light leading-[1.02] tracking-tightest text-balance">
                Let's get your business <span className="italic text-spark">online & organized.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-sm text-lg leading-relaxed text-canvas/60 text-pretty">
                Tell us about your shop or service. We'll reply fast — usually the same day — with a clear plan and quote.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticButton href={biz.whatsappCta} cursorLabel="WhatsApp" className="bg-spark text-canvas hover:bg-canvas hover:text-ink">
                  <WhatsAppIcon /> Talk on WhatsApp
                </MagneticButton>
                <button type="button"
                  onClick={copy}
                  data-hover
                  data-cursor-label="Copy email"
                  className="inline-flex items-center gap-2 rounded-full border border-canvas/20 px-6 py-3.5 text-sm font-medium text-canvas/80 transition-colors hover:border-canvas/50 hover:text-canvas"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>Copied ✓</motion.span>
                    ) : (
                      <motion.span key="copy" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>Copy email</motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-canvas/10 pt-8">
                {[
                  { label: "WhatsApp", handle: biz.phone, url: biz.whatsappCta },
                  { label: "Email", handle: biz.email, url: `mailto:${biz.email}` },
                  { label: "Location", handle: biz.location, url: "" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas/40">{s.label}</div>
                    {s.url ? (
                      <a href={s.url} target={s.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group mt-1 flex items-center gap-1.5">
                        <span className="link-underline text-canvas/90 transition-colors group-hover:text-spark">{s.handle}</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                      </a>
                    ) : (
                      <div className="mt-1 text-canvas/90">{s.handle}</div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ delay: 0.12, duration: 0.8, ease: EASE }}
            className="space-y-4 rounded-2xl border border-canvas/12 bg-canvas/[0.03] p-6"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" error={errors.name} dark>
                <input required maxLength={MAX_NAME} value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="e.g. Ahmed" className={inputDark} />
              </Field>
              <Field label="Business name" error={errors.business} dark>
                <input maxLength={MAX_BUSINESS} value={form.business} onChange={(e) => setField("business", e.target.value)} placeholder="e.g. Al-Madina Garments" className={inputDark} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business type" dark>
                <Dropdown dark value={form.type} options={BUSINESS_TYPES} onChange={(v) => setField("type", v)} />
              </Field>
              <Field label="Phone / WhatsApp" error={errors.phone} dark>
                <input maxLength={MAX_PHONE} value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="03xx-xxxxxxx" className={inputDark} />
              </Field>
            </div>
            <Field label="What do you need?" dark>
              <Dropdown dark value={form.need} options={NEEDS} onChange={(v) => setField("need", v)} />
            </Field>
            <Field label="Message" error={errors.message} dark>
              <textarea rows={3} maxLength={MAX_MESSAGE} value={form.message} onChange={(e) => setField("message", e.target.value)} placeholder="A sentence or two about your business and goals…" className={`${inputDark} resize-none`} />
            </Field>
            <MagneticButton type="submit" className="w-full justify-center bg-spark text-canvas hover:bg-canvas hover:text-ink" cursorLabel="Send">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Opening WhatsApp… ✓</motion.span>
                ) : (
                  <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Send on WhatsApp</motion.span>
                )}
              </AnimatePresence>
            </MagneticButton>
            {fallbackUrl && (
              <p className="rounded-lg bg-canvas/10 p-3 text-center text-xs text-canvas/80">
                Popup blocked?{" "}
                <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  Open WhatsApp link
                </a>{" "}
                or copy email.
              </p>
            )}
            <p className="text-center font-mono text-[10px] uppercase tracking-wider text-canvas/30">
              Your details open a ready-to-send WhatsApp message
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

const inputDark =
  "w-full rounded-lg border border-canvas/20 bg-canvas/5 px-3.5 py-2.5 text-sm text-canvas placeholder-canvas/30 outline-none transition-colors focus:border-spark/60";

function Field({ label, children, dark, error }: { label: string; children: React.ReactNode; dark?: boolean; error?: string }) {
  return (
    <label className="block">
      <span className={`mb-1.5 block font-mono text-[11px] uppercase tracking-wider ${dark ? "text-canvas/40" : "text-muted"}`}>{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-spark-soft">{error}</span>}
    </label>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.5-5.9c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5s0-.3 0-.4-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3A2.8 2.8 0 0 0 6 9.4c0 1.1.8 2.1.9 2.3s1.5 2.4 3.7 3.3a12 12 0 0 0 1.3.5 3 3 0 0 0 1.4.1c.4-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.2-.4-.3Z" />
    </svg>
  );
}