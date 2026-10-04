# Profile

Personal portfolio — Astro (SSG) frontend with a small FastAPI contact
service. Single-page editorial layout with a `/projects` archive.

## Stack

- **client/** — Astro 7, React 19 islands, Tailwind CSS v4 (`@tailwindcss/vite`), Nunito (`@fontsource-variable`)
- **server/** — FastAPI + SQLite, managed with `uv`. Stores contact submissions only.

## Pages

- `/` — hero (photo + headline + perspective links), Engineering, Digital & Growth,
  Technical Growth, Experiments, Experience, Skills, How I Think, About, Contact
- `/projects` — full project archive (homepage shows only `featured` entries)

## Content

All site content lives in `client/src/data/content.ts` — edit that file to
update profile, projects, experiments, experience, skills, and copy.
Fields marked `TODO` are placeholders.

Key fields per project (`CaseStudy`):

- `featured` — shown on the homepage Engineering section (rest only on `/projects`)
- `summary` — one-liner shown by default
- `problem` / `built` / `decisions` / `challenges` / `result` — shown under a `+ story` expander
- `areas`, `tech`, `status`, `link`

Photo: drop a file at `client/public/me.jpg` — the hero and navbar avatar pick
it up automatically (monogram placeholder otherwise).

## Development

Terminal 1 — API (http://127.0.0.1:8000):

```sh
cd server
uv run uvicorn app.main:app --reload
```

Terminal 2 — site (http://localhost:4321):

```sh
cd client
pnpm dev          # or: astro dev --background / astro dev stop
```

The contact form posts to `POST /api/contact` at runtime. Set
`PUBLIC_API_URL` in `client/.env` to point elsewhere (see
`client/.env.example`).

API docs: http://127.0.0.1:8000/docs

## Build

```sh
cd client && pnpm build   # → dist/ (static, hostable anywhere)
```
