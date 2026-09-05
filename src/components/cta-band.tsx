import Link from "next/link";
import { WhatsAppIcon } from "./icons";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/site";
import { Reveal } from "./reveal";

/** Full-bleed ink room. Serif statement + actions. */
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
    <section className="cta-full" data-motion>
      <div className="container">
        <p className="cta-plate">The close</p>
        <Reveal>
          <h2>{headline}</h2>
          <p className="cta-body">{body}</p>
          <div className="cta-actions">
            <Link href={primaryHref} className="btn btn-light" data-magnetic>
              {primaryLabel}
            </Link>
            <a
              href={waLink(whatsappMessage)}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost-on-ink"
              data-magnetic
            >
              <WhatsAppIcon size={16} /> WhatsApp us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
