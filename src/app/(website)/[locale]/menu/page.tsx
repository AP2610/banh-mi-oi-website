import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MenuPageContent, type MenuPageData } from '@/components/features/menu-page';
import type { Locale } from '@/i18n/routing';
import { sanityFetch } from '@/sanity/lib/fetch';
import { MENU_PAGE_QUERY } from '@/sanity/queries/menu-page';

type MenuPageProps = {
    params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({ params }: MenuPageProps): Promise<Metadata> => {
    const { locale } = await params;
    const menu = await sanityFetch<MenuPageData | null, { locale: Locale }>({
        query: MENU_PAGE_QUERY,
        params: { locale },
    });

    if (!menu) notFound();

    return {
        title: `${menu.title} | Bánh Mì Oi!`,
        description: menu.subtitle,
    };
};

const MenuPage = async ({ params }: MenuPageProps) => {
    const { locale } = await params;
    const menu = await sanityFetch<MenuPageData | null, { locale: Locale }>({
        query: MENU_PAGE_QUERY,
        params: { locale },
    });

    if (!menu) notFound();

    return <MenuPageContent menu={menu} />;
};

export default MenuPage;
