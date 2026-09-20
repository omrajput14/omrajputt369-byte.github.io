# Om Rajput — Portfolio

Personal site for [omrajput.me](https://omrajput.me) — React + TypeScript + Vite + Tailwind, with GSAP ScrollTrigger and Lenis smooth scroll. Editorial scroll-storytelling layout inspired by [this reference](https://web-development-portfolio-blond.vercel.app/).

## Stack

React · TypeScript · Vite · Tailwind CSS · GSAP · Lenis · EmailJS

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
```

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to GitHub Pages. In the repo's **Settings → Pages**, set the source to **GitHub Actions** (one-time setup).

## Legacy

The previous comic-book-styled static site is preserved in [`legacy/`](legacy/) — including its three blog posts, which are still served at `/legacy/blog-*.html` and linked from the new site's Engineering Notes section.
