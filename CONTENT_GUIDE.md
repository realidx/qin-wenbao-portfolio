# Content Guide

The site is now prepared for Decap CMS. Works are stored as Markdown files in `src/content/works/`, and uploaded media is stored under `public/uploads/`.

## Admin URL

After Decap authentication is configured, editors can use:

```text
https://qinwenbao.art/admin
```

The admin UI manages:

- Works
- About page text
- Cover images
- Gallery images
- Featured status
- Sort order

## Content Files

Each work is one Markdown file:

```text
src/content/works/da-shun.md
src/content/works/nanke-mengji.md
src/content/works/zaixu-hongmeiyuan.md
```

Images uploaded from Decap go under:

```text
public/uploads/
```

Existing placeholder images are currently organized as:

```text
public/uploads/works/da-shun/
public/uploads/works/nanke-mengji/
public/uploads/works/zaixu-hongmeiyuan/
```

## Work Fields

- `id`: URL slug. Use lowercase English, numbers, and hyphens.
- `title`: Work title.
- `subtitle`: Optional subtitle.
- `year`: Year or label.
- `category`: Opera or theatre category, such as `Kunqu Opera`, `Peking Opera`, `Yue Opera`, or `Spoken Drama`.
- `type`: Work type, such as `Stage Costume Design` or `Character Styling`.
- `role`: Main role, theme, or design focus.
- `cover`: Cover image path.
- `description`: Work description.
- `images`: Detail image list.
- `featured`: `true` shows the work on the home page.
- `order`: Smaller numbers appear first.

## Image Rules

- Use ASCII file names with no spaces.
- Prefer `webp` or optimized `jpg`.
- Use `cover.jpg` or `cover.webp` for cover images.
- Recommended cover width: around 1600px.
- Recommended detail image width: around 2000px.
- Keep each image near 1-2MB when possible.

Good file names:

```text
cover.webp
01-stage.webp
02-sketch.webp
03-detail.webp
04-backstage.webp
```

Avoid file names like:

```text
wechat-image-2026-07-06-final-final.jpeg
peony-pavilion-du-liniang-first-revision-final-2.jpg
IMG_9382.JPG
```

## Authentication Note

The `/admin` page and Decap CMS configuration are present in the repo. To let a non-developer editor save changes, Decap still needs GitHub OAuth authentication configured for this Cloudflare-hosted site. Once configured, Decap commits content changes to GitHub, and Cloudflare deploys automatically.
