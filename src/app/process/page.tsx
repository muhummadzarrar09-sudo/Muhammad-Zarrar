import Link from "next/link";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { PROCESS_STEPS } from "@/content/site-content";
import { Reveal } from "@/components/reveal";
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

      <section className="page-hero">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span aria-current="page">Process</span>
            </nav>
            <span className="eyebrow">Process</span>
            <h1>Four phases. Honest timelines.</h1>
            <p className="lede">
              No mystery phases, no &ldquo;we&rsquo;ll get back to you.&rdquo;
              This is the whole pipeline, with the real numbers attached.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-label="Process phases">
        <div className="container">
          <div className="grid grid-2" style={{ gap: 22 }}>
            {PROCESS_STEPS.map((step, i) => (
              <Reveal
                key={step.name}
                className={`card card-hover process-step ${i === 3 ? "process-step-dark" : ""}`}
                as="article"
              >
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                    <span className="step-no" aria-hidden="true">0{i + 1}</span>
                    <h3 style={{ fontSize: "1.5rem" }}>{step.name}</h3>
                    <span className="step-time" style={{ marginLeft: "auto" }}>{step.timeline}</span>
                  </div>
                  <p style={{ marginTop: 14, color: "inherit" }}>{step.detail}</p>
                  <ul className="checklist" style={{ marginTop: 18 }}>
                    {step.deliverables.map((d) => (
                      <li key={d}>
                        <CheckIcon size={15} />
                        <span style={{ fontSize: "0.94rem" }}>{d}</span>
                      </li>
                    ))}
                    </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="inset-panel process-after">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ maxWidth: 620 }}>
                <h2 style={{ fontSize: "1.4rem", marginBottom: 8 }}>
                  After launch: optional care plan
                </h2>
                <p style={{ color: "var(--text-2)", fontSize: "0.97rem" }}>
                  Hosting, updates, small changes within 48 hours, and a
                  plain-language monthly report — from PKR 20,000/month. Or
                  don&rsquo;t: you own everything, and it runs fine without
                  us. The plan exists for owners who&rsquo;d rather never
                  think about it.
                </p>
              </div>
              <Link href="/pricing" className="btn btn-ghost">
                See care plan pricing
              </Link>
            </div>
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
