# Khan Ziaulhaq — Portfolio

A single-file, brutalist-style portfolio site for **Khan Ziaulhaq**, Front-End Developer & UI/UX Designer based in Mumbai. Built as one self-contained `index.html` — no build step, no dependencies to install, no server required.

**Live sections:** Hero · About · Skills · Projects · Growth & Content · Education & Certificates · Contact

---

## Preview

Open `khan-ziaulhaq-portfolio.html` directly in any browser, or deploy it as-is (see below).

---

## Tech stack

| Layer      | Choice |
|------------|--------|
| Markup     | Plain HTML5 |
| Styling    | Plain CSS3 (custom properties, Grid, Flexbox) — no framework |
| Fonts      | [Anton](https://fonts.google.com/specimen/Anton) (display), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (body), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (labels/data), loaded via Google Fonts |
| Interactivity | Vanilla JavaScript — mobile nav toggle + scroll-reveal via `IntersectionObserver` |
| Assets     | Profile photo embedded inline as a base64 data URI (no external image files) |

Everything lives in one HTML file, so it's portable — drop it anywhere and it works.

---

## Project structure

```
khan-ziaulhaq-portfolio.html   ← the entire site (HTML + CSS + JS + image, inline)
README.md                      ← this file
```

---

## Deploying

Because it's a single static file, any static host works:

**GitHub Pages**
1. Create a repo (e.g. `portfolio`), add this file, rename it to `index.html`.
2. Repo → Settings → Pages → Deploy from branch → `main` / root.
3. Site goes live at `https://<username>.github.io/<repo>/`.

**Netlify / Vercel**
- Drag-and-drop the file (or the folder containing it) into the Netlify/Vercel dashboard — no build command needed.

**Any other host**
- Upload `index.html` (renamed if needed) to the web root. That's it.

---

## Customizing

Everything is in one file, organized top to bottom:

- **`:root` CSS variables** (top of `<style>`) — change `--yellow`, `--ink`, `--paper`, `--red` to re-theme the whole site.
- **Hero** (`<header class="hero">`) — name, tagline, status badge, and photo.
- **About** (`#about`) — bio copy and the contact fact-card (email, phone, GitHub, LinkedIn).
- **Skills** (`#skills`) — grouped chip lists (Frontend, Design, Dev Tools, Data & AI).
- **Projects** (`#work`) — one `.project-card` per project, with `.project-links` for live links.
- **Growth & Content** (`#growth`) — Instagram performance stats and marketing/content skills.
- **Education & Certificates** (`#education`) — timeline + certificate cards.
- **Contact / footer** (`#contact`) — WhatsApp CTA and contact links.

To swap the photo: replace the `src="data:image/jpeg;base64,..."` value on the `<img>` inside `.hero-photo` with a new base64 string (or point it at a hosted image URL instead).

---

## Contact

- **WhatsApp:** [+91 90045 76983](https://wa.me/919004576983)
- **Email:** ziaulibrarkhan@gmail.com
- **GitHub:** [github.com/Khan-Ziaulhaq](https://github.com/Khan-Ziaulhaq/)
- **LinkedIn:** [linkedin.com/in/khan-ziaulhaq](https://www.linkedin.com/in/khan-ziaulhaq/)
- **Instagram:** [@ziathetics.exe](https://instagram.com/ziathetics.exe)

---

## License

Personal portfolio content and photo © Khan Ziaulhaq. Feel free to use the underlying HTML/CSS structure as a template for your own portfolio.
