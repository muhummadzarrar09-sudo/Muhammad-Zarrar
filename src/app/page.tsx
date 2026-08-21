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
import {
  WhatsAppIcon,
  CheckIcon,
  CrossIcon,
  ArrowRightIcon,
} from "@/components/icons";
import { FREE_AUDIT_POINTS } from "@/content/site-content";

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
        <div className="container hero-grid">
          <Reveal>
            <span className="hero-eyebrow">
              <span className="dot" aria-hidden="true" />
              Audit-led digital systems · Islamabad &amp; Rawalpindi
            </span>
            <h1 className="hero-title">
              <span>We don&rsquo;t just make websites.</span>{" "}
              <span className="line-2">
                We audit broken digital flows — and build the systems that fix
                them.
              </span>
            </h1>
            <p className="hero-sub">
              Businesses lose customers in ways they can&rsquo;t see: menus
              without prices, three different WhatsApp numbers, pages Google
              can&rsquo;t read. We find the leaks. Then we build the fix.
            </p>
            <div className="hero-ctas">
              <Link href="/free-audit" className="btn btn-primary btn-lg">
                Get your free 5-point audit
              </Link>
              <Link href="/services" className="btn btn-ghost btn-lg">
                See services
              </Link>
            </div>
            <div className="hero-trust">
              {TRUST_CHIPS.map((chip) => (
                <span className="chip" key={chip}>
                  <CheckIcon size={14} /> {chip}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="hero-card card">
            <span className="hero-card-tag">Free · 24 hours</span>
            <p className="card-label">The 5-point mini-audit checks</p>
            <ul>
              {FREE_AUDIT_POINTS.map((point) => (
                <li key={point.name}>
                  <CheckIcon size={15} />
                  <span>{point.name}</span>
                </li>
              ))}
            </ul>
            <p className="card-foot">
              Send a link, get five findings.{" "}
              <Link href="/free-audit">Get yours →</Link>
            </p>
          </Reveal>
        </div>
      </section>

      <PinnedManifesto />

      {/* ============ WHAT WE KEEP FINDING ============ */}
      <section className="section section-ink" id="findings" data-tl="Findings" aria-labelledby="findings-heading">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">From real audits</span>
            <h2 id="findings-heading">What we keep finding</h2>
            <p className="lede">
              These aren&rsquo;t hypothetical failure modes. They&rsquo;re the
              patterns we find again and again in Pakistani business websites.
            </p>
          </Reveal>
          <div className="findings-grid">
            {FINDINGS.map((finding, i) => (
              <Reveal key={finding.title} className="finding-card" as="article">
                <span className="finding-x" aria-hidden="true">
                  <CrossIcon size={17} />
                </span>
                <h3>{finding.title}</h3>
                <p>{finding.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="findings-close">
            <p>
              Every one of these is from a real audit we performed. Yours takes
              48 hours.
            </p>
            <Link href="/free-audit">
              Start free with the 5-point mini-audit{" "}
              <ArrowRightIcon size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="section" id="services" data-tl="Services" aria-labelledby="services-heading">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Services</span>
            <h2 id="services-heading">What we build</h2>
            <p className="lede">
              Five services, one starting point: evidence. Every engagement
              begins with what&rsquo;s actually wrong — then we price the fix
              in writing.
            </p>
          </Reveal>
          <div className="grid grid-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="card card-hover service-card"
                >
                  <h3>{service.name}</h3>
                  <p>{service.blurb}</p>
                  <span className="card-meta">
                    <span className="price-pill">{service.priceLabel}</span>
                    <span className="card-arrow">
                      Explore <ArrowRightIcon size={15} />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal>
              <Link
                href="/pricing"
                className="card card-hover service-card service-card-accent"
              >
                <h3>Add-ons &amp; Monthly Care</h3>
                <p>
                  WhatsApp flows, installable PWAs, local SEO, quote
                  calculators — and a care plan that keeps everything updated,
                  reported, and owned by you.
                </p>
                <span className="card-meta">
                  <span className="price-pill">from PKR 20,000/mo</span>
                  <span className="card-arrow">
                    See pricing <ArrowRightIcon size={15} />
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="section-tight" id="process" data-tl="Process" aria-labelledby="process-heading" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Process</span>
            <h2 id="process-heading">Four phases. Honest timelines.</h2>
          </Reveal>
          <div className="process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal
                key={step.name}
                className={`process-step ${i === 3 ? "process-step-dark" : ""}`}
                as="article"
              >
                <span className="step-no" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3>{step.name}</h3>
                <span className="step-time">{step.timeline}</span>
                <p>{step.summary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section className="section" id="why" data-tl="Why us" aria-labelledby="why-heading">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Why us</span>
            <h2 id="why-heading">
              The short version: evidence, ownership, and a direct line
            </h2>
          </Reveal>
          <div className="grid grid-2">
            {WHY_US.map((point) => (
              <Reveal key={point.title} className="card card-hover why-card">
                <span className="why-check" aria-hidden="true">
                  <CheckIcon size={17} />
                </span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="section section-ink cta-band" id="start" data-tl="Start" aria-labelledby="cta-heading">
        <div className="container">
          <Reveal className="cta-band-inner">
            <div className="cta-band-text">
              <h2 id="cta-heading" className="serif-display">
                Send us your website link.
              </h2>
              <p>
                Free 5-point audit within 24 hours — speed, Google visibility,
                mobile, conversion, security. No obligation.
              </p>
            </div>
            <div className="cta-band-actions">
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
                <WhatsAppIcon size={18} /> WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
