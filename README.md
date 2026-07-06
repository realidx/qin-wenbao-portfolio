# Opera Costume Portfolio

An Astro portfolio site for a Chinese opera and stage costume design artist. It keeps the original template's optimized image pipeline, justified image grid, and GLightbox viewing experience, while using a work-series content model for theatre productions and costume collections.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content

Works are maintained in `src/gallery/gallery.yaml`. Each work series has its own image folder under `src/gallery/`.

Current sample works:

- `da-shun`: Peking Opera Da Shun
- `nanke-mengji`: Kunqu Opera Nanke Mengji
- `zaixu-hongmeiyuan`: Qinqiang Opera Zaixu Hongmeiyuan

Read `CONTENT_GUIDE.md` before adding or replacing work images.

## Structure

Read `PROJECT_STRUCTURE.md` for the data model, key files, and deployment notes.
