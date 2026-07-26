'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';

import { buildSanityImageUrl } from '@/sanity/lib/image';

export type CarouselImage = {
    _key: string;
    assetId: string;
    width: number;
    height: number;
    lqip: string | null;
    alt: string;
};

type CarouselProps = {
    images: CarouselImage[];
};

export const Carousel = ({ images }: CarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: true,
    });

    return (
        <div className="min-w-0">
            <div ref={emblaRef} className="overflow-visible [clip-path:inset(0_-100vw_0_0)]" aria-roledescription="carousel">
                <div className="-ml-4 flex touch-pan-y">
                    {images.map((image, index) => (
                        <div
                            key={image._key}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${index + 1} / ${images.length}`}
                            className="min-w-0 flex-[0_0_78%] pl-4 sm:flex-[0_0_55%] lg:flex-[0_0_62%] xl:flex-[0_0_48%]"
                        >
                            <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
                                <Image
                                    src={buildSanityImageUrl(image)}
                                    alt={image.alt}
                                    fill
                                    sizes="(max-width: 639px) 78vw, (max-width: 1023px) 55vw, (max-width: 1279px) 38vw, 28vw"
                                    placeholder={image.lqip ? 'blur' : 'empty'}
                                    blurDataURL={image.lqip ?? undefined}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 hidden gap-3 md:flex">
                <button
                    type="button"
                    onClick={() => emblaApi?.scrollPrev()}
                    // TODO: Translate this label when interface translations are added.
                    aria-label="Image précédente"
                    className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-secondary text-secondary transition-colors hover:bg-secondary hover:text-antique-white"
                >
                    <HiArrowLeft aria-hidden="true" />
                </button>

                <button
                    type="button"
                    onClick={() => emblaApi?.scrollNext()}
                    // TODO: Translate this label when interface translations are added.
                    aria-label="Image suivante"
                    className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-secondary text-secondary transition-colors hover:bg-secondary hover:text-antique-white"
                >
                    <HiArrowRight aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};
