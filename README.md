# vishalsingh — portfolio

Personal portfolio of **Vishal Singh** — AI Software Engineer (LangGraph agentic systems, LLM pipelines, backend engineering).

Built with **Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion**.

## Features

- Terminal/dev-minimal design system — mono accents, dot-grid background, single emerald accent
- Dark/light theme, persisted in `localStorage`, applied pre-paint (no flash)
- Interactive LeetCode-style contribution heatmap: milestone cells jump to their section, other active cells jump somewhere random (with a toast)
- Subtle Framer Motion scroll reveals, `prefers-reduced-motion` respected throughout
- Fully responsive, accessible (semantic landmarks, keyboard-operable heatmap, skip link)
- SEO: metadata, OpenGraph, JSON-LD Person schema, sitemap + robots

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
npm run lint
```

## Content

All copy lives in typed modules under `src/data/` — edit those, not the components:

| File | Contents |
| --- | --- |
| `site.ts` | name, headline, links, email, SEO |
| `experience.ts` | work history |
| `projects.ts` | project cards |
| `skills.ts` | skill groups |
| `education.ts` | degree, certifications, hero stats |
| `contributions.ts` | heatmap data + milestones |

> Some profile links are still `CHANGE-ME` placeholders in `src/data/site.ts` — search for `TODO(vishal)`.

## Deploy

Pushed to GitHub, hosted on [Vercel](https://vercel.com) — every push to `main` auto-deploys.
