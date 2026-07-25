# Portfolio Stabilization Plan

This plan preserves the audit context and breaks the cleanup into phases so fixes can be made without degrading the visual direction.

## Phase 0 — Build, audit, and safety baseline

Status: Done

- Run TypeScript before every production build.
- Keep `dist/` and `node_modules/` out of Git.
- Upgrade vulnerable build dependencies until `npm audit --audit-level=low` is clean.
- Verify `/`, `/business`, and public image assets from the Vite dev server.

## Phase 1 — Critical runtime correctness

Status: Done

- Make the main portfolio contact form produce a real email draft instead of a fake success-only animation.
- Add visible validation messages for required contact fields.
- Keep a fallback link if the visitor's mail client does not open.
- Fix Business Contact WhatsApp submission fallback when popups are blocked.
- Add clipboard fallbacks.
- Add explicit button types to reusable buttons so form submission is never accidental.

## Phase 2 — Animation lifecycle and memory cleanup

Status: Done

- Add cleanup for GSAP contexts and ScrollTriggers in pricing, work cards, and process cards.
- Fix stale active-card state in the process ScrollTrigger callback.
- Clean contact form timers on unmount/reset.
- Fix Cinematic Reel playback timers and stale closure behavior.
- Make cinematic sequence cancellation-safe.
- Clean custom-cursor ripple timers.

## Phase 3 — Accessibility and reduced-motion support

Status: Done

- Respect `prefers-reduced-motion` globally.
- Disable Lenis when reduced motion is requested.
- Avoid hiding the system cursor unless the React cursor is actually active.
- Disable custom cursor under reduced motion.
- Add accessible error messages and field associations in the portfolio contact form.
- Add baseline ARIA to the custom business dropdown.

## Phase 4 — Performance guardrails

Status: Done

- Remove unused heavyweight `src/assets/brain.*` files.
- Remove expensive `preserveDrawingBuffer` settings from major canvases.
- Add reduced-motion static fallbacks for the heaviest 3D sculptures.
- Reduce extreme scroll-reactive 3D transforms so the sculpture remains controlled rather than disorienting.
- Reduce very high mesh segment counts to visually similar but safer levels.

## Phase 5 — Remaining recommended improvements

Status: In progress

These are next-pass improvements that require more design/product decisions:

- Add ESLint and Prettier configuration. Done.
- Add Playwright smoke tests for `/`, `/business`, navigation, reduced motion, and contact CTAs. Done; tests are configured and discovered. Browser execution requires Playwright Chromium to be installed on the machine/CI runner.
- Add an Error Boundary around render-heavy/cinematic sections. Done.
- Lazy-load 3D/cinematic sections. Done: below-the-fold portfolio sections, business route, and heavy 3D/cinematic layers now load through React lazy/Suspense.
- Add a real backend/form service if email drafts are not enough.
- Add hosting-level CSP/security headers. Done for Vercel and Netlify/Cloudflare-style `_headers`; canonical URL and OG image remain for SEO phase.
- Replace the custom dropdown with a fully keyboard-navigable listbox or native select. Done: business dropdown now uses native `<select>` with custom styling.
- Revisit content density: the cinematic sections are visually strong but can bury proof and conversion.

## Phase 6 — Security headers

Status: Done

- Added a compatible CSP meta tag in `index.html` for baseline static protection.
- Added `vercel.json` headers for Vercel deployments.
- Added `public/_headers` for Netlify/Cloudflare Pages style deployments.
- Added `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and anti-framing headers where host headers are supported.
- Removed `vite-plugin-singlefile` so Vite can emit real JS/CSS chunks and lazy-loaded sections can split properly; CSP no longer allows inline scripts.

## Phase 7 — Browser smoke tests

Status: Implemented

- Added `@playwright/test`.
- Added `playwright.config.ts` with desktop Chromium, reduced-motion Chromium, and mobile Chromium projects.
- Added E2E coverage for portfolio load, business load, client-side route switching, email CTAs, WhatsApp CTAs, business form fields, and reduced-motion rendering.
- Added `npm run test:e2e`, `npm run test:e2e:ui`, and `npm run check:full`.
- Kept `npm run check` as typecheck + lint + build so local checks do not fail on machines before Playwright browsers are installed.
- The sandbox could not download Chromium because the Playwright CDN connection reset, but `npx playwright test --list` successfully discovers all 18 configured tests.

## Phase 8 — Business dropdown accessibility

Status: Done

- Replaced the custom button/listbox implementation with a styled native `<select>`.
- Kept the dark/warm visual treatment while restoring browser-native keyboard, screen-reader, and mobile picker behavior.
- Updated E2E smoke coverage to assert the business form exposes combobox controls.

## Phase 9 — Lazy-loaded cinematic sections

Status: Done

- Converted below-the-fold portfolio sections (`About`, `Expertise`, `Work`, `Process`, `Contact`) to `React.lazy` + `Suspense`.
- Converted the `/business` route to lazy-load separately from the main portfolio.
- Lazy-loaded heavy 3D/cinematic components inside hero, work, process, contact, and business hero.
- Added reusable loading fallbacks that preserve the cinematic visual language while chunks load.
- Removed `vite-plugin-singlefile` so dynamic imports produce real build chunks and browser caching can work normally.
- Tightened CSP script policy from `script-src 'self' 'unsafe-inline'` to `script-src 'self'` after removing single-file inline scripts.

## Phase 10 — Conversion and credibility polish

Status: Done

- Rewrote the hero positioning to explain the actual offer faster: full-stack products, AI agents, voice interfaces, and polished web systems.
- Added above-the-fold proof chips for builds, stack, and working style so visitors understand capability before the cinematic sections.
- Added explicit project outcomes and proof bullets to the portfolio data model.
- Upgraded featured project cards with outcome panels and concrete proof points.
- Added a `Proof snapshot` block before the cinematic reel so real engineering credibility appears before the visual interlude.
- Moved the non-featured project list above the cinematic reel so proof is no longer buried after multiple 3D sections.
- Updated browser smoke tests to assert the actual hero heading.

## Phase 11 — SEO and social metadata

Status: Done

- Added canonical URL, robots directives, richer Open Graph tags, Twitter card tags, image dimensions, locale, and alt text in `index.html`.
- Added a branded share preview at `public/og-image.svg`.
- Added `public/robots.txt` and `public/sitemap.xml` for the portfolio and business route.
- Added `public/site.webmanifest` for install/share metadata.
- Added JSON-LD structured data for `Person`, `WebSite`, and `ProfessionalService`.
- Added `SeoRouteMeta` so client-side navigation updates title, description, canonical URL, and social metadata for `/` vs `/business`.
- Kept CSP strict for scripts by hashing the inline JSON-LD script instead of re-allowing general inline scripts.
- Updated README deployment notes with the canonical production URL locations to change when moving domains.

## Phase 12 — CI quality gate

Status: Prepared, not committed as a workflow file

- Added local quality scripts: `npm run check`, `npm run check:full`, and `npm run test:e2e`.
- A GitHub Actions workflow was prepared, but the current GitHub App token cannot push `.github/workflows/*` files because it does not have `workflows` permission.
- Until GitHub is reconnected with workflow permissions, use `npm run check` locally and `npm run check:full` on a machine/CI runner with Playwright Chromium installed.
