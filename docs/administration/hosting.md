# Hosting and deployments

Netlify hosts the application as a normal Next.js application. The project is not a static export because the contact form uses the Next.js route handler at `/api/contact`.

## Netlify configuration

| Setting           | Value                               |
| ----------------- | ----------------------------------- |
| Site URL          | `https://banhmioiparis.netlify.app` |
| Git repository    | `AP2610/banh-mi-oi-website`         |
| Production branch | `main`                              |
| Base directory    | blank / repository root             |
| Build command     | `pnpm build`                        |
| Publish directory | automatic / blank                   |
| Package manager   | pnpm, pinned in `package.json`      |
| Node.js version   | pinned in `.nvmrc`                  |

Do not set the publish directory to `out` and do not add `output: 'export'` to `next.config.ts`. Netlify detects Next.js and provisions the required runtime through its Next.js integration.

## Deployment workflow

- A push to `main` creates a production deployment.
- A pull request can create a deploy preview.
- A failed deployment does not replace the last successful production deployment.
- Build and function logs are available from the Netlify project dashboard.
- A previous successful deployment can be restored from **Deploys**.

Before considering a deployment complete, check:

- `/` and `/en`
- `/galerie` and `/en/gallery`
- `/menu` and `/en/menu`
- `/contact` and `/en/contact`
- `/studio`
- Sanity images
- the language switcher
- the contact form on the production domain

## Sanity publishing webhook

Publishing relevant Sanity content starts a Netlify production deployment through a build hook.

### Netlify

1. Open **Project configuration → Build & deploy → Continuous deployment → Build hooks**.
2. Add a hook named `Sanity production publish` for the `main` branch.
3. Copy the generated URL. Treat it as a secret: anyone with it can start a deployment.

### Sanity

Create a webhook named `Netlify production deploy` under **Sanity Manage → API → Webhooks** and paste the Netlify build-hook URL into it.

| Setting             | Value                      |
| ------------------- | -------------------------- |
| Dataset             | `production`               |
| Trigger on          | Create, update, and delete |
| Trigger on drafts   | Disabled                   |
| Trigger on versions | Disabled                   |
| HTTP method         | `POST`                     |
| API version         | `v2025-02-19`              |
| Projection          | Empty                      |
| Secret              | Empty                      |
| Custom headers      | None                       |
| Status              | Enabled                    |

Use this GROQ filter:

```groq
_type in ["homePage", "galleryPage", "menuPage", "contactPage", "navigationMenu", "siteSettings", "sanity.imageAsset", "sanity.fileAsset"]
```

Draft and version triggering must remain disabled so previewing unpublished work does not use Netlify build minutes. The Sanity secret remains empty because Netlify does not validate Sanity webhook signatures; the unguessable Netlify hook URL is the credential.

To verify the setup, publish a harmless content change and confirm that a production deployment appears in Netlify. Draft edits should not create deployments. If delivery fails, inspect the webhook delivery log in Sanity and the deploy list in Netlify.

If the hook URL is exposed, delete the build hook in Netlify, create a replacement, and update the Sanity webhook. Replacing only the Sanity webhook does not invalidate an exposed Netlify URL.

## Environment variables

Manage these in **Netlify → Project configuration → Environment variables**.

| Variable                         | Purpose                                                       | Secret? |
| -------------------------------- | ------------------------------------------------------------- | ------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Selects the Sanity project                                    | No      |
| `NEXT_PUBLIC_SANITY_DATASET`     | Selects the Sanity dataset; normally `production`             | No      |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Pins Sanity API behaviour; currently `2026-07-19`             | No      |
| `SANITY_API_READ_TOKEN`          | Lets the private preview read saved drafts                    | Yes     |
| `NEXT_PUBLIC_SITE_URL`           | Canonical origin; normally `https://www.banhmioiparis.fr`     | No      |
| `RESEND_API_KEY`                 | Authenticates contact-form email delivery                     | Yes     |
| `RESEND_FROM_EMAIL`              | Verified sender, such as `Banh Mi Oi <info@banhmioiparis.fr>` | No      |
| `GOOGLE_SITE_VERIFICATION`       | Optional Google Search Console HTML-tag token                 | No      |

Mark `RESEND_API_KEY` and `SANITY_API_READ_TOKEN` as secrets and never expose either through a `NEXT_PUBLIC_*` variable. Environment changes only affect new deployments, so trigger a deployment after changing a value.

Restrict production email credentials to the production context where possible. Use separately managed preview values if email must be tested from deploy previews.
