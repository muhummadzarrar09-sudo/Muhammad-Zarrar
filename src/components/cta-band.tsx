import Link from "next/link";
import { WhatsAppIcon } from "./icons";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/site";
import { Reveal } from "./reveal";

/** Dark ink call-to-action band. Serif headline, two actions. */
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
    <section className="section section-ink cta-band">
      <div className="container">
        <Reveal className="cta-band-inner">
          <div className="cta-band-text">
            <h2 className="serif-display">{headline}</h2>
            <p>{body}</p>
          </div>
          <div className="cta-band-actions">
            <Link href={primaryHref} className="btn btn-light btn-lg">
              {primaryLabel}
            </Link>
            <a
              href={waLink(whatsappMessage)}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost-on-ink btn-lg"
            >
              <WhatsAppIcon size={18} /> WhatsApp us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
