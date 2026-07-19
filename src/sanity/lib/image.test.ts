import { describe, expect, it } from 'vitest';

import { buildSanityImageUrl, getCroppedImageDimensions, getSanityImageObjectPosition, type SanityImageData } from './image';
import sanityImageLoader from './image-loader';

const image: SanityImageData = {
    assetId: 'image-aac2a90d75e9ec0b598a2759571cee7db4e3c430-2500x1663-jpg',
    width: 2500,
    height: 1663,
    crop: { top: 0.1, right: 0.1, bottom: 0.1, left: 0.1 },
    hotspot: { x: 0.6, y: 0.4, width: 0.25, height: 0.25 },
};

describe('Sanity image presentation', () => {
    it('lets next/image request responsive variants from the Sanity CDN', () => {
        const source = buildSanityImageUrl(image);
        const url = sanityImageLoader({ src: source, width: 768, quality: 82 });

        expect(source).toContain('cdn.sanity.io/images/');
        expect(url).toContain('w=768');
        expect(url).toContain('q=82');
        expect(url).toContain('auto=format');
    });

    it('reserves the dimensions left after the editor crop', () => {
        expect(getCroppedImageDimensions(image)).toEqual({ width: 2000, height: 1330 });
    });

    it('maps the editor hotspot into the visible cropped area', () => {
        expect(getSanityImageObjectPosition(image)).toBe('62.5% 37.5%');
    });
});
