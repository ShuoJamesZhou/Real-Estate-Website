# Real Estate Website

Static one-page real estate website for GitHub Pages. The design uses a modern property-focused colour system, smooth same-page navigation, reusable section types, and content that is easy to customise without rewriting HTML.

## What is included

- Single-page scroll layout with sticky navigation
- Dynamic content loaded from `docs/assets/js/site-content.js`
- Auto-generated nav items for sections with a `nav` label
- Reusable section types: `hero`, `cta`, `statement`, `cards`, `feature`, `steps`, `faq`, and `contact`
- Contact form validation with optional Formspree endpoint
- Responsive desktop and mobile layouts

## Project structure

- `docs/index.html`: lightweight shell only
- `docs/assets/js/site-content.js`: edit brand details, sections, copy, links, and form endpoint here
- `docs/assets/js/main.js`: renders the page from the config
- `docs/assets/css/styles.css`: design tokens, layout, components, and responsive styles
- `docs/assets/img/`: visual assets

## Customise content

Open `docs/assets/js/site-content.js`.

To add a new section:

1. Copy an existing object in the `sections` array.
2. Give it a unique `id`.
3. Add `nav: 'Menu Label'` if it should appear in the top nav.
4. Choose a supported `type`.
5. Save and refresh the site.

Example:

```js
{
  id: 'results',
  nav: 'Results',
  type: 'cards',
  title: 'Recent results',
  text: 'A short intro for this section.',
  cards: [
    { icon: '01', title: 'Auction result', text: 'Your copy here.' },
    { icon: '02', title: 'Private sale', text: 'Your copy here.' },
    { icon: '03', title: 'Buyer match', text: 'Your copy here.' },
  ],
}
```

## Customise colours

Open `docs/assets/css/styles.css` and edit the variables in `:root`, especially:

```css
--color-bg: #f6f2ea;
--color-ink: #10201d;
--color-deep: #0f2924;
--color-accent: #2f7d6d;
--color-sun: #d9824b;
--color-river: #5f96a8;
```

## Contact form

The site is static, so email is handled by an external form service. In `docs/assets/js/site-content.js`, update:

```js
formEndpoint: 'https://formspree.io/f/your_id',
```

Leave it blank if you want the form to validate locally without submitting anywhere.

## Deploy to GitHub Pages

1. Commit and push the repo to GitHub.
2. In repo settings, open **Pages**.
3. Set source to deploy from a branch.
4. Choose your branch and the `/docs` folder.
5. Visit the Pages URL.
