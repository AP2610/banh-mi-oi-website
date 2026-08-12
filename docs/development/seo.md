# Technical SEO handover

This document describes the implemented SEO system for future developers. The primary production origin is `https://www.banhmioiparis.fr`.

## URL model

French is the default locale and has no prefix. English uses `/en`.

| Page    | French     | English       |
| ------- | ---------- | ------------- |
| Home    | `/`        | `/en`         |
| Gallery | `/galerie` | `/en/gallery` |
| Menu    | `/menu`    | `/en/menu`    |
| Contact | `/contact` | `/en/contact` |

The localized route configuration lives in `src/i18n/routing.ts`. The canonical route map is centralized in `src/lib/site.ts`. Update both when adding or renaming a public page.

`NEXT_PUBLIC_SITE_URL` supplies the canonical origin. It defaults to the production `www` domain, but it should also be set explicitly in Netlify.

## Metadata

`src/lib/seo.ts` builds page metadata, including:

- canonical URL
- `fr`, `en`, and `x-default` alternates
- Open Graph website data
- Twitter/X card data
- a 1200 × 630 Sanity social image

Each page calls `buildPageMetadata` from its `generateMetadata` function. A page-specific Sanity SEO value overrides its normal title, subtitle, or main image. Empty SEO fields intentionally fall back to existing page content.

The website layout sets global crawler rules, the production origin, localized default descriptions, and optional Google verification. `GOOGLE_SITE_VERIFICATION` expects only the content value supplied by Google, not a complete HTML element. DNS verification is preferred for the Search Console domain property.

## Sanity model

The reusable SEO object is defined in:

```text
src/sanity/schema-types/custom-types/seo.ts
```

It is attached to the homepage, gallery, menu, and contact documents. Its fields are optional so existing content remains publishable and supplies sensible fallbacks.

The shared GROQ projection is:

```text
src/sanity/queries/fragments/seo.ts
```

After changing a schema or GROQ query, run:

```bash
pnpm typegen
```

Commit both `schema.json` and `src/sanity/sanity.types.ts` with the source changes.

## Sitemap and crawler rules

`src/app/sitemap.ts` creates `/sitemap.xml` from the four published singleton page documents. It emits both language URLs, their alternates, and Sanity's `_updatedAt` value.

`src/app/robots.ts` creates `/robots.txt`. Public pages are allowed. `/api/` and `/studio/` are excluded. The sitemap and host use the canonical production origin.

When adding a page:

1. Add its localized paths to `src/i18n/routing.ts`.
2. Add it to the route map in `src/lib/site.ts`.
3. Add its Sanity document mapping to `src/app/sitemap.ts`.
4. Add localized metadata using `buildPageMetadata`.
5. Verify both language versions appear in the generated sitemap.

## Restaurant data

`src/components/seo/restaurant-structured-data.tsx` renders one escaped Restaurant JSON-LD block from Sanity Site Settings and homepage content.

It can include:

- name and canonical URL
- logo and hero image
- address and country
- telephone number
- price range
- machine-readable opening hours
- Instagram
- localized menu URL
- Uber Eats and Deliveroo links

Optional properties are omitted when empty. Do not invent missing business information. The JSON is escaped before being placed in the document to prevent content from ending the script element.

Machine-readable opening hours use values such as:

```text
Mo-Fr 11:30-21:30
Sa-Su 12:00-22:00
```

Keep structured business details consistent with the visible content and Google Business Profile.

## Images

`buildSanitySocialImageUrl` in `src/sanity/lib/image.ts` requests a cropped 1200 × 630 image from Sanity at quality 90. Per-page social images are optional. Page main images are the fallback.

Visible content images retain localized alternative text through the `accessibleImage` schema. Do not replace meaningful alternative text with search keywords.

## Validation

Before releasing SEO changes, run:

```bash
pnpm typegen
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

Inspect the generated output or production pages for:

- one canonical URL per page
- reciprocal French and English alternates
- French `x-default`
- unique titles and descriptions
- valid social image URLs
- `/robots.txt`
- `/sitemap.xml`
- escaped Restaurant JSON-LD

After deployment, use:

- Google Rich Results Test
- Schema.org Validator
- Google Search Console URL inspection
- PageSpeed Insights

Search Console and Google Business Profile are external operational systems. Their setup and ownership are documented in [Google setup](../owners/google.md).
