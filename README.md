# B2Z Advisory — Website

**Business to Zero Carbon.** Marketing site for B2Z Advisory, a CBAM (Carbon
Border Adjustment Mechanism) and sustainability consulting firm. Built with
Next.js 14 (App Router), TypeScript, Tailwind CSS, and `next-intl` for TR/EN
localization.

## Stack

- **Next.js 14** (App Router, React Server Components)
- **TypeScript**
- **Tailwind CSS 3**
- **next-intl 4** — routing, translated pathnames, locale switcher
- **lucide-react** — icon set

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to the
default locale (`/tr`). English lives under `/en`.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Project structure

```
src/
  app/
    layout.tsx              # pass-through root layout (no <html>)
    not-found.tsx            # fallback for fully unmatched paths
    [locale]/
      layout.tsx             # <html>/<body>, fonts, Header/Footer, metadata
      page.tsx                # Home
      hakkimizda/             # About      (en: /about)
      hizmetler/               # Services   (en: /services)
      cbam-nedir/              # What is CBAM? (en: /what-is-cbam)
      iletisim/                # Contact    (en: /contact)
      [...rest]/               # catch-all -> renders localized not-found.tsx
  components/                 # Header, Footer, Hero, section blocks, etc.
  i18n/
    routing.ts                 # locales + localized pathnames
    navigation.ts               # typed Link/useRouter/usePathname
    request.ts                  # next-intl request config
  messages/
    tr.json                     # Turkish copy (default locale)
    en.json                     # English copy
  middleware.ts                 # next-intl locale middleware
```

## Editing content

All page copy lives in [`src/messages/tr.json`](src/messages/tr.json) and
[`src/messages/en.json`](src/messages/en.json). Keep both files' keys in
sync — TypeScript won't catch a missing key at build time.

## Before going live — placeholders to replace

- **Contact details** (`contactPage.info` in both message files): currently
  `info@b2zadvisory.com`, a placeholder phone number, and a generic
  İstanbul/Levent address.
- **Contact form** ([`src/components/ContactForm.tsx`](src/components/ContactForm.tsx)):
  UI-only right now — it does not send anywhere. Wire it up to an email
  service (Resend, SendGrid, etc.) or an API route before launch.
- **Stats & figures** (`stats.items`, hero dashboard mock numbers): sample
  marketing figures — replace with your real numbers.
- **Social links** in [`src/components/Footer.tsx`](src/components/Footer.tsx)
  point to generic `linkedin.com` / `twitter.com` — update to your actual
  profiles.
- **Favicon** (`src/app/favicon.ico`): still the default Next.js icon.
- **Domain**: `metadataBase` in
  [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx) is set to
  `https://www.b2zadvisory.com` — update once the real domain is live.

## Adding a new page

1. Add the route's internal path to `pathnames` in
   [`src/i18n/routing.ts`](src/i18n/routing.ts) with its TR/EN slugs.
2. Create `src/app/[locale]/<internal-path>/page.tsx` using the same
   internal path as the folder name.
3. Add the page's copy under a new namespace in both message files.
4. Link to it with the `Link` component from `@/i18n/navigation` (not
   `next/link`), passing the internal path as `href`.
