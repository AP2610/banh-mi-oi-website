import type { Metadata } from 'next';

import type { Locale } from '@/i18n/routing';
import { buildSanitySocialImageUrl, type SanityImageData } from '@/sanity/lib/image';

import { getPageAlternates, getPageUrl, SITE_NAME, type SitePage } from './site';

export type PageSeoData = {
    _updatedAt: string;
    seo: {
        title: string | null;
        description: string | null;
        socialImage: SanityImageData | null;
    } | null;
};

type BuildPageMetadataOptions = {
    page: SitePage;
    locale: Locale;
    fallbackTitle: string;
    fallbackDescription: string;
    fallbackImage?: SanityImageData | null;
    seo?: PageSeoData['seo'];
};

const openGraphLocales: Record<Locale, string> = {
    fr: 'fr_FR',
    en: 'en_GB',
};

export const buildPageMetadata = ({ page, locale, fallbackTitle, fallbackDescription, fallbackImage, seo }: BuildPageMetadataOptions): Metadata => {
    const pageTitle = seo?.title?.trim() || fallbackTitle;
    const title = page === 'home' && pageTitle.includes(SITE_NAME) ? pageTitle : `${pageTitle} | ${SITE_NAME}`;
    const description = seo?.description?.trim() || fallbackDescription;
    const socialImage = seo?.socialImage ?? fallbackImage;
    const image = socialImage
        ? {
              url: buildSanitySocialImageUrl(socialImage),
              width: 1200,
              height: 630,
              alt: pageTitle,
          }
        : undefined;

    return {
        title,
        description,
        alternates: getPageAlternates(page, locale),
        openGraph: {
            type: 'website',
            siteName: SITE_NAME,
            title,
            description,
            url: getPageUrl(page, locale),
            locale: openGraphLocales[locale],
            alternateLocale: openGraphLocales[locale === 'fr' ? 'en' : 'fr'],
            images: image ? [image] : undefined,
        },
        twitter: {
            card: image ? 'summary_large_image' : 'summary',
            title,
            description,
            images: image ? [image.url] : undefined,
        },
    };
};
