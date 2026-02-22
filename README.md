# Sukanya Kijjapalo Portfolio

English-first portfolio website with Thai support, built with Next.js App Router.

## Project purpose
- Present Sukanya Kijjapalo (Fern) with a professional portfolio for recruiters and clients.
- Keep resume data, project metrics, and certificate records accurate and auditable from source resume files.
- Provide reliable contact and downloadable resume access from public pages.

## Stack
- Next.js 15 + TypeScript
- Tailwind CSS v4
- Primary route set: `/`, `/about`, `/portfolio`, `/contact`
- Legacy redirects kept for compatibility: `/projects` -> `/portfolio`, `/certificates` -> `/portfolio`, `/experience` -> `/about`, `/resume` -> latest resume PDF

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
- `src/content/media-library.json` (image catalog and usage categories)
- `content-notes.md` (resume reconciliation notes)

## Resume download
- Public resume files:
  - `public/resume/sukanya-kijjapalo-resume-v02-latest.pdf`
  - `public/resume/sukanya-kijjapalo-resume-v01.pdf`
- (Available directly via these paths or downloaded from section features)

## Certificates assets
- Place PDF files in `public/certificates/`
- Place preview images in `public/certificates/previews/`

## QA priority
- Function correctness first: page routes, filters, forms, preview modals, and downloads.
- Data accuracy first: claims, dates, names, and KPI values must match resume source files.
- Full pre-release checklist: `docs/project-quality-plan.md`

## Contact form
The API route is at `src/app/api/contact/route.ts`.

If `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are configured, messages are delivered by Resend.
If not configured, submissions are accepted and logged server-side without sending email.

Copy `.env.example` to `.env.local` and set values when needed.
