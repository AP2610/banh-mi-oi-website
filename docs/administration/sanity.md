# Sanity administration

Sanity supplies page content, navigation, shared site settings, and uploaded media. The embedded Studio is available at `/studio`.

Restaurant editors should use the [content editing guide](../owners/editing-content.md). This guide covers the technical administration of the integration.

## CORS origins

Manage origins in **Sanity Manage → API → CORS origins**:

```text
https://www.banhmioiparis.fr
https://banhmioiparis.fr
https://banhmioiparis.netlify.app
http://localhost:3002
```

Origins contain only the scheme and hostname, plus the port for local development. Do not add a trailing slash or `/studio`. Enable **Allow credentials** for origins used with the embedded Studio and draft preview.

Review this list if the Netlify project name, primary domain, or local port changes. Add deploy-preview origins only when they genuinely need Studio access.

## Draft preview

Presentation loads the website in private Draft Mode. Editors can see saved drafts and changes refresh without publishing. Normal visitors continue to see published content.

Create `SANITY_API_READ_TOKEN` under **Sanity Manage → API → Tokens** with the Viewer role and a name such as `Website draft preview`. Add it to `.env.local` and the Netlify production environment. Viewer access is sufficient; preview must never use a token that can edit content.

Preview depends on:

- `SANITY_API_READ_TOKEN` being present
- the website origin being allowed by CORS with credentials
- `/api/draft-mode/enable` and `/api/draft-mode/disable`
- the localized routes in `src/sanity/presentation/resolve.ts`

Search metadata, the sitemap, structured restaurant data, and the contact-form recipient deliberately use published content rather than preview values.

## Shared content settings

The singleton **Site Settings** document contains:

- contact-form recipient email
- Instagram URL
- address
- opening times
- structured opening hours
- public telephone number
- price range

Page content, navigation links, and localized French/English content are managed in their respective Sanity documents. Each page also has optional SEO and social-sharing overrides.
