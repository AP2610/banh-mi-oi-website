import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Gallery, type GalleryPageData } from '@/components/features/gallery';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata, type PageSeoData } from '@/lib/seo';
import { sanityFetch } from '@/sanity/lib/fetch';
import { GALLERY_PAGE_QUERY } from '@/sanity/queries/gallery-page';

type GalleryPageProps = {
    params: Promise<{ locale: Locale }>;
};

type GalleryDocument = GalleryPageData & PageSeoData;

export const generateMetadata = async ({ params }: GalleryPageProps): Promise<Metadata> => {
    const { locale } = await params;

    const gallery = await sanityFetch<GalleryDocument | null, { locale: Locale }>({
        query: GALLERY_PAGE_QUERY,
        params: { locale },
        stega: false,
    });

    if (!gallery) notFound();

    return buildPageMetadata({
        page: 'gallery',
        locale,
        fallbackTitle: gallery.title,
        fallbackDescription: gallery.subtitle,
        fallbackImage: gallery.images[0],
        seo: gallery.seo,
    });
};

const GalleryPage = async ({ params }: GalleryPageProps) => {
    const { locale } = await params;
    const gallery = await sanityFetch<GalleryDocument | null, { locale: Locale }>({
        query: GALLERY_PAGE_QUERY,
        params: { locale },
    });

    if (!gallery) notFound();

    return <Gallery gallery={gallery} locale={locale} />;
};

export default GalleryPage;
