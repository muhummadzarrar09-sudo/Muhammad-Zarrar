import { pageMeta } from "@/lib/seo";
import {
  CONTRAST,
  NEXT_STEPS,
  OUTCOMES,
  RECOGNITIONS,
} from "@/content/qualify";
import { QualifyForm } from "@/components/qualify-form";
import { PinnedManifesto } from "@/components/pinned-manifesto";
import { Marquee } from "@/components/marquee";
import { ProofStrip } from "@/components/proof-strip";
import { WhatsAppIcon } from "@/components/icons";
import { waLink } from "@/lib/site";

function CodeGlyph({ side }: { side: "left" | "right" }) {
  return (
    <svg
      className="hero-code-glyph"
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0.75" y="0.75" width="198.5" height="258.5" rx="6" fill="#C4C3B6" stroke="#111110" strokeOpacity="0.22" strokeWidth="1.5" />
      <path d={side === "left" ? "M133 60L58 130L133 200" : "M68 60L143 130L68 200"} stroke="#111110" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d={side === "left" ? "M186 48L142 212" : "M58 48L14 212"} stroke="#111110" strokeWidth="8" strokeLinecap="round" />
      <circle cx={side === "left" ? "24" : "176"} cy="24" r="4" fill="#111110" fillOpacity="0.4" />
    </svg>
  );
}

