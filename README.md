# Sukanya Kijjapalo Portfolio

Bilingual portfolio website (Thai/English) built with Next.js App Router.

## Stack
- Next.js 16 + TypeScript
- Tailwind CSS v4
- Route-based locale pages: `/th/*`, `/en/*`

## Run locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build checks
```bash
npm run lint
npm run build
```

## Content source files
- `src/content/profile.json`
- `src/content/experience.json`
- `src/content/projects.json`
- `src/content/certificates.json`
- `content-notes.md` (resume reconciliation notes)

## Certificates assets
- Place PDF files in `public/certificates/`
- Place preview images in `public/certificates/previews/`

## Contact form
The API route is at `src/app/api/contact/route.ts`.

If `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are configured, messages are delivered by Resend.
If not configured, submissions are accepted and logged server-side without sending email.

Copy `.env.example` to `.env.local` and set values when needed.
