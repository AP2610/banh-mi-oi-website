import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { buildSanityImageUrl, getCroppedImageDimensions, type SanityContentImage } from '@/sanity/lib/image';

import { GalleryAlbum, type GalleryPhoto } from './album';

type GalleryCallToAction = {
    label: string;
    url: '/menu' | '/gallery' | '/#hero' | '/#story' | '/#menu' | '/#order' | '/#gallery' | '/#contact';
    variant: 'primary' | 'secondary';
};

export type GalleryImage = SanityContentImage & {
    _key: string;
};

export type GalleryPageData = {
    _id: string;
    title: string;
    subtitle: string;
    cta: GalleryCallToAction | null;
    images: GalleryImage[];
};

type GalleryProps = {
    gallery: GalleryPageData;
    locale: Locale;
};

const responsiveWidths = [480, 768, 1024, 1440, 1920, 2560];

const toGalleryPhoto = (image: GalleryImage): GalleryPhoto => {
    const dimensions = getCroppedImageDimensions(image);
    const widths = responsiveWidths.filter((width) => width < dimensions.width).concat(dimensions.width);

    return {
        key: image._key,
        src: buildSanityImageUrl(image),
        width: dimensions.width,
        height: dimensions.height,
        alt: image.alt,
        label: image.alt,
        blurDataURL: image.lqip ?? undefined,
        srcSet: widths.map((width) => ({
            src: buildSanityImageUrl(image, width),
            width,
            height: Math.round((width / dimensions.width) * dimensions.height),
        })),
    };
};

export const Gallery = ({ gallery, locale }: GalleryProps) => {
    const photos = gallery.images.map(toGalleryPhoto);

    return (
        <div className="bg-background text-foreground">
            <div className="bg-secondary text-white">
                <Section isFullWidth animateOnScroll paddingTop="large" paddingBottom="large" aria-labelledby="gallery-page-heading">
                    <div className="container mx-auto px-5 sm:px-8 lg:px-10">
                        <Heading level="h1" id="gallery-page-heading" className="text-white">
                            {gallery.title}
                        </Heading>
                        <p className="mt-5 max-w-2xl text-lg leading-relaxed">{gallery.subtitle}</p>

                        {gallery.cta ? (
                            <Button as={Link} href={gallery.cta.url} variant={gallery.cta.variant} className="mt-8">
                                {gallery.cta.label}
                            </Button>
                        ) : null}
                    </div>
                </Section>
            </div>

            <Section
                isFullWidth
                animateOnScroll
                paddingTop="large"
                paddingBottom="large"
                aria-label={locale === 'fr' ? 'Galerie photos' : 'Photo gallery'}
            >
                <div className="container mx-auto px-5 sm:px-8 lg:px-10">
                    <GalleryAlbum locale={locale} photos={photos} />
                </div>
            </Section>
        </div>
    );
};
