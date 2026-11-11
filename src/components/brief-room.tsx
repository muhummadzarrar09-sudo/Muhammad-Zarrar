"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { waLink } from "@/lib/site";
import {
  BUDGETS,
  GOALS,
  NEEDS,
  READINESS,
  SCOPES,
  TIMELINES,
  composeBrief,
  type BriefChoice,
  type BriefValues,
} from "@/content/qualify";
import {
  ArrowLeftIcon,
  CheckIcon,
  ProceedIcon,
  SpinnerIcon,
  WhatsAppIcon,
} from "./icons";

/**
 * A fixed-viewport project brief.
 *
 * This is not a page with a form at the end. It is a calm, no-scroll room:
 * each screen collects one useful project fact, the visitor explicitly says
 * Okay when they are ready, and the result becomes one prepared WhatsApp
 * message. Checklist questions deliberately support several answers — most
 * real projects do not fit a single neat category.
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
type MultiField = "needIds" | "goalIds" | "scopeIds" | "readinessIds" | "timelineIds";
type SiteState = BriefValues["siteState"];

type LegacyDraft = Record<string, unknown>;

const empty: BriefValues = {
  name: "",
  business: "",
  siteState: "",
  url: "",
  whatsapp: "",
  needIds: [],
  goalIds: [],
  scopeIds: [],
  readinessIds: [],
  timelineIds: [],
  budgetId: "",
};

const COPY: Record<Step, { kicker: string; question: string; hint: string }> = {
  project: {
    kicker: "01 · Project",
    question: "What would you like us to work on?",
    hint: "Select every project type that applies. Most businesses need more than one thing to work together.",
  },
  website: {
    kicker: "02 · Starting point",
    question: "Where can we see what exists today?",
    hint: "Tell us whether there is something to review first. Starting fresh is a valid answer.",
  },
  goal: {
    kicker: "03 · Outcome",
    question: "What should a customer be able to do?",
    hint: "Select every action the finished experience needs to make easy.",
  },
  scope: {
    kicker: "04 · Scope",
    question: "What is the likely size of the job?",
    hint: "Select the parts that belong in the first release. A best estimate is enough.",
  },
  readiness: {
    kicker: "05 · Materials",
    question: "What is ready to work with?",
    hint: "Select every asset you already have. This tells us what needs to be created or organised.",
  },
  timeline: {
    kicker: "06 · Deadline",
    question: "What timing applies to this project?",
    hint: "Select every true constraint. “No fixed date” stays separate from a deadline.",
  },
  budget: {
    kicker: "07 · Budget",
    question: "What budget is approved for this project?",
    hint: "Choose one range. The quiet range rail makes the choice clear without pretending it is a precise quote.",
  },
  contact: {
    kicker: "08 · Reply",
    question: "Where should we send the plan?",
    hint: "Your name, business and WhatsApp. No email list and no calendar chase.",
  },
};

const letterFor = (index: number) => String.fromCharCode(65 + index);

const MULTI_FIELD: Record<ChoiceStep, MultiField> = {
  project: "needIds",
  goal: "goalIds",
  scope: "scopeIds",
  readiness: "readinessIds",
  timeline: "timelineIds",
};

function choicesFor(step: ChoiceStep): BriefChoice[] {
  if (step === "project") return NEEDS;
  if (step === "goal") return GOALS;
  if (step === "scope") return SCOPES;
  if (step === "readiness") return READINESS;
  return TIMELINES;
}

function selectedLabels(items: BriefChoice[], ids: string[]) {
  return items
    .filter((item) => ids.includes(item.id))
    .map((item) => item.label)
    .join(", ");
}

function recapRows(values: BriefValues) {
  const project = selectedLabels(NEEDS, values.needIds);
  const goal = selectedLabels(GOALS, values.goalIds);
  const scope = selectedLabels(SCOPES, values.scopeIds);
  const budget = BUDGETS.find((item) => item.id === values.budgetId)?.label;

  return [
    { label: "Project", value: project },
    { label: "Main outcome", value: goal },
    { label: "Scope", value: scope },
    { label: "Budget", value: values.budgetId === UNSURE_ID ? "Not confirmed yet" : budget },
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

function MultiOptionGrid({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: BriefChoice[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <>
      <p className="brief-selection-note" id={`${label}-help`}>
        <CheckIcon size={15} /> Select all that apply. Press <kbd>Okay</kbd> when you&rsquo;re done.
      </p>
      <div className="brief-chips brief-multi-grid" role="group" aria-label={label} aria-describedby={`${label}-help`}>
        {options.map((item, itemIndex) => {
          const chosen = selected.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              className={`q-chip ${chosen ? "is-on" : ""}`}
              aria-pressed={chosen}
              onClick={() => onToggle(item.id)}
            >
              <span className="brief-chip-key" aria-hidden="true">
                {letterFor(itemIndex)}
              </span>
              <span className="brief-chip-label">{item.label}</span>
              <span className="brief-chip-state" aria-hidden="true">
                <CheckIcon size={13} />
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export function BriefRoom() {
  const [step, setStep] = useState<Step>("project");
  const [values, setValues] = useState<BriefValues>(empty);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [started, setStarted] = useState(false);
  const [resumed, setResumed] = useState(false);

  const stageRef = useRef<HTMLFormElement>(null);
  const index = STEPS.indexOf(step);
  const unsure = values.budgetId === UNSURE_ID;
  const copy = COPY[step];
  const recap = recapRows(values);
  const progress = (index + 1) / STEPS.length;
  const choiceStep = ["project", "goal", "scope", "readiness", "timeline"].includes(step)
    ? (step as ChoiceStep)
    : null;
  const activeChoices = choiceStep ? choicesFor(choiceStep) : [];
  const activeField = choiceStep ? MULTI_FIELD[choiceStep] : null;
  const activeSelection = activeField ? values[activeField] : [];

  const set = useCallback((patch: Partial<BriefValues>) => {
    setValues((current) => ({ ...current, ...patch }));
    setError("");
  }, []);

  const go = (next: Step) => {
    setStep(next);
    setError("");
  };

  const nextStep = () => STEPS[index + 1];

  const toggleMulti = useCallback((field: MultiField, id: string) => {
    setValues((current) => {
      const selected = current[field];
      const isSelected = selected.includes(id);
      let next = isSelected ? selected.filter((value) => value !== id) : [...selected, id];

      /* “Not sure” and “No fixed date” are useful, but cannot honestly sit
         beside a contradictory selection. All normal options remain multi. */
      if (field === "needIds") {
        if (id === "unsure") next = isSelected ? [] : ["unsure"];
        else next = next.filter((value) => value !== "unsure");
      }
      if (field === "readinessIds") {
        if (id === "nothing") next = isSelected ? [] : ["nothing"];
        else next = next.filter((value) => value !== "nothing");
      }
      if (field === "timelineIds") {
        if (id === "no-date") next = isSelected ? [] : ["no-date"];
        else next = next.filter((value) => value !== "no-date");
      }

      return { ...current, [field]: next };
    });
    setError("");
  }, []);

  const setSiteState = (siteState: SiteState) => {
    set({ siteState, url: siteState === "new" ? "" : values.url });
    if (siteState === "existing") {
      window.setTimeout(() => {
        stageRef.current?.querySelector<HTMLInputElement>('input[type="url"]')?.focus({
          preventScroll: true,
        });
      }, 0);
    }
  };

  const validate = (): string => {
    if (step === "project") return values.needIds.length ? "" : "Select at least one project type.";
    if (step === "website") {
      if (!values.siteState) return "Choose whether there is an existing site to review.";
      if (values.siteState === "existing") {
        const url = values.url.trim();
        if (!url) return "Add the current website or Instagram link.";
        if (!/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(url)) {
          return "Enter a working link, such as yoursite.pk.";
        }
      }
      return "";
    }
    if (step === "goal") return values.goalIds.length ? "" : "Select at least one customer action.";
    if (step === "scope") return values.scopeIds.length ? "" : "Select at least one scope item.";
    if (step === "readiness") return values.readinessIds.length ? "" : "Select what is ready so far.";
    if (step === "timeline") return values.timelineIds.length ? "" : "Select the timing that applies.";
    if (step === "budget") return values.budgetId ? "" : "Choose one approved budget range.";
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
    let selector = "button.q-chip";
    if (step === "website") {
      selector = values.siteState === "existing" ? 'input[type="url"]' : ".brief-site-options button";
    }
    if (step === "budget") selector = ".budget-rail-option";
    if (step === "contact") {
      selector = !values.name.trim()
        ? 'input[autocomplete="name"]'
        : !values.business.trim()
          ? 'input[autocomplete="organization"]'
          : 'input[type="tel"]';
    }
    window.setTimeout(() => {
      stageRef.current?.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true });
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
    else {
      setStarted(false);
      setError("");
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

  /* Old single-answer drafts are quietly migrated into the new checklist
     shape. A returning visitor never loses an answer because the form got
     more capable. */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as LegacyDraft;
      const text = (key: string) => (typeof saved[key] === "string" ? saved[key] : "");
      const list = (key: string, oldKey: string) => {
        const value = saved[key];
        if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
        const old = text(oldKey);
        return old ? [old] : [];
      };
      const url = text("url");
      const rawSiteState = text("siteState");
      const siteState: SiteState =
        rawSiteState === "existing" || rawSiteState === "new"
          ? rawSiteState
          : url
            ? "existing"
            : "";
      const restored: BriefValues = {
        name: text("name"),
        business: text("business"),
        siteState,
        url,
        whatsapp: text("whatsapp"),
        needIds: list("needIds", "needId"),
        goalIds: list("goalIds", "goalId"),
        scopeIds: list("scopeIds", "scopeId"),
        readinessIds: list("readinessIds", "readinessId"),
        timelineIds: list("timelineIds", "when"),
        budgetId: text("budgetId"),
      };
      setValues(restored);
      if (restored.needIds.length || restored.name || restored.whatsapp) setResumed(true);
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

  useEffect(() => {
    if (!started || status !== "idle") return;
    const node = stageRef.current?.querySelector<HTMLElement>(
      "input:not([type=range]), button.q-chip, .budget-rail-option",
    );
    if (node && !window.matchMedia("(max-width: 760px)").matches) {
      node.focus({ preventScroll: true });
    }
  }, [started, status, step]);

  /** Keyboard accelerates the same controls: letters/numbers toggle options;
   * Ctrl/Cmd+Enter confirms; ↑ is the same back action as the visible arrow. */
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
      if (!choiceStep || !activeField) return;

      const key = event.key.toUpperCase();
      const choiceIndex = /^[1-9]$/.test(key)
        ? Number(key) - 1
        : key.length === 1 && /[A-Z]/.test(key)
          ? key.charCodeAt(0) - 65
          : -1;
      const choice = activeChoices[choiceIndex];
      if (!choice) return;

      event.preventDefault();
      toggleMulti(activeField, choice.id);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const budgetRead = !values.budgetId
    ? "Choose the approved range"
    : unsure
      ? "Not confirmed yet"
      : BUDGETS.find((item) => item.id === values.budgetId)?.label ?? "Choose the approved range";
  const invalidWhatsapp =
    Boolean(error) &&
    (!values.whatsapp.trim() || !/^[+\d][\d\s\-()]{7,}$/.test(values.whatsapp.trim()));
  const primaryLabel =
    step === "contact"
      ? "Send the brief"
      : choiceStep
        ? activeSelection.length
          ? `Okay · ${activeSelection.length} selected`
          : "Okay"
        : "Proceed";

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
          Select everything that applies, then confirm each screen when you are ready. We ask
          about the project, setup, scope, assets, deadline and budget — not vague discovery questions.
        </p>
        <div className="brief-welcome-actions">
          <button type="button" className="btn btn-primary" onClick={() => setStarted(true)}>
            {resumed ? "Continue the brief" : "Start the brief"} <ProceedIcon size={16} />
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
          This page does not scroll. You can use the back arrow at any point, nothing sends until
          the last screen, and answers stay in this browser tab until then.
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
              <MultiOptionGrid
                label="Project types"
                options={NEEDS}
                selected={values.needIds}
                onToggle={(id) => toggleMulti("needIds", id)}
              />
            )}

            {step === "website" && (
              <div className="brief-one-field">
                <div className="brief-chips brief-site-options" role="group" aria-label="Current site status">
                  <button
                    type="button"
                    className={`q-chip ${values.siteState === "existing" ? "is-on" : ""}`}
                    aria-pressed={values.siteState === "existing"}
                    onClick={() => setSiteState("existing")}
                  >
                    <span className="brief-chip-state" aria-hidden="true">
                      <CheckIcon size={13} />
                    </span>
                    I have a website or Instagram
                  </button>
                  <button
                    type="button"
                    className={`q-chip ${values.siteState === "new" ? "is-on" : ""}`}
                    aria-pressed={values.siteState === "new"}
                    onClick={() => setSiteState("new")}
                  >
                    <span className="brief-chip-state" aria-hidden="true">
                      <CheckIcon size={13} />
                    </span>
                    I&rsquo;m starting from scratch
                  </button>
                </div>
                {values.siteState === "existing" ? (
                  <label className="brief-field brief-site-link">
                    <span className="brief-label">Current website or Instagram</span>
                    <input
                      type="url"
                      autoComplete="url"
                      value={values.url}
                      onChange={(event) => set({ url: event.target.value })}
                      placeholder="yourbusiness.pk or instagram.com/yourbusiness"
                      enterKeyHint="next"
                      aria-invalid={Boolean(error && (!values.url.trim() || values.siteState === "existing"))}
                      aria-describedby={error ? "brief-error" : undefined}
                    />
                  </label>
                ) : null}
              </div>
            )}

            {step === "goal" && (
              <MultiOptionGrid
                label="Customer outcomes"
                options={GOALS}
                selected={values.goalIds}
                onToggle={(id) => toggleMulti("goalIds", id)}
              />
            )}

            {step === "scope" && (
              <MultiOptionGrid
                label="Project scope"
                options={SCOPES}
                selected={values.scopeIds}
                onToggle={(id) => toggleMulti("scopeIds", id)}
              />
            )}

            {step === "readiness" && (
              <MultiOptionGrid
                label="Materials ready"
                options={READINESS}
                selected={values.readinessIds}
                onToggle={(id) => toggleMulti("readinessIds", id)}
              />
            )}

            {step === "timeline" && (
              <MultiOptionGrid
                label="Project timing"
                options={TIMELINES}
                selected={values.timelineIds}
                onToggle={(id) => toggleMulti("timelineIds", id)}
              />
            )}

            {step === "budget" && (
              <div className={`brief-budget${unsure ? " is-unsure" : ""}`}>
                <output className="brief-budget-read" aria-live="polite">
                  {budgetRead}
                </output>
                <div className="budget-rail" role="radiogroup" aria-label="Approved project budget">
                  {RANGES.map((item, itemIndex) => {
                    const chosen = values.budgetId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={chosen}
                        className={`budget-rail-option ${chosen ? "is-on" : ""}`}
                        onClick={() => set({ budgetId: item.id })}
                      >
                        <span className="budget-rail-dot" aria-hidden="true" />
                        <span className="budget-rail-number">{String(itemIndex + 1).padStart(2, "0")}</span>
                        <span className="budget-rail-label">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className={`q-chip brief-budget-unsure${unsure ? " is-on" : ""}`}
                  aria-pressed={unsure}
                  onClick={() => set({ budgetId: UNSURE_ID })}
                >
                  <span className="brief-chip-state" aria-hidden="true">
                    <CheckIcon size={13} />
                  </span>
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
            <button
              type="button"
              className="btn btn-ghost brief-back"
              onClick={back}
              aria-label={index === 0 ? "Back to the brief welcome screen" : "Back to the previous question"}
            >
              <ArrowLeftIcon size={17} /> <span>{index === 0 ? "Back to start" : "Back"}</span>
            </button>

            {step === "contact" ? (
              <button type="submit" className="btn btn-primary brief-next" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <SpinnerIcon size={15} /> Opening WhatsApp…
                  </>
                ) : (
                  <>
                    <WhatsAppIcon size={15} /> {primaryLabel}
                  </>
                )}
              </button>
            ) : (
              <button type="submit" className="btn btn-primary brief-next">
                {primaryLabel} <ProceedIcon size={17} />
              </button>
            )}

            <span className="brief-keyhint" aria-hidden="true">
              {choiceStep ? (
                <>
                  {`A–${letterFor(activeChoices.length - 1)} to select`}
                  <span className="brief-keyhint-sep"> · </span>
                </>
              ) : null}
              <kbd>Ctrl + Enter</kbd>
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
