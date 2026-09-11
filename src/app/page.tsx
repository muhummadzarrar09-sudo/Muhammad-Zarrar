import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import {
  CONTRAST,
  NEXT_STEPS,
  OUTCOMES,
  RECOGNITIONS,
} from "@/content/qualify";
import { ScrambleText } from "@/components/scramble-text";
import { Placard } from "@/components/placard";
import { CrossIcon, SealCheckIcon, WhatsAppIcon } from "@/components/icons";
import { Scribble } from "@/components/scribble";
import { JumpLink } from "@/components/jump-link";
import { PinnedManifesto } from "@/components/pinned-manifesto";
import { Marquee } from "@/components/marquee";
import { ProofStrip } from "@/components/proof-strip";
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
            <h1 className="hero-promise-title">You leave <em><Scribble>understood</Scribble></em></h1>
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
            <Link href="/brief" className="btn btn-primary btn-star" data-magnetic>
              <span className="btn-star-ring" aria-hidden="true" />
              Write your brief
            </Link>
          </div>
        </div>
        {/* Not a scroll hint any more: a real skip. Pressing it loads the next
            room behind the route curtain rather than fast-forwarding the
            420vh diagnose scene, which used to read as the page sticking. */}
        <JumpLink to="#after-hero" className="hero-floor" label="Skip to what happens next">
          <span className="crank" aria-hidden="true">
            <svg className="crank-ring" viewBox="0 0 100 100" focusable="false">
              <defs>
                <path
                  id="crank-orbit"
                  d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                  fill="none"
                />
              </defs>
              <text className="crank-text">
                <textPath href="#crank-orbit" textLength="231" lengthAdjust="spacingAndGlyphs">
                  Skip ahead · Skip ahead · Skip ahead ·
                </textPath>
              </text>
            </svg>
            <span className="crank-core">
              <span className="crank-arrow">↓</span>
            </span>
          </span>
          <span className="hero-floor-label">Skip to what happens next</span>
        </JumpLink>
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
              <Placard no="01" title="The Diagnostic" medium="Putty on ink" />
              <div className="sec-head">
                <span className="sec-index">01</span>
                <ScrambleText className="sec-label" text="If this is your Tuesday" />
                <span className="sec-rule" />
              </div>
              <h2 className="sec-title" id="you-heading" data-pressure>
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
            className="exhibit-canvas grade"
            loading="lazy"
            decoding="async"
            width={1920}
            height={1080}
          />
          <div className="exhibit-copy">
            <Placard no="02" title="A Pause" medium="Breath on canvas" tone="dark" />
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
              <Link className="notch-scroll" href="/brief">
                Write the brief
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section
        className="section results-section"
        id="get"
        data-tl="You get"
        data-motion
        aria-labelledby="get-heading"
      >
        <div className="container">
          <p className="results-intro">
            What you walk away with
          </p>
          <h2 className="results-title" id="get-heading" data-pressure>
            Not a pitch. A result.
          </h2>
          <div className="vignette-grid results-vignette-grid">
            {OUTCOMES.map((item) => (
              <figure className="vignette results-vignette" key={item.title}>
                <div className="vignette-plaque results-vignette-plaque">
                  <img
                    src={item.src}
                    alt=""
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="results-vignette-image"
                  />
                </div>
                <figcaption>
                  <span className="vignette-cap results-vignette-cap">{item.title}</span>
                  <span className="vignette-note results-vignette-note">{item.body}</span>
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
            <ScrambleText className="sec-label" text="Why this feels different" />
            <span className="sec-rule" />
          </div>
          <h2 className="sec-title" id="different-heading" data-pressure>
            The usual way, <em>and then this.</em>
          </h2>
          <div className="contrast-list">
            {CONTRAST.map((row) => (
              <article className="contrast-row" key={row.here}>
                <p className="contrast-usual">
                  <span className="contrast-kicker">
                    <CrossIcon size={12} />
                    Usual
                  </span>
                  {row.usual}
                </p>
                <p className="contrast-here">
                  <span className="contrast-kicker">
                    <SealCheckIcon size={14} />
                    Here
                  </span>
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
            <ScrambleText className="sec-label" text="Then what happens" />
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

      {/* The close of the walk. The form itself lives at /brief — one
          question per screen, its own link, shareable in a message. The
          walk shouldn't end in a wall of fields. */}
      <section
        className="section closer-section"
        id="brief"
        data-tl="Brief"
        data-motion
        aria-labelledby="brief-heading"
      >
        <div className="container closer-wrap">
          <div className="closer-copy">
            <div className="sec-head">
              <span className="sec-index">04</span>
              <ScrambleText className="sec-label" text="Your brief" />
              <span className="sec-rule" />
            </div>
            <h2 className="sec-title" id="brief-heading" data-pressure>
              What you need. What you hoped to pay.{" "}
              <em>Then the honest quote.</em>
            </h2>
            <p className="lede">
              Seven questions, one at a time, about ninety seconds. You see the
              neighborhood of a real quote before anything leaves your phone.
            </p>
            <p className="closer-pledge">
              If your number is below what the work costs, we&apos;ll say so.
              If it isn&apos;t a fit, we&apos;ll say that too. Either way you
              leave with a straight answer.
            </p>
            <div className="closer-actions">
              <Link href="/brief" className="btn btn-primary btn-star" data-magnetic>
                <span className="btn-star-ring" aria-hidden="true" />
                Write your brief
              </Link>
              <a
                href={waLink(
                  "Hello Zarrar — I came from the site. I'd rather talk than fill the brief."
                )}
                target="_blank"
                rel="noopener"
                className="closer-hello"
              >
                <WhatsAppIcon size={16} /> Or just say hello
              </a>
            </div>
            <p className="closer-note">
              Nothing stored. No trackers. It leaves as one WhatsApp message to
              the person who writes the code.
            </p>
          </div>

          <div className="closer-aside" aria-hidden="true">
            <ol className="closer-steps">
              <li>
                <span className="closer-no">01</span>
                <span className="closer-q">What do you need?</span>
              </li>
              <li>
                <span className="closer-no">02</span>
                <span className="closer-q">The number you hoped for.</span>
              </li>
              <li>
                <span className="closer-no">03</span>
                <span className="closer-q">The honest neighborhood.</span>
              </li>
              <li>
                <span className="closer-no">04</span>
                <span className="closer-q">When, and in your words.</span>
              </li>
              <li>
                <span className="closer-no">05</span>
                <span className="closer-q">Who, and how to reach you.</span>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
