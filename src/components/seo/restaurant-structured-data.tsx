import type { Locale } from '@/i18n/routing';
import { getPageUrl, getSiteUrl, SITE_NAME } from '@/lib/site';
import { buildSanitySocialImageUrl } from '@/sanity/lib/image';
import type { PublicSiteSettings } from '@/sanity/queries/site-settings';

type RestaurantStructuredDataProps = {
    locale: Locale;
    settings: PublicSiteSettings;
};

const serializeJsonLd = (value: object): string => JSON.stringify(value).replaceAll('<', '\\u003c');

export const RestaurantStructuredData = ({ locale, settings }: RestaurantStructuredDataProps) => {
    const address = settings.address;
    const hasAddress = Boolean(address?.houseNumber || address?.street || address?.city || address?.postalCode);
    const streetAddress = [address?.houseNumber, address?.street].filter(Boolean).join(' ');
    const orderTargets = [settings.deliveryUrls?.uberEatsUrl, settings.deliveryUrls?.deliverooUrl].filter((url): url is string => Boolean(url));

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Restaurant',
        '@id': `${getSiteUrl('/')}#restaurant`,
        name: SITE_NAME,
        url: getPageUrl('home', locale),
        logo: getSiteUrl('/logos/logo.svg'),
        image: settings.restaurantImage ? buildSanitySocialImageUrl(settings.restaurantImage) : undefined,
        servesCuisine: ['Vietnamese', 'Bánh mì'],
        menu: getPageUrl('menu', locale),
        inLanguage: locale,
        address: hasAddress
            ? {
                  '@type': 'PostalAddress',
                  streetAddress: streetAddress || undefined,
                  addressLocality: address?.city || undefined,
                  postalCode: address?.postalCode || undefined,
                  addressCountry: 'FR',
              }
            : undefined,
        telephone: settings.telephone || undefined,
        priceRange: settings.priceRange || undefined,
        openingHours: settings.structuredOpeningHours?.length ? settings.structuredOpeningHours : undefined,
        sameAs: settings.instagramUrl ? [settings.instagramUrl] : undefined,
        potentialAction: orderTargets.length
            ? {
                  '@type': 'OrderAction',
                  target: orderTargets,
              }
            : undefined,
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />;
};
