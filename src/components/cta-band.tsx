import Link from "next/link";
import { WhatsAppIcon } from "./icons";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/site";
import { Reveal } from "./reveal";

/** Full-bleed glass closing band with warm orbs. Serif statement + actions. */
export function CtaBand({
  headline,
  body,
  primaryHref,
  primaryLabel,
  whatsappMessage = DEFAULT_WA_MESSAGE,
}: {
  headline: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="cta-full">
      <div className="container">
        <Reveal>
          <h2>{headline}</h2>
          <p className="cta-body">{body}</p>
          <div className="cta-actions">
            <Link href={primaryHref} className="btn btn-light">
              {primaryLabel}
            </Link>
            <a
              href={waLink(whatsappMessage)}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost-on-ink"
            >
              <WhatsAppIcon size={16} /> WhatsApp us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
