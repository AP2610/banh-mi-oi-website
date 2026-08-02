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
        instagramUrl
    }
`);

export const CONTACT_RECIPIENT_QUERY = defineQuery(/* groq */ `
    *[_id == "siteSettings"][0].contactRecipientEmail
`);
