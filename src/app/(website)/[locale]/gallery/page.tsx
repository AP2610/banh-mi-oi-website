import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Gallery, type GalleryPageData } from '@/components/features/gallery';
import type { Locale } from '@/i18n/routing';
import { sanityFetch } from '@/sanity/lib/fetch';
import { GALLERY_PAGE_QUERY } from '@/sanity/queries/gallery-page';

type GalleryPageProps = {
    params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({ params }: GalleryPageProps): Promise<Metadata> => {
    const { locale } = await params;

    const gallery = await sanityFetch<GalleryPageData | null, { locale: Locale }>({
        query: GALLERY_PAGE_QUERY,
        params: { locale },
    });

    if (!gallery) notFound();

    return {
        title: `${gallery.title} | Bánh Mì Oi!`,
        description: gallery.subtitle,
    };
};

const GalleryPage = async ({ params }: GalleryPageProps) => {
    const { locale } = await params;
    const gallery = await sanityFetch<GalleryPageData | null, { locale: Locale }>({
        query: GALLERY_PAGE_QUERY,
        params: { locale },
    });

    if (!gallery) notFound();

    return <Gallery gallery={gallery} locale={locale} />;
};

export default GalleryPage;
