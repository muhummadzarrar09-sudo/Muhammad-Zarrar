# Zarrar.Solutions — Content Map & Section Inventory

Every route, every section, every link — the whole site on one page.
Companion to `docs/motion-wireframes.md` (what moves) and `docs/DESIGN-AUDIT.md` (how it looks).
Contact details live in exactly one file: `src/lib/site.ts`.

---

## Routes at a glance

| Route | Title | Priority | Nav entry |
|---|---|---|---|
| `/` | Tell us what's leaking. Walk out with a written plan. | 1.0 | logo |
| `/free-audit` | Free 5-Point Mini-Audit | 0.95 | header (mobile) · footer |
| `/services` | Five services. One starting point: evidence. | 0.9 | header · footer |
| `/services/[slug]` ×5 | per-service | 0.85 | footer Services column |
| `/pricing` | In PKR, in writing. | 0.9 | header · footer |
| `/process` | Audit → Findings → Build → Launch | 0.7 | header · footer |
| `/about` | One builder. A system that ships. | 0.7 | header · footer |
| `/contact` | Talk to the builder. | 0.6 | footer · mobile menu |
| `/notes` | Evidence, written down. | 0.6 | footer · mobile menu |
| `/notes/[slug]` ×2 | per-note | — | notes index |
| `/privacy` | Privacy, the way we build | 0.3 | footer |
| `/terms` | Terms of work | 0.3 | footer |
| 404 | This page failed its audit. | — | — |

---

## `/` — Home ("the gallery walk")

| # | Section | id / `data-tl` | Content |
|---|---|---|---|
| 0 | Hero | `#top` · "Welcome" | *"You leave understood — not pitched."* + glass code-sign halves + **Write your brief** CTA (`#brief`) |
| 0.5 | Proof strip | — | "You talk to the builder · Reply in 24 hours · 0 trackers · Nothing stored on this page" |
| 1 | If this is your Tuesday | `#you` · "You" | *"You're not behind. You're undiagnosed."* + 6 recognitions (WiFi vs Jazz 4G, prices in DMs, three numbers, Google blank page, dark site, quote with no diagnosis) |
| 2 | Pause / exhibit | `#moment` · "Pause" | Pinned arch painting + typewriter card: *"You don't need another website…"* → CTA `#brief` |
| 2.5 | Marquee | — | 7 chips: diagnosis you can keep · number in writing · one WhatsApp · you own the keys · reply in 24h · no sequence · the builder reads it |
| 3 | What you walk away with | `#get` · "You get" | *"Not a pitch. A result."* + 3 plaque outcomes (diagnosis / ownership / converting WhatsApp) |
| 4 | Why this feels different | `#different` · "Different" | *"The usual way, and then this."* + Usual-vs-Here contrast pairs |
| 5 | After you send it | `#next` · "Next" | *"After you send it."* + 3 next-step phases |
| 6 | Manifesto | `#manifesto` · "With you" | Pinned typewriter note, line-by-line |
| 7 | Your brief | `#brief` · "Brief" | *"What you need. What you hoped to pay. Then the honest quote."* + qualifying form (need / budget / timeline → WhatsApp) + "Or just say hello" |

Home form logic (`src/content/qualify.ts`): 6 need options (audit / redesign / retail / booking / dashboard / unsure) × 6 PKR budget bands × 4 timelines; mismatch between the two gets an honest inline note.

---

## `/services` + 5 detail pages

- **Index** (`#services-list`): numbered rows — name, blurb, price pill. Footer: "Not sure? The audit decides." → `/pricing`.
- **`website-audit`** — from PKR 35,000 (35–50k, credited toward a build). Problem → 8 inclusions → who it's for → 3 FAQs.
- **`redesign`** — Audit + Redesign, PKR 150,000–500,000, tiered.
- **`retailflow`** — Catalog Systems, from PKR 250,000.
- **`bookingflow`** — Appointment Systems, from PKR 200,000.
- **`dashboards`** — Internal Tools, from PKR 300,000.
- Each detail page: lead → the problem (2 paras) → what's included (8 bullets) → who it's for → price card → FAQs → CTA band.

## `/pricing`

