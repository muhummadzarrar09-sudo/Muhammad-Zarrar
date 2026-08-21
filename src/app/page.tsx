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
import { ProofStrip } from "@/components/proof-strip";
import { Teardown } from "@/components/teardown";
import { PrivacyLive } from "@/components/privacy-live";
import { WhatsAppIcon, ArrowRightIcon } from "@/components/icons";

export const metadata = pageMeta({
  title:
    "Zarrar.Solutions — Audit-Led Web Development, Islamabad & Rawalpindi",
  description:
    "Website audit, redesign, catalog and booking systems for businesses in Islamabad, Rawalpindi, and across Pakistan. We audit broken digital flows — and build the systems that fix them. Free 5-point audit. 0 trackers. Brutalist editorial.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* Brutalist side label */}
      <div className="side-label" aria-hidden="true">
        NO TRACKERS // 0 COOKIES // AUDIT-LED // EST 2026 RWP // FILE: INDEX.HTML
      </div>

      {/* ============ HERO — FORGE BRUTAL ============ */}
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
            <span className="hero-kicker-live">LIVE AUDIT — THIS SITE VS ITSELF</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem" }}>
              RWP, PK · 48H AUDIT · 7-DAY BUILD · 12 REQ
            </span>
          </div>

          <h1 className="hero-title">
            <span className="line">
              <span className="line-inner">We don&apos;t just</span>
            </span>
            <span className="line">
              <span className="line-inner">make websites.</span>
            </span>
            <span className="line">
              <span className="line-inner line-2">We audit broken</span>
            </span>
            <span className="line">
              <span className="line-inner line-2">digital flows —</span>
            </span>
            <span className="line">
              <span className="line-inner line-2">and forge the fix.</span>
            </span>
          </h1>

          <div className="hero-foot">
            <Reveal>
              <p className="hero-sub">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent)", display: "block", marginBottom: 10 }}>
                  // REAL LEAKS FROM REAL AUDITS, ISLAMABAD / RWP
                </span>
                Businesses lose customers in ways they can&apos;t see: menus
                without prices, three different WhatsApp numbers, pages Google
                can&apos;t read, 70+ files loading on Jazz 4G. We find the leaks
                with evidence. Then we build the system that fixes them — and
                you own it completely. No rented themes. No trackers. No bullshit.
              </p>
              <div className="hero-ctas">
                <Link href="/free-audit" className="btn btn-primary btn-lg btn-magnetic">
                  Get free 5-point audit [24h]
                </Link>
                <Link href="/services" className="btn btn-ghost btn-lg">
                  See system →
                </Link>
              </div>
              <div className="privacy-proof">
                <span className="privacy-proof-item">0 cookies</span>
                <span className="privacy-proof-item">0 trackers</span>
                <span className="privacy-proof-item">0 CDN</span>
                <span className="privacy-proof-item">100% SSR</span>
                <span className="privacy-proof-item">38/38 AA</span>
              </div>
            </Reveal>
            <Reveal className="trust-row">
              {TRUST_CHIPS.map((chip) => (
                <span className="trust-item" key={chip}>
                  <strong>{chip.split(" ")[0]}</strong> {chip.split(" ").slice(1).join(" ")}
                </span>
              ))}
              <Link href="/free-audit" className="u-link" style={{ marginTop: 18, width: "fit-content" }}>
                What the audit checks [5] →
              </Link>
              <div style={{ marginTop: 22 }}>
                <PrivacyLive />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ProofStrip />

      <Marquee />

      <PinnedManifesto />

      {/* ============ TEARDOWN — Terminal brutal ============ */}
      <section className="section" id="teardown" data-tl="Teardown" aria-labelledby="teardown-heading">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <span className="sec-index">#01</span>
              <span className="sec-label" style={{ fontFamily: "var(--font-mono)" }}>INTERACTIVE_PROOF.EXE</span>
              <span className="sec-rule" />
            </div>
            <h2 className="sec-title" id="teardown-heading">
              Don&apos;t take our word. <em>Open DevTools.</em>
            </h2>
            <p className="lede" style={{ marginBottom: 36, maxWidth: "62ch", fontFamily: "var(--font-mono)", fontSize: "0.9rem", lineHeight: 1.6 }}>
              $ audit --real --islamabad --rawalpindi<br/>
              &gt; 4 patterns, same leaks. This site is built to avoid all 4. Tap to inspect.
            </p>
          </Reveal>
          <Reveal>
            <Teardown />
          </Reveal>
          <Reveal>
            <div className="inset-panel" style={{ marginTop: 32 }}>
              <h3 className="panel-title" style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                HOW_THIS_SITE_PROVES_IT.TXT
              </h3>
              <p className="panel-body" style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem" }}>
                &gt; Network: 12 requests, all same-origin<br/>
                &gt; View Source: full HTML, not &lt;div id=&quot;root&quot;&gt;&lt;/div&gt;<br/>
                &gt; No analytics, no pixels, no cookie banner needed<br/>
                <Link href="/privacy" className="u-link">cat /privacy →</Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ BRUTAL BREAK 01 — Art moment ============ */}
      <section className="brutal-break" aria-hidden="true">
        <img src="/images/logo-mark.svg" alt="" className="brutal-break-mark" width={1200} height={1200} />
        <div className="brutal-break-content">
          <h2>
            73 → 12 <em>requests. 10.4s → 1.9s. Same content.</em>
          </h2>
          <div className="brutal-break-meta">REAL AUDIT PATTERN // ISLAMABAD RETAILER // ANONYMIZED BUT VERIFIED</div>
        </div>
      </section>

      {/* ============ FINDINGS — Redacted doc brutal ============ */}
      <section
        className="section section-ink"
        id="findings"
        data-tl="Findings"
        aria-labelledby="findings-heading"
      >
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <span className="sec-index">#02</span>
              <span className="sec-label" style={{ fontFamily: "var(--font-mono)" }}>FINDINGS.LOG</span>
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
              takes 48 hours. No invented clients.
            </p>
            <Link href="/free-audit">
              Start free — 5-point mini-audit [24h] →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICES — System brutal ============ */}
      <section
        className="section"
        id="services"
        data-tl="Services"
        aria-labelledby="services-heading"
      >
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <span className="sec-index">#03</span>
              <span className="sec-label" style={{ fontFamily: "var(--font-mono)" }}>SERVICES.SYS</span>
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
                    <span className="price-pill" style={{ fontFamily: "var(--font-mono)" }}>{service.priceLabel}</span>
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
                  <span className="price-pill" style={{ fontFamily: "var(--font-mono)" }}>from PKR 20,000/mo</span>
                  <span className="idx-arrow">
                    <ArrowRightIcon size={20} />
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ BRUTAL BREAK 02 ============ */}
      <section className="brutal-break" aria-hidden="true" style={{ background: "var(--canvas)", borderColor: "var(--text)" }}>
        <img src="/images/logo-mark-small.svg" alt="" className="brutal-break-mark" width={1200} height={1200} style={{ opacity: 0.09, filter: "contrast(1.8)" }} />
        <div className="brutal-break-content">
          <h2 style={{ color: "var(--text)" }}>
            OWNED <em>not rented. Audited not guessed.</em>
          </h2>
          <div className="brutal-break-meta">LOCAL-FIRST // YOU OWN CODE, DOMAIN, DATA // NO LOCK-IN // VERIFIABLE</div>
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
              <span className="sec-index">#04</span>
              <span className="sec-label" style={{ fontFamily: "var(--font-mono)" }}>PROCESS.SH</span>
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
                <span className="ph-time" style={{ fontFamily: "var(--font-mono)" }}>{step.timeline}</span>
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
              <span className="sec-index">#05</span>
              <span className="sec-label" style={{ fontFamily: "var(--font-mono)" }}>WHY_US.MD</span>
            </div>
            <h2 className="sec-title" id="why-heading" style={{ marginBottom: 24 }}>
              Evidence, ownership, and a <em>direct line.</em>
            </h2>
            <p className="lede" style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem" }}>
              &gt; No account managers<br/>
              &gt; No fake team photos<br/>
              &gt; No tracking needed to prove it<br/>
              &gt; Direct line to builder
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
            <p className="cta-body" style={{ fontFamily: "var(--font-mono)", fontSize: "0.92rem" }}>
              &gt; free 5-point audit within 24h<br/>
              &gt; speed / Google / mobile / conversion / security<br/>
              &gt; no obligation, no tracker follows you after
            </p>
            <div className="cta-actions">
              <Link href="/free-audit" className="btn btn-light btn-lg btn-magnetic">
                Get free audit [24h]
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
