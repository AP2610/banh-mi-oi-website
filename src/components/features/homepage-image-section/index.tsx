import Image from 'next/image';

import { buildSanityImageUrl, getCroppedImageDimensions, type SanityContentImage } from '@/sanity/lib/image';
import { Section } from '@/components/layout/section';

export type HomePageImageSectionData = {
    image: SanityContentImage;
};

type HomePageImageSectionProps = {
    section: HomePageImageSectionData;
};

export const HomePageImageSection = ({ section }: HomePageImageSectionProps) => {
    const dimensions = getCroppedImageDimensions(section.image);

    return (
        <div id="image-section" className="overflow-hidden bg-background">
            <Section isFullWidth animateOnScroll>
                <Image
                    src={buildSanityImageUrl(section.image)}
                    alt={section.image.alt}
                    width={dimensions.width}
                    height={dimensions.height}
                    sizes="100vw"
                    placeholder={section.image.lqip ? 'blur' : 'empty'}
                    blurDataURL={section.image.lqip ?? undefined}
                    className="block h-auto w-full"
                />
            </Section>
        </div>
    );
};
