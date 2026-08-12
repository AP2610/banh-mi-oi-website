# Site administration

This document is the operational runbook for the Bánh Mì Oi! website. It records where the site is hosted, how its domain and integrations are configured, and the checks to make when something stops working.

Do not store passwords, API keys, recovery codes, or other credentials in this repository. Access should be granted through each provider's account or team controls.

## Service inventory

| Responsibility                | Provider or system  | Administrative location                                           |
| ----------------------------- | ------------------- | ----------------------------------------------------------------- |
| Source code                   | GitHub              | Repository `AP2610/banh-mi-oi-website`                            |
| Production hosting            | Netlify             | Project with the default URL `https://banhmioiparis.netlify.app`  |
| Domain registration and DNS   | Squarespace Domains | DNS settings for `banhmioiparis.fr`                               |
| Content management and images | Sanity              | Sanity project configured by `NEXT_PUBLIC_SANITY_PROJECT_ID`      |
| Contact-form email delivery   | Resend              | Resend project containing the verified sending domain and API key |
| Contact-form recipient        | Sanity              | **Site Settings → Contact form recipient**                        |

The intended public primary domain is `https://www.banhmioiparis.fr`. The apex domain, `https://banhmioiparis.fr`, should redirect to it. Netlify's `.netlify.app` URL remains the technical address of the deployment and the target of the `www` CNAME; it is not the visitor-facing canonical domain.

## Hosting and deployments

Netlify hosts the application as a normal Next.js application. The project is not a static export: the contact form uses the Next.js route handler at `/api/contact`.

The expected Netlify build configuration is:

| Setting           | Value                          |
| ----------------- | ------------------------------ |
| Git repository    | `AP2610/banh-mi-oi-website`    |
| Production branch | `main`                         |
| Base directory    | blank / repository root        |
| Build command     | `pnpm build`                   |
| Publish directory | automatic / blank              |
| Package manager   | pnpm, pinned in `package.json` |
| Node.js version   | pinned in `.nvmrc`             |

Do not set the publish directory to `out` and do not add `output: 'export'` to `next.config.ts`. Netlify detects Next.js and provisions the required runtime through its Next.js integration.

### Deployment workflow

- A push to `main` creates a production deployment.
- A pull request can create a deploy preview.
- A failed deployment does not replace the last successful production deployment.
- Build logs and function logs are available from the Netlify project dashboard.
- A previous successful deploy can be restored from **Deploys** if a release causes a production problem.

Before considering a deployment complete, check:

- `/` and `/en`
- `/galerie` and `/en/gallery`
- `/menu` and `/en/menu`
- `/contact` and `/en/contact`
- `/studio`
- Sanity images
- the language switcher
- the contact form on the production domain

### Sanity publishing and rebuilding

Most website pages are generated from Sanity content during the Next.js build. Publishing content in Sanity does not necessarily start a Netlify deployment.

Until a Sanity-to-Netlify build hook is configured, trigger a production rebuild from Netlify after publishing content that needs to appear on the site. If a build hook is added later, document its name, triggering rules, and ownership here. Avoid storing the secret build-hook URL in this repository.

## Environment variables

Environment variables are administered in **Netlify → Project configuration → Environment variables**.

| Variable                         | Purpose                                                              | Secret?                                     |
| -------------------------------- | -------------------------------------------------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Selects the Sanity project                                           | No                                          |
| `NEXT_PUBLIC_SANITY_DATASET`     | Selects the Sanity dataset; normally `production`                    | No                                          |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Pins Sanity API behaviour; currently `2026-07-19`                    | No                                          |
| `NEXT_PUBLIC_SITE_URL`           | Canonical origin; normally `https://www.banhmioiparis.fr`            | No                                          |
| `RESEND_API_KEY`                 | Authenticates contact-form email delivery                            | Yes                                         |
| `RESEND_FROM_EMAIL`              | Verified sender, for example `Banh Mi Oi <contact@banhmioiparis.fr>` | No, but administer with the Resend settings |
| `GOOGLE_SITE_VERIFICATION`       | Optional Google Search Console HTML-tag token                        | No                                          |

The three `NEXT_PUBLIC_SANITY_*` variables are needed during builds and at runtime. `NEXT_PUBLIC_SITE_URL` controls canonical URLs, language alternates, the sitemap, and structured data, so it must use the public primary domain. The Resend variables are required by the contact API at runtime. Mark `RESEND_API_KEY` as a secret in Netlify and never expose it through a `NEXT_PUBLIC_*` variable.

Environment-variable changes only affect new deploys. Trigger a new deployment after adding, changing, or rotating a value.

For deploy previews, decide deliberately whether email sending should work. The safest default is to restrict the production Resend key to the production context. If preview email testing is necessary, use a separately managed preview value where possible.

## Domain and DNS

The domain is registered with and currently uses DNS managed by Squarespace Domains. Netlify DNS is not required.

The website records should be:

| Type    | Host/name | Value                       | TTL    |
| ------- | --------- | --------------------------- | ------ |
| `A`     | `@`       | `75.2.60.5`                 | 1 hour |
| `CNAME` | `www`     | `banhmioiparis.netlify.app` | 1 hour |

The `A` record is Netlify's fallback for an external provider that does not offer an ALIAS, ANAME, or flattened apex CNAME. The `www` CNAME points at the site's permanent Netlify address so Netlify can route requests to this project. It does not change the address shown to visitors.

