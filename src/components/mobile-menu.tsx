"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/content/site-content";

/** Slide-in mobile navigation. Only this piece of the header is a client component. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
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
        id="mobile-menu"
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
