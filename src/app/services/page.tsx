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
            <h1>
              Five services. One starting point: <em>evidence.</em>
            </h1>
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
          <div className="index-list">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug}>
                <Link href={`/services/${service.slug}`} className="index-row">
                  <span className="idx-no">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="idx-title">{service.name}</h3>
                    <p className="idx-sub">{service.blurb}</p>
                  </div>
                  <span className="idx-side">
                    <span className="price-pill">{service.priceLabel}</span>
                    <span className="idx-arrow">
                      <ArrowRightIcon size={20} />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="inset-panel" >
            <div style={{ marginTop: 26 }}>
              <h2 style={{ fontSize: "1.6rem", marginBottom: 10 }}>
                Add-ons &amp; care plans
              </h2>
              <p style={{ color: "var(--text-2)", fontSize: "0.98rem", maxWidth: "62ch" }}>
                {ADDONS.map((a) => a.name).join(" · ")} — bolt any of these
                onto a build, or onto a site you already have.{" "}
                <Link href="/pricing" className="u-link">
                  Full pricing
                </Link>
              </p>
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
