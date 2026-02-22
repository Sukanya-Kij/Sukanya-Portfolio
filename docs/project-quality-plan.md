# Project Overview and Quality Plan

## Overview

This portfolio project is designed to present Sukanya Kijjapalo (Fern) with an English-first interface and Thai supporting content.  
Primary goals:

- Showcase professional profile, work experience, measurable projects, and certificates.
- Preserve data accuracy from source resumes.
- Provide direct resume downloads and a working contact channel.

## Core functions in scope

- Public pages: Home, About, Experience, Projects, Certificates, Resume, Contact.
- Certificate repository with category/year filter, preview modal, and download links.
- Contact form API with validation and anti-spam honeypot.
- Resume download center with latest and previous PDF files.
- SEO essentials: metadata, canonical URLs, robots, sitemap.

## Pre-release Test Cases (Function + Accuracy)

### A) Routing and page availability

1. `TC-ROUTE-01` Open `/` and verify hero section renders without layout break.
2. `TC-ROUTE-02` Open `/about`, `/experience`, `/projects`, `/certificates`, `/resume`, `/contact` and verify HTTP 200.
3. `TC-ROUTE-03` Open unknown route and verify custom not-found page appears.

### B) Certificate module behavior

1. `TC-CERT-01` On `/certificates`, set category filter and verify card count matches source JSON.
2. `TC-CERT-02` Set year filter and verify issued year labels are correct.
3. `TC-CERT-03` Click `Preview` and confirm modal opens and closes by:
   - close button
   - `Esc` key
   - backdrop click
4. `TC-CERT-04` Click `Download` and verify file opens/downloads without 404.
5. `TC-CERT-05` For placeholder entries, verify placeholder label is shown and no broken file link.

### C) Resume download behavior

1. `TC-RESUME-01` Open `/resume` and verify both versions are listed:
   - `sukanya-kijjapalo-resume-v02-latest.pdf`
   - `sukanya-kijjapalo-resume-v01.pdf`
2. `TC-RESUME-02` Click `Open` for each file and confirm browser can load the PDF.
3. `TC-RESUME-03` Click `Download PDF` for each file and confirm no 404 and file size is non-zero.
4. `TC-RESUME-04` From Home and About pages, verify resume CTA leads to `/resume` or downloads latest file.

### D) Contact form behavior

1. `TC-CONTACT-01` Submit empty form and verify required validation messages.
2. `TC-CONTACT-02` Submit invalid email and verify blocked submission.
3. `TC-CONTACT-03` Submit valid payload and verify success state.
4. `TC-CONTACT-04` Fill honeypot field and verify request is rejected.
5. `TC-CONTACT-05` Trigger frequent repeated requests and verify rate limit response.

### E) Data accuracy checks (must pass before production)

1. `TC-DATA-01` Name and nickname match source resume:
   - `Sukanya Kijjapalo (Fern)`
2. `TC-DATA-02` Experience timeline values match source:
   - `San E.68 Consulting Engineers Co., Ltd.`
   - `SGS Thailand Ltd.`
   - periods and role names
3. `TC-DATA-03` KPI claims exactly match approved values:
   - renewal retention over `90%`
   - CRM Auto-Alert improvement over `30%`
4. `TC-DATA-04` Awards/recognition labels are not overstated and match source evidence.
5. `TC-DATA-05` Education and language descriptions match source and agreed wording.
6. `TC-DATA-06` Privacy policy compliance:
   - public pages show email only
   - no full phone number
   - no full home address

### F) Responsive + accessibility

1. `TC-UI-01` Check 375px width: no horizontal overflow in navbar/cards/modals.
2. `TC-UI-02` Check 768px width: sections stack correctly and CTA remains usable.
3. `TC-UI-03` Keyboard test: nav links, buttons, form fields, and modal controls are focusable.
4. `TC-UI-04` Color contrast meets readable level for body text and critical actions.

### G) SEO and indexing

1. `TC-SEO-01` Verify each page has title/description metadata.
2. `TC-SEO-02` Verify canonical URL is not `localhost` in production.
3. `TC-SEO-03` Verify `sitemap.xml` contains all major routes including `/resume`.
4. `TC-SEO-04` Verify `robots.txt` is available and references sitemap.

## Release gate

Release only when:

- All `TC-*` cases in sections A-G pass.
- No broken links or missing assets.
- Data checks in section E are signed off.
