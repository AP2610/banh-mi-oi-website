import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { HOME_PAGE_QUERY_RESULT } from '@/sanity/sanity.types';
import { buildSanityImageUrl, getCroppedImageDimensions, getSanityImageObjectPosition } from '@/sanity/lib/image';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';

type QueryHero = NonNullable<HOME_PAGE_QUERY_RESULT>;
type QueryImage = NonNullable<QueryHero['image']>;
type QueryCallToAction = NonNullable<QueryHero['primaryCta']>;

type HomePageCallToAction = QueryCallToAction & {
    label: string;
};

export type HomePageHero = Omit<QueryHero, 'title' | 'subtitle' | 'primaryCta' | 'secondaryCta' | 'image'> & {
    title: string;
    subtitle: string;
    primaryCta: HomePageCallToAction | null;
    secondaryCta: HomePageCallToAction | null;
    image: QueryImage & {
        assetId: string;
        alt: string;
        width: number;
        height: number;
    };
};

type HeroProps = {
    hero: HomePageHero;
};

export const Hero = ({ hero }: HeroProps) => {
    const dimensions = getCroppedImageDimensions(hero.image);

    const imageStyle: CSSProperties = {
        objectPosition: getSanityImageObjectPosition(hero.image),
    };

    return (
        <Section isFullWidth id="hero" aria-labelledby="hero-heading" className="relative isolate min-h-svh overflow-hidden bg-black">
            <Image
                src={buildSanityImageUrl(hero.image)}
                sizes="100vw"
                width={dimensions.width}
                height={dimensions.height}
                alt={hero.image.alt}
                preload
                placeholder={hero.image.lqip ? 'blur' : 'empty'}
                blurDataURL={hero.image.lqip ?? undefined}
                className="absolute inset-0 -z-20 h-full w-full object-cover"
                style={imageStyle}
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full bg-black/60 md:w-[70%] md:bg-transparent md:bg-linear-to-r md:from-black/90 md:via-black/60 md:to-transparent"
            />

            <div className="container mx-auto flex min-h-svh items-center px-5 py-16 sm:px-8 md:py-10 lg:px-10">
                <div className="w-full text-center text-white md:w-[70%] md:text-left">
                    <Image
                        src="/logos/logo.svg"
                        width={850}
                        height={252}
                        alt="Bánh Mì Oi!"
                        className="mb-12 h-auto w-full max-w-64 sm:max-w-72 md:max-w-60"
                    />

                    <h1
                        id="hero-heading"
                        className="font-heading text-5xl font-black text-white uppercase sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl"
                    >
                        {hero.title}
                    </h1>

                    <p className="mt-6 text-base font-normal text-pretty lg:text-xl">{hero.subtitle}</p>

                    {hero.primaryCta || hero.secondaryCta ? (
                        <div className="mt-8 flex w-full flex-row gap-3 md:w-[50%] md:justify-start">
                            {hero.primaryCta ? (
                                <Button as={Link} href={hero.primaryCta.url} variant={hero.primaryCta.variant} className="flex-1 px-4">
                                    {hero.primaryCta.label}
                                </Button>
                            ) : null}
                            {hero.secondaryCta ? (
                                <Button as={Link} href={hero.secondaryCta.url} variant={hero.secondaryCta.variant} className="flex-1 px-4">
                                    {hero.secondaryCta.label}
                                </Button>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
        </Section>
    );
};
