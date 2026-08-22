"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NAV_LINKS } from "@/content/site-content";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
        <Link href="/" className="brand" aria-label="Zarrar.Solutions — home">
          <LogoMark size={34} />
          <span className="brand-name">
            Zarrar<span className="brand-dot">.Solutions</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const current =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <Link href="/free-audit" className="btn btn-primary btn-sm header-cta">
            Free 5-Point Audit
          </Link>
          <MobileMenu />
        </div>
        </div>
      </div>
    </header>
  );
}
