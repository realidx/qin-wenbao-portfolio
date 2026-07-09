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

`src/content/exhibitions/`
: One Markdown file per exhibition, pavilion, conference, or presentation record.

`src/content/research.md`
: Main text for the Artistic Research page.

`public/uploads/`
: Media folder for Decap uploads, public image assets, and downloadable documents.

`src/data/galleryData.ts`
: Type definitions for work records, exhibition records, and gallery images.

`src/data/imageStore.ts`
: Loads Markdown frontmatter, validates required fields, sorts records, and exposes helpers for works and exhibitions.

`src/pages/index.astro`
: Home page. It renders the hero and selected works.

`src/pages/works/index.astro`
: Portfolio listing page for all work entries.

`src/pages/works/[work].astro`
: Work detail page. It renders metadata and the GLightbox gallery.

`src/pages/exhibitions/index.astro`
: Exhibition listing page for pavilion, biennale, and international presentation records.

`src/pages/exhibitions/[exhibition].astro`
: Exhibition detail page. It renders metadata, optional document download, and the GLightbox gallery.

`src/pages/research.astro`
: Artistic Research page. Main text comes from `src/content/research.md`.

`src/pages/about.astro`
: Artist biography page. Main text comes from `src/content/about.md`.

`src/pages/contact.astro`
: Contact page using values from `site.config.mts`.

`src/components/PhotoGrid.astro`
: Justified image grid and GLightbox behavior.

`src/components/WorkCard.astro`
: Work card used on the home page and portfolio listing.

`src/components/ExhibitionCard.astro`
: Exhibition card used on exhibition and research pages.

`src/styles/global.css`
: Global fonts, color variables, and shared Tailwind component styles.

## Work Content Model

Each work is a Markdown file with frontmatter:

```yaml
---
id: da-shun
title: Peking Opera Da Shun
subtitle: Peking Opera Stage Costume Design
year: 'Representative Work'
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

## Exhibition Content Model

Each exhibition is a Markdown file with frontmatter:

```yaml
---
id: pq2023
title: 'Prague Quadrennial 2023: China Pavilion'
subtitle: Between
year: '2023'
location: Prague, Czech Republic
role: Participating designer, China Pavilion
cover: /uploads/exhibitions/pq2023/pq2023-cover.png
description: Exhibition description.
document: /uploads/documents/pq2023-qin-wenbao.pdf
images:
  - src: /uploads/exhibitions/pq2023/pq2023-installation.jpg
    title: Installation View
    caption: Image caption.
    type: exhibition
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
