import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { SERVICES } from "@/content/services";
import { ADDONS } from "@/content/site-content";
import { Reveal } from "@/components/reveal";
import { RotatingText } from "@/components/rotating-text";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { ArrowRightIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";

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

      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Services" },
        ]}
        kicker="The work"
        title={
          <>
            Five services. One starting point:{" "}
            <RotatingText words={["hunches.", "vibes.", "evidence."]} />
          </>
        }
        lede="Every engagement starts with an audit, because fixing the wrong thing costs more than finding the right thing. Pick a service — or start with the audit and let the findings decide."
      />

      <section
        className="section"
        id="services-list"
        data-tl="Services"
        aria-label="Service list"
      >
        <div className="container">
          <div className="index-list">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="index-row"
                  data-spotlight
                >
                  <span className="idx-no">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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

          <Reveal className="inset-panel">
            <div style={{ marginTop: 26 }}>
              <h2 className="panel-title">Add-ons &amp; care plans</h2>
              <p className="panel-body">
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
        plate="The work"
        headline="Not sure which service fits?"
        body="Start with the free 5-point mini-audit. One link, 24 hours, five findings — then you'll know exactly what needs doing."
        primaryHref="/free-audit"
        primaryLabel="Get your free audit"
        whatsappMessage="Hello Zarrar.Solutions — I'm not sure which service fits. Can we talk?"
      />
    </>
  );
}
