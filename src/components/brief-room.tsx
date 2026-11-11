"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { waLink } from "@/lib/site";
import {
  BUDGETS,
  NEEDS,
  TIMELINES,
  composeBrief,
  plateCopy,
  quoteFit,
  type BriefValues,
} from "@/content/qualify";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  SpinnerIcon,
  WhatsAppIcon,
} from "./icons";

/**
 * BriefRoom — the Typeform-styled brief at /brief.
 *
 * First-party. No embed, no iframe, no third-party script. One question per
 * screen, own shareable URL, and the same WhatsApp handoff the home form
 * used: the message is composed in the browser and handed to wa.me. Nothing
 * is stored server-side because there is no server-side.
 *
 * Answers survive a refresh in sessionStorage — deliberately session-scoped,
 * so a shared machine doesn't hand the next visitor someone else's numbers.
 */

const STORE_KEY = "zs-brief-draft";
const RANGES = BUDGETS.filter((b) => b.id !== "unsure");
const UNSURE_ID = "unsure";

const STEPS = ["need", "budget", "quote", "when", "words", "who", "reach"] as const;
type Step = (typeof STEPS)[number];

const empty: BriefValues = {
  name: "",
  business: "",
  url: "",
  problem: "",
  whatsapp: "",
  needId: "",
  budgetId: "",
  when: "",
};

const COPY: Record<Step, { kicker: string; question: string; hint: string }> = {
  need: {
    kicker: "First",
    question: "What do you need?",
    hint: "Pick the closest thing. We'll sharpen it together.",
  },
  budget: {
    kicker: "Then",
    question: "The number you hoped for.",
    hint: "Honest is useful. If your number is below the work, we'll say so.",
  },
  quote: {
    kicker: "Straight",
    question: "Here's the honest neighborhood.",
    hint: "What you'd walk away with, and what it usually costs.",
  },
  when: {
    kicker: "Timing",
    question: "When do you need this?",
    hint: "Optional. It changes the order, not the price.",
  },
  words: {
    kicker: "Context",
    question: "In your own words.",
    hint: "Optional. The slow page. The quiet inbox. The quote that felt off.",
  },
  who: {
    kicker: "You",
    question: "Who are we talking to?",
    hint: "A name and the business this is for.",
  },
  reach: {
    kicker: "Last",
    question: "How do we reach you?",
    hint: "WhatsApp is the channel we actually answer on.",
  },
};

const OPTIONAL: Step[] = ["when", "words"];

/** A, B, C… shown on the choices, and accepted as keyboard shortcuts. Letter
 *  keys are how Typeform made a form feel like typing rather than clicking. */
const letterFor = (i: number) => String.fromCharCode(65 + i);

/** What the screen is for, in the user's words, once they're done. */
function recapRows(values: BriefValues) {
  const need = NEEDS.find((n) => n.id === values.needId)?.label;
  const budget = BUDGETS.find((b) => b.id === values.budgetId)?.label;
  return [
    { label: "Need", value: need },
    { label: "Budget", value: values.budgetId === UNSURE_ID ? "Not sure yet" : budget },
    { label: "Timing", value: values.when || undefined },
    { label: "Business", value: [values.name, values.business].filter(Boolean).join(" · ") || undefined },
  ].filter((row) => row.value);
}

