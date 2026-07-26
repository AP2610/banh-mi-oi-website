'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MasonryPhotoAlbum, type Photo, type RenderImageContext, type RenderImageProps } from 'react-photo-album';
import 'react-photo-album/masonry.css';
import Lightbox, { type Labels } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import type { Locale } from '@/i18n/routing';

export type GalleryPhoto = Photo & {
    blurDataURL?: string;
};

type GalleryAlbumProps = {
    locale: Locale;
    photos: GalleryPhoto[];
};

const lightboxLabels: Record<Locale, Labels> = {
    fr: {
        Previous: 'Image précédente',
        Next: 'Image suivante',
        Close: 'Fermer',
        Slide: 'Image',
        Carousel: 'Carrousel',
        Lightbox: 'Visionneuse d’images',
        'Photo gallery': 'Galerie photos',
        '{index} of {total}': '{index} sur {total}',
    },
    en: {
        Previous: 'Previous image',
        Next: 'Next image',
        Close: 'Close',
        Slide: 'Image',
        Carousel: 'Carousel',
        Lightbox: 'Image viewer',
        'Photo gallery': 'Photo gallery',
        '{index} of {total}': '{index} of {total}',
    },
};

const renderNextImage = ({ alt = '', title, sizes }: RenderImageProps, { photo, width, height }: RenderImageContext<GalleryPhoto>) => (
    <div className="relative overflow-hidden" style={{ aspectRatio: `${width} / ${height}` }}>
        <Image
            fill
            src={photo.src}
            alt={alt}
            title={title}
            sizes={sizes}
            placeholder={photo.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={photo.blurDataURL}
            className="object-cover transition duration-300 group-hover:scale-[1.03] group-hover:brightness-90"
        />
    </div>
);

export const GalleryAlbum = ({ locale, photos }: GalleryAlbumProps) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <>
            <MasonryPhotoAlbum
                photos={photos}
                columns={(containerWidth) => {
                    if (containerWidth < 640) return 2;
                    if (containerWidth < 1024) return 3;
                    return 4;
                }}
                spacing={(containerWidth) => (containerWidth < 640 ? 8 : 16)}
                breakpoints={[320, 640, 1024, 1440]}
                sizes={{
                    size: '25vw',
                    sizes: [
                        { viewport: '(max-width: 639px)', size: 'calc(50vw - 24px)' },
                        { viewport: '(max-width: 1023px)', size: 'calc(33vw - 32px)' },
                    ],
                }}
                render={{ image: renderNextImage }}
                componentsProps={{
                    button: {
                        className: 'group cursor-zoom-in overflow-hidden focus-visible:z-10',
                    },
                }}
                onClick={({ index }) => setSelectedIndex(index)}
            />

            <Lightbox
                open={selectedIndex >= 0}
                index={selectedIndex}
                close={() => setSelectedIndex(-1)}
                slides={photos}
                labels={lightboxLabels[locale]}
            />
        </>
    );
};
