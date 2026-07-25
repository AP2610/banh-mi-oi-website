import { Hero, type HomePageHero } from '@/components/features/hero';
import { sanityFetch } from '@/sanity/lib/fetch';
import { HOME_PAGE_QUERY } from '@/sanity/queries/home-page';

const HomePage = async () => {
    const hero = await sanityFetch<HomePageHero, { locale: 'fr' }>({
        query: HOME_PAGE_QUERY,
        params: { locale: 'fr' },
    });

    return <Hero hero={hero} />;
};

export default HomePage;
