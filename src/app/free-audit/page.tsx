import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { waLink, WHATSAPP_DISPLAY } from "@/lib/site";
import { FREE_AUDIT_POINTS } from "@/content/site-content";
import { AuditForm } from "@/components/audit-form";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/jsonld";
import { WhatsAppIcon } from "@/components/icons";

export const metadata = pageMeta({
  title: "Free 5-Point Website Audit — Findings in 24 Hours",
  description:
    "Send your website link and get five findings within 24 hours: speed on mobile data, Google visibility, mobile experience, conversion path, security. Free website audit for Islamabad, Rawalpindi & Pakistan.",
  path: "/free-audit",
  ogImage: "/og-free-audit.png",
});

export default function FreeAuditPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Free 5-Point Audit", path: "/free-audit" },
        ])}
      />

      <section className="page-hero" id="top" data-tl="Top">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span aria-current="page">Free 5-Point Audit</span>
            </nav>
            <span className="eyebrow">Free · replies within 24 hours</span>
            <h1>Free 5-Point Mini-Audit</h1>
            <p className="lede">
              Send us your website link — or tell us you don&rsquo;t have one
              yet. Within 24 hours we reply with five findings about your
              business&rsquo;s digital front door. No spam, no follow-up
              sequence. You get findings, you decide.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container service-detail-grid">
          <div>
            <Reveal>
              <h2 style={{ fontSize: "1.7rem", marginBottom: 20 }}>
                What we check
              </h2>
              <ol className="point-list">
                {FREE_AUDIT_POINTS.map((point) => (
                  <li key={point.name}>
                    <div>
                      <p className="point-name">{point.name}</p>
                      <p className="point-desc">{point.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal className="inset-panel" >
              <h2 style={{ fontSize: "1.25rem", marginBottom: 10 }}>
                Want the deep version?
              </h2>
              <p style={{ fontSize: "0.96rem", color: "var(--text-2)" }}>
                The full{" "}
                <Link href="/services/website-audit">
                  Website Audit (PKR 35,000–50,000)
                </Link>{" "}
                is a 48-hour technical inspection: source code read, every
                page tested on real mobile data, a written report with
                evidence, and a recorded walkthrough. The fee is credited
                toward any build we do afterwards.
              </p>
            </Reveal>
          </div>

          <Reveal className="form-card">
            <h2 style={{ fontSize: "1.4rem", marginBottom: 6 }}>
              Request your mini-audit
            </h2>
            <p style={{ fontSize: "0.93rem", color: "var(--text-2)", marginBottom: 22 }}>
              Fills in a WhatsApp message to us — nothing is stored anywhere.
            </p>
            <AuditForm />
          </Reveal>
        </div>
      </section>

      <section className="section-tight" style={{ paddingTop: 0 }} aria-label="Direct WhatsApp">
        <div className="container">
          <Reveal className="inset-panel" >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ fontSize: "1.3rem", marginBottom: 6 }}>
                  Or just WhatsApp us
                </h2>
                <p style={{ fontSize: "0.95rem", color: "var(--text-2)" }}>
                  No form needed. Say hello, send your link, we&rsquo;ll take
                  it from there. Number: {WHATSAPP_DISPLAY}
                </p>
              </div>
              <a
                href={waLink(
                  "Hello Zarrar.Solutions — I'd like the free 5-point mini-audit. My website is: "
                )}
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
              >
                <WhatsAppIcon size={18} /> WhatsApp us directly
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
