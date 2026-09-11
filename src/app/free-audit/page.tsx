import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { waLink, WHATSAPP_DISPLAY } from "@/lib/site";
import { FREE_AUDIT_POINTS } from "@/content/site-content";
import { AuditForm } from "@/components/audit-form";
import { Reveal } from "@/components/reveal";
import { SelfCheck } from "@/components/self-check";
import { DTag, GradeRing } from "@/components/diagram";
import { Scribble } from "@/components/scribble";
import BorderGlow from "@/components/border-glow";
import { JsonLd } from "@/components/jsonld";
import { WhatsAppIcon } from "@/components/icons";
import { PageHero, SectionIntro } from "@/components/page-hero";

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

      <PageHero
        blueprint
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Free 5-Point Audit" },
        ]}
        kicker="The five-point"
        stamp="24h reply"
        title={
          <>
            Free 5-Point{" "}
            <em>
              <Scribble>Mini-Audit.</Scribble>
            </em>
          </>
        }
        lede="Send us your website link — or tell us you don’t have one yet. Within 24 hours we reply with five findings about your business’s digital front door. No spam, no follow-up sequence. You get findings, you decide."
      />

      <section className="section">
        <div className="container service-detail-grid">
          <div>
            <Reveal>
              <SectionIntro
                index="01"
                label="What we check"
                title="Five things. In writing."
              />
              <ol className="point-list" data-stagger>
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

            <Reveal className="inset-panel">
              <h2 className="panel-title">Want the deep version?</h2>
              <p className="card-body">
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

          <Reveal id="request">
            <BorderGlow
              tone="glass"
              className="border-glow-card--form"
              coneSpread={34}
              glowIntensity={0.85}
            >
              <h2 className="form-title">Request your mini-audit</h2>
              <p className="form-sub">
                Fills in a WhatsApp message to us — nothing is stored anywhere.
              </p>
              <AuditForm />
            </BorderGlow>
          </Reveal>
        </div>
        <div className="container sample-wrap">
          <Reveal className="card sample-report" spotlight>
            <div className="sample-head">
              <div>
                <p className="sample-kicker">
                  <DTag tone="sample">Sample report</DTag>
                </p>
                <h2 className="sample-title">What lands in your inbox</h2>
              </div>
              <GradeRing grade="C" />
            </div>
            <ol className="sample-findings">
              <li>
                <DTag tone="high">High</DTag>
                <div>
                  <p className="sample-finding">71 files block first paint</p>
                  <p className="sample-evidence">
                    theme.css · builder-runtime.js · 3 font CDNs · slider.js ·
                    chat-widget.js
                  </p>
                </div>
              </li>
              <li>
                <DTag tone="high">High</DTag>
                <div>
                  <p className="sample-finding">
                    Google receives an empty shell
                  </p>
                  <p className="sample-evidence">
                    {'<div id="root"></div> — 0 words in the raw HTML'}
                  </p>
                </div>
              </li>
              <li>
                <DTag tone="med">Medium</DTag>
                <div>
                  <p className="sample-finding">No WhatsApp above the fold</p>
                  <p className="sample-evidence">
                    Contact link sits in the footer, three screens down
                  </p>
                </div>
              </li>
            </ol>
            <p className="sample-foot">
              Illustrative findings in the documented pattern — yours will
              name your files, your seconds, your pages.{" "}
              <Link href="#request">Request yours</Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="section-tight"
        style={{ paddingTop: 0 }}
        aria-labelledby="selfcheck-heading"
      >
        <div className="container">
          <Reveal>
            <SectionIntro
              index="02"
              label="Self-check"
              title="The 10-second read"
              lede="Tap what sounds familiar. No email, no score theater — just a straight read on whether the mini-audit is worth your link."
              headingId="selfcheck-heading"
            />
          </Reveal>
          <Reveal>
            <SelfCheck />
          </Reveal>
        </div>
      </section>

      <section
        className="section-tight"
        style={{ paddingTop: 0 }}
        aria-hidden="true"
      >
        <div className="container">
          <p className="orn-asterism">&#10087;</p>
        </div>
      </section>

      <section
        className="section-tight"
        style={{ paddingTop: 0 }}
        aria-label="Direct WhatsApp"
      >
        <div className="container">
          <Reveal className="inset-panel">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 18,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2 className="panel-title">Or just WhatsApp us</h2>
                <p className="card-body">
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
                <WhatsAppIcon size={16} /> WhatsApp us directly
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
