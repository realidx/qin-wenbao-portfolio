# Project Structure

This site is based on `rockem/astro-photography-portfolio`, but the public-facing model is now an opera and stage costume design portfolio.

## Important Files

`site.config.mts`
: Site title, owner name, profile image, email, WeChat ID, tagline, favicon, and social links.

`astro.config.mts`
: Astro build configuration. For GitHub Pages, set `site` to `https://<github-username>.github.io` and `base` to `/<repo-name>`. For a custom domain, set `site` to the domain and `base` to `/`.

`src/gallery/gallery.yaml`
: The main content file for the MVP. It contains an `albums` array. Each album is one work series or theatre production and includes `id`, `title`, `subtitle`, `year`, `category`, `type`, `role`, `cover`, `description`, `images`, `featured`, and `order`.

`src/gallery/<work-id>/`
: Image folders for each work series. Keep file names lowercase, ASCII, and free of spaces. Each work should have a cover image and detail images.

`src/data/galleryData.ts`
: Type definitions for gallery YAML data and processed work records.

`src/data/imageStore.ts`
: Loads `gallery.yaml`, validates required fields, resolves Astro image assets, sorts works, and exposes helpers such as `getWorks`, `getFeaturedWorks`, `getWork`, and `getHeroWork`.

`src/pages/index.astro`
: Home page. It renders the hero and selected works.

`src/pages/works/index.astro`
: Portfolio listing page for all work albums.

`src/pages/works/[work].astro`
: Work detail page. It renders the work metadata and image gallery with lightbox support.

`src/pages/about.astro`
: Artist biography page. Main text comes from `src/content/about.md`.

`src/pages/contact.astro`
: Contact page using values from `site.config.mts`.

`src/components/PhotoGrid.astro`
: Reuses the original template's justified image grid and GLightbox behavior.

`src/components/WorkCard.astro`
: Album card used on the home page and portfolio listing.

`src/styles/global.css`
: Global fonts, color variables, and shared Tailwind component styles.

## Current Content Model

The MVP uses one YAML file:

```yaml
albums:
  - id: da-shun
    title: Peking Opera Da Shun
    subtitle: Peking Opera Stage Costume Design
    year: "Representative Work"
    category: Peking Opera
    type: Stage Design and Costume Styling
    role: Production-wide character design
    cover: da-shun/cover.jpg
    description: >
      Work description.
    images:
      - src: da-shun/01-stage.jpg
        title: Stage Presentation
        caption: Image caption.
        type: stage_photo
    featured: true
    order: 1
```

## Files To Edit For The Next Content Update

- Add images under `src/gallery/<work-id>/`.
- Add or update the corresponding album in `src/gallery/gallery.yaml`.
- Update artist profile and contact details in `site.config.mts`.
- Update biography text in `src/content/about.md`.

## Later CMS Direction

For Decap CMS, the better second-stage model is likely one content file per work, for example `src/content/works/da-shun.md`, with uploads stored under `public/uploads/<work-id>/`. That keeps CMS forms clearer than editing one large YAML file.
