import { Hero, type HomePageHero } from '@/components/features/hero';
import type { Locale } from '@/i18n/routing';
import { sanityFetch } from '@/sanity/lib/fetch';
import { HOME_PAGE_QUERY } from '@/sanity/queries/home-page';

type HomePageProps = {
    params: Promise<{ locale: Locale }>;
};

const HomePage = async ({ params }: HomePageProps) => {
    const { locale } = await params;

    const hero = await sanityFetch<HomePageHero, { locale: Locale }>({
        query: HOME_PAGE_QUERY,
        params: { locale },
    });

    return <Hero hero={hero} />;
};

export default HomePage;
