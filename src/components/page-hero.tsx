import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Reveal } from "./reveal";
import { ScrambleText } from "./scramble-text";

export type Crumb = { href?: string; label: string };

/** Inner-route opening. Same gallery grammar as home: kicker, oversized
 *  Fraunces, quiet lede. Pulls under the floating pill via CSS. */
export function PageHero({
  crumbs,
  kicker,
  title,
  lede,
  stamp,
  motif,
  blueprint = false,
  compact = false,
  children,
}: {
  crumbs: Crumb[];
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  stamp?: string;
  motif?: ReactNode;
  blueprint?: boolean;
  compact?: boolean;
  children?: ReactNode;
}) {
  const className = [
    "page-hero",
    blueprint ? "hero-blueprint" : "",
    compact ? "page-hero--compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={className} id="top" data-tl="Top">
      {motif}
      <div className="container">
        {stamp ? (
          <p className="stamp" aria-hidden="true">
            {stamp}
          </p>
        ) : null}
        <Reveal>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            {crumbs.map((crumb, i) => (
              <Fragment key={`${crumb.label}-${i}`}>
                {i > 0 ? (
                  <span className="sep" aria-hidden="true">
                    /
                  </span>
                ) : null}
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </Fragment>
            ))}
          </nav>
          <div className="sec-head page-hero-kicker">
            <span className="sec-index" aria-hidden="true">
              ·
            </span>
            <ScrambleText className="sec-label" text={kicker} />
            <span className="sec-rule" />
          </div>
          <h1>{title}</h1>
          {lede ? <p className="lede">{lede}</p> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

/** Section chrome for inner rooms — index · label · rule, then the title. */
export function SectionIntro({
  index,
  label,
  title,
  lede,
  headingId,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  headingId?: string;
}) {
  return (
    <header className="section-intro section-head">
      <div className="sec-head">
        {index ? <span className="sec-index">{index}</span> : null}
        <ScrambleText className="sec-label" text={label} />
        <span className="sec-rule" />
      </div>
      <h2 className="sec-title" id={headingId}>
        {title}
      </h2>
      {lede ? <p className="lede sec-lede">{lede}</p> : null}
    </header>
  );
}
