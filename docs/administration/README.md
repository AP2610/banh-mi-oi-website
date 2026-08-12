# Site administration

This folder is the operational runbook for the Bánh Mì Oi! website. Each service has its own guide so an administrator can go directly to the relevant topic.

Do not store passwords, API keys, recovery codes, webhook URLs, or other credentials in this repository. Grant access through each provider's account or team controls.

Start with [Platforms and technology stack](./platforms-and-stack.md) for a map of every external service and the main application technologies.

## Service inventory

| Responsibility                | Provider or system  | Guide                                    |
| ----------------------------- | ------------------- | ---------------------------------------- |
| Source code                   | GitHub              | Repository `AP2610/banh-mi-oi-website`   |
| Production hosting            | Netlify             | [Hosting and deployments](./hosting.md)  |
| Domain registration and DNS   | Squarespace Domains | [Domain and DNS](./domain-and-dns.md)    |
| Content management and images | Sanity              | [Sanity](./sanity.md)                    |
| Contact-form email delivery   | Resend              | [Contact-form email](./contact-email.md) |
| Search administration         | Google              | [Search administration](./search.md)     |

The public primary domain is `https://www.banhmioiparis.fr`. The apex domain, `https://banhmioiparis.fr`, redirects to it. The Netlify address is only the technical deployment address.

## Routine checks

### After changing Sanity content

1. Publish the document in Sanity.
2. Confirm that a Netlify production deployment starts.
3. Verify the affected French and English routes after it finishes.

### After changing DNS

1. Record what changed and why.
2. Preserve email and verification records.
3. Allow at least the configured TTL before diagnosing propagation.
4. Verify the apex domain, `www`, redirects, and HTTPS independently.

### Monthly

- Review Netlify usage, billing limits, failed deploys, and function errors.
- Confirm that the contact form still delivers successfully.
- Check that the domain and provider account recovery information are current.
- Ensure at least two appropriate people can recover the critical provider accounts.

## Account handover

Transfer or grant access to:

- the GitHub repository
- the Netlify project/team
- the Squarespace Domains account or domain permissions
- the Sanity project
- the Resend project
- the mailbox receiving contact submissions

Use individual accounts, team invitations, and multi-factor authentication instead of sharing passwords. Confirm who owns billing, domain renewal, and emergency account recovery.
