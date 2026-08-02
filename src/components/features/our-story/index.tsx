import Image from 'next/image';

import { Button, type ButtonVariant } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { getLocalizedHref, Link } from '@/i18n/navigation';
import { buildSanityImageUrl, getSanityImageObjectPosition, type SanityContentImage } from '@/sanity/lib/image';
import type { Destination } from '@/sanity/lib/types';
import { Section } from '@/components/layout/section';

export type HomePageStory = {
    title: string;
    text: string;
    contactText: string | null;
    contactCta: {
        label: string;
        url: Destination;
        variant: ButtonVariant;
    } | null;
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

                    {story.contactText ? <p className="mt-8 max-w-prose text-lg leading-relaxed whitespace-pre-line">{story.contactText}</p> : null}

                    {story.contactCta ? (
                        <Button as={Link} href={getLocalizedHref(story.contactCta.url)} variant={story.contactCta.variant} className="mt-6">
                            {story.contactCta.label}
                        </Button>
                    ) : null}
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
