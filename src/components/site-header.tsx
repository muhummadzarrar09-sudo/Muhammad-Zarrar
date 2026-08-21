import Link from "next/link";
import { LogoMark } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NAV_LINKS } from "@/content/site-content";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Zarrar.Solutions — home">
          <LogoMark size={34} />
          <span className="brand-name">
            Zarrar<span className="brand-dot">.Solutions</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/free-audit" className="btn btn-primary btn-sm header-cta">
            Free 5-Point Audit
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
