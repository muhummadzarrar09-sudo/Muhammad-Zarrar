# Muhammad Zarrar — Personal Portfolio

A premium, single-page portfolio for Muhammad Zarrar: a Full-Stack, AI & Mobile Engineer based in Rawalpindi, Pakistan. It showcases selected product work, technical expertise, process, and a direct contact path.

## What’s inside

- Editorial, warm-paper visual system with light and dark themes
- Responsive React + TypeScript single-page portfolio
- Selected work with GitHub links and project outcomes
- Motion that respects `prefers-reduced-motion`
- Accessible focus states, skip link, semantic sections, and client-side form validation
- Contact envelope that opens an email draft — intentionally no backend or tracking
- Build-time GitHub activity data, SEO metadata, JSON-LD, sitemap, robots file, and security headers

## Tech stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React
- Playwright for end-to-end tests

## Run locally

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

## Deployment

Deploy the `dist/` output to Vercel, Netlify, Cloudflare Pages, or another static host.

The canonical production URL is currently `https://muhummadzarrar.vercel.app`. If it changes, update the source of truth used by the SEO/security generation script and rerun the build.

## Where to edit content

| What | File |
|---|---|
| Name, role, profile, projects, expertise, process, and contact links | `src/data/portfolio.ts` |
| GitHub activity snapshot | `src/data/github.json` |
| Portfolio sections and UI | `src/components/` |
| Theme tokens and global styles | `src/index.css` |
| SEO/security generation | `scripts/generate-security-headers.mjs` |

## Contact behaviour

The contact form deliberately creates a pre-filled `mailto:` draft instead of submitting data to a backend. This means there is no lead database, tracking, or third-party email service; visitors can also copy the email address directly.

## GitHub activity data

`npm run build` runs `scripts/fetch-github-stats.mjs` before Vite builds. The script pulls public GitHub data for `muhummadzarrar09-sudo` and refreshes `src/data/github.json`. It supports an optional `GITHUB_TOKEN` environment variable for higher API rate limits.

## Sound and interaction

The portfolio uses CSS and Framer Motion for interaction. Motion is reduced for visitors who enable `prefers-reduced-motion`.

## Motion system (cinematic pass)

- **Lenis smooth scroll** — back in (`src/lib/scroll.ts`), feeding GSAP ScrollTrigger. Skipped under `prefers-reduced-motion`.
- **Work = the horizontal roll** — on desktop the section pins and the three heavy builds roll sideways as you scroll (GSAP ScrollTrigger + `containerAnimation` parallax on media and ghost numbers, progress rail + counter). Mobile / reduced motion get the same content as a calm alternating list.
- **Envelope scene** — the contact envelope zooms into a fullscreen scene: flap opens, wax seal breaks, the letter slides out and becomes the full form; after sending it folds back, reseals and zooms out. Reduced motion gets the form directly.
- **Branded preloader** — "MZ" wax-stamp + progress line; signals the hero to begin its reveal as the sheet lifts (`src/lib/enter.ts`). Skipped under reduced motion.
- **Custom cursor** — clay dot + trailing ring, fine-pointer devices only; native cursor is untouched for touch/reduced-motion users.
- **Film grain** — one tileable SVG-noise data-URI (CSP-safe), blend-mode overlay, ~7% opacity, 55s drift. Static under reduced motion.
- **Velocity marquees** — the hero type wall, system ticker, and footer name wall are GSAP-driven (`src/lib/marquee.ts`): they speed up to ~4.5× with scroll velocity, flip direction when scrolling up, lean with a subtle skew, then ease back. CSS loops remain as the reduced-motion / no-JS baseline.

## Interaction demos

- **SwingFrame frame scrubber** — drag (fine pointer), play/pause slow-mo, or use the slider/arrow keys to scrub six surreal swing frames in the Work section. The video engine demonstrated by the site's own mechanic.
- **Project story modal** — every featured panel opens a full case-study overlay (description → focus → shipped → verified stats → links) without leaving the page. Escape / backdrop / ✕ closes; body scroll pauses while open.
- **Copy-email chip** — one-click copy with "copied" confirmation in the contact section; falls back silently where the Clipboard API is unavailable.

## Verified data

All portfolio numbers come from the live GitHub API and each repo's README — `src/data/github.json` is regenerated at build time (`npm run fetch:github`). The Sasa+ client project links to its live site; its source lives in a private repo and is described as such.
