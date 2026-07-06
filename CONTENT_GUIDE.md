# Content Guide

This MVP is maintained through `src/gallery/gallery.yaml` and image folders under `src/gallery/`.

## Add A New Work Series

1. Create a folder under `src/gallery/`.

```text
src/gallery/new-work-id/
```

2. Add a cover image and gallery images.

```text
src/gallery/new-work-id/
  cover.jpg
  01-stage.jpg
  02-sketch.jpg
  03-detail.jpg
```

3. Add an album entry to `src/gallery/gallery.yaml`.

```yaml
albums:
  - id: new-work-id
    title: New Work Title
    subtitle: English Subtitle
    year: "2026"
    category: Kunqu Opera
    type: Stage Costume Design
    role: Role / Theme
    cover: new-work-id/cover.jpg
    description: >
      Add the work description here, including concept, character relationships,
      color direction, material choices, and production context.
    images:
      - src: new-work-id/01-stage.jpg
        title: Stage Styling
        caption: Add an image caption here.
        type: stage_photo
      - src: new-work-id/02-sketch.jpg
        title: Costume Sketch
        caption: Add an image caption here.
        type: sketch
    featured: false
    order: 4
```

4. Preview locally.

```bash
npm run dev
```

5. Check the production build.

```bash
npm run build
npm run preview
```

## Required Album Fields

- `id`: URL slug. Use lowercase English, numbers, and hyphens.
- `title`: Chinese work title.
- `subtitle`: Optional English subtitle.
- `year`: Year as a string.
- `category`: Opera or theatre category, such as `Kunqu Opera`, `Peking Opera`, `Yue Opera`, or `Spoken Drama`.
- `type`: Work type, such as `Stage Costume Design` or `Character Styling`.
- `role`: Main roles or theme.
- `cover`: Cover image path relative to `src/gallery/`.
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

## Current Sample Works

- `da-shun`: Peking Opera Da Shun
- `nanke-mengji`: Kunqu Opera Nanke Mengji
- `zaixu-hongmeiyuan`: Qinqiang Opera Zaixu Hongmeiyuan

The sample images are placeholders copied from the original template and can be replaced with real artwork later.
