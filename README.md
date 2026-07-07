# Opera Costume Portfolio

An Astro portfolio site for a Chinese opera and stage costume design artist. It includes a Decap CMS admin interface for editing portfolio works, image galleries, and the About page through GitHub-backed content files.

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

Works are maintained in `src/content/works/*.md`. Uploaded images live in `public/uploads/`.

Admin entry:

```text
https://qinwenbao.art/admin
```

Current sample works:

- `da-shun`: Peking Opera Da Shun
- `nanke-mengji`: Kunqu Opera Nanke Mengji
- `zaixu-hongmeiyuan`: Qinqiang Opera Zaixu Hongmeiyuan

Read `CONTENT_GUIDE.md` before adding or replacing work images.

## Structure

Read `PROJECT_STRUCTURE.md` for the data model, key files, and deployment notes.
