import Link from "next/link";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import { CrossIcon } from "@/components/icons";

export const metadata = pageMeta({
  title: "About — Muhammad Zarrar, Senior Full-Stack Builder",
  description:
    "Zarrar.Solutions is one senior full-stack builder in Rawalpindi with an audit-first system. When you call, you talk to the person who writes the code. No fake teams, no account managers.",
  path: "/about",
  ogImage: "/og-about.png",
});

const VALUES = [
  {
    title: "Evidence over promises",
    body: "Nothing gets recommended that can't be shown. Findings come with proof, quotes come in writing, and 'trust us' is not a deliverable.",
  },
  {
    title: "Realistic timelines",
    body: "Seven working days means seven working days. If a timeline can't be kept, it isn't quoted. Under-promising is a feature.",
  },
  {
    title: "Local-first ownership",
    body: "Your data, your domain, your code — on infrastructure you control. Nothing is held hostage to keep you paying.",
  },
];

const NOT_DOING = [
  "No account managers between you and the code",
  "No fake team photos or invented departments",
  "No vague 'starting from' prices that triple later",
  "No pirated plugins, page-builder lock-in, or rented themes",
];

export default function AboutPage() {
  /* Drop public/images/portrait.jpg (min 720×860) into the repo and rebuild —
     the monogram card is replaced by the real photo automatically. */
  const hasPortrait = existsSync(
    path.join(process.cwd(), "public/images/portrait.jpg")
  );

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="page-hero" id="top" data-tl="Top">
        <div className="container">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span aria-current="page">About</span>
            </nav>
            <span className="eyebrow">About</span>
            <h1>One builder. <em>A system that ships.</em></h1>
            <p className="lede">
              Zarrar.Solutions is Muhammad Zarrar — a senior full-stack builder
              in Rawalpindi — plus a working system of audits, specs, and
              builds. When you call, you talk to the person who writes the
              code.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="story" data-tl="Story" aria-labelledby="story-heading">
        <div className="container service-detail-grid">
          <Reveal className="monogram-card">
            {hasPortrait ? (
              <Image
                src="/images/portrait.jpg"
                alt="Muhammad Zarrar — founder of Zarrar.Solutions, Rawalpindi"
                width={720}
                height={860}
                className="portrait-img"
                priority
              />
            ) : (
              <img
                src="/images/logo-mark.svg"
                alt=""
                aria-hidden="true"
                className="monogram-mark"
                width={240}
                height={240}
              />
            )}
          </Reveal>
          <div className="prose">
            <h2 id="story-heading">Why audit-first</h2>
            <p>
              Most agencies sell rebuilds without diagnosis. A client arrives
              with a slow, quiet website and leaves with a quote for a new one
              — nobody ever opened the code to find out what was actually
              wrong. The new site inherits the old mistakes, and the owner
              pays twice.
            </p>
            <p>
              This studio runs the other way around. The audit comes first:
              source code read, pages tested on real mobile data, every finding
              written down with evidence. Only then does anyone talk about
              building — and by then the scope, the price, and the timeline
              are facts, not guesses.
            </p>
            <p>
              Being solo is the point, not a limitation. One senior builder
              means no handoffs, no telephone game, no junior learning on
              your budget. It&rsquo;s also why standard builds ship in about
              seven working days: there&rsquo;s no meeting about the meeting.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="values-heading" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Values</span>
            <h2 id="values-heading">
              Three rules, kept in writing
            </h2>
          </Reveal>
          <div className="grid grid-3">
            {VALUES.map((value) => (
              <Reveal key={value.title} className="card card-hover value-card">
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="not-doing-heading">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Equally important</span>
            <h2 id="not-doing-heading">
              What you won&rsquo;t get here
            </h2>
          </Reveal>
          <div className="grid grid-2">
            {NOT_DOING.map((item) => (
              <Reveal key={item} className="card why-card">
                <span className="why-check" aria-hidden="true">
                  <CrossIcon size={16} />
                </span>
                <div>
                  <p>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        headline="Talk to the builder directly."
        body="No forms disappearing into a CRM, no 'our team will reach out'. Start with the free 5-point mini-audit and see the standard for yourself."
        primaryHref="/free-audit"
        primaryLabel="Get your free audit"
        whatsappMessage="Hello Zarrar.Solutions — I'd like to talk to the builder."
      />
    </>
  );
}
