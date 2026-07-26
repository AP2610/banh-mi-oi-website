import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';

import { Carousel, type CarouselImage } from './carousel';

type CarouselCallToAction = {
    label: string;
    url: '/gallery';
    variant: 'primary' | 'secondary';
};

export type HomePageCarousel = {
    title: string;
    subtitle: string | null;
    cta: CarouselCallToAction | null;
    images: CarouselImage[];
};

type HomePageCarouselSectionProps = {
    carousel: HomePageCarousel;
};

export const HomePageCarouselSection = ({ carousel }: HomePageCarouselSectionProps) => (
    <div id="gallery" className="overflow-hidden bg-antique-white text-secondary">
        <Section isFullWidth animateOnScroll paddingTop="large" paddingBottom="large" aria-labelledby="carousel-heading">
            <div className="container mx-auto grid items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16 lg:px-10">
                <div>
                    <Heading level="h2" id="carousel-heading" className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
                        {carousel.title}
                    </Heading>

                    {carousel.subtitle ? <p className="mt-5 max-w-prose text-lg leading-relaxed">{carousel.subtitle}</p> : null}

                    {carousel.cta ? (
                        <Button
                            as={Link}
                            href={carousel.cta.url}
                            variant={carousel.cta.variant}
                            className={cn(
                                'mt-8',
                                carousel.cta.variant === 'secondary' && 'border-secondary text-secondary hover:bg-secondary hover:text-antique-white',
                            )}
                        >
                            {carousel.cta.label}
                        </Button>
                    ) : null}
                </div>

                <Carousel images={carousel.images} />
            </div>
        </Section>
    </div>
);
