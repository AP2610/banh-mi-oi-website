# Platforms and technology stack

This guide lists the external services and main technologies used by the website. It is a map of what each platform does, where it is managed, and what would stop working if access were lost.

Do not put passwords, API keys, recovery codes, or secret URLs in this file.

## External platforms

| Platform                | What it is used for                                                                                      | Where it is managed                             | If access is lost                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| GitHub                  | Stores the website source code and deployment history                                                    | Repository `AP2610/banh-mi-oi-website`          | Developers cannot safely change or deploy the website                                  |
| Netlify                 | Builds and hosts the production website, deploy previews, contact API, and runtime environment variables | The `banhmioiparis` Netlify project             | Deployments, logs, rollbacks, and server settings cannot be managed                    |
| Squarespace Domains     | Owns `banhmioiparis.fr` and manages its DNS records                                                      | Squarespace Domains account                     | The domain, website routing, email records, and verification records cannot be managed |
| Sanity                  | Stores page content, translations, images, files, navigation, and shared restaurant settings             | Sanity project and the website's `/studio` page | Content cannot be edited or previewed                                                  |
| Resend                  | Sends contact-form submissions to the restaurant's receiving email address                               | Resend account for the verified sending domain  | The contact form cannot deliver email                                                  |
| Google Search Console   | Shows how Google discovers and indexes the website                                                       | Restaurant Google account                       | Search indexing and warnings cannot be monitored                                       |
| Google Business Profile | Controls the restaurant information shown in Google Search and Maps                                      | Restaurant Google account                       | Map details, special hours, photos, and reviews cannot be managed                      |
| Gmail                   | Receives contact-form submissions                                                                        | Restaurant mailbox                              | Customer messages cannot be read or answered                                           |
| Uber Eats and Deliveroo | External ordering destinations linked from the website                                                   | Restaurant accounts with each delivery service  | Orders and restaurant listings must be managed directly with those services            |

Use individual accounts, team invitations, and multi-factor authentication. At least two trusted people should be able to recover the domain, hosting, content, and restaurant email accounts.

## How the platforms connect

1. A developer pushes code to GitHub.
2. Netlify builds and deploys that code.
3. Visitors open the Squarespace-managed domain, which points to Netlify.
4. The website reads published content and images from Sanity.
5. Publishing relevant Sanity content calls a private Netlify build hook and creates a fresh production deployment.
6. Sanity Presentation uses private draft preview so editors can check saved work before publishing.
7. Contact-form submissions run through the Netlify-hosted API and are delivered by Resend to Gmail.
8. Google Search Console and Google Business Profile are managed separately from the website.

## Application stack

| Technology                 | Purpose                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| Next.js                    | Application framework, routing, static page generation, metadata, images, and the contact API |
| React                      | User-interface components                                                                     |
| TypeScript                 | Type checking for application and Sanity code                                                 |
| Tailwind CSS               | Responsive styling, design tokens, and utility classes                                        |
| Sanity Studio              | Content-editing interface embedded at `/studio`                                               |
| `next-sanity`              | Sanity queries, live draft content, Stega markers, and visual editing                         |
| `next-intl`                | French and English localized routes and navigation                                            |
| Motion                     | Scroll and interface animations                                                               |
| Embla Carousel             | Homepage image carousel                                                                       |
| React Photo Album          | Gallery masonry layout                                                                        |
| Yet Another React Lightbox | Full-screen gallery image viewer                                                              |
| React Icons                | Interface and social icons                                                                    |
| Resend SDK                 | Server-side contact-form email delivery                                                       |
| `next/font`                | Downloads and self-hosts the Google fonts during the build                                    |

Exact dependency versions are recorded in `package.json` and `pnpm-lock.yaml` rather than duplicated here.

## Development and quality tools

| Tool                  | Purpose                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| Node.js               | Runs the development and build tools; the supported version is declared in `.nvmrc` and `package.json` |
| pnpm                  | Installs dependencies and runs project commands                                                        |
| ESLint                | Checks code quality and framework rules                                                                |
| Prettier              | Formats code and Markdown consistently                                                                 |
| TypeScript compiler   | Checks types without producing a build                                                                 |
| Vitest                | Runs the existing automated tests                                                                      |
| Husky and lint-staged | Check staged code during commits                                                                       |
| Sanity TypeGen        | Generates TypeScript types from the Sanity schema and GROQ queries                                     |

## One-time utilities

- **RealFaviconGenerator** generated the favicon and web-app icon files stored in `public`.
- **Google Fonts** supplies Bebas Neue and Quicksand to `next/font` at build time. Visitors receive the self-hosted files from the deployed website rather than loading them from Google.

## Not part of the current production setup

- Vercel is not the production host.
- Cloudflare is not the DNS or hosting provider.
- i18nexus is not used; translated content is stored in Sanity.
- The website is not exported to a static `out` folder. Netlify hosts the normal Next.js application.

See the topic guides for [hosting](./hosting.md), [domain and DNS](./domain-and-dns.md), [Sanity](./sanity.md), [contact email](./contact-email.md), and [search](./search.md).
