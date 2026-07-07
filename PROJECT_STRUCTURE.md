# Project Structure

This site is an Astro portfolio for Qin Wenbao, with Decap CMS prepared as the editing interface.

## Important Files

`site.config.mts`
: Site title, owner name, profile image, contact fields, tagline, favicon, and social links.

`astro.config.mts`
: Astro build configuration. The production `site` is `https://qinwenbao.art` and `base` is `/`.

`public/admin/index.html`
: Decap CMS admin entry point. It loads the Decap CMS app at `/admin`.

`public/admin/config.yml`
: Decap CMS configuration. It uses the GitHub backend and edits content in this repository.

`src/content/works/`
: One Markdown file per portfolio work. Decap edits these files directly.

`public/uploads/`
: Media folder for Decap uploads and public image assets.

`src/data/galleryData.ts`
: Type definitions for work records and gallery images.

`src/data/imageStore.ts`
: Loads work Markdown frontmatter, validates required fields, sorts works, and exposes helpers such as `getWorks`, `getFeaturedWorks`, `getWork`, and `getHeroWork`.

`src/pages/index.astro`
: Home page. It renders the hero and selected works.

`src/pages/works/index.astro`
: Portfolio listing page for all work entries.

`src/pages/works/[work].astro`
: Work detail page. It renders metadata and the GLightbox gallery.

`src/pages/about.astro`
: Artist biography page. Main text comes from `src/content/about.md`.

`src/pages/contact.astro`
: Contact page using values from `site.config.mts`.

`src/components/PhotoGrid.astro`
: Justified image grid and GLightbox behavior.

`src/components/WorkCard.astro`
: Work card used on the home page and portfolio listing.

`src/styles/global.css`
: Global fonts, color variables, and shared Tailwind component styles.

## Work Content Model

Each work is a Markdown file with frontmatter:

```yaml
---
id: da-shun
title: Peking Opera Da Shun
subtitle: Peking Opera Stage Costume Design
year: "Representative Work"
category: Peking Opera
type: Stage Design and Costume Styling
role: Production-wide character design
cover: /uploads/works/da-shun/cover.jpg
description: Work description.
images:
  - src: /uploads/works/da-shun/01-stage.jpg
    title: Stage Presentation
    caption: Image caption.
    type: stage_photo
featured: true
order: 1
---
```

## Decap CMS Flow

1. Editor opens `/admin`.
2. Editor signs in with GitHub.
3. Editor creates or edits a work entry.
4. Decap commits the Markdown and uploaded media to GitHub.
5. Cloudflare redeploys the site from `main`.

## Remaining Setup

The CMS files are in place, but Decap GitHub authentication still needs to be configured for production editing on the Cloudflare-hosted domain.
