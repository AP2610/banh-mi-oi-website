import type { Locale } from '@/i18n/routing';

export const SITE_NAME = 'Bánh Mì Oi!';
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.banhmioiparis.fr');

export type SitePage = 'home' | 'gallery' | 'menu' | 'contact';

const pagePaths: Record<SitePage, Record<Locale, string>> = {
    home: {
        fr: '/',
        en: '/en',
    },
    gallery: {
        fr: '/galerie',
        en: '/en/gallery',
    },
    menu: {
        fr: '/menu',
        en: '/en/menu',
    },
    contact: {
        fr: '/contact',
        en: '/en/contact',
    },
};

export const getSiteUrl = (path = '/'): string => new URL(path, SITE_URL).toString();

export const getPagePath = (page: SitePage, locale: Locale): string => pagePaths[page][locale];

export const getPageUrl = (page: SitePage, locale: Locale): string => getSiteUrl(getPagePath(page, locale));

export const getPageAlternates = (page: SitePage, locale: Locale) => ({
    canonical: getPageUrl(page, locale),
    languages: {
        fr: getPageUrl(page, 'fr'),
        en: getPageUrl(page, 'en'),
        'x-default': getPageUrl(page, 'fr'),
    },
});
