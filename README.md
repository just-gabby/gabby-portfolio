# Gabby's portfolio

The source for my portfolio site: https://just-gabby.github.io/gabby-portfolio/

I'm Gabriele Naseviciute (Gabby), a senior graphic designer moving into creative technology and AI. I built this site myself, one small step at a time, to learn how HTML, CSS, JavaScript, Git and Astro fit together.

## What's in it

- Work, AI + Code, Journal and About pages, plus a colophon showing the type, colour and spacing
- Projects and journal posts written as Markdown files, with their details checked against a schema at build time
- A light and dark theme that follows your system setting, with a switch in the header
- A print stylesheet for the About page
- A few things to find. Try Shift+G and Shift+R on the live site.

## Built with

- [Astro](https://astro.build), with plain HTML, CSS and a little TypeScript
- Newsreader, Inter and Cutive Mono, loaded through Astro's font support
- GitHub Pages, deployed by GitHub Actions on every push to `main`

I kept dependencies to a minimum so I could understand all of it.

## Running it locally

You need a current version of Node.js (Astro's docs list the supported versions). Then:

```
npm install
npm run dev
```

The dev server prints a local address. The site lives under `/gabby-portfolio/`, because it's a GitHub Pages project site.

Other commands:

- `npm run build` builds the site into `dist/`
- `npm run preview` serves the built site locally

## How it's organised

```
src/
  assets/       project images
  components/   header, footer, project card and project page
  content/      projects and journal posts, as Markdown files
  layouts/      the shared page layout
  pages/        one file per page
  scripts/      the theme switch and the redline overlay
  styles/       global.css, with the colour and spacing variables
  utils/        small helpers shared between pages
public/         favicon and social preview image
```

## Adding a project

Add a Markdown file to `src/content/projects/`. The details at the top need a title, summary, year and a category (`design`, `creative-tech` or `ai-code`). Cover and gallery images are optional, and `draft: true` hides a project. If something is missing or mistyped, the build says so.

## Rights

The code is here to read and learn from. The design, writing and images are © Gabriele Naseviciute, all rights reserved.