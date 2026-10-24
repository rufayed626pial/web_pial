# Pial — Portfolio

Personal portfolio of Md. Rufayed Islam (Pial). React + TypeScript + Vite, plain organized CSS with design tokens, Lucide icons, React Router. No animation library: motion is CSS plus small IntersectionObserver hooks, and it respects `prefers-reduced-motion`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # generates sitemap/robots, type-checks, builds to dist/
npm run preview    # serve the production build
```

Requires Node 20+.

## What to edit (everything is data, no markup to touch)

| What | Where |
| --- | --- |
| Name, status chip, **email**, **CV path**, **LinkedIn**, GitHub | `src/data/site.ts` |
| Tech ticker, "What I'm exploring", workflow steps | `src/data/site.ts` |
| Projects (all fields, screenshots, links, categories) | `src/data/projects.ts` |
| Skills, experience, education, research, certifications | `src/data/profile.ts` |
| Colors, spacing, fonts | tokens at the top of `src/styles/global.css` |

**Anything left as an empty string is hidden**, never shown as a dead link. That is why there is currently no email, LinkedIn or CV button.

### Things you still need to provide

1. **Email**: `site.email` in `src/data/site.ts`. Enables the mailto fallback, copy-email button and email icons.
2. **CV**: put a PDF in `public/` (e.g. `public/Rufayed-Islam-CV.pdf`) and set `site.cv = '/Rufayed-Islam-CV.pdf'`.
3. **LinkedIn**: `site.socials.linkedin`.
4. **Contact form delivery**: set `VITE_FORM_ENDPOINT` (see below). Until then the form says it is not connected and cannot be submitted.
5. **Site URL**: set `VITE_SITE_URL` (used for canonical, Open Graph, sitemap).
6. **Project details**: screenshots, repo links, challenges, lessons, real `updated` dates. Projects flagged `detailsPending: true` show a "case study is still growing" note; remove the flag once filled in.
7. **Experience dates / education period / semester / certifications**: all optional fields, shown only when filled.
8. **Research**: add `methodology`, `dataset`, `references` to the entry in `profile.ts` when they exist.

### Adding screenshots

Put images in `public/projects/<slug>/` and add them to the project:

```ts
images: [{ src: '/projects/blitzmed/home.png', alt: 'BlitzMed booking screen showing…' }],
```

Without images, a clearly labelled "screenshot placeholder" graphic is shown.

### Adding a project

Copy an object in `projects` (`src/data/projects.ts`), give it a unique `slug`. Filtering, search, sorting, the case study page, previous/next navigation and the sitemap all pick it up automatically. Features are split into `implemented` and `planned` so the page never claims unbuilt work.

## Contact form

Copy `.env.example` to `.env`.

- **With `VITE_FORM_ENDPOINT`**: POSTs JSON `{ name, email, subject, message }`. Works with Formspree, Getform, or your own API. Shows loading, success and error states; success is only shown on an HTTP 2xx response. A hidden honeypot field blocks simple bots; enable the provider's reCAPTCHA/hCaptcha or rate limiting for stronger protection.
- **Without an endpoint but with `site.email`**: the button becomes "Open in email app" (mailto) and the message says nothing is sent until you press send.
- **With neither**: the form is disabled with an honest notice.

Never put secrets in `VITE_*` variables; they are public in the browser bundle.

## Deploy

Both configs are included and handle SPA routing (`/projects/:slug`).

**Netlify**: new site from Git, build command `npm run build`, publish `dist` (`netlify.toml` sets this). Add `VITE_SITE_URL` and `VITE_FORM_ENDPOINT` under Site settings → Environment variables.

**Vercel**: import the repo (Vite preset, `vercel.json` included) and add the same environment variables.

`npm run build` regenerates `public/sitemap.xml` and `public/robots.txt` from `VITE_SITE_URL` and the project slugs.

## Notes

- Default theme is dark; the toggle saves the choice in `localStorage`.
- `public/og.png` is a simple generated social card; replace it with your own 1200×630 image if you like.
- No student ID or other private identifiers are used anywhere.
