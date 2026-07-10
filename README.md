# Muhammad Zarrar — Portfolio + Business Studio Site

A premium single-page portfolio **plus** a separate, dark-themed studio site for local businesses & clinics — all in one build.

## What's inside

1. **Main Portfolio** (`/`) — warm "Vivid+Co" editorial theme. Full-Stack / AI developer showcase with terminal hero, custom cursor, synthesized sound, and scroll choreography.
2. **Business Studio Site** (`/business`) — dark, futuristic, Linear/Vercel-style landing page aimed at converting local-business clients (clinics, coaches, service companies). Reached via the "For clinics & local businesses" link in the main hero.

Both share the same premium chrome: the custom physics cursor, click/"pew" hover sound, scroll-progress bar, and focus-pull reveals.

## Tech stack

- **React + Vite + TypeScript**
- **Tailwind CSS v4** (theme tokens in `src/index.css`)
- **Framer Motion** for all animation (scroll pinning, parallax, reveals — replaces GSAP/ScrollTrigger with equivalent results)

## Run

```bash
npm install
npm run dev      # local dev
npm run build    # production build -> dist/index.html (single file)
```

Deploy `dist/` to Vercel, Netlify, or any static host. For deep links to `/business` to work on refresh, enable **SPA fallback** (rewrite all routes to `index.html`). On Vercel/Netlify this is the default for single-page apps.

## Where to edit content

| What | File |
|------|------|
| Main portfolio — name, role, projects, email | `src/data/portfolio.ts` |
| Business site — phone, WhatsApp, email, prices, projects, services | `src/business/data.ts` |
| Site colors / theme tokens | `src/index.css` |

### Important placeholders to replace in `src/business/data.ts`
- `biz.phone` and `biz.whatsapp` — real number (digits only for `wa.me`).
- `biz.email` — already your real email.
- `clinic.plans` prices — starting estimates (Rs.), adjust as needed.

## Sound

- UI feedback ("pew" on hover, click) is always live.
- The ambient **breeze + birds** bed is opt-in via the navbar toggle.
- All audio is synthesized at runtime (Web Audio API) — no asset files.

## Notes

- The cursor is hidden on touch devices; sound unlocks on first interaction (browser policy).
- Replace placeholder phone numbers/prices before sharing with clients.
