import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

import { dataset, projectId } from '../env';

export type SanityImageData = Readonly<{
    assetId: string;
    width: number;
    height: number;
    crop?: Readonly<{
        top: number;
        right: number;
        bottom: number;
        left: number;
    }> | null;
    hotspot?: Readonly<{
        x: number;
        y: number;
        width: number;
        height: number;
    }> | null;
}>;

export type SanityContentImage = SanityImageData &
    Readonly<{
        lqip: string | null;
        alt: string;
    }>;

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
    return builder.image(source);
};

const toImageSource = (image: SanityImageData): SanityImageSource => ({
    asset: { _ref: image.assetId },
    ...(image.crop ? { crop: { _type: 'sanity.imageCrop', ...image.crop } } : {}),
    ...(image.hotspot ? { hotspot: { _type: 'sanity.imageHotspot', ...image.hotspot } } : {}),
});

export const buildSanityImageUrl = (image: SanityImageData, width?: number, quality?: number): string => {
    let imageBuilder = urlFor(toImageSource(image)).auto('format');

    if (width) imageBuilder = imageBuilder.width(width).fit('max');
    if (quality) imageBuilder = imageBuilder.quality(quality);

    return imageBuilder.url();
};

export const getCroppedImageDimensions = (image: SanityImageData): { width: number; height: number } => {
    const crop = image.crop ?? { top: 0, right: 0, bottom: 0, left: 0 };

    return {
        width: Math.max(1, Math.round(image.width * (1 - crop.left - crop.right))),
        height: Math.max(1, Math.round(image.height * (1 - crop.top - crop.bottom))),
    };
};

const toPercentage = (value: number): number => Math.round(Math.min(100, Math.max(0, value * 100)) * 100) / 100;

export const getSanityImageObjectPosition = (image: SanityImageData): string => {
    if (!image.hotspot) return '50% 50%';

    const crop = image.crop ?? { top: 0, right: 0, bottom: 0, left: 0 };
    const visibleWidth = 1 - crop.left - crop.right;
    const visibleHeight = 1 - crop.top - crop.bottom;
    const x = visibleWidth > 0 ? (image.hotspot.x - crop.left) / visibleWidth : 0.5;
    const y = visibleHeight > 0 ? (image.hotspot.y - crop.top) / visibleHeight : 0.5;

    return `${toPercentage(x)}% ${toPercentage(y)}%`;
};
