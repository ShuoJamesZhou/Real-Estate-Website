# HarborBridge Business Brokers

Modern marketing website for a brokerage specializing in **reselling established businesses** (business transfer transactions, not residential real estate).

## What’s included
- React + TypeScript (Vite)
- Tabbed navigation: `Home`, `About Us`, `Businesses For Sale`, `Our Process`, `FAQ`, `Contact Us`
- GitHub Pages-friendly routing via `HashRouter` (URLs work as `/#/contact`, etc.)
- Production-ready static build output to `/docs`

## Tech stack
- `frontend/` (React + TypeScript + Vite)
- Styling: plain CSS (`frontend/src/index.css`)
- Routing: `react-router-dom`

## Local development
1. Install deps:
   - `cd frontend`
   - `npm install`
2. Start the dev server:
   - `npm run dev`

## Build for GitHub Pages
The build output is written to the repo root `docs/` folder.

1. From the repo root:
   - `cd frontend`
2. Run:
   - `npm run build:gh`
3. Confirm `docs/` contains:
   - `index.html`
   - `assets/` (bundled JS/CSS)

## Publish to GitHub Pages
1. GitHub repo → **Settings** → **Pages**
2. **Source**: “Deploy from a folder”
3. Folder: `/docs`
4. Save and wait for Pages to publish.

## Customization
Edit company content and page data in:
- `frontend/src/content/site.ts`

Key fields include:
- `site.name`, `site.tagline`, contact details
- `navItems` (tab labels/links)
- `featuredListings` (cards on `Home` / `Businesses For Sale`)
- `faqItems`

## Contact form (optional backend submit)
By default, the contact form opens your email client (`mailto:`) with a prefilled message.

To submit to a backend endpoint instead, set:
- `VITE_CONTACT_ENDPOINT` at build time (e.g. when running `npm run build:gh`)

## Notes
- This project intentionally builds to static files for GitHub Pages compatibility.
