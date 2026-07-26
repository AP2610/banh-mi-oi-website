import { HomePageCarouselSection, type HomePageCarousel } from '@/components/features/homepage-carousel';
import { Hero, type HomePageHero } from '@/components/features/hero';
import { HomePageImageSection, type HomePageImageSectionData } from '@/components/features/homepage-image-section';
import { OurStory, type HomePageStory } from '@/components/features/our-story';
import type { Locale } from '@/i18n/routing';
import { sanityFetch } from '@/sanity/lib/fetch';
import { HOME_PAGE_QUERY } from '@/sanity/queries/home-page';

type HomePageProps = {
    params: Promise<{ locale: Locale }>;
};

type HomePageData = HomePageHero & {
    carousel: HomePageCarousel;
    imageSection: HomePageImageSectionData;
    story: HomePageStory;
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
        </>
    );
};

export default HomePage;