export const metadata = pageMeta({
  title:
    "Zarrar.Solutions — Tell us what's leaking. Walk out with a written plan.",
  description:
    "A qualifying brief for business owners in Islamabad & Rawalpindi. Say what you need and what you hoped to pay. We reply within 24 hours with findings — and an honest quote.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="hero hero-minimal" id="top" data-tl="Welcome" data-motion>
        <div className="hero-stage">
          <div className="hero-top">
            <h1 className="hero-promise hero-cluster">
              <span className="hero-line">You leave understood</span>
              <span className="hero-line hero-line-em">— not pitched.</span>
            </h1>
            <div className="hero-toolbar">
              <div className="hero-ctas">
                <a href="#brief" className="btn btn-primary">
                  Write your brief
                </a>
              </div>
            </div>
          </div>

          <div className="hero-lock" aria-hidden="true">
            <div className="hero-sign hero-sign-l">
              <div className="hero-sign-pane">
                <CodeGlyph side="left" />
              </div>
            </div>
            <div className="hero-sign hero-sign-r">
              <div className="hero-sign-pane">
                <CodeGlyph side="right" />
              </div>
            </div>
          </div>

          <div className="hero-loader-line" aria-hidden="true" />

          <p className="hero-floor">
            <span>Scroll to explore</span>
          </p>
        </div>
      </section>

      <ProofStrip />

      <section
        className="section"
        id="you"
        data-tl="You"
        data-motion
        aria-labelledby="you-heading"
      >
        <div className="container">
          <div className="sec-head">
            <span className="sec-index">01</span>
            <span className="sec-label">If this is your Tuesday</span>
            <span className="sec-rule" />
          </div>
          <h2 className="sec-title" id="you-heading">
            You&apos;re not behind. <em>You&apos;re undiagnosed.</em>
          </h2>
          <p className="lede sec-lede">
            Most owners we meet already know something&apos;s off. They just
            haven&apos;t had anyone name it without trying to sell a rebuild
            first.
          </p>
          <div className="index-list recognize-list">
            {RECOGNITIONS.map((item, i) => (
              <article className="index-row" key={item.title}>
                <span className="idx-no">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="idx-title">{item.title}</h3>
                  <p className="idx-sub">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="exhibit"
        id="moment"
        data-tl="Pause"
        data-motion
        aria-label="A pause"
      >
        <div className="exhibit-stage">
          <img
            src="/images/gallery/arch.jpg"
            alt=""
            className="exhibit-canvas"
            width={1920}
            height={1080}
          />
          <div className="notch-card">
            <span className="notch-kicker">A pause</span>
            <p className="notch-title">
              <span className="type-src">
                You don&apos;t need another website.
              </span>
              <span className="type-out" aria-hidden="true" />
            </p>
            <p className="notch-body">
              <span className="type-src">
                You need the one that takes the next order — and a number that
                doesn&apos;t move unless the work does.
              </span>
              <span className="type-out" aria-hidden="true" />
            </p>
            <a className="notch-scroll" href="#brief">
              Write the brief
            </a>
          </div>
        </div>
      </section>

      <Marquee />

      <section
        className="room-ink"
        id="get"
        data-tl="You get"
        data-motion
        aria-labelledby="get-heading"
      >
        <div className="container">
          <p className="room-label">What you walk away with</p>
          <h2 className="room-title" id="get-heading">
            Not a pitch. A result.
          </h2>
          <div className="vignette-grid">
            {OUTCOMES.map((item) => (
              <figure className="vignette" key={item.title}>
                <img src={item.src} alt="" width={400} height={400} />
                <figcaption>
                  <span className="vignette-cap">{item.title}</span>
                  <span className="vignette-note">{item.body}</span>
                </figcaption>
                <span className="hex" aria-hidden="true" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section-ink"
        id="different"
        data-tl="Different"
        data-motion
        aria-labelledby="different-heading"
      >
        <div className="container">
          <div className="sec-head">
            <span className="sec-index">02</span>
            <span className="sec-label">Why this feels different</span>
            <span className="sec-rule" />
          </div>
          <h2 className="sec-title" id="different-heading">
            The usual way, <em>and then this.</em>
          </h2>
          <div className="contrast-list">
            {CONTRAST.map((row) => (
              <article className="contrast-row" key={row.here}>
                <p className="contrast-usual">
                  <span>Usual</span>
                  {row.usual}
                </p>
                <p className="contrast-here">
                  <span>Here</span>
                  {row.here}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section"
        id="next"
        data-tl="Next"
        data-motion
        aria-labelledby="next-heading"
      >
        <div className="container">
          <div className="sec-head">
            <span className="sec-index">03</span>
            <span className="sec-label">Then what happens</span>
            <span className="sec-rule" />
          </div>
          <h2 className="sec-title" id="next-heading">
            After you send it.
          </h2>
          <div className="phase-grid next-grid">
            {NEXT_STEPS.map((step) => (
              <article className="phase" key={step.no}>
                <span className="ph-no" aria-hidden="true">
                  {step.no}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PinnedManifesto />

      <section
        className="section qualify-section"
        id="brief"
        data-tl="Brief"
        data-motion
        aria-labelledby="brief-heading"
      >
        <div className="container qualify-wrap">
          <div className="qualify-intro">
            <div className="sec-head">
              <span className="sec-index">04</span>
              <span className="sec-label">Your brief</span>
              <span className="sec-rule" />
            </div>
            <h2 className="sec-title" id="brief-heading">
              What you need. What you hoped to pay.{" "}
              <em>Then the honest quote.</em>
            </h2>
            <p className="lede">
              This is the last thing on the page on purpose. Fill it once.
              We stop guessing in chat. You see the neighborhood of a real
              quote before you send anything.
            </p>
            <p className="qualify-aside">
              If your number is below what the work costs, we&apos;ll say so.
              If it isn&apos;t a fit, we&apos;ll say that too. Either way you
              leave with a straight answer.
            </p>
            <a
              href={waLink(
                "Hello Zarrar — I came from the site. I'd rather talk than fill the brief."
              )}
              target="_blank"
              rel="noopener"
              className="qualify-hello"
            >
              <WhatsAppIcon size={16} /> Or just say hello
            </a>
          </div>
          <div className="form-card qualify-card">
            <h3 className="form-title">The brief</h3>
            <p className="form-sub">
              Two minutes. Lands with the builder. Nothing is stored here.
            </p>
            <QualifyForm />
          </div>
        </div>
      </section>
    </>
  );
}
