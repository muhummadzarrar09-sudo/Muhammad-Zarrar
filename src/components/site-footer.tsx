import { LogoMark } from "./logo";
import { WhatsAppIcon } from "./icons";
import { SmartLink } from "./smooth-nav";
import { TopButton } from "./top-button";
import { SERVICES } from "@/content/services";
import { WHATSAPP_DISPLAY, EMAIL, POSITIONING, waLink, DEFAULT_WA_MESSAGE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <SmartLink href="/" className="brand brand-on-ink" ariaLabel="Zarrar.Solutions — home">
              <LogoMark size={36} />
              <span className="brand-name">
                Zarrar<span className="brand-dot">.Solutions</span>
              </span>
            </SmartLink>
            <p className="footer-positioning">{POSITIONING}</p>
            <p className="footer-meta">Rawalpindi, Pakistan · serving Islamabad, Rawalpindi, and Pakistan-wide</p>
          </div>

          <nav className="footer-col" aria-label="Site">
            <h3 className="footer-heading">Site</h3>
            <SmartLink href="/services">Services</SmartLink>
            <SmartLink href="/pricing">Pricing</SmartLink>
            <SmartLink href="/process">Process</SmartLink>
            <SmartLink href="/about">About</SmartLink>
            <SmartLink href="/notes">Field Notes</SmartLink>
            <SmartLink href="/free-audit">Free 5-Point Audit</SmartLink>
            <SmartLink href="/contact">Contact</SmartLink>
            <SmartLink href="/privacy">Privacy</SmartLink>
            <SmartLink href="/terms">Terms</SmartLink>
          </nav>

          <nav className="footer-col" aria-label="Services">
            <h3 className="footer-heading">Services</h3>
            {SERVICES.map((s) => (
              <SmartLink key={s.slug} href={`/services/${s.slug}`}>
                {s.name}
              </SmartLink>
            ))}
          </nav>

          <div className="footer-col">
            <h3 className="footer-heading">Contact</h3>
            <a
              href={waLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener"
              className="footer-contact"
            >
              <WhatsAppIcon size={16} /> WhatsApp: {WHATSAPP_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="footer-contact">
              {EMAIL}
            </a>
            <p className="footer-contact-static">Rawalpindi, Pakistan</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Zarrar.Solutions — all rights reserved.</p>
          <p className="footer-bottom-note">Built to the same standard we audit against.</p>
          <TopButton />
        </div>
      </div>
    </footer>
  );
}
