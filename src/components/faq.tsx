"use client";

import { useState } from "react";
import type { Faq } from "@/content/services";

/** Accessible accordion. One item open at a time; buttons carry aria-expanded. */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} className={`faq-item ${open ? "open" : ""}`}>
            <h3 className="faq-q">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  {open ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div className="faq-panel" role="region" aria-hidden={!open}>
              <div className="faq-panel-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
