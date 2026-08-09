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
