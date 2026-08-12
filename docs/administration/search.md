# Search administration

The application generates:

- `/robots.txt`
- `/sitemap.xml`
- localized canonical URLs
- French, English, and `x-default` language alternatives
- Open Graph and Twitter/X sharing metadata
- Restaurant structured data

The restaurant owner setup is documented in [Google setup](../owners/google.md). The code implementation is documented in [technical SEO](../development/seo.md).

After the production domain and HTTPS are active:

1. Create a Google Search Console domain property for `banhmioiparis.fr`.
2. Prefer DNS verification using Google's TXT record in Squarespace.
3. Alternatively, set only the HTML-tag content value in `GOOGLE_SITE_VERIFICATION` and redeploy.
4. Submit `https://www.banhmioiparis.fr/sitemap.xml`.
5. Inspect the homepage, menu, gallery, and contact routes in both languages.
6. Validate the homepage with Google Rich Results Test.
7. Check production pages with PageSpeed Insights.

Google Business Profile is separate from the website. Keep its name, address, opening hours, telephone number, menu URL, and website URL consistent with Sanity and the production site.
