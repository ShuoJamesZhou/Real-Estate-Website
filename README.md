# Business Brokerage Website (GitHub Pages / Static)

Production-ready, scroll-based marketing website for a brokerage specializing in **selling established businesses** (business transfers, not residential real estate).

## What’s included
- Single-page scroll layout with sticky two-tier header (premium real-estate style)
- Top navigation smooth-scrolls to: **Home · About Us · FAQ · Contact Us**
- Contact form that submits to a free external form-to-email service (no backend required)

## Project structure
- `docs/`: the deployable static site (GitHub Pages serves this folder)
  - `docs/index.html`
  - `docs/assets/` (CSS/JS/images)

## Contact form email setup (no SMTP)
This site is static, so email is handled by an external service. In `docs/index.html`, set the form endpoint:
- `data-endpoint="https://formspree.io/f/REPLACE_ME"`

Recommended free option: **Formspree** (create a form and paste your endpoint).

## Deploy to GitHub Pages
1. Commit and push the repo to GitHub.
2. In GitHub repo settings → **Pages**:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/docs`
3. Visit the Pages URL.

## Customize
Edit content directly in `docs/index.html` (company name, tagline, phone, text sections).

