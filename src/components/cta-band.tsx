import Link from "next/link";
import { WhatsAppIcon } from "./icons";
import GradientWaves from "./gradient-waves";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/site";
import { Reveal } from "./reveal";
import { ScrambleText } from "./scramble-text";
import { ShinyText } from "./shiny-text";

/** Full-bleed ink room. Serif statement + actions.
 *  The close of the walk carries the site's ONE sanctioned ambient room:
 *  ember dunes (clay rust horizon, graphite bodies, copper crests) rising
 *  from the bottom edge. Ambient quota + contrast rules: docs/MOTION-RULES.md. */
export function CtaBand({
  headline,
  body,
  primaryHref,
  primaryLabel,
  plate = "The close",
  whatsappMessage = DEFAULT_WA_MESSAGE,
}: {
  headline: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  plate?: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="cta-full" data-motion>
      <GradientWaves className="cta-waves" />
      <div className="container">
        <ScrambleText as="p" className="cta-plate" text={plate} />
        <Reveal>
          <h2>
            <ShinyText text={headline} />
          </h2>
          <p className="cta-body">{body}</p>
          <div className="cta-actions">
            <Link
              href={primaryHref}
              className="btn btn-light btn-star"
              data-magnetic
            >
              <span className="btn-star-ring" aria-hidden="true" />
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
