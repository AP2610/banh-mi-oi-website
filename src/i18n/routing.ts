import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    localePrefix: 'as-needed',
    localeDetection: false,
    pathnames: {
        '/': '/',
        '/gallery': {
            fr: '/galerie',
            en: '/gallery',
        },
        '/menu': '/menu',
        '/contact': '/contact',
    },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof (typeof routing)['pathnames'];
