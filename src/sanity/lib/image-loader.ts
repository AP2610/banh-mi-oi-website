import type { ImageLoaderProps } from 'next/image';

const SANITY_IMAGE_HOST = 'cdn.sanity.io';

export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps): string {
    if (!src.startsWith(`https://${SANITY_IMAGE_HOST}/`)) return src;

    const url = new URL(src);

    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality ?? 82));
    url.searchParams.set('fit', 'max');
    url.searchParams.set('auto', 'format');

    return url.toString();
}
