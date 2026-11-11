"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { waLink } from "@/lib/site";
import {
  BUDGETS,
  GOALS,
  NEEDS,
  READINESS,
  SCOPES,
  TIMELINES,
  composeBrief,
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
 * A fixed-viewport project brief.
 *
 * This deliberately is not a landing page with a form at the end. There is no
 * site header, footer, scroll, network submit or third-party embed: one useful
 * project question fills the screen, then the answers are handed to WhatsApp
 * as a single prepared message.
 *
 * Drafts only survive in this browser tab. On a shared phone, closing the tab
 * is enough to clear them.
 */

const STORE_KEY = "zs-brief-draft";
const RANGES = BUDGETS.filter((budget) => budget.id !== "unsure");
const UNSURE_ID = "unsure";

const STEPS = [
  "project",
  "website",
  "goal",
  "scope",
  "readiness",
  "timeline",
  "budget",
  "contact",
] as const;
type Step = (typeof STEPS)[number];
type ChoiceStep = Extract<Step, "project" | "goal" | "scope" | "readiness" | "timeline">;

type Choice = { id: string; label: string };

const empty: BriefValues = {
  name: "",
  business: "",
  url: "",
  whatsapp: "",
  needId: "",
  goalId: "",
  scopeId: "",
  readinessId: "",
  budgetId: "",
  when: "",
};

const COPY: Record<Step, { kicker: string; question: string; hint: string }> = {
  project: {
    kicker: "01 · Project",
    question: "What would you like us to work on?",
    hint: "Choose the closest project type. It tells us what to inspect before we reply.",
  },
  website: {
    kicker: "02 · Starting point",
    question: "Where can we see what exists today?",
    hint: "Share the current site or Instagram if there is one. Starting fresh is completely fine.",
  },
  goal: {
    kicker: "03 · Outcome",
    question: "What should a customer be able to do?",
    hint: "Pick the main action. A good site makes one next step obvious.",
  },
  scope: {
    kicker: "04 · Scope",
    question: "What is the likely size of the job?",
    hint: "A best estimate is enough. It changes the work, time and price.",
  },
  readiness: {
    kicker: "05 · Materials",
    question: "How much is ready to work with?",
    hint: "Logos, words, product data and photos all change the plan.",
  },
  timeline: {
    kicker: "06 · Deadline",
    question: "When does it need to be live?",
    hint: "A real deadline helps us say whether we can meet it before anyone wastes time.",
  },
  budget: {
    kicker: "07 · Budget",
    question: "What budget is approved for this project?",
    hint: "A range is enough. We will recommend work that can actually be delivered inside it.",
  },
  contact: {
    kicker: "08 · Reply",
    question: "Where should we send the plan?",
    hint: "Your name, business and WhatsApp. No email list and no calendar chase.",
  },
};

const letterFor = (index: number) => String.fromCharCode(65 + index);

function choicesFor(step: ChoiceStep): Choice[] {
  if (step === "project") return NEEDS;
  if (step === "goal") return GOALS;
  if (step === "scope") return SCOPES;
  if (step === "readiness") return READINESS;
  return TIMELINES.map((label) => ({ id: label, label }));
}

function recapRows(values: BriefValues) {
  const project = NEEDS.find((item) => item.id === values.needId)?.label;
  const goal = GOALS.find((item) => item.id === values.goalId)?.label;
  const scope = SCOPES.find((item) => item.id === values.scopeId)?.label;
  const budget = BUDGETS.find((item) => item.id === values.budgetId)?.label;

  return [
    { label: "Project", value: project },
    { label: "Main outcome", value: goal },
    { label: "Scope", value: scope },
    { label: "Budget", value: values.budgetId === UNSURE_ID ? "Not sure yet" : budget },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));
}

function BriefExit() {
  return (
    <div className="brief-exit">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep" aria-hidden="true">
          /
        </span>
        <span aria-current="page">The brief</span>
      </nav>
    </div>
  );
}

