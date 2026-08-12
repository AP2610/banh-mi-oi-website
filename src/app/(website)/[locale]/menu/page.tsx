import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MenuPageContent, type MenuPageData } from '@/components/features/menu-page';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata, type PageSeoData } from '@/lib/seo';
import { sanityFetch } from '@/sanity/lib/fetch';
import { MENU_PAGE_QUERY } from '@/sanity/queries/menu-page';

type MenuPageProps = {
    params: Promise<{ locale: Locale }>;
};

type MenuDocument = MenuPageData & PageSeoData;

export const generateMetadata = async ({ params }: MenuPageProps): Promise<Metadata> => {
    const { locale } = await params;
    const menu = await sanityFetch<MenuDocument | null, { locale: Locale }>({
        query: MENU_PAGE_QUERY,
        params: { locale },
    });

    if (!menu) notFound();

    return buildPageMetadata({
        page: 'menu',
        locale,
        fallbackTitle: menu.title,
        fallbackDescription: menu.subtitle,
        fallbackImage: menu.images[0],
        seo: menu.seo,
    });
};

const MenuPage = async ({ params }: MenuPageProps) => {
    const { locale } = await params;
    const menu = await sanityFetch<MenuDocument | null, { locale: Locale }>({
        query: MENU_PAGE_QUERY,
        params: { locale },
    });

    if (!menu) notFound();

    return <MenuPageContent menu={menu} />;
};

export default MenuPage;
