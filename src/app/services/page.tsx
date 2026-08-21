import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { SERVICES } from "@/content/services";
import { ADDONS } from "@/content/site-content";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { ArrowRightIcon } from "@/components/icons";

export const metadata = pageMeta({
  title: "Web Development Services & Real Pricing, Rawalpindi & Islamabad",
  description:
    "Website audits, audit-led redesigns, RetailFlow catalogs, BookingFlow appointment systems, and custom dashboards — web development in Rawalpindi & Islamabad with PKR pricing in writing.",
  path: "/services",
  ogImage: "/og-services.png",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <section className="page-hero" id="top" data-tl="Top">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span aria-current="page">Services</span>
            </nav>
            <span className="eyebrow">Services</span>
            <h1>Five services. One starting point: evidence.</h1>
            <p className="lede">
              Every engagement starts with an audit, because fixing the wrong
              thing costs more than finding the right thing. Pick a service —
              or start with the audit and let the findings decide.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="services-list" data-tl="Services" aria-label="Service list">
        <div className="container">
          <div className="grid" style={{ gap: 24 }}>
            {SERVICES.map((service) => (
              <Reveal key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="card card-hover service-card"
                  style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 24 }}
                >
                  <div style={{ flex: "1 1 340px", minWidth: 0 }}>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: 8 }}>{service.name}</h3>
                    <p style={{ flexGrow: 0 }}>{service.blurb}</p>
                  </div>
                  <span className="card-meta" style={{ borderTop: "none", paddingTop: 0, marginLeft: "auto", flexShrink: 0 }}>
                    <span className="price-pill">{service.priceLabel}</span>
                    <span className="card-arrow">
                      Details <ArrowRightIcon size={15} />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="addons-heading" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="inset-panel">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, justifyContent: "space-between" }}>
              <div style={{ maxWidth: 560 }}>
                <h2 id="addons-heading" style={{ fontSize: "1.45rem", marginBottom: 8 }}>
                  Add-ons &amp; care plans
                </h2>
                <p style={{ color: "var(--text-2)", fontSize: "0.97rem" }}>
                  WhatsApp order flows (PKR 80,000) · installable PWAs (PKR
                  60,000) · local SEO (PKR 40,000–80,000) · quote calculators
                  (PKR 80,000–150,000) · monthly care from PKR 20,000.
                </p>
              </div>
              <Link href="/pricing" className="btn btn-ghost">
                Full pricing <ArrowRightIcon size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        headline="Not sure which service fits?"
        body="Start with the free 5-point mini-audit. One link, 24 hours, five findings — then you'll know exactly what needs doing."
        primaryHref="/free-audit"
        primaryLabel="Get your free audit"
        whatsappMessage="Hello Zarrar.Solutions — I'm not sure which service fits. Can we talk?"
      />
    </>
  );
}
