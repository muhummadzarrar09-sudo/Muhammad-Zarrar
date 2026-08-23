"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SmartLink } from "./smooth-nav";
import { NAV_LINKS } from "@/content/site-content";

/** Accessible slide-in mobile navigation with a contained keyboard focus loop. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Covers browser navigation as well as a click on one of the menu links.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const focusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => focusable()[0]?.focus());

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`nav-toggle ${open ? "open" : ""}`}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>

      <div
        className={`menu-overlay ${open ? "show" : ""}`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`mobile-panel ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="mobile-nav">
          {NAV_LINKS.map((link) => (
            <SmartLink
              key={link.href}
              href={link.href}
              onNavigate={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              ariaCurrent={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </SmartLink>
          ))}
        </nav>
        <nav aria-label="More pages" className="mobile-nav mobile-nav-secondary">
          <span className="mobile-nav-label">More</span>
          <SmartLink
            href="/free-audit"
            onNavigate={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            ariaCurrent={pathname === "/free-audit" ? "page" : undefined}
          >
            Free 5-Point Audit
          </SmartLink>
          <SmartLink
            href="/notes"
            onNavigate={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            ariaCurrent={pathname === "/notes" ? "page" : undefined}
          >
            Field Notes
          </SmartLink>
          <SmartLink
            href="/contact"
            onNavigate={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            ariaCurrent={pathname === "/contact" ? "page" : undefined}
          >
            Contact
          </SmartLink>
        </nav>
        <SmartLink
          href="/#brief"
          className="btn btn-primary"
          onNavigate={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          Write your brief
        </SmartLink>
        <p className="mobile-panel-note">
          You talk to the builder · Islamabad &amp; Rawalpindi
        </p>
      </div>
    </>
  );
}
