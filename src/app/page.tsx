import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { waLink } from "@/lib/site";
import { SERVICES } from "@/content/services";
import {
  FINDINGS,
  TRUST_CHIPS,
  WHY_US,
  PROCESS_STEPS,
} from "@/content/site-content";
import { Reveal } from "@/components/reveal";
import { PinnedManifesto } from "@/components/pinned-manifesto";
import { Marquee } from "@/components/marquee";
import { WhatsAppIcon, ArrowRightIcon } from "@/components/icons";

export const metadata = pageMeta({
  title:
    "Zarrar.Solutions — Audit-Led Web Development, Islamabad & Rawalpindi",
  description:
    "Website audit, redesign, catalog and booking systems for businesses in Islamabad, Rawalpindi, and across Pakistan. We audit broken digital flows — and build the systems that fix them. Free 5-point audit.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero" id="top" data-tl="Top">
        <div className="container">
          <div className="hero-meta">
            <span>Audit-led digital systems</span>
            <span>Islamabad — Rawalpindi</span>
            <span>Built by Muhammad Zarrar</span>
          </div>

          <h1 className="hero-title">
            <span className="mask">
              <span className="mask-in">We don&rsquo;t just</span>
            </span>
            <span className="mask">
              <span className="mask-in d1">make websites.</span>
            </span>
            <span className="mask">
              <span className="mask-in d2 line-2">We audit broken digital flows —</span>
            </span>
            <span className="mask">
              <span className="mask-in d3 line-2">and build the systems that fix them.</span>
            </span>
          </h1>

          <div className="hero-foot">
            <Reveal>
              <p className="hero-sub">
                Businesses lose customers in ways they can&rsquo;t see: menus
                without prices, three different WhatsApp numbers, pages Google
                can&rsquo;t read. We find the leaks. Then we build the fix.
              </p>
              <div className="hero-ctas">
                <Link href="/free-audit" className="btn btn-primary">
                  Get your free 5-point audit
                </Link>
                <Link href="/services" className="btn btn-ghost">
                  See services
                </Link>
              </div>
            </Reveal>
            <Reveal className="trust-row">
              {TRUST_CHIPS.map((chip) => (
                <span className="trust-item" key={chip}>
                  {chip}
                </span>
              ))}
              <Link href="/free-audit" className="u-link" style={{ marginTop: 18, width: "fit-content" }}>
                What the audit checks →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee />

      <PinnedManifesto />

      {/* ============ WHAT WE KEEP FINDING ============ */}
      <section
        className="section section-ink"
        id="findings"
        data-tl="Findings"
        aria-labelledby="findings-heading"
      >
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <span className="sec-index">01</span>
              <span className="sec-label">From real audits</span>
              <span className="sec-rule" />
            </div>
            <h2 className="sec-title" id="findings-heading">
              The same leaks, <em>over and over.</em>
            </h2>
          </Reveal>

          <div className="index-list">
            {FINDINGS.map((finding, i) => (
              <Reveal key={finding.title} className="index-row" as="article">
                <span className="idx-no">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="idx-title" style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)" }}>
                    {finding.title}
                  </h3>
                  <p className="idx-sub">{finding.body}</p>
                </div>
                <span className="idx-mark" aria-hidden="true">
                  ✗
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal className="findings-close">
            <p>
              Every one of these is from a real audit we performed. Yours
              takes 48 hours.
            </p>
            <Link href="/free-audit">
              Start free — 5-point mini-audit →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section
        className="section"
        id="services"
        data-tl="Services"
        aria-labelledby="services-heading"
      >
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <span className="sec-index">02</span>
              <span className="sec-label">Services</span>
              <span className="sec-rule" />
            </div>
            <h2 className="sec-title" id="services-heading">
              Five ways we <em>fix the flow.</em>
            </h2>
          </Reveal>

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
            <Reveal>
              <Link href="/pricing" className="index-row index-row-accent">
                <span className="idx-no">06</span>
                <div>
                  <h3 className="idx-title">Add-ons &amp; Monthly Care</h3>
                  <p className="idx-sub">
                    WhatsApp flows, installable PWAs, local SEO, quote
                    calculators — and a care plan that keeps everything
                    updated, reported, and owned by you.
                  </p>
                </div>
                <span className="idx-side">
                  <span className="price-pill">from PKR 20,000/mo</span>
                  <span className="idx-arrow">
                    <ArrowRightIcon size={20} />
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section
        className="section"
        id="process"
        data-tl="Process"
        aria-labelledby="process-heading"
        style={{ paddingTop: 0 }}
      >
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <span className="sec-index">03</span>
              <span className="sec-label">Process</span>
              <span className="sec-rule" />
            </div>
            <h2 className="sec-title" id="process-heading">
              Four phases. <em>Honest timelines.</em>
            </h2>
          </Reveal>
          <div className="phase-grid">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.name} className="phase" as="article">
                <span className="ph-no" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{step.name}</h3>
                <span className="ph-time">{step.timeline}</span>
                <p>{step.summary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section
        className="section"
        id="why"
        data-tl="Why us"
        aria-labelledby="why-heading"
        style={{ paddingTop: 0 }}
      >
        <div className="container split">
          <Reveal className="split-sticky">
            <div className="sec-head">
              <span className="sec-index">04</span>
              <span className="sec-label">Why us</span>
            </div>
            <h2 className="sec-title" id="why-heading" style={{ marginBottom: 24 }}>
              Evidence, ownership, and a <em>direct line.</em>
            </h2>
            <p className="lede">
              The short version of why businesses hand us the keys — and keep
              them handed over.
            </p>
          </Reveal>
          <div>
            {WHY_US.map((point, i) => (
              <Reveal key={point.title} className="why-row" as="article">
                <span className="idx-no">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="cta-full" id="start" data-tl="Start" aria-labelledby="cta-heading">
        <div className="container">
          <Reveal>
            <h2 id="cta-heading">
              Send us your <em>website link.</em>
            </h2>
            <p className="cta-body">
              Free 5-point audit within 24 hours — speed, Google visibility,
              mobile, conversion, security. No obligation.
            </p>
            <div className="cta-actions">
              <Link href="/free-audit" className="btn btn-light btn-lg">
                Get your free audit
              </Link>
              <a
                href={waLink(
                  "Hello Zarrar.Solutions — here's my website link for the free 5-point audit: "
                )}
                target="_blank"
                rel="noopener"
                className="btn btn-ghost-on-ink btn-lg"
              >
                <WhatsAppIcon size={16} /> WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