- **Rates** (`#rates`): 5 service rows (name → detail page, price range, blurb) + redesign tiers subsection.
- **Add-ons** (5): WhatsApp flow 80k · PWA 60k · Local SEO 40–80k · calculators 80–150k · care plan 20–25k/mo.
- **Terms** (`#terms`): quotes in writing, payment schedule, ownership on full payment.

## `/process`

- **Phases** (`#phases`): Audit (48h) → Findings (written report) → Build (~7 days, daily preview) → Launch (zero downtime) — each with summary, detail, deliverables.
- **After** panel: what happens after launch + `/pricing` link.

## `/about`

- **Story** (`#story`): why audit-first; monogram card (auto-swaps to `public/images/portrait.jpg` if present).
- **Values** (4) and **What we're not doing** list; CTA band.

## `/free-audit`

- 5 free mini-audit points (speed on mobile data, Google visibility, mobile experience, conversion path, security basics).
- Full-audit upsell panel (`/services/website-audit`), audit request form (URL + contact → WhatsApp), direct WhatsApp panel.

## `/contact`

- 3 cards: WhatsApp (pre-filled deep link), Email (`mailto:`), Location.
- Message form → WhatsApp deep link. "Nothing is stored" promise.

## `/notes` — Field Notes

- Index + 2 evidence pieces:
  - `homepage-weighs-70-files` — the 10-second homepage.
  - `google-sees-a-blank-page` — crawler reads an empty shell.
- Each: sections of prose + closing inset panel.

## `/privacy` · `/terms`

- Plain-language legal pages. Privacy: what's collected (nothing), third parties, client data local-first rule, no-analytics rationale.
- Terms: quotes/scope, payments, ownership, timelines, care plans, responsibility. Questions → email (plain `mailto:` anchor).

## Global chrome

- **Header** (sticky, 68px): brand · Services · Pricing · Process · About · **Write your brief** (`/#brief`) · mobile menu (adds Free Audit / Field Notes / Contact).
- **Right rail** (`ScrollTimeline`): scroll progress + diamond markers per `data-tl` section; real buttons, Lenis-glide jumps.
- **Route progress** 2px bar on internal navigation.
- **Footer**: brand + positioning · Site column (9 links) · Services column (5) · Contact (WhatsApp / email / location) · bottom rail (© 2026, note, **Back to top**).

---

## Link audit (this pass)

**Every internal target resolves** — all 12 routes, 5 service slugs, 2 note slugs, and all in-page anchors (`#brief`, `#main`, `#you`, `#different`, `#next`) exist. The "loose" feeling came from four things, all now fixed:

1. **Anchor targets landed under the sticky header** — `scroll-margin-top: 84px` + Lenis `ANCHOR_OFFSET = -84` everywhere (`src/motion/engine.ts`).
2. **Cross-route hash links (`/#brief`) hard-jumped** — engine now glides to `location.hash` after route boots, reloads, and `hashchange`.
3. **Same-route links were dead** (footer "Services" on `/services` did nothing) — `SmartLink` (`src/components/smooth-nav.tsx`) now glides to top (or to the hash) instead.
4. **`mailto:` wrapped in `<Link>`** on privacy/terms — now plain `<a>`. Plus a **Back to top** glider in the footer.

## Motion inventory (after the level-up)

| Scene | Where | Type |
|---|---|---|
| Hero arrival (masked lines, signs from the wings) | home | one-shot entrance |
| Hero converge (sign halves lock into the mark) | home | scrubbed leave |
| Recognize / Contrast / Next steps / Brief | home | scrubbed staggers |
| Exhibit pin + typewriter + ken-burns (ends 1.08) | home | scrubbed pin |
| Plaque hang | home | scrubbed |
| Manifesto typewriter | home | scrubbed pin |
| **Line-masked title reveals (SplitText)** | home `.sec-title`/`.room-title` | scrubbed, reversible |
| **Page-hero h1 line entrance** | all inner routes | one-shot entrance |
| **Velocity-reactive marquee** | home | wheel-tied drift |
| **`[data-parallax]` drift** | exhibit canvas `0.03`, vignette grid `0.04` | scrubbed, reversible |
| Page-leave hero thin | all inner routes | scrubbed |
| Room ground-color walk | all | scrubbed |
| `.rv` blur+rise reveals (bidirectional IO) | inner pages | toggle |
