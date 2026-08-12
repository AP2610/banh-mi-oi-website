# Google setup

This is a one-time job for the person who owns the restaurant's Google account. Use an account that the business will keep even if staff members change.

## Before you start

Make sure both addresses open without a warning:

- `https://www.banhmioiparis.fr`
- `https://banhmioiparis.fr`

The first address should be the main one.

## Add the website to Google Search Console

Google Search Console shows whether Google can find the website and which searches bring people to it.

1. Open [Google Search Console](https://search.google.com/search-console/).
2. Sign in with the restaurant's Google account.
3. Choose **Add property**.
4. Choose **Domain**.
5. Enter only:

    ```text
    banhmioiparis.fr
    ```

    Do not add `https://`, `www`, or `/`.

6. Google will show a line of text used to prove that the business owns the address. Copy it.
7. Open Squarespace Domains and select `banhmioiparis.fr`.
8. Open the domain settings, then the area where the domain entries are listed.
9. Add a new entry:

    - Type: `TXT`
    - Name: `@`
    - Value: paste the full text supplied by Google
    - Time: leave the suggested value

10. Save it. Do not remove or change any other entries.
11. Return to Google and choose **Verify**.

It may take a day or two before Google sees the new entry. Leave it in Squarespace after verification succeeds.

## Tell Google about the website pages

1. In Search Console, open **Sitemaps**.
2. Enter:

    ```text
    https://www.banhmioiparis.fr/sitemap.xml
    ```

3. Choose **Submit**.
4. Check later that the result says **Success**.

Google may take several days or weeks to show every page. Submitting the list does not guarantee a particular position in search results.

## Check the important pages

Use **URL inspection** in Search Console for:

- `https://www.banhmioiparis.fr/`
- `https://www.banhmioiparis.fr/galerie`
- `https://www.banhmioiparis.fr/menu`
- `https://www.banhmioiparis.fr/contact`
- `https://www.banhmioiparis.fr/en`

For each page, choose **Test live URL**. If the page is available, choose **Request indexing**.

## Google Business Profile

Search Console and the Google Business Profile are different. Search Console covers the website. The Business Profile controls the restaurant card in Google Search and Maps.

1. Sign in to the restaurant's Google account.
2. Search Google for the restaurant name and city.
3. Claim or open the Bánh Mì Oi! profile.
4. Check that these details match the website:

    - Name: Bánh Mì Oi!
    - Website: `https://www.banhmioiparis.fr`
    - Address
    - Telephone number
    - Normal opening times
    - Holiday and special opening times
    - Menu link: `https://www.banhmioiparis.fr/menu`
    - Instagram link, if Google offers that option

5. Add current photos of the restaurant and food.
6. Check the profile whenever the address, telephone number, opening times, or menu changes.

Changing the website does not automatically change the Google Business Profile. Update both places.

## Regular checks

Once a month:

- Open Search Console and look for warnings.
- Check that the page list still says **Success**.
- Check that the restaurant details in Google Maps are correct.
- Reply to new reviews where appropriate.

Official help:

- [Add a website to Search Console](https://support.google.com/webmasters/answer/34592)
- [Prove ownership of a website](https://support.google.com/webmasters/answer/9008080)
- [Submit the page list](https://support.google.com/webmasters/answer/7451001)
- [Manage a Google Business Profile](https://support.google.com/business/answer/7039811)
