import type { MetadataRoute } from 'next';

import type { Locale } from '@/i18n/routing';
import { getPageAlternates, getPageUrl, type SitePage } from '@/lib/site';
import { sanityFetch } from '@/sanity/lib/fetch';
import { SITEMAP_DOCUMENTS_QUERY } from '@/sanity/queries/site-settings';

type SitemapDocument = {
    _id: string;
    _updatedAt: string;
};

const documentPages: Record<string, SitePage> = {
    homePage: 'home',
    galleryPage: 'gallery',
    menuPage: 'menu',
    contactPage: 'contact',
};

const locales: Locale[] = ['fr', 'en'];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const documents = await sanityFetch<SitemapDocument[]>({ query: SITEMAP_DOCUMENTS_QUERY });

    return documents.flatMap((document) => {
        const page = documentPages[document._id];
        if (!page) return [];

        return locales.map((locale) => ({
            url: getPageUrl(page, locale),
            lastModified: document._updatedAt,
            changeFrequency: page === 'home' ? ('weekly' as const) : ('monthly' as const),
            priority: page === 'home' ? 1 : 0.8,
            alternates: {
                languages: getPageAlternates(page, locale).languages,
            },
        }));
    });
};

export default sitemap;
