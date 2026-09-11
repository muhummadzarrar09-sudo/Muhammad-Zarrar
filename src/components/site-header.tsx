"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/content/site-content";
import { LogoMark } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const y = () =>
      window.scrollY || document.documentElement.scrollTop || 0;
    const update = () => {
      const pos = y();
      // Hysteresis so Lenis interpolation + GSAP pin spacers don't
      // flicker the glass treatment at the 16px threshold.
      setScrolled((prev) => (prev ? pos > 8 : pos > 24));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="Zarrar.Solutions — home">
            <LogoMark size={28} />
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
            <Link
              href="/brief"
              className="btn btn-primary btn-sm btn-star header-cta"
              data-magnetic
            >
              <span className="btn-star-ring" aria-hidden="true" />
              Write your brief
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
