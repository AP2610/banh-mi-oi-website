import { defineQuery } from 'next-sanity';

export type SiteAddress = {
    houseNumber?: string;
    street?: string;
    city?: string;
    postalCode?: string;
};

export type PublicSiteSettings = {
    address: SiteAddress | null;
    openingTimes: string;
    instagramUrl: string;
    structuredOpeningHours: string[] | null;
    telephone: string | null;
    priceRange: string | null;
    restaurantImage: {
        assetId: string;
        width: number;
        height: number;
    } | null;
    deliveryUrls: {
        uberEatsUrl: string;
        deliverooUrl: string;
    } | null;
};

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
    *[_id == "siteSettings"][0] {
        address {
            houseNumber,
            street,
            city,
            postalCode
        },
        "openingTimes": openingTimes[language == $locale][0].value,
        structuredOpeningHours,
        telephone,
        priceRange,
        instagramUrl,
        "restaurantImage": *[_id == "homePage"][0].hero.image {
            "assetId": asset->_id,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
        },
        "deliveryUrls": *[_id == "homePage"][0].order {
            uberEatsUrl,
            deliverooUrl
        }
    }
`);

export const CONTACT_RECIPIENT_QUERY = defineQuery(/* groq */ `
    *[_id == "siteSettings"][0].contactRecipientEmail
`);

export const SITEMAP_DOCUMENTS_QUERY = defineQuery(/* groq */ `
    *[_id in ["homePage", "galleryPage", "menuPage", "contactPage"]] {
        _id,
        _updatedAt
    }
`);
