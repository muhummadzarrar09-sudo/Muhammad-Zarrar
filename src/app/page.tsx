import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { waLink } from "@/lib/site";
import { SERVICES } from "@/content/services";
import {
  FINDINGS,
  WHY_US,
  PROCESS_STEPS,
} from "@/content/site-content";
import { Reveal } from "@/components/reveal";
import { PinnedManifesto } from "@/components/pinned-manifesto";
import { Marquee } from "@/components/marquee";
import { ProofStrip } from "@/components/proof-strip";
import { Teardown } from "@/components/teardown";
import { PrivacyLive } from "@/components/privacy-live";
import { WhatsAppIcon, ArrowRightIcon } from "@/components/icons";

export const metadata = pageMeta({
  title:
    "Zarrar.Solutions — Audit-Led Web Development, Islamabad & Rawalpindi",
  description:
    "We audit why your website isn't selling — then build the system that does. Free 5-point audit. 0 trackers, 0 cookies, 100% yours.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* ============ HERO — ONE SENTENCE PROMISE, LIGHT, SPACIOUS ============ */}
      <section className="hero" id="top" data-tl="Top">
        <img
          src="/images/logo-mark.svg"
          alt=""
          aria-hidden="true"
          className="hero-mark"
          width={760}
          height={760}
        />
        <div className="container">
          <div className="hero-kicker">
            <span className="hero-kicker-live">0 trackers · 0 cookies · 100% owned</span>
            <span>Rawalpindi · 48h audit · 7-day build</span>
          </div>

          {/* ONE SENTENCE PROMISE */}
          <h1 className="hero-title">
            <span className="line">
              <span className="line-inner">We audit why your site</span>
            </span>
            <span className="line">
              <span className="line-inner">isn&apos;t selling —</span>
            </span>
            <span className="line">
              <span className="line-inner line-2">then build the system</span>
            </span>
            <span className="line">
              <span className="line-inner line-2">that does.</span>
            </span>
          </h1>

          <div className="hero-foot hero-foot-light">
            <Reveal>
              <p className="hero-sub">
                No fake teams. No rented themes. One senior builder, one WhatsApp flow,
                one system you own completely. Free 5-point audit in 24 hours.
              </p>
              <div className="hero-ctas">
                <Link href="/free-audit" className="btn btn-primary btn-lg btn-magnetic">
                  Get your free audit
                </Link>
              </div>
            </Reveal>
            <Reveal>
              <div style={{ marginTop: 8 }}>
                <PrivacyLive />
              </div>
              <p style={{ marginTop: 16, fontSize: "0.84rem", color: "var(--text-2)", maxWidth: "32ch", lineHeight: 1.5 }}>
                Built to the same standard we audit against. Open DevTools → Network to verify.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <ProofStrip />

      <Marquee />

      <PinnedManifesto />

      {/* ============ TEARDOWN — Soft, spacious ============ */}
      <section className="section" id="teardown" data-tl="Teardown" aria-labelledby="teardown-heading">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <span className="sec-index">01</span>
              <span className="sec-label">Proof, not promises</span>
              <span className="sec-rule" />
            </div>
            <h2 className="sec-title" id="teardown-heading">
              The leaks we keep <em>finding.</em>
            </h2>
            <p className="lede" style={{ marginBottom: 36 }}>
              Four patterns from real audits in Islamabad & Rawalpindi. This site avoids all four — by design.
            </p>
          </Reveal>
          <Reveal>
            <Teardown />
          </Reveal>
        </div>
      </section>

      {/* ============ FINDINGS ============ */}
      <section
        className="section section-ink"
        id="findings"
        data-tl="Findings"
        aria-labelledby="findings-heading"
      >
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <span className="sec-index">02</span>
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
                  <h3 className="idx-title">
                    {finding.title}
                  </h3>
                  <p className="idx-sub">{finding.body}</p>
                </div>
                <span className="idx-mark" aria-hidden="true">✗</span>
              </Reveal>
            ))}
          </div>

          <Reveal className="findings-close">
            <p>Every one from a real audit. Yours takes 48 hours.</p>
            <Link href="/free-audit">Start free — 5-point mini-audit →</Link>
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
              <span className="sec-index">03</span>
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
                    <span className="idx-arrow"><ArrowRightIcon size={20} /></span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="section" id="process" data-tl="Process" aria-labelledby="process-heading" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <span className="sec-index">04</span>
              <span className="sec-label">Process</span>
              <span className="sec-rule" />
            </div>
            <h2 className="sec-title" id="process-heading">Four phases. <em>Honest timelines.</em></h2>
          </Reveal>
          <div className="phase-grid">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.name} className="phase" as="article">
                <span className="ph-no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.name}</h3>
                <span className="ph-time">{step.timeline}</span>
                <p>{step.summary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section className="section" id="why" data-tl="Why us" aria-labelledby="why-heading" style={{ paddingTop: 0 }}>
        <div className="container split">
          <Reveal className="split-sticky">
            <div className="sec-head">
              <span className="sec-index">05</span>
              <span className="sec-label">Why us</span>
            </div>
            <h2 className="sec-title" id="why-heading" style={{ marginBottom: 24 }}>Evidence, ownership, and a <em>direct line.</em></h2>
            <p className="lede">Why businesses hand us the keys — and keep them.</p>
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
            <h2 id="cta-heading">Send us your <em>link.</em></h2>
            <p className="cta-body">Free 5-point audit in 24 hours. No spam. No tracker follows you after.</p>
            <div className="cta-actions">
              <Link href="/free-audit" className="btn btn-light btn-lg btn-magnetic">Get your free audit</Link>
              <a href={waLink("Hello Zarrar.Solutions — here's my website link for the free 5-point audit: ")} target="_blank" rel="noopener" className="btn btn-ghost-on-ink btn-lg"><WhatsAppIcon size={16} /> WhatsApp us</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
