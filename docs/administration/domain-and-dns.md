# Domain and DNS

The domain is registered with and uses DNS managed by Squarespace Domains. Netlify DNS is not required.

## Website records

| Type    | Host/name | Value                       | TTL    |
| ------- | --------- | --------------------------- | ------ |
| `A`     | `@`       | `75.2.60.5`                 | 1 hour |
| `CNAME` | `www`     | `banhmioiparis.netlify.app` | 1 hour |

The `A` record is Netlify's fallback for an external provider that does not offer an ALIAS, ANAME, or flattened apex CNAME. The `www` CNAME points at the site's permanent Netlify address so Netlify can route requests to this project.

The old **Squarespace Defaults** website preset must not be restored. Its old `A` records, apex `HTTPS` record, and `www` CNAME to `ext-sq.squarespace.com` conflict with Netlify.

Do not delete unrelated records, including:

- Resend verification, SPF, DKIM, and DMARC records
- Gmail or Google Workspace MX and verification records
- Squarespace Domain Connect records

Before changing nameservers or moving DNS, copy and verify every existing record. Missing mail records can interrupt email or invalidate the Resend sending domain.

## Primary domain and HTTPS

The Netlify primary domain is `www.banhmioiparis.fr`; `banhmioiparis.fr` redirects to it. Using `www` allows the external-DNS CNAME to point directly to Netlify.

Netlify provisions and renews the Let's Encrypt certificate after both DNS records propagate. While provisioning is active, Netlify may temporarily prevent primary-domain changes.

If verification remains pending after 24 hours:

1. Check that `@` resolves to `75.2.60.5`.
2. Check that `www` is a CNAME for `banhmioiparis.netlify.app`.
3. Check for conflicting `A`, `AAAA`, `CNAME`, or `HTTPS` records.
4. Run **Verify DNS configuration** in Netlify.
5. Check **Domain management → HTTPS**.