export function BriefRoom() {
  const [step, setStep] = useState<Step>("need");
  const [values, setValues] = useState<BriefValues>(empty);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [started, setStarted] = useState(false);
  const [resumed, setResumed] = useState(false);

  const [pos, setPos] = useState(2);
  const sliderRef = useRef<HTMLInputElement>(null);
  const readRef = useRef<HTMLOutputElement>(null);
  const spring = useRef({ cur: 50, vel: 0, raf: 0 });
  const stageRef = useRef<HTMLFormElement>(null);
  const autoAdvance = useRef<number>(0);

  const index = STEPS.indexOf(step);
  const need = NEEDS.find((n) => n.id === values.needId);
  const budget = BUDGETS.find((b) => b.id === values.budgetId);
  const fit = useMemo(() => quoteFit(need, budget), [need, budget]);
  const plate = useMemo(() => plateCopy(need, budget, fit), [need, budget, fit]);
  const unsure = values.budgetId === UNSURE_ID;

  /* ---- Restore the draft once, client-side only ---- */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<BriefValues>;
      setValues((v) => ({ ...v, ...saved }));
      /* A draft means someone already started. Offer to continue rather than
         making them begin again — the welcome screen becomes a resume. */
      if (saved.needId || saved.name || saved.whatsapp) setResumed(true);
      if (saved.budgetId && saved.budgetId !== UNSURE_ID) {
        const i = RANGES.findIndex((r) => r.id === saved.budgetId);
        if (i >= 0) setPos(i);
      }
    } catch {
      /* A corrupt draft is not worth a crash. */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(values));
    } catch {
      /* Private mode / quota. The brief still works; it just won't persist. */
    }
  }, [values]);

  /* ---- Spring-fill slider (stiffness 170, damping 13) ---- */
  useEffect(() => {
    const input = sliderRef.current;
    if (!input) return;
    const target = (pos / (RANGES.length - 1)) * 100;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      input.style.setProperty("--fill", `${target}%`);
      spring.current.cur = target;
      spring.current.vel = 0;
      return;
    }
    const s = spring.current;
    cancelAnimationFrame(s.raf);
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      s.vel += ((target - s.cur) * 170 - s.vel * 13) * dt;
      s.cur += s.vel * dt;
      input.style.setProperty("--fill", `${s.cur.toFixed(2)}%`);
      if (Math.abs(target - s.cur) > 0.05 || Math.abs(s.vel) > 0.5) {
        s.raf = requestAnimationFrame(tick);
      } else {
        input.style.setProperty("--fill", `${target}%`);
        s.cur = target;
        s.vel = 0;
      }
    };
    s.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(s.raf);
  }, [pos]);

  useEffect(() => () => window.clearTimeout(autoAdvance.current), []);

  /**
   * Keyboard-first navigation. A–Z and 1–9 pick choices, ↓ continues, ↑ goes
   * back, and Cmd/Ctrl+Enter always moves on — including from inside the
   * textarea, where plain Enter has to keep making new lines.
   */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (status === "sent" || !started) return;
      const target = event.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        if (step === "reach") submit();
        else advance();
        return;
      }
      if (typing) return;

      if (event.key === "ArrowUp") {
        event.preventDefault();
        back();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        advance();
        return;
      }

      const key = event.key.toUpperCase();
      const index = /^[1-9]$/.test(key)
        ? Number(key) - 1
        : key.length === 1 && /[A-Z]/.test(key)
          ? key.charCodeAt(0) - 65
          : -1;
      if (index < 0) return;

      if (step === "need" && NEEDS[index]) {
        event.preventDefault();
        pickNeed(NEEDS[index].id);
      } else if (step === "when" && TIMELINES[index]) {
        event.preventDefault();
        pickWhen(TIMELINES[index]);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  /* Focus the first control on each new screen so the keyboard is already
     inside the room. `preventScroll` — the curtain owns the scroll, not us. */
  useEffect(() => {
    const node = stageRef.current?.querySelector<HTMLElement>(
      "input:not([type=range]), textarea, button.q-chip"
    );
    if (node && !window.matchMedia("(max-width: 760px)").matches) {
      node.focus({ preventScroll: true });
    }
  }, [step, started]);

  const set = useCallback((patch: Partial<BriefValues>) => {
    setValues((v) => ({ ...v, ...patch }));
    setError("");
  }, []);

  const pickRange = (i: number) => {
    setPos(i);
    set({ budgetId: RANGES[i].id });
    const read = readRef.current;
    if (read && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      read.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.06)", offset: 0.35 },
          { transform: "scale(1)" },
        ],
        { duration: 280, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" }
      );
    }
  };

  const validate = (): string => {
    if (step === "need") return values.needId ? "" : "Pick the closest thing to what you need.";
    if (step === "budget") return values.budgetId ? "" : "Slide to your number — or say you don't know yet.";
    if (step === "who") {
      if (!values.name.trim()) return "A name, so we know who we're talking to.";
      if (!values.business.trim()) return "The business this is for.";
      return "";
    }
    if (step === "reach") {
      if (!values.whatsapp.trim()) return "A WhatsApp we can actually reply on.";
      if (!/^[+\d][\d\s\-()]{7,}$/.test(values.whatsapp.trim())) {
        return "Enter a valid number, e.g. 0300 1234567.";
      }
      const url = values.url.trim();
      if (url && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(url)) {
        return "A real link, e.g. yoursite.pk — or leave it blank.";
      }
      return "";
    }
    return "";
  };

  const go = (next: Step) => {
    window.clearTimeout(autoAdvance.current);
    setStep(next);
    setError("");
  };

  const advance = () => {
    const message = validate();
    if (message) {
      setError(message);
      /* Send the cursor to the thing that needs fixing. A message alone leaves
         the visitor hunting for which underline is wrong. */
      window.setTimeout(() => {
        const field = stageRef.current?.querySelector<HTMLInputElement>(
          ".brief-answer input, .brief-answer textarea"
        );
        field?.focus({ preventScroll: true });
      }, 0);
      return;
    }
    const next = STEPS[index + 1];
    if (next) go(next);
  };

  const back = () => {
    const prev = STEPS[index - 1];
    if (prev) go(prev);
  };

  /* Typeform behaviour: choosing an answer is the answer. */
  const pickNeed = (id: string) => {
    set({ needId: id });
    autoAdvance.current = window.setTimeout(() => go("budget"), 360);
  };

  const pickWhen = (item: string) => {
    set({ when: item });
    autoAdvance.current = window.setTimeout(() => go("words"), 320);
  };

  const submit = () => {
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setStatus("sending");
    // A beat so the button reads as pressed before the handoff.
    window.setTimeout(() => {
      try {
        sessionStorage.removeItem(STORE_KEY);
      } catch {
        /* nothing to clean */
      }
      window.location.href = waLink(composeBrief(values));
      setStatus("sent");
    }, 380);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (step === "reach") submit();
    else advance();
  };

  const readText = !values.budgetId
    ? "Slide to your number"
    : unsure
      ? "Not sure yet — we'll guide you"
      : (budget?.label ?? "");

  const sliderText = !values.budgetId
    ? `No budget picked yet, slider parked at ${RANGES[pos].label}`
    : unsure
      ? "Not sure yet"
      : (RANGES[pos].label ?? "");

  const recap = recapRows(values);
  const progress = (index + 1) / STEPS.length;
  const copy = COPY[step];
  const optional = OPTIONAL.includes(step);

  if (status === "sent") {
    return (
      <section className="brief-room">
        <div className="brief-shell">
          <div className="brief-done">
            <span className="brief-done-mark" aria-hidden="true">
              <CheckIcon size={22} />
            </span>
            <h1 className="brief-q">It's on its way.</h1>
            <p className="brief-hint">
              WhatsApp is opening with everything you just told us. We read it
              today and reply within 24 hours — five findings, or an honest
              "this isn't a fit, and here's why."
            </p>

            {recap.length ? (
              <dl className="brief-recap">
                {recap.map((row) => (
                  <div key={row.label} className="brief-recap-row">
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <ol className="brief-nextsteps">
              <li>
                <span className="brief-nextsteps-no">01</span>
                <span>We read the whole thing today — a human, not a queue.</span>
              </li>
              <li>
                <span className="brief-nextsteps-no">02</span>
                <span>
                  You get a written reply within 24 hours: what we'd do first,
                  what it costs, and what we'd skip.
                </span>
              </li>
              <li>
                <span className="brief-nextsteps-no">03</span>
                <span>
                  If it's a fit, the free five-point audit comes next. If it
                  isn't, you'll hear that too.
                </span>
              </li>
            </ol>
            <p className="brief-done-note">
              <a href={waLink(composeBrief(values))} target="_blank" rel="noopener">
                Open it manually
              </a>{" "}
              if nothing happened.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!started) {
    return (
      <section className="brief-room" id="brief-room">
        <div className="brief-shell">
          <div className="brief-welcome">
            <p className="brief-kicker">Before we talk</p>
            <h1 className="brief-q brief-welcome-q">
              Seven questions.
              <br />
              Ninety seconds.
              <br />
              No sales call.
            </h1>
            <p className="brief-hint">
              Answer what you like, skip what you don&rsquo;t. It leaves as one
              WhatsApp message, and you get a written reply within 24 hours —
              not a calendar invite.
            </p>
            <div className="brief-welcome-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setStarted(true)}
              >
                {resumed ? "Continue the brief" : "Start the brief"}{" "}
                <ArrowRightIcon size={14} />
              </button>
              <a
                className="brief-hello"
                href={waLink(
                  "Hello Zarrar — I came from the site. I'd rather talk than fill the brief.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={14} /> Or just say hello
              </a>
            </div>
            <p className="brief-welcome-note">
              Nothing is stored on a server — there isn&rsquo;t one. Your
              answers live in this tab, you can go back at any point, and
              nothing sends until the last screen.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="brief-room" id="brief-room">
      <div className="brief-shell">
        <header className="brief-head">
          <div className="brief-head-row">
            <span className="brief-plate">The brief</span>
            <span className="brief-count">
              {String(index + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
            </span>
          </div>
          <div
            className="brief-progress"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-valuenow={index + 1}
            aria-label={`Question ${index + 1} of ${STEPS.length}`}
          >
            <span className="brief-progress-fill" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </header>

        <form className="brief-stage" ref={stageRef} onSubmit={onSubmit} noValidate>
          {/* The whole screen is a text swap, not a navigation. Focus lands on
              the first control (above), so without this a screen reader would
              hear the answer field but never the new question. */}
          <div aria-live="polite" aria-atomic="true">
            <p className="brief-kicker">{copy.kicker}</p>
            <h2 className="brief-q">{copy.question}</h2>
          </div>
          <p className="brief-hint">{copy.hint}</p>

          {/* keyed by step: remounting is what replays the enter transition,
              and the controls inside are all controlled inputs, so nothing
              is lost by it. */}
          <div className="brief-answer" key={step}>
            {step === "need" && (
              <div className="brief-chips" role="group" aria-label="What do you need">
                {NEEDS.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`q-chip ${values.needId === item.id ? "is-on" : ""}`}
                    aria-pressed={values.needId === item.id}
                    onClick={() => pickNeed(item.id)}
                  >
                    <span className="brief-chip-key" aria-hidden="true">
                      {letterFor(i)}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {step === "budget" && (
              <div className={`q-budget${unsure ? " is-unsure" : ""}`}>
                <output ref={readRef} className="q-budget-read" htmlFor="brief-budget">
                  {readText}
                </output>
                <input
                  ref={sliderRef}
                  id="brief-budget"
                  className="q-slider"
                  type="range"
                  min={0}
                  max={RANGES.length - 1}
                  step={1}
                  value={pos}
                  onChange={(e) => pickRange(Number(e.target.value))}
                  aria-valuetext={sliderText}
                />
                <div className="q-slider-scale" aria-hidden="true">
                  {RANGES.map((r, i) => (
                    <span
                      key={r.id}
                      className={`q-tick${!unsure && values.budgetId && i <= pos ? " is-on" : ""}`}
                    />
                  ))}
                </div>
                <div className="q-slider-ends" aria-hidden="true">
                  <span>{RANGES[0].label}</span>
                  <span>{RANGES[RANGES.length - 1].label}</span>
                </div>
                <button
                  type="button"
                  className={`q-chip${unsure ? " is-on" : ""}`}
                  aria-pressed={unsure}
                  onClick={() => {
                    set({ budgetId: UNSURE_ID });
                    autoAdvance.current = window.setTimeout(
                      () => go("quote"),
                      300,
                    );
                  }}
                >
                  I don&apos;t know yet
                </button>
              </div>
            )}

            {step === "quote" && (
              <aside className={`q-quote is-${fit}`} aria-live="polite">
                <p className="q-quote-k">{plate.kicker}</p>
                <p className="q-quote-b">{plate.body}</p>
              </aside>
            )}

            {step === "when" && (
              <div className="brief-chips brief-chips-tight" role="group" aria-label="When">
                {TIMELINES.map((item, i) => (
                  <button
                    key={item}
                    type="button"
                    className={`q-chip ${values.when === item ? "is-on" : ""}`}
                    aria-pressed={values.when === item}
                    onClick={() => pickWhen(item)}
                  >
                    <span className="brief-chip-key" aria-hidden="true">
                      {letterFor(i)}
                    </span>
                    {item}
                  </button>
                ))}
              </div>
            )}

            {step === "words" && (
              <textarea
                className="brief-text"
                rows={5}
                value={values.problem}
                onChange={(e) => set({ problem: e.target.value })}
                placeholder="What's actually going on…"
                aria-label="In your own words"
                enterKeyHint="enter"
              />
            )}

            {step === "who" && (
              <div className="brief-grid">
                <label className="brief-field">
                  <span className="brief-label">Your name</span>
                  <input
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => set({ name: e.target.value })}
                    placeholder="e.g. Ahmed"
                    enterKeyHint="next"
                    aria-invalid={!!error && !values.name.trim()}
                    aria-describedby={error ? "brief-error" : undefined}
                  />
                </label>
                <label className="brief-field">
                  <span className="brief-label">Business</span>
                  <input
                    type="text"
                    autoComplete="organization"
                    value={values.business}
                    onChange={(e) => set({ business: e.target.value })}
                    placeholder="e.g. Al-Noor Furniture"
                    enterKeyHint="next"
                    aria-invalid={!!error && !values.business.trim()}
                    aria-describedby={error ? "brief-error" : undefined}
                  />
                </label>
              </div>
            )}

            {step === "reach" && (
              <div className="brief-grid">
                <label className="brief-field">
                  <span className="brief-label">
                    Your website <span className="brief-optional">or leave blank</span>
                  </span>
                  <input
                    type="url"
                    autoComplete="url"
                    value={values.url}
                    onChange={(e) => set({ url: e.target.value })}
                    placeholder="yoursite.pk"
                    enterKeyHint="next"
                  />
                </label>
                <label className="brief-field">
                  <span className="brief-label">WhatsApp</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={values.whatsapp}
                    onChange={(e) => set({ whatsapp: e.target.value })}
                    placeholder="0300 1234567"
                    enterKeyHint="send"
                    aria-invalid={!!error && !values.whatsapp.trim()}
                    aria-describedby={error ? "brief-error" : undefined}
                  />
                </label>
              </div>
            )}
          </div>

          {error ? (
            <p className="brief-error" id="brief-error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="brief-actions">
            {index > 0 ? (
              <button type="button" className="btn btn-ghost brief-back" onClick={back}>
                <ArrowLeftIcon size={14} /> Back
              </button>
            ) : (
              <span className="brief-note">
                Takes about 90 seconds. Nothing sends until the last screen.
              </span>
            )}

            {optional ? (
              <button type="button" className="btn btn-ghost" onClick={advance}>
                Skip
              </button>
            ) : null}

            {step === "reach" ? (
              <button
                type="submit"
                className="btn btn-primary brief-next"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <SpinnerIcon size={15} /> Opening WhatsApp…
                  </>
                ) : (
                  <>
                    <WhatsAppIcon size={15} /> Send the brief
                  </>
                )}
              </button>
            ) : (
              <button type="submit" className="btn btn-primary brief-next">
                {step === "quote" ? "Continue" : "Next"} <ArrowRightIcon size={14} />
              </button>
            )}

            <span className="brief-keyhint" aria-hidden="true">
              {step === "need" || step === "when" ? (
                <>
                  {`A–${letterFor((step === "need" ? NEEDS : TIMELINES).length - 1)} to pick`}
                  <span className="brief-keyhint-sep"> · </span>
                </>
              ) : null}
              <kbd>Enter ↵</kbd>
            </span>
          </div>
        </form>

        <footer className="brief-foot">
          <p>
            Nothing is stored on a server — there isn't one. Your answers live in
            this tab until you send them, and they leave as one WhatsApp message.
          </p>
          <a
            className="brief-hello"
            href={waLink("Hello Zarrar — I came from the site. I'd rather talk than fill the brief.")}
            target="_blank"
            rel="noopener"
          >
            <WhatsAppIcon size={14} /> Or just say hello
          </a>
        </footer>
      </div>
    </section>
  );
}
