import Image from 'next/image';

import { Heading } from '@/components/ui/heading';
import { buildSanityImageUrl, getSanityImageObjectPosition, type SanityContentImage } from '@/sanity/lib/image';
import { Section } from '@/components/layout/section';

export type HomePageStory = {
    title: string;
    text: string;
    image: SanityContentImage;
};

type OurStoryProps = {
    story: HomePageStory;
};

export const OurStory = ({ story }: OurStoryProps) => (
    <div id="story" className="overflow-hidden bg-background text-foreground">
        <Section isFullWidth animateOnScroll paddingTop="large" paddingBottom="large" aria-labelledby="story-heading">
            <div className="container mx-auto grid items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
                <div className="lg:order-2">
                    <Heading level="h2" id="story-heading">
                        {story.title}
                    </Heading>

                    <p className="mt-6 max-w-prose text-lg leading-relaxed whitespace-pre-line">{story.text}</p>
                </div>

                <div className="relative aspect-4/5 min-h-0 overflow-hidden lg:order-1">
                    <Image
                        src={buildSanityImageUrl(story.image)}
                        alt={story.image.alt}
                        fill
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        placeholder={story.image.lqip ? 'blur' : 'empty'}
                        blurDataURL={story.image.lqip ?? undefined}
                        className="object-cover"
                        style={{ objectPosition: getSanityImageObjectPosition(story.image) }}
                    />
                </div>
            </div>
        </Section>
    </div>
);
