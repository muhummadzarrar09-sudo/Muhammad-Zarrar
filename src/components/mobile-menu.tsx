"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/content/site-content";

/**
 * Full-screen mobile navigation with GSAP choreography.
 *
 * When GSAP is loaded (html.has-motion), the menu uses a choreographed
 * timeline: overlay fades → panel slides from right → nav links stagger
 * in one-by-one from right with Y offset → CTA button pops last.
 *
 * Without GSAP, falls back to CSS transitions (translateX).
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const focusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

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

  /* GSAP choreography for open/close */
  useEffect(() => {
    const hasMotion = document.documentElement.classList.contains("has-motion");
    if (!hasMotion) return;

    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    /* Dynamically import GSAP to avoid SSR issues */
    let cancelled = false;

    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;

      /* Kill any previous timeline */
      tlRef.current?.kill();

      const navLinks = panel.querySelectorAll<HTMLElement>(".mobile-nav a");
      const secondaryLinks = panel.querySelectorAll<HTMLElement>(".mobile-nav-secondary a");
      const secondaryLabel = panel.querySelector<HTMLElement>(".mobile-nav-label");
      const ctaBtn = panel.querySelector<HTMLElement>(".mobile-panel > .btn");
      const panelNote = panel.querySelector<HTMLElement>(".mobile-panel-note");

      /* Collect all staggerable items in order */
      const allItems: HTMLElement[] = [
        ...Array.from(navLinks),
        ...(secondaryLabel ? [secondaryLabel] : []),
        ...Array.from(secondaryLinks),
        ...(ctaBtn ? [ctaBtn] : []),
        ...(panelNote ? [panelNote] : []),
      ];

      if (open) {
        /* Opening sequence */
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        /* Make panel visible first (remove translateX) */
        gsap.set(panel, { visibility: "visible", x: "100%" });
        gsap.set(overlay, { opacity: 0, visibility: "visible", pointerEvents: "auto" });

        /* Phase 1: Overlay fades in */
        tl.to(overlay, { opacity: 1, duration: 0.3 }, 0);

        /* Phase 2: Panel slides from right */
        tl.to(panel, { x: "0%", duration: 0.45, ease: "power2.out" }, 0.08);

        /* Phase 3: Nav items stagger in */
        if (allItems.length) {
          gsap.set(allItems, { opacity: 0, x: 30, y: 10 });
          tl.to(
            allItems,
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.35,
              stagger: 0.04,
              ease: "power2.out",
            },
            0.28
          );
        }

        tlRef.current = tl;
      } else {
        /* Closing sequence */
        const tl = gsap.timeline({
          defaults: { ease: "power2.in" },
          onComplete: () => {
            gsap.set(panel, { visibility: "hidden" });
            gsap.set(overlay, { visibility: "hidden", pointerEvents: "none" });
          },
        });

        /* Reverse stagger items out */
        if (allItems.length) {
          tl.to(
            allItems,
            {
              opacity: 0,
              x: -20,
              duration: 0.2,
              stagger: 0.02,
            },
            0
          );
        }

        /* Panel slides out */
        tl.to(panel, { x: "100%", duration: 0.35 }, 0.1);

        /* Overlay fades out */
        tl.to(overlay, { opacity: 0, duration: 0.25 }, 0.15);

        tlRef.current = tl;
      }
    });

    return () => {
      cancelled = true;
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
        ref={overlayRef}
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
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="More pages" className="mobile-nav mobile-nav-secondary">
          <span className="mobile-nav-label">More</span>
          <Link
            href="/free-audit"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            aria-current={pathname === "/free-audit" ? "page" : undefined}
          >
            Free 5-Point Audit
          </Link>
          <Link
            href="/notes"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            aria-current={pathname === "/notes" ? "page" : undefined}
          >
            Field Notes
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#brief"
          className="btn btn-primary"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          Write your brief
        </Link>
        <p className="mobile-panel-note">
          You talk to the builder · Islamabad &amp; Rawalpindi
        </p>
      </div>
    </>
  );
}