export function BriefRoom() {
  const [step, setStep] = useState<Step>("project");
  const [values, setValues] = useState<BriefValues>(empty);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [started, setStarted] = useState(false);
  const [resumed, setResumed] = useState(false);
  const [pos, setPos] = useState(2);

  const sliderRef = useRef<HTMLInputElement>(null);
  const readRef = useRef<HTMLOutputElement>(null);
  const stageRef = useRef<HTMLFormElement>(null);
  const autoAdvance = useRef<number>(0);
  const spring = useRef({ cur: 50, vel: 0, raf: 0 });

  const index = STEPS.indexOf(step);
  const unsure = values.budgetId === UNSURE_ID;
  const copy = COPY[step];
  const recap = recapRows(values);
  const progress = (index + 1) / STEPS.length;
  const choiceStep = ["project", "goal", "scope", "readiness", "timeline"].includes(step)
    ? (step as ChoiceStep)
    : null;
  const activeChoices = choiceStep ? choicesFor(choiceStep) : [];

  const set = useCallback((patch: Partial<BriefValues>) => {
    setValues((current) => ({ ...current, ...patch }));
    setError("");
  }, []);

  const go = (next: Step) => {
    window.clearTimeout(autoAdvance.current);
    setStep(next);
    setError("");
  };

  const nextStep = () => STEPS[index + 1];

  const validate = (): string => {
    if (step === "project") return values.needId ? "Choose the type of project first." : "";
    if (step === "website") {
      const url = values.url.trim();
      if (url && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(url)) {
        return "Enter a working link, such as yoursite.pk — or leave it blank.";
      }
      return "";
    }
    if (step === "goal") return values.goalId ? "Choose the main customer action." : "";
    if (step === "scope") return values.scopeId ? "Choose the closest project size." : "";
    if (step === "readiness") return values.readinessId ? "Choose what is ready so far." : "";
    if (step === "timeline") return values.when ? "Choose the target launch window." : "";
    if (step === "budget") return values.budgetId ? "Choose the approved budget range." : "";
    if (step === "contact") {
      if (!values.name.trim()) return "Add your name so we know who to reply to.";
      if (!values.business.trim()) return "Add the business this project is for.";
      if (!values.whatsapp.trim()) return "Add a WhatsApp number we can reply to.";
      if (!/^[+\d][\d\s\-()]{7,}$/.test(values.whatsapp.trim())) {
        return "Enter a valid number, for example 0300 1234567.";
      }
    }
    return "";
  };

  const focusNeededAnswer = () => {
    /* Validation should put the cursor on the one thing that needs fixing,
       not make someone scan a static screen for the red underline. */
    let selector = "input:not([type=range]), button.q-chip";
    if (step === "website") selector = 'input[type="url"]';
    if (step === "contact") {
      selector = !values.name.trim()
        ? 'input[autocomplete="name"]'
        : !values.business.trim()
          ? 'input[autocomplete="organization"]'
          : 'input[type="tel"]';
    }
    window.setTimeout(() => {
      const field = stageRef.current?.querySelector<HTMLElement>(selector);
      field?.focus({ preventScroll: true });
    }, 0);
  };

  const advance = () => {
    const message = validate();
    if (message) {
      setError(message);
      focusNeededAnswer();
      return;
    }
    const next = nextStep();
    if (next) go(next);
  };

  const back = () => {
    const previous = STEPS[index - 1];
    if (previous) go(previous);
  };

  const pickAndAdvance = (patch: Partial<BriefValues>) => {
    window.clearTimeout(autoAdvance.current);
    set(patch);
    const next = nextStep();
    if (next) autoAdvance.current = window.setTimeout(() => go(next), 280);
  };

  const pickRange = (rangeIndex: number) => {
    setPos(rangeIndex);
    set({ budgetId: RANGES[rangeIndex].id });
    const read = readRef.current;
    if (read && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      read.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.045)", offset: 0.35 },
          { transform: "scale(1)" },
        ],
        { duration: 240, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
      );
    }
  };

  const submit = () => {
    const message = validate();
    if (message) {
      setError(message);
      focusNeededAnswer();
      return;
    }
    setStatus("sending");
    window.setTimeout(() => {
      try {
        sessionStorage.removeItem(STORE_KEY);
      } catch {
        /* A blocked storage API must not block the WhatsApp handoff. */
      }
      window.location.href = waLink(composeBrief(values));
      setStatus("sent");
    }, 280);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (step === "contact") submit();
    else advance();
  };

  /* Lock the document itself as well as the room. :has() provides a no-JS
     first paint; this class is the fallback for older browser engines. */
  useEffect(() => {
    document.documentElement.classList.add("brief-flow");
    document.body.classList.add("brief-flow");
    return () => {
      document.documentElement.classList.remove("brief-flow");
      document.body.classList.remove("brief-flow");
    };
  }, []);

  /* Restore one in-tab draft. It is never sent anywhere until the visitor
     presses the WhatsApp button themselves. */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<BriefValues>;
      setValues((current) => ({ ...current, ...saved }));
      if (saved.needId || saved.name || saved.whatsapp) setResumed(true);
      if (saved.budgetId && saved.budgetId !== UNSURE_ID) {
        const savedIndex = RANGES.findIndex((item) => item.id === saved.budgetId);
        if (savedIndex >= 0) setPos(savedIndex);
      }
    } catch {
      /* A corrupt draft is less important than a working brief. */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(values));
    } catch {
      /* Private mode and a full storage quota still leave the brief usable. */
    }
  }, [values]);

  /* The fill has a small spring, but only after the visitor makes a deliberate
     budget selection. */
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

    const state = spring.current;
    cancelAnimationFrame(state.raf);
    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      state.vel += ((target - state.cur) * 170 - state.vel * 13) * delta;
      state.cur += state.vel * delta;
      input.style.setProperty("--fill", `${state.cur.toFixed(2)}%`);
      if (Math.abs(target - state.cur) > 0.05 || Math.abs(state.vel) > 0.5) {
        state.raf = requestAnimationFrame(tick);
      } else {
        input.style.setProperty("--fill", `${target}%`);
        state.cur = target;
        state.vel = 0;
      }
    };
    state.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(state.raf);
  }, [pos]);

  useEffect(() => () => window.clearTimeout(autoAdvance.current), []);

  useEffect(() => {
    if (!started || status !== "idle") return;
    const node = stageRef.current?.querySelector<HTMLElement>(
      "input:not([type=range]), button.q-chip",
    );
    if (node && !window.matchMedia("(max-width: 760px)").matches) {
      node.focus({ preventScroll: true });
    }
  }, [started, status, step]);

  /** Keyboard is an accelerator, never a replacement for clicking. Plain
   * Enter inside an input keeps the browser's normal form behaviour; Cmd/Ctrl
   * Enter always advances, including from a text field. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (status === "sent" || !started) return;
      const target = event.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        if (step === "contact") submit();
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
      if (!choiceStep) return;

      const key = event.key.toUpperCase();
      const choiceIndex = /^[1-9]$/.test(key)
        ? Number(key) - 1
        : key.length === 1 && /[A-Z]/.test(key)
          ? key.charCodeAt(0) - 65
          : -1;
      const choice = activeChoices[choiceIndex];
      if (!choice) return;

      event.preventDefault();
      if (choiceStep === "project") pickAndAdvance({ needId: choice.id });
      if (choiceStep === "goal") pickAndAdvance({ goalId: choice.id });
      if (choiceStep === "scope") pickAndAdvance({ scopeId: choice.id });
      if (choiceStep === "readiness") pickAndAdvance({ readinessId: choice.id });
      if (choiceStep === "timeline") pickAndAdvance({ when: choice.label });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const budgetRead = !values.budgetId
    ? "Choose the approved range"
    : unsure
      ? "Not confirmed yet"
      : BUDGETS.find((item) => item.id === values.budgetId)?.label ?? "Choose the approved range";

  const budgetAria = !values.budgetId
    ? `No range selected; slider is parked at ${RANGES[pos].label}`
    : unsure
      ? "Budget not confirmed yet"
      : RANGES[pos]?.label ?? "";
  const invalidWhatsapp =
    Boolean(error) &&
    (!values.whatsapp.trim() || !/^[+\d][\d\s\-()]{7,}$/.test(values.whatsapp.trim()));

  let content: React.ReactNode;

  if (status === "sent") {
    content = (
      <div className="brief-done" aria-live="polite">
        <span className="brief-done-mark" aria-hidden="true">
          <CheckIcon size={22} />
        </span>
        <h1 className="brief-q">It&rsquo;s ready to send.</h1>
        <p className="brief-hint">
          WhatsApp is opening with the practical details below. We read it today and reply within
          24 hours with the next useful step — or an honest no.
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
            <span>We review the current site and the scope you gave us.</span>
          </li>
          <li>
            <span className="brief-nextsteps-no">02</span>
            <span>You get a written reply: recommended work, timing and an honest range.</span>
          </li>
        </ol>
        <p className="brief-done-note">
          <a href={waLink(composeBrief(values))} target="_blank" rel="noopener noreferrer">
            Open WhatsApp manually
          </a>{" "}
          if it did not open.
        </p>
      </div>
    );
  } else if (!started) {
    content = (
      <div className="brief-welcome">
        <p className="brief-kicker">Before we talk</p>
        <h1 className="brief-q brief-welcome-q">
          Eight practical questions.
          <br />
          Around two minutes.
          <br />
          No sales call.
        </h1>
        <p className="brief-hint">
          We ask about the project, the current setup, what customers need to do, the scope,
          readiness, deadline and budget — not vague discovery questions.
        </p>
        <div className="brief-welcome-actions">
          <button type="button" className="btn btn-primary" onClick={() => setStarted(true)}>
            {resumed ? "Continue the brief" : "Start the brief"} <ArrowRightIcon size={14} />
          </button>
          <a
            className="brief-hello"
            href={waLink("Hello Zarrar — I came from the site. I'd rather talk than fill the brief.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={14} /> Or just say hello
          </a>
        </div>
        <p className="brief-welcome-note">
          This page does not scroll. You can go back at any point, nothing sends until the last
          screen, and answers stay in this browser tab until then.
        </p>
      </div>
    );
  } else {
    content = (
      <>
        <header className="brief-head">
          <div className="brief-head-row">
            <span className="brief-plate">Project brief</span>
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
          <div aria-live="polite" aria-atomic="true">
            <p className="brief-kicker">{copy.kicker}</p>
            <h2 className="brief-q">{copy.question}</h2>
          </div>
          <p className="brief-hint">{copy.hint}</p>

          <div className="brief-answer" key={step}>
            {step === "project" && (
              <div className="brief-chips" role="group" aria-label="Project type">
                {NEEDS.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`q-chip ${values.needId === item.id ? "is-on" : ""}`}
                    aria-pressed={values.needId === item.id}
                    onClick={() => pickAndAdvance({ needId: item.id })}
                  >
                    <span className="brief-chip-key" aria-hidden="true">
                      {letterFor(itemIndex)}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {step === "website" && (
              <div className="brief-one-field">
                <label className="brief-field">
                  <span className="brief-label">
                    Current website or Instagram <span className="brief-optional">optional</span>
                  </span>
                  <input
                    type="url"
                    autoComplete="url"
                    value={values.url}
                    onChange={(event) => set({ url: event.target.value })}
                    placeholder="yourbusiness.pk or instagram.com/yourbusiness"
                    enterKeyHint="next"
                    aria-invalid={Boolean(error && values.url.trim())}
                    aria-describedby={error ? "brief-error" : undefined}
                  />
                </label>
                <button
                  type="button"
                  className="q-chip brief-fresh-start"
                  onClick={() => pickAndAdvance({ url: "" })}
                >
                  I&rsquo;m starting from scratch
                </button>
              </div>
            )}

            {step === "goal" && (
              <div className="brief-chips" role="group" aria-label="Main customer outcome">
                {GOALS.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`q-chip ${values.goalId === item.id ? "is-on" : ""}`}
                    aria-pressed={values.goalId === item.id}
                    onClick={() => pickAndAdvance({ goalId: item.id })}
                  >
                    <span className="brief-chip-key" aria-hidden="true">
                      {letterFor(itemIndex)}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {step === "scope" && (
              <div className="brief-chips" role="group" aria-label="Project size">
                {SCOPES.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`q-chip ${values.scopeId === item.id ? "is-on" : ""}`}
                    aria-pressed={values.scopeId === item.id}
                    onClick={() => pickAndAdvance({ scopeId: item.id })}
                  >
                    <span className="brief-chip-key" aria-hidden="true">
                      {letterFor(itemIndex)}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {step === "readiness" && (
              <div className="brief-chips" role="group" aria-label="Project material readiness">
                {READINESS.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`q-chip ${values.readinessId === item.id ? "is-on" : ""}`}
                    aria-pressed={values.readinessId === item.id}
                    onClick={() => pickAndAdvance({ readinessId: item.id })}
                  >
                    <span className="brief-chip-key" aria-hidden="true">
                      {letterFor(itemIndex)}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {step === "timeline" && (
              <div className="brief-chips brief-chips-tight" role="group" aria-label="Target launch window">
                {TIMELINES.map((item, itemIndex) => (
                  <button
                    key={item}
                    type="button"
                    className={`q-chip ${values.when === item ? "is-on" : ""}`}
                    aria-pressed={values.when === item}
                    onClick={() => pickAndAdvance({ when: item })}
                  >
                    <span className="brief-chip-key" aria-hidden="true">
                      {letterFor(itemIndex)}
                    </span>
                    {item}
                  </button>
                ))}
              </div>
            )}

            {step === "budget" && (
              <div className={`q-budget${unsure ? " is-unsure" : ""}`}>
                <output ref={readRef} className="q-budget-read" htmlFor="brief-budget">
                  {budgetRead}
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
                  onChange={(event) => pickRange(Number(event.target.value))}
                  aria-valuetext={budgetAria}
                />
                <div className="q-slider-scale" aria-hidden="true">
                  {RANGES.map((item, itemIndex) => (
                    <span
                      key={item.id}
                      className={`q-tick${!unsure && values.budgetId && itemIndex <= pos ? " is-on" : ""}`}
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
                  onClick={() => pickAndAdvance({ budgetId: UNSURE_ID })}
                >
                  I don&rsquo;t have a confirmed budget yet
                </button>
              </div>
            )}

            {step === "contact" && (
              <div className="brief-grid brief-contact-grid">
                <label className="brief-field">
                  <span className="brief-label">Your name</span>
                  <input
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(event) => set({ name: event.target.value })}
                    placeholder="e.g. Ahmed"
                    enterKeyHint="next"
                    aria-invalid={Boolean(error && !values.name.trim())}
                    aria-describedby={error ? "brief-error" : undefined}
                  />
                </label>
                <label className="brief-field">
                  <span className="brief-label">Business</span>
                  <input
                    type="text"
                    autoComplete="organization"
                    value={values.business}
                    onChange={(event) => set({ business: event.target.value })}
                    placeholder="e.g. Al-Noor Furniture"
                    enterKeyHint="next"
                    aria-invalid={Boolean(error && !values.business.trim())}
                    aria-describedby={error ? "brief-error" : undefined}
                  />
                </label>
                <label className="brief-field">
                  <span className="brief-label">WhatsApp</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={values.whatsapp}
                    onChange={(event) => set({ whatsapp: event.target.value })}
                    placeholder="0300 1234567"
                    enterKeyHint="send"
                    aria-invalid={invalidWhatsapp}
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
              <span className="brief-note">Nothing sends until the final screen.</span>
            )}

            {step === "contact" ? (
              <button type="submit" className="btn btn-primary brief-next" disabled={status === "sending"}>
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
                Continue <ArrowRightIcon size={14} />
              </button>
            )}

            <span className="brief-keyhint" aria-hidden="true">
              {choiceStep ? (
                <>
                  {`A–${letterFor(activeChoices.length - 1)} to pick`}
                  <span className="brief-keyhint-sep"> · </span>
                </>
              ) : null}
              <kbd>Enter ↵</kbd>
            </span>
          </div>
        </form>
      </>
    );
  }

  return (
    <section className="brief-room" id="brief-room">
      <div className="brief-shell">
        <BriefExit />
        {content}
      </div>
    </section>
  );
}
