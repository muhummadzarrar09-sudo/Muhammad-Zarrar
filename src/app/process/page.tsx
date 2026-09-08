import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { PROCESS_STEPS } from "@/content/site-content";
import { Reveal } from "@/components/reveal";
import { ScrambleText } from "@/components/scramble-text";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { CheckIcon } from "@/components/icons";

export const metadata = pageMeta({
  title: "Our Process — Audit, Findings, Build, Launch",
  description:
    "How Zarrar.Solutions works: 48-hour website audit, written findings with evidence, 7-day builds with daily previews, zero-downtime launch. Honest timelines for web development in Pakistan.",
  path: "/process",
  ogImage: "/og-process.png",
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Process", path: "/process" },
        ])}
      />

      <section className="page-hero" id="top" data-tl="Top">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span aria-current="page">Process</span>
            </nav>
            <ScrambleText className="eyebrow" text="Process" />
            <h1>
              Four phases. <em>Honest timelines.</em>
            </h1>
            <p className="lede">
              No mystery phases, no &ldquo;we&rsquo;ll get back to you.&rdquo;
              This is the whole pipeline, with the real numbers attached.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="phases" data-tl="Phases" aria-label="Process phases">
        <div className="container">
          <div className="stepper">
            <div className="stepper-rail" aria-hidden="true">
              <span className="stepper-track">
                <span className="stepper-fill" />
              </span>
              {PROCESS_STEPS.map((step, i) => (
                <span className="stepper-tick" key={step.name}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
            <ol className="stepper-list">
              {PROCESS_STEPS.map((step, i) => (
                <li className="stepper-step" key={step.name}>
                  <Reveal className="phase" as="article" spotlight>
                    <span className="ph-no" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{step.name}</h3>
                    <span className="ph-time">{step.timeline}</span>
                    <p>{step.detail}</p>
                    <ul className="checklist" data-stagger style={{ marginTop: 20 }}>
                      {step.deliverables.map((d) => (
                        <li key={d}>
                          <CheckIcon size={16} />
                          <span>
                            {d}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <Reveal className="inset-panel process-after">
            <h2 className="panel-title">
              After launch: optional care plan
            </h2>
            <p className="panel-body">
              Hosting, updates, small changes within 48 hours, and a
              plain-language monthly report — from PKR 20,000/month. Or
              don&rsquo;t: you own everything, and it runs fine without us.
              The plan exists for owners who&rsquo;d rather never think about
              it.{" "}
              <Link href="/pricing" className="u-link">
                See care plan pricing
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        headline="Phase one starts with a link."
        body="Send your website and the free 5-point mini-audit lands within 24 hours. The paid audit follows in 48 — then you've seen the whole pipeline before spending a rupee on a build."
        primaryHref="/free-audit"
        primaryLabel="Start phase one — free"
        whatsappMessage="Hello Zarrar.Solutions — I'd like to start with the audit."
      />
    </>
  );
}
