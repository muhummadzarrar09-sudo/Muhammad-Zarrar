import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { SERVICES } from "@/content/services";
import { ADDONS } from "@/content/site-content";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { CheckIcon } from "@/components/icons";
import { FaqAccordion } from "@/components/faq";

export const metadata = pageMeta({
  title: "Pricing in PKR, in Writing — Website Packages & Add-ons",
  description:
    "Transparent web development pricing in Pakistan: audits from PKR 35,000, redesigns from PKR 150,000, catalogs, booking systems, dashboards and add-ons. Exact written quote after the audit.",
  path: "/pricing",
  ogImage: "/og-pricing.png",
});

const PRICING_FAQ = [
  {
    q: "Why are prices shown as ranges?",
    a: "Because scope varies — a five-page site and a twelve-page site are different builds. The range tells you the real neighborhood. After the audit you get an exact written quote, and you can add or remove modules to fit your budget.",
  },
  {
    q: "What happens if the scope changes mid-build?",
    a: "The price changes in writing too. No silent additions, no surprise invoices at the end. You approve any change before we build it.",
  },
  {
    q: "Is the audit fee really credited toward the build?",
    a: "Yes. If we do any build for you afterwards, the Website Audit fee comes off the total. The audit is how we price honestly — it shouldn't cost you extra to get an honest price.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: PRICING_FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <section className="page-hero" id="top" data-tl="Top">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span aria-current="page">Pricing</span>
            </nav>
            <span className="eyebrow">Pricing</span>
            <h1>In PKR, <em>in writing.</em></h1>
            <p className="lede">
              Prices are ranges because scope varies — you get an exact written
              quote after the audit, and you can add or remove modules to fit
              your budget.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="rates" data-tl="Rates" aria-labelledby="services-pricing-heading">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="services-pricing-heading">
              Services
            </h2>
          </Reveal>
          <div className="grid" style={{ gap: 14 }}>
            {SERVICES.map((service) => (
              <Reveal key={service.slug}>
                <div className="price-row">
                  <h3>
                    <Link href={`/services/${service.slug}`}>{service.name}</Link>
                  </h3>
                  <p className="row-desc">{service.blurb}</p>
                  <p className="row-price">{service.priceDetail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="subsection-title" id="redesign-tiers-heading">
              Audit + Redesign tiers
            </h2>
            <div className="grid grid-3">
              {SERVICES.find((s) => s.slug === "redesign")?.tiers?.map((tier) => (
                <div className="card card-hover tier-card" key={tier.label}>
                  <span className="tier-label">{tier.label}</span>
                  <span className="tier-price">{tier.price}</span>
                  <p>{tier.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="addons-heading" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-head">
            <h2 id="addons-heading">
              Add-ons
            </h2>
            <p className="lede">
              Bolt these onto any build — or add them to a site you already
              have.
            </p>
          </Reveal>
          <div className="grid" style={{ gap: 14 }}>
            {ADDONS.map((addon) => (
              <Reveal key={addon.name}>
                <div className="price-row">
                  <h3 className="row-title-sm">
                    {addon.name}
                  </h3>
                  <p className="row-desc">{addon.desc}</p>
                  <p className="row-price">{addon.price}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="terms" data-tl="Terms" aria-labelledby="terms-heading">
        <div className="container">
          <div className="service-detail-grid">
            <Reveal className="card">
              <h2 id="terms-heading" style={{ fontSize: "1.7rem", marginBottom: 18 }}>
                Payment terms
              </h2>
              <ul className="checklist">
                <li>
                  <CheckIcon size={16} />
                  <span>40–50% deposit to start — nothing more up front.</span>
                </li>
                <li>
                  <CheckIcon size={16} />
                  <span>Balance before go-live, once you&rsquo;ve approved the build.</span>
                </li>
                <li>
                  <CheckIcon size={16} />
                  <span>
                    You own the code, design, and content on full payment —
                    completely.
                  </span>
                </li>
                <li>
                  <CheckIcon size={16} />
                  <span>No lock-in, no forced retainers, no hostage hosting.</span>
                </li>
                <li>
                  <CheckIcon size={16} />
                  <span>Payment by bank transfer — account details arrive with your written quote.</span>
                </li>
              </ul>
            </Reveal>
            <Reveal>
              <div className="prose">
                <h2 style={{ fontSize: "1.7rem", marginBottom: 18 }}>
                  No &ldquo;contact us for pricing&rdquo; games
                </h2>
                <p className="muted">
                  Every number on this page is real, and it&rsquo;s the same
                  number you&rsquo;ll hear on a call. Transparency isn&rsquo;t
                  a policy here — it&rsquo;s the differentiator. If a project
                  can&rsquo;t be priced honestly yet, we say exactly why and
                  what would make it priceable.
                </p>
                <p className="muted">
                  The audit is what keeps this honest: once we&rsquo;ve read
                  the code and tested the flows, the quote is exact — and it
                  doesn&rsquo;t grow unless the scope does, in writing.
                </p>
              </div>
              <div className="prose" style={{ marginTop: 40 }}>
                <h2 style={{ fontSize: "1.7rem", marginBottom: 18 }}>
                  Pricing questions
                </h2>
                <FaqAccordion items={PRICING_FAQ} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        headline="Get the exact number, in writing."
        body="The free 5-point mini-audit tells you what's wrong in 24 hours. The full audit prices the fix. Then you decide."
        primaryHref="/free-audit"
        primaryLabel="Get your free audit"
        whatsappMessage="Hello Zarrar.Solutions — I'd like an exact written quote for my project."
      />
    </>
  );
}