The old **Squarespace Defaults** website preset must not be restored. In particular, the old Squarespace `A` records, apex `HTTPS` record, and `www` CNAME to `ext-sq.squarespace.com` would conflict with Netlify.

Do not delete unrelated DNS records, including:

- Resend verification, SPF, and DKIM records
- DMARC records
- Gmail or Google Workspace MX and verification records
- Squarespace Domain Connect records

Before changing nameservers or moving DNS to another provider, copy and verify every existing record. Missing mail records can interrupt email or invalidate the Resend sending domain.

### Primary domain and HTTPS

The preferred Netlify primary domain is `www.banhmioiparis.fr`; `banhmioiparis.fr` should redirect to it. Using `www` allows the external-DNS CNAME to point directly to Netlify.

Netlify provisions and renews the Let's Encrypt certificate automatically after both DNS records have propagated. While certificate provisioning is active, Netlify may temporarily prevent changes to the primary domain. Wait for provisioning to complete rather than repeatedly changing DNS records.

DNS changes can take several hours to appear because of caching. If verification remains pending after 24 hours:

1. Check that `@` resolves to `75.2.60.5`.
2. Check that `www` is a CNAME for `banhmioiparis.netlify.app`.
3. Check for conflicting `A`, `AAAA`, `CNAME`, or `HTTPS` records.
4. Re-run **Verify DNS configuration** in Netlify.
5. Check the certificate status in **Domain management → HTTPS**.

## Sanity administration

Sanity supplies page content, navigation, site settings, and uploaded images. The embedded Studio is available at `/studio` and uses the same Sanity project selected by the Netlify environment variables.

### CORS origins

Manage origins in **Sanity Manage → API → CORS origins**. The expected origins are:

```text
https://www.banhmioiparis.fr
https://banhmioiparis.fr
https://banhmioiparis.netlify.app
http://localhost:3002
```

Origins contain only the scheme and hostname (plus the port for local development). Do not add a trailing slash or `/studio` path. Enable **Allow credentials** for origins used to access the embedded Sanity Studio.

If the Netlify project name, primary domain, or local development port changes, review this list. Deploy-preview URLs are not listed by default; add only the origins that genuinely need Studio access.

### Operational content settings

The following values are shared website settings rather than code:

- contact-form recipient email
- Instagram URL
- address
- opening times

Update them in the singleton **Site Settings** document. Page content, navigation links, and localized French/English content are managed in their respective Sanity documents.

The optional restaurant search fields in Site Settings are:

- structured opening hours, entered in a format such as `Mo-Fr 11:30-21:30`
- public telephone number
- price range, such as `€` or `€€`

Each page also contains a collapsed **SEO and social sharing** object. Its localized search title, description, and sharing image are overrides; when left empty, the website uses the page's existing title, subtitle, and main image.

## Search administration

The application generates:

- `/robots.txt`
- `/sitemap.xml`
- localized canonical URLs
- French, English, and `x-default` language alternates
- Open Graph and Twitter/X sharing metadata
- Restaurant structured data

After the final domain and HTTPS are active:

1. Create a Google Search Console domain property for `banhmioiparis.fr`.
2. Prefer DNS verification and add Google's TXT record in Squarespace without changing the website or mail records.
3. Alternatively, put the HTML-tag token—not the entire `<meta>` element—in `GOOGLE_SITE_VERIFICATION` and redeploy.
4. Submit `https://www.banhmioiparis.fr/sitemap.xml`.
5. Inspect the homepage, menu, gallery, and contact URLs in both languages.
6. Validate the production homepage with Google Rich Results Test.
7. Check the production pages with PageSpeed Insights after the first deployment containing the SEO changes.

The Google Business Profile is administered separately from the website. Keep its name, address, opening hours, phone number, menu URL, and primary website URL consistent with Sanity Site Settings and the production site.

## Resend and the contact form

The form posts to `/api/contact`. The server validates the submission, sanitizes plain text, reads the recipient from Sanity Site Settings, and asks Resend to deliver the message.

For successful delivery:

1. The sending domain must show as verified in Resend.
2. `RESEND_API_KEY` must be present in the Netlify production environment.
3. `RESEND_FROM_EMAIL` must use an address on the verified domain.
4. **Site Settings → Contact form recipient** must contain a valid receiving address.
5. A new Netlify deploy must have run after environment-variable changes.

When rotating the Resend key, create the new key, update Netlify, deploy and test, and only then revoke the old key.

If submission fails, check the browser response, the Netlify function logs, and the Resend delivery log. A missing recipient or environment variable returns a server error without exposing configuration details to the visitor.

## Routine administration

### After changing Sanity content

1. Publish the document in Sanity.
2. Trigger or confirm a Netlify production deployment.
3. Verify the affected French and English routes.

### After changing DNS

1. Record what changed and why.
2. Preserve email and verification records.
3. Allow at least the configured TTL before diagnosing propagation.
4. Verify the apex domain, `www`, redirects, and HTTPS independently.

### Monthly checks

- Review Netlify usage and billing limits.
- Review failed deploys and function errors.
- Confirm the contact form still delivers successfully.
- Check that the domain and provider account recovery information are current.
- Ensure at least two appropriate people can recover the critical provider accounts.

## Account handover checklist

For a safe handover, transfer or grant access to:

- the GitHub repository
- the Netlify project/team
- the Squarespace Domains account or domain permissions
- the Sanity project
- the Resend project
- the mailbox receiving contact submissions

Use individual accounts, team invitations, and multi-factor authentication instead of sharing passwords. Confirm who owns billing, domain renewal, and emergency account recovery.
