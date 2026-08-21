"use client";

import { WhatsAppForm } from "./whatsapp-form";

/** Free-audit lead form. Client component: composes the wa.me message locally. */
export function AuditForm() {
  return (
    <WhatsAppForm
      formId="audit"
      fields={[
        {
          name: "business",
          label: "Business name",
          type: "text",
          required: true,
          placeholder: "e.g. Al-Noor Furniture",
          autoComplete: "organization",
        },
        {
          name: "url",
          label: "Website URL",
          type: "url",
          placeholder: "yoursite.pk — or leave blank if you don't have one",
          autoComplete: "url",
        },
        {
          name: "whatsapp",
          label: "WhatsApp number",
          type: "tel",
          required: true,
          placeholder: "0300 1234567",
          autoComplete: "tel",
        },
        {
          name: "problem",
          label: "Biggest problem",
          type: "textarea",
          placeholder: "e.g. The site loads slowly and nobody contacts us through it.",
        },
      ]}
      compose={(v) =>
        `Hello Zarrar.Solutions — I'd like the free 5-point mini-audit.\n\nBusiness: ${v.business.trim()}\nWebsite: ${v.url.trim() || "I don't have one yet"}\nWhatsApp: ${v.whatsapp.trim()}\nBiggest problem: ${v.problem.trim() || "—"}`
      }
      ctaLabel="Send me my 5 findings"
      successNote="WhatsApp is opening with your details pre-filled."
    />
  );
}
