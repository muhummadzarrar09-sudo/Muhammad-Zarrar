"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NEEDS, SIZES, ADD_ONS, rangeLabel, pk } from "@/content/estimate";
import { waLink } from "@/lib/site";

/**
 * "What should my site cost?" — the question every Pakistani buyer types
 * first. This answers it with the prices the site already publishes, and
 * says plainly where the answer stops being an estimate and becomes a
 * scope decision.
 *
 * Client-side only because it is a calculator; every option, note and the
 * default result are server-rendered, so the page still reads with JS off.
 */
export function CostEstimator() {
  const [needId, setNeedId] = useState("rebuild");
  const [sizeId, setSizeId] = useState("starter");
  const [addOnIds, setAddOnIds] = useState<string[]>([]);

  const need = NEEDS.find((n) => n.id === needId) ?? NEEDS[1];
  const size = SIZES.find((s) => s.id === sizeId) ?? SIZES[0];

  const { low, high, monthly, lines } = useMemo(() => {
    const base =
      need.id === "rebuild"
        ? { label: `Build — ${size.label}`, low: size.low, high: size.high }
        : { label: need.label, low: need.low, high: need.high };

    const picked = ADD_ONS.filter((a) => addOnIds.includes(a.id));
    const oneTime = picked.filter((a) => !a.monthly);
    const recurring = picked.filter((a) => a.monthly);

    const sum = (key: "low" | "high") =>
      oneTime.reduce((total, a) => total + a[key], 0);

    const low = base.low + sum("low");
    const high =
      base.high === null || oneTime.some((a) => a.high === null)
        ? null
        : base.high + (sum("high") as number);

    const monthly = recurring.length
      ? {
          low: recurring.reduce((t, a) => t + a.low, 0),
          high: recurring.reduce((t, a) => t + a.high, 0),
        }
      : null;

    return {
      low,
      high,
      monthly,
      lines: [
        base,
        ...picked.map((a) => ({
          label: a.label + (a.monthly ? " (monthly)" : ""),
          low: a.low,
          high: a.high,
        })),
      ],
    };
  }, [need, size, addOnIds]);

  const toggle = (id: string) =>
    setAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const chosen = ADD_ONS.filter((a) => addOnIds.includes(a.id));
  const summary = [
    need.id === "rebuild" ? `${need.label} (${size.label})` : need.label,
    chosen.length ? `plus ${chosen.map((a) => a.label).join(", ")}` : null,
  ]
    .filter(Boolean)
    .join(" — ");

  return (
    <div className="estimator" id="estimate">
      <div className="estimator-intro">
        <p className="estimator-kicker">The estimator</p>
        <h2 className="estimator-title">
          What should your site cost?
        </h2>
        <p className="estimator-lede">
          Twenty seconds, four choices, and the same numbers that are printed
          further down this page. No email, no form wall.
        </p>
      </div>

      <div className="estimator-body">
        <div className="estimator-controls">
          <fieldset className="estimator-field">
            <legend>
              <span className="estimator-step">01</span> What do you need?
            </legend>
            <div className="estimator-chips">
              {NEEDS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="estimator-chip"
                  aria-pressed={needId === option.id}
                  onClick={() => setNeedId(option.id)}
                >
                  <span className="estimator-chip-label">{option.label}</span>
                  <span className="estimator-chip-note">{option.note}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {need.id === "rebuild" && (
            <fieldset className="estimator-field">
              <legend>
                <span className="estimator-step">02</span> How big is it?
              </legend>
              <div className="estimator-chips estimator-chips-row">
                {SIZES.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className="estimator-chip estimator-chip-compact"
                    aria-pressed={sizeId === option.id}
                    onClick={() => setSizeId(option.id)}
                  >
                    <span className="estimator-chip-label">{option.label}</span>
                    <span className="estimator-chip-note">{option.note}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <fieldset className="estimator-field">
            <legend>
              <span className="estimator-step">
                {need.id === "rebuild" ? "03" : "02"}
              </span>{" "}
              Anything on top?
            </legend>
            <div className="estimator-chips estimator-chips-row">
              {ADD_ONS.map((addOn) => (
                <button
                  key={addOn.id}
                  type="button"
                  className="estimator-chip estimator-chip-compact"
                  aria-pressed={addOnIds.includes(addOn.id)}
                  onClick={() => toggle(addOn.id)}
                >
                  <span className="estimator-chip-label">{addOn.label}</span>
                  <span className="estimator-chip-note">
                    {rangeLabel(addOn.low, addOn.high)}
                    {addOn.monthly ? " / month" : ""}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="estimator-result">
          <div aria-live="polite">
            <p className="estimator-result-label">
              {need.id === "audit" ? "The audit" : "Indicative one-time range"}
            </p>
            <p className="estimator-figure">{rangeLabel(low, high)}</p>
            {monthly && (
              <p className="estimator-monthly">
                plus {rangeLabel(monthly.low, monthly.high)} / month if you take
                the care plan
              </p>
            )}
          </div>

          <ul className="estimator-lines">
            {lines.map((line) => (
              <li key={line.label}>
                <span>{line.label}</span>
                <span className="estimator-line-figure">
                  {rangeLabel(line.low, line.high)}
                </span>
              </li>
            ))}
          </ul>

          <p className="estimator-caveat">
            An estimate, not a quote. The audit sets the real scope — and if it
            says you only need fixes, that&apos;s the recommendation you get.
            {need.includedNote ? ` ${need.includedNote}` : ""}
          </p>

          <a
            className="btn btn-primary estimator-cta"
            href={waLink(
              `Hello Zarrar.Solutions — the estimator put me at ${rangeLabel(low, high)} for: ${summary}. Can we check that against my actual site?`
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Send this estimate to Zarrar
          </a>
          <Link href="/free-audit" className="estimator-alt">
            Or start with the free five-point audit
          </Link>
          <p className="estimator-disclaimer">
            Prices match this page exactly. Payment is 40–50% to start; you own
            the code, design and content on full payment.
          </p>
        </aside>
      </div>
    </div>
  );
}
