import { Hero } from '@/components/features/hero';
import { getHomePageHero } from '@/sanity/content/home-page';

// TODO: Add CTAs and copy to hero schema
const HomePage = async () => {
    const hero = await getHomePageHero('fr');

    return <Hero hero={hero} />;
};

export default HomePage;
