import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { SERVICES, getService } from "@/content/services";
import { FaqAccordion } from "@/components/faq";
import { JsonLd } from "@/components/jsonld";
import { Reveal } from "@/components/reveal";
import { ScrambleText } from "@/components/scramble-text";
import { CtaBand } from "@/components/cta-band";
import { SealCheckIcon, ArrowRightIcon } from "@/components/icons";
import { ServiceMotif } from "@/components/service-motif";
import { SITE_URL } from "@/lib/site";

type RouteParams = { slug: string };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMeta({
    title: `${service.name} — ${service.priceLabel}`,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    ogImage: `/og-${service.slug}.png`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.blurb,
    serviceType: service.name,
    areaServed: ["Islamabad", "Rawalpindi", "Pakistan"],
    provider: { "@id": `${SITE_URL}/#org` },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      ...(service.offer.price !== undefined
        ? { price: service.offer.price }
        : {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              minValue: service.offer.minPrice,
              maxValue: service.offer.maxPrice,
              unitText: "project",
              priceCurrency: "PKR",
            },
          }),
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />

      <section className={slug === "website-audit" ? "page-hero hero-blueprint" : "page-hero"} id="top">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" aria-hidden="true">/</span>
              <Link href="/services">Services</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span aria-current="page">{service.name}</span>
            </nav>
            <ScrambleText className="eyebrow" text="Service" />
            <h1>{service.name}</h1>
            <p className="lede">{service.lead}</p>
          </Reveal>
          <ServiceMotif slug={slug} />
        </div>
      </section>

      <section className="section">
        <div className="container service-detail-grid">
          <div className="prose prose-reveal">
            <Reveal>
              <h2>The problem it solves</h2>
              {service.problem.map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className={i === 0 ? "dropcap" : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal>
              <h2 className="prose-h2-spaced">What&rsquo;s included</h2>
              <ul className="checklist checklist-2col" data-stagger>
                {service.included.map((item) => (
                  <li key={item}>
                    <SealCheckIcon size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="prose-h2-spaced">Who it&rsquo;s for</h2>
              <p className="muted">{service.whoFor}</p>
            </Reveal>

            {service.tiers && (
              <Reveal>
                <h2 className="prose-h2-spaced">Tiers</h2>
                <div className="grid grid-3">
                  {service.tiers.map((tier) => (
                    <div className="card tier-card" key={tier.label}>
                      <span className="tier-label">{tier.label}</span>
                      <span className="tier-price">{tier.price}</span>
                      <p>{tier.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal>
              <h2 className="prose-h2-spaced">Common questions</h2>
              <FaqAccordion items={service.faqs} />
            </Reveal>
          </div>

          <aside className="sticky-aside">
            <Reveal className="card price-card">
              <p className="price-card-label">Pricing</p>
              <p className="price-big">{service.priceLabel}</p>
              <p className="price-note">{service.priceDetail}</p>
              <p className="price-note">
                Exact written quote after the audit — no surprises, no
                &ldquo;contact us for pricing&rdquo;.
              </p>
              <Link href="/free-audit" className="btn btn-primary btn-block">
                Start with the audit
              </Link>
            </Reveal>
            <Reveal className="inset-panel">
              <p className="aside-note">
                <strong>Every build includes:</strong> server-rendered pages
                Google can read, mobile-first layout, one clean WhatsApp flow,
                and full ownership on payment.
              </p>
            </Reveal>
            <Link href="/services" className="card-arrow aside-back">
              All services <ArrowRightIcon size={16} />
            </Link>
          </aside>
        </div>
      </section>

      {slug === "website-audit" && (
        <section
          className="section-tight stack-section"
          aria-labelledby="deck-heading"
        >
          <div className="container">
            <Reveal className="section-head">
              <ScrambleText className="eyebrow" text="The full deck" />
              <h2 id="deck-heading">What we check, in order.</h2>
              <p className="lede">
                Every audit walks the same deck, in the same order — so
                nothing hides behind a summary paragraph.
              </p>
            </Reveal>
            <div className="stack-deck">
              {service.included.map((item, i) => (
                <article
                  className="stack-card"
                  key={item}
                  style={{ "--stack-i": i } as CSSProperties}
                >
                  <span className="stack-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        headline="Start with evidence, not a guess."
        body={`The audit tells us exactly what your business needs — then ${service.name.toLowerCase()} gets priced in writing. Any audit fee is credited toward the build.`}
        primaryHref="/free-audit"
        primaryLabel="Get your free 5-point audit"
        whatsappMessage={`Hello Zarrar.Solutions — I'd like to talk about ${service.name}.`}
      />
    </>
  );
}
