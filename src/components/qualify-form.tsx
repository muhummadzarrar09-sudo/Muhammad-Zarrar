"use client";

import { useMemo, useState, type FormEvent } from "react";
import { waLink } from "@/lib/site";
import {
  BUDGETS,
  NEEDS,
  TIMELINES,
  quoteFit,
  type BudgetOption,
  type NeedOption,
} from "@/content/qualify";
import { CheckIcon, SpinnerIcon, WhatsAppIcon } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";

const empty = {
  name: "",
  business: "",
  url: "",
  problem: "",
  whatsapp: "",
};

export function QualifyForm() {
  const [needId, setNeedId] = useState<string>("");
  const [budgetId, setBudgetId] = useState<string>("");
  const [when, setWhen] = useState<string>("");
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const need = NEEDS.find((n) => n.id === needId);
  const budget = BUDGETS.find((b) => b.id === budgetId);
  const fit = quoteFit(need, budget);

  const plate = useMemo(() => plateCopy(need, budget, fit), [need, budget, fit]);

  function setField(name: keyof typeof empty, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Your name — so we know who we're talking to.";
    if (!values.business.trim()) next.business = "The business this is for.";
    if (!needId) next.need = "Pick the closest thing to what you need.";
    if (!budgetId) next.budget = "The number you hoped for. Honest is useful.";
    if (!values.whatsapp.trim()) next.whatsapp = "A WhatsApp we can actually reply on.";
    else if (!/^[+\d][\d\s\-()]{7,}$/.test(values.whatsapp.trim())) {
      next.whatsapp = "Enter a valid number, e.g. 0300 1234567.";
    }
    if (
      values.url.trim() &&
      !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(values.url.trim())
    ) {
      next.url = "A real link, e.g. yoursite.pk — or leave it blank.";
    }
    return next;
  }

  function compose() {
    const hoped = budget?.label ?? "—";
    const quoted = need?.quote ?? "we'll name it after we see the site";
    const gap =
      fit === "low"
        ? "Their hoped-for number is below the usual quote for this work."
        : fit === "high"
          ? "Their hoped-for number is above the usual quote — quote the real scope."
          : fit === "fit"
            ? "Hoped-for number is in the neighborhood of an honest quote."
            : "Need or budget still open — recommend the smallest honest path.";

    return [
      `Hello Zarrar — ${values.name.trim()} from ${values.business.trim()} filled the brief on the site.`,
      ``,
      `Website: ${values.url.trim() || "I don't have one yet"}`,
      `WhatsApp: ${values.whatsapp.trim()}`,
      `What they need: ${need?.label ?? "—"}`,
      `What they walk away with: ${need?.get ?? "—"}`,
      `Budget they hoped for: ${hoped}`,
      `Honest quote neighborhood: ${quoted}`,
      `Fit: ${gap}`,
      `When: ${when || "not said"}`,
      `In their words: ${values.problem.trim() || "—"}`,
    ].join("\n");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      document.getElementById(`brief-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 420));
      window.location.href = waLink(compose());
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="qualify-form" onSubmit={onSubmit} noValidate>
      <div className="qualify-grid">
        <div className="field">
          <label className="field-label" htmlFor="brief-name">
            Your name
          </label>
          <input
            id="brief-name"
            name="name"
            autoComplete="name"
            value={values.name}
            placeholder="e.g. Ahmed"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "brief-name-error" : undefined}
            onChange={(e) => setField("name", e.target.value)}
          />
          {errors.name && (
            <p id="brief-name-error" className="field-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label className="field-label" htmlFor="brief-business">
            Business
          </label>
          <input
            id="brief-business"
            name="business"
            autoComplete="organization"
            value={values.business}
            placeholder="e.g. Al-Noor Furniture"
            required
            aria-invalid={errors.business ? true : undefined}
            aria-describedby={errors.business ? "brief-business-error" : undefined}
            onChange={(e) => setField("business", e.target.value)}
          />
          {errors.business && (
            <p id="brief-business-error" className="field-error" role="alert">
              {errors.business}
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="brief-url">
          Your website
          <span className="field-optional">or leave blank</span>
        </label>
        <input
          id="brief-url"
          name="url"
          type="url"
          autoComplete="url"
          value={values.url}
          placeholder="yoursite.pk"
          aria-invalid={errors.url ? true : undefined}
          aria-describedby={errors.url ? "brief-url-error" : undefined}
          onChange={(e) => setField("url", e.target.value)}
        />
        {errors.url && (
          <p id="brief-url-error" className="field-error" role="alert">
            {errors.url}
          </p>
        )}
      </div>

      <fieldset className="q-fieldset">
        <legend className="field-label">What do you need</legend>
        <div className="q-chips" role="group" aria-describedby={errors.need ? "brief-need-error" : undefined}>
          {NEEDS.map((item) => (
            <button
              key={item.id}
              id={item.id === NEEDS[0].id ? "brief-need" : undefined}
              type="button"
              className={`q-chip ${needId === item.id ? "is-on" : ""}`}
              aria-pressed={needId === item.id}
              onClick={() => {
                setNeedId(item.id);
                if (errors.need) setErrors((e) => ({ ...e, need: "" }));
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        {errors.need && (
          <p id="brief-need-error" className="field-error" role="alert">
            {errors.need}
          </p>
        )}
      </fieldset>

      <fieldset className="q-fieldset">
        <legend className="field-label">The budget you hoped for</legend>
        <div className="q-chips q-chips-tight" role="group">
          {BUDGETS.map((item) => (
            <button
              key={item.id}
              id={item.id === BUDGETS[0].id ? "brief-budget" : undefined}
              type="button"
              className={`q-chip ${budgetId === item.id ? "is-on" : ""}`}
              aria-pressed={budgetId === item.id}
              onClick={() => {
                setBudgetId(item.id);
                if (errors.budget) setErrors((e) => ({ ...e, budget: "" }));
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        {errors.budget && (
          <p id="brief-budget-error" className="field-error" role="alert">
            {errors.budget}
          </p>
        )}
      </fieldset>

      <aside className={`q-quote is-${fit}`} aria-live="polite">
        <p className="q-quote-k">{plate.kicker}</p>
        <p className="q-quote-b">{plate.body}</p>
      </aside>

      <fieldset className="q-fieldset">
        <legend className="field-label">
          When do you need this
          <span className="field-optional">optional</span>
        </legend>
        <div className="q-chips q-chips-tight" role="group">
          {TIMELINES.map((item) => (
            <button
              key={item}
              type="button"
              className={`q-chip ${when === item ? "is-on" : ""}`}
              aria-pressed={when === item}
              onClick={() => setWhen(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label className="field-label" htmlFor="brief-problem">
          In your words
          <span className="field-optional">optional</span>
        </label>
        <textarea
          id="brief-problem"
          name="problem"
          rows={4}
          value={values.problem}
          placeholder="What's actually going on. The slow page. The quiet inbox. The quote that felt off."
          onChange={(e) => setField("problem", e.target.value)}
        />
      </div>

      <div className="field">
        <label className="field-label" htmlFor="brief-whatsapp">
          WhatsApp
        </label>
        <input
          id="brief-whatsapp"
          name="whatsapp"
          type="tel"
          autoComplete="tel"
          value={values.whatsapp}
          placeholder="0300 1234567"
          required
          aria-invalid={errors.whatsapp ? true : undefined}
          aria-describedby={errors.whatsapp ? "brief-whatsapp-error" : undefined}
          onChange={(e) => setField("whatsapp", e.target.value)}
        />
        {errors.whatsapp && (
          <p id="brief-whatsapp-error" className="field-error" role="alert">
            {errors.whatsapp}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg btn-block"
        disabled={status === "sending"}
      >
        {status === "idle" && (
          <>
            <WhatsAppIcon size={16} /> Send the brief
          </>
        )}
        {status === "sending" && (
          <>
            <SpinnerIcon size={16} /> Opening WhatsApp…
          </>
        )}
        {status === "sent" && (
          <>
            <CheckIcon size={16} /> Sent — we reply within 24h
          </>
        )}
        {status === "error" && <>Something failed — tap to retry</>}
      </button>

      {status === "sent" ? (
        <p className="form-status-ok" role="status">
          WhatsApp is opening with your brief.{" "}
          <a href={waLink(compose())} target="_blank" rel="noopener">
            Open it manually
          </a>{" "}
          if it didn't.
        </p>
      ) : (
        <p className="form-status-note">
          This opens WhatsApp with everything you just told us. No database.
          No follow-up sequence. The builder reads it.
        </p>
      )}
    </form>
  );
}

function plateCopy(
  need: NeedOption | undefined,
  budget: BudgetOption | undefined,
  fit: ReturnType<typeof quoteFit>
) {
  if (!need && !budget) {
    return {
      kicker: "Your number, then ours",
      body: "Pick what you need and what you hoped to pay. We'll show the honest neighborhood — before you send anything.",
    };
  }
  if (need && !budget) {
    return {
      kicker: "What you walk away with",
      body: `${need.get} Honest quotes for this usually land at ${need.quote}.`,
    };
  }
  if (!need && budget) {
    return {
      kicker: "What you hoped for",
      body: `${budget.label}. Now pick what you need — we'll tell you if that number can carry the work.`,
    };
  }
  if (fit === "low") {
    return {
      kicker: "That's below what this costs to do well",
      body: `You hoped for ${budget!.label}. For this, honest work here quotes ${need!.quote}. Send the brief anyway — we'll name the smallest path, or say no.`,
    };
  }
  if (fit === "high") {
    return {
      kicker: "There's room to do this properly",
      body: `You hoped for ${budget!.label}. ${need!.quote} is the usual neighborhood. We'll quote the real scope — not spend up to the ceiling.`,
    };
  }
  if (fit === "fit") {
    return {
      kicker: "Your number is in the neighborhood",
      body: `You hoped for ${budget!.label}. ${need!.get} The exact quote comes after we see the site.`,
    };
  }
  return {
    kicker: "We'll name the path",
    body: need
      ? `${need.get} If the budget is still open, the brief is enough — we'll recommend the smallest honest next step.`
      : "Tell us what's going on. We'll tell you what walking out with the fix actually costs.",
  };
}
