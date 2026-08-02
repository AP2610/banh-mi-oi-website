import type { Metadata } from 'next';
import { Bebas_Neue, Quicksand } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { routing } from '@/i18n/routing';
import { sanityFetch } from '@/sanity/lib/fetch';
import { NAVIGATION_MENU_QUERY, type NavigationMenuData } from '@/sanity/queries/navigation-menu';
import { SITE_SETTINGS_QUERY, type PublicSiteSettings } from '@/sanity/queries/site-settings';

import '../../../styles/globals.css';

const bebasNeue = Bebas_Neue({
    variable: '--font-bebas',
    subsets: ['latin'],
    fallback: ['system-ui', 'arial'],
    display: 'swap',
    weight: '400',
});

const quicksand = Quicksand({
    variable: '--font-quicksand',
    subsets: ['latin'],
    fallback: ['system-ui', 'arial'],
    display: 'swap',
});

type WebsiteLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

export const generateMetadata = async ({ params }: WebsiteLayoutProps): Promise<Metadata> => {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // TODO: Translate this metadata based on `locale` when localized SEO content is added to Sanity.
    return {
        title: 'Bánh Mì Oi! | Street food vietnamienne à Paris',
        description: 'Des Bánh Mì frais préparés avec passion à Paris.',
    };
};

const WebsiteLayout = async ({ children, params }: WebsiteLayoutProps) => {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const [navigationMenu, siteSettings] = await Promise.all([
        sanityFetch<NavigationMenuData | null, { locale: string }>({
            query: NAVIGATION_MENU_QUERY,
            params: { locale },
        }),
        sanityFetch<PublicSiteSettings | null, { locale: string }>({
            query: SITE_SETTINGS_QUERY,
            params: { locale },
        }),
    ]);

    return (
        <html lang={locale}>
            <head>
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Banh Mi Oi" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>

            <body className={`${bebasNeue.variable} ${quicksand.variable}`}>
                <NextIntlClientProvider locale={locale} messages={{}}>
                    <div className="website-root flex min-h-svh flex-col bg-background font-body text-foreground antialiased">
                        <SiteHeader instagramUrl={siteSettings?.instagramUrl} links={navigationMenu?.links ?? []} locale={locale} />

                        <main className="flex-1 pt-header">{children}</main>

                        <SiteFooter instagramUrl={siteSettings?.instagramUrl} locale={locale} />
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default WebsiteLayout;
