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
import { CodeChevron } from "@/components/code-mark";
import { waLink } from "@/lib/site";

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
          <div className="hero-sign hero-sign-l" aria-hidden="true">
            <div className="hero-sign-pane">
              <CodeChevron side="left" />
            </div>
          </div>
          <div className="hero-promise hero-cluster">
            <h1 className="hero-promise-title">You leave understood</h1>
            <h3 className="hero-promise-subtitle">— not pitched.</h3>
          </div>
          <svg
            className="hero-code-slash"
            viewBox="0 0 40 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M28 18L12 142"
              stroke="currentColor"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="hero-sign hero-sign-r" aria-hidden="true">
            <div className="hero-sign-pane">
              <CodeChevron side="right" />
            </div>
          </div>
          <div className="hero-loader" role="status" aria-label="Preparing the next section">
            <div className="hero-loader-meta">
              <span>Loading</span>
              <span><span className="hero-loader-value">0</span>%</span>
            </div>
            <span className="hero-loader-track" aria-hidden="true">
              <span className="hero-loader-fill" />
            </span>
          </div>
        </div>
        <div className="hero-toolbar">
          <div className="hero-ctas">
            <a href="#brief" className="btn btn-primary" data-magnetic>
              Write your brief
            </a>
          </div>
        </div>
        <p className="hero-floor">
          <span>This way</span>
        </p>
      </section>

      <ProofStrip />

      <section
        className="section recognize"
        id="you"
        data-tl="You"
        data-motion
        aria-labelledby="you-heading"
      >
        <div className="recognize-stage">
          <div className="container recognize-layout">
            <div className="recognize-intro">
              <div className="sec-head">
                <span className="sec-index">01</span>
                <span className="sec-label">If this is your Tuesday</span>
                <span className="sec-rule" />
              </div>
              <h2 className="sec-title" id="you-heading">
                You&apos;re not behind.
                <br />{" "}
                <em>
                  — You&apos;re undiagnosed.
                  <i className="recognize-underline" aria-hidden="true" />
                </em>
              </h2>
              <p className="lede sec-lede">
                Most owners we meet already know something&apos;s off. They just
                haven&apos;t had anyone name it without trying to sell a rebuild
                first.
              </p>
            </div>

            <div className="recognize-scan" aria-hidden="true">
              <span className="recognize-scan-start">01</span>
              <span className="recognize-scan-track">
                <span className="recognize-scan-progress" />
                <span className="recognize-scan-active" />
                {RECOGNITIONS.map((item) => (
                  <i key={item.title} />
                ))}
              </span>
              <span className="recognize-scan-end">
                {String(RECOGNITIONS.length).padStart(2, "0")}
              </span>
            </div>

            <div className="recognize-diagnostic">
              <div className="index-list recognize-list">
                {RECOGNITIONS.map((item, i) => (
                  <article className="index-row recognize-row" key={item.title}>
                    <span className="recognize-row-rule" aria-hidden="true" />
                    <span className="recognize-row-beam" aria-hidden="true" />
                    <span className="idx-no">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="idx-title">{item.title}</h3>
                      <p className="idx-sub">{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
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
                <div className="vignette-plaque">
                  <img src={item.src} alt="" width={400} height={400} />
                </div>
                <figcaption>
                  <span className="vignette-cap">{item.title}</span>
                  <span className="vignette-note">{item.body}</span>
                </figcaption>
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
