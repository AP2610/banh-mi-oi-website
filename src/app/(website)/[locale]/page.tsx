import { HomePageCarouselSection, type HomePageCarousel } from '@/components/features/homepage-carousel';
import { Hero, type HomePageHero } from '@/components/features/hero';
import type { Locale } from '@/i18n/routing';
import { sanityFetch } from '@/sanity/lib/fetch';
import { HOME_PAGE_QUERY } from '@/sanity/queries/home-page';

type HomePageProps = {
    params: Promise<{ locale: Locale }>;
};

type HomePageData = HomePageHero & {
    carousel: HomePageCarousel;
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
        </>
    );
};

export default HomePage;
