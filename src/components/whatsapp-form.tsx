"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { waLink } from "@/lib/site";
import { CheckIcon, SpinnerIcon, WhatsAppIcon } from "./icons";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "tel" | "url" | "textarea";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Form with no backend: on submit it opens wa.me with a pre-filled,
 * URL-encoded message. Button states: idle → Sending… → Sent / retry.
 * Skeleton-shimmer class (.skeleton) is available for any future
 * client-side dynamic block; these forms give feedback via the button.
 */
export function WhatsAppForm({
  formId,
  fields,
  compose,
  ctaLabel,
  successNote,
}: {
  formId: string;
  fields: FormField[];
  compose: (values: Record<string, string>) => string;
  ctaLabel: string;
  successNote: string;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, ""]))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  function setField(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = (values[field.name] ?? "").trim();
      if (field.required && !value) {
        next[field.name] = "This field is required.";
        continue;
      }
      if (value && field.type === "tel" && !/^[+\d][\d\s\-()]{7,}$/.test(value)) {
        next[field.name] = "Enter a valid phone number, e.g. 0300 1234567.";
      }
      if (value && field.type === "url" && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(value)) {
        next[field.name] = "Enter a valid link, e.g. yoursite.pk";
      }
    }
    return next;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = fields.find((f) => nextErrors[f.name]);
      if (firstInvalid) document.getElementById(`${formId}-${firstInvalid.name}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      // Brief, perceptible state change — then hand off to WhatsApp.
      await new Promise((r) => setTimeout(r, 500));
      window.location.href = waLink(compose(values));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="wa-form" onSubmit={onSubmit} noValidate>
      {fields.map((field) => {
        const id = `${formId}-${field.name}`;
        const error = errors[field.name];
        const shared = {
          id,
          name: field.name,
          value: values[field.name] ?? "",
          placeholder: field.placeholder,
          autoComplete: field.autoComplete,
          required: field.required,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? `${id}-error` : undefined,
          onChange: (
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setField(field.name, e.target.value),
        };
        return (
          <div className="field" key={field.name}>
            <label htmlFor={id} className="field-label">
              {field.label}
              {!field.required && <span className="field-optional">optional</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea rows={4} {...shared} />
            ) : (
              <input type={field.type} {...shared} />
            )}
            {error && (
              <p id={`${id}-error`} className="field-error" role="alert">
                {error}
              </p>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="btn btn-primary btn-lg btn-block"
        disabled={status === "sending"}
      >
        {status === "idle" && (
          <>
            <WhatsAppIcon size={16} /> {ctaLabel}
          </>
        )}
        {status === "sending" && (
          <>
            <SpinnerIcon size={16} /> Sending…
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
          {successNote}{" "}
          <a href={waLink(compose(values))} target="_blank" rel="noopener">
            Open WhatsApp manually
          </a>{" "}
          if it didn't open.
        </p>
      ) : (
        <p className="form-status-note">
          Submitting opens WhatsApp with your details pre-filled. No backend, no
          database — the message goes straight to us.
        </p>
      )}
    </form>
  );
}
