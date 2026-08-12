# Contact-form email

The form posts to `/api/contact`. The server validates the submission, sanitizes plain text, reads the recipient from Sanity Site Settings, and asks Resend to deliver the message.

## Required configuration

1. The sending domain must show as verified in Resend.
2. `RESEND_API_KEY` must be present in the Netlify production environment.
3. `RESEND_FROM_EMAIL` must use the verified domain, currently `Banh Mi Oi <info@banhmioiparis.fr>`.
4. **Sanity → Site Settings → Contact form recipient** must contain a valid receiving address.
5. A new Netlify deployment must run after environment-variable changes.

When rotating the Resend key, create the new key, update Netlify, deploy and test, and only then revoke the old key.

If submission fails, check the browser response, Netlify function logs, and the Resend delivery log. Missing configuration returns a server error without exposing details to the visitor.

## Deliverability

The sending domain should have valid SPF, DKIM, and DMARC records. The DMARC record currently starts with a monitoring policy:

```text
v=DMARC1; p=none;
```

When diagnosing spam placement, open **Show original** in Gmail and confirm that SPF, DKIM, and DMARC all pass. Do not tighten the DMARC policy until every legitimate sender using the domain has been checked.
