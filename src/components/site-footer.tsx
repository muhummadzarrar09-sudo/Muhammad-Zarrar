import Link from "next/link";
import { LogoMark } from "./logo";
import { WhatsAppIcon, ArrowUpRightIcon } from "./icons";
import { StudioClock } from "./studio-clock";
import { SERVICES } from "@/content/services";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, EMAIL, POSITIONING, waLink, DEFAULT_WA_MESSAGE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="orn-asterism" aria-hidden="true">
          &#10087;
        </p>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand brand-on-ink" aria-label="Zarrar.Solutions — home">
              <LogoMark size={36} />
              <span className="brand-name">
                Zarrar<span className="brand-dot">.Solutions</span>
              </span>
            </Link>
            <p className="footer-positioning">{POSITIONING}</p>
            <p className="footer-meta">Rawalpindi, Pakistan · serving Islamabad, Rawalpindi, and Pakistan-wide</p>
          </div>

          <nav className="footer-col" aria-label="Site">
            <h3 className="footer-heading">Site</h3>
            <Link href="/services">Services</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/process">Process</Link>
            <Link href="/about">About</Link>
            <Link href="/notes">Field Notes</Link>
            <Link href="/free-audit">Free 5-Point Audit</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>

          <nav className="footer-col" aria-label="Services">
            <h3 className="footer-heading">Services</h3>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>
                {s.name}
              </Link>
            ))}
          </nav>

          <div className="footer-col">
            <h3 className="footer-heading">Contact</h3>
            <a href={waLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener" className="footer-contact">
              <WhatsAppIcon size={16} /> WhatsApp: {WHATSAPP_DISPLAY}
              <span className="icon-nudge">
                <ArrowUpRightIcon size={14} />
              </span>
            </a>
            <a href={`mailto:${EMAIL}`} className="footer-contact">
              {EMAIL}
              <span className="icon-nudge">
                <ArrowUpRightIcon size={14} />
              </span>
            </a>
            <p className="footer-contact-static">Rawalpindi, Pakistan</p>
            <p className="footer-contact-static">
              <StudioClock />
            </p>
          </div>
        </div>

        <p className="footer-word" aria-hidden="true">
          Zarrar.Solutions
        </p>
        <div className="footer-bottom">
          <p>© 2026 Zarrar.Solutions — all rights reserved.</p>
          <p className="footer-bottom-note">Built to the same standard we audit against.</p>
          <p className="footer-colophon">
            Set in Fraunces &amp; Inter · Self-hosted type · Zero trackers · Static HTML
          </p>
          <a href="#top" className="footer-top u-link">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
