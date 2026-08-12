import type { Metadata } from 'next';

import { HomePageCarouselSection, type HomePageCarousel } from '@/components/features/homepage-carousel';
import { Hero, type HomePageHero } from '@/components/features/hero';
import { HomePageImageSection, type HomePageImageSectionData } from '@/components/features/homepage-image-section';
import { OrderNow, type HomePageOrder } from '@/components/features/order-now';
import { OurStory, type HomePageStory } from '@/components/features/our-story';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata, type PageSeoData } from '@/lib/seo';
import { sanityFetch } from '@/sanity/lib/fetch';
import { HOME_PAGE_QUERY } from '@/sanity/queries/home-page';

type HomePageProps = {
    params: Promise<{ locale: Locale }>;
};

type HomePageData = HomePageHero &
    PageSeoData & {
        carousel: HomePageCarousel;
        imageSection: HomePageImageSectionData;
        story: HomePageStory;
        order: HomePageOrder;
    };

export const generateMetadata = async ({ params }: HomePageProps): Promise<Metadata> => {
    const { locale } = await params;
    const page = await sanityFetch<HomePageData, { locale: Locale }>({
        query: HOME_PAGE_QUERY,
        params: { locale },
    });

    return buildPageMetadata({
        page: 'home',
        locale,
        fallbackTitle: page.title,
        fallbackDescription: page.subtitle,
        fallbackImage: page.image,
        seo: page.seo,
    });
};

const HomePage = async ({ params }: HomePageProps) => {
    const { locale } = await params;

    const page = await sanityFetch<HomePageData, { locale: Locale }>({
        query: HOME_PAGE_QUERY,
        params: { locale },
    });

    return (
        <>
            <Hero hero={page} />
            <HomePageCarouselSection carousel={page.carousel} />
            <HomePageImageSection section={page.imageSection} />
            <OurStory story={page.story} />
            <OrderNow order={page.order} />
        </>
    );
};

export default HomePage;
