"use client";

import { WhatsAppForm } from "./whatsapp-form";

/** Contact form. Client component: composes the wa.me message locally. */
export function ContactForm() {
  return (
    <WhatsAppForm
      formId="contact"
      fields={[
        {
          name: "name",
          label: "Your name",
          type: "text",
          required: true,
          placeholder: "What should we call you?",
          autoComplete: "name",
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
          name: "message",
          label: "What do you need?",
          type: "textarea",
          required: true,
          placeholder: "A sentence or two is plenty — we'll ask the rest.",
        },
      ]}
      compose={(v) =>
        `Hello Zarrar.Solutions — I'm ${v.name.trim()}.\n\n${v.message.trim()}\n\nReply on WhatsApp: ${v.whatsapp.trim()}`
      }
      ctaLabel="Send via WhatsApp"
      successNote="WhatsApp is opening with your message pre-filled."
    />
  );
}
