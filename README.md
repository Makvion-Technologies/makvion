<div align="center">

<h1>
  <img src="public/logo-green.png" alt="" width="44" height="48" />
  Makvion
</h1>

**Official website of Makvion Technologies — websites, SaaS, Android apps and games, built in Pune, India.**

[makvion.com](https://makvion.com)

</div>

## About

This repository is the marketing site for Makvion Technologies LLP. It presents our services, process, industries we work with, selected work, and ways to get in touch. Content for most pages lives in a single config module so copy and structure stay easy to update.

## Features

- Marketing pages for services, work, process, about, industries and contact
- Contact form with validation, honeypot and per-IP rate limiting, delivered by email
- SEO foundations: sitemap, robots, Open Graph images, JSON-LD, web app manifest
- WhatsApp and phone CTAs for enquiries
- Responsive layout with the Makvion brand colours and Plus Jakarta Sans
- Photo credits documented for Unsplash assets

## Tech stack

| Layer | Stack |
| --- | --- |
| Web app | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Plus Jakarta Sans via `next/font` |
| Email | Resend (contact form) |
| Analytics | Vercel Analytics |
| Hosting | Vercel |

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
cp .env.example .env.local
npm run dev      # http://localhost:3000
```

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Meaning |
| --- | --- |
| `RESEND_API_KEY` | Resend API key (required for the contact form to send mail) |
| `RESEND_FROM_EMAIL` | From address on a domain verified in Resend |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries (defaults to contact@makvion.com) |
| `RESEND_SEND_CONFIRMATION` | Set to `true` to also email the visitor a short confirmation (default off) |

## Scripts

```bash
npm run dev            # Next.js development server
npm run build          # production build
npm run start          # serve the production build
npm run lint           # ESLint
npm run test:contact   # contact form helper tests
```

## Project structure

```
src/app/           App Router pages, SEO images, contact API route
src/components/    Layout, UI, page sections, contact form
src/lib/           Site content (site.ts), SEO helpers, contact email
public/images/     Photos and logos (see CREDITS.md)
scripts/           Playwright screenshots and contact test helper
```

## Deployment

Deploy to [Vercel](https://vercel.com) and set the `RESEND_*` / `CONTACT_TO_EMAIL` environment variables in the project settings. The production domain is [makvion.com](https://makvion.com).

## Image credits

Stock photos are listed in [`public/images/CREDITS.md`](public/images/CREDITS.md). Logos under `public/` are Makvion’s own assets.

## Contributing

Internal contributions follow the Makvion Technologies guide:

[CONTRIBUTING.md](https://github.com/Makvion-Technologies/.github/blob/main/CONTRIBUTING.md)

## License

© Makvion Technologies LLP. All rights reserved.
