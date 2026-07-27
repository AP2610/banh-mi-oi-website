import Image from 'next/image';

import { Section } from '@/components/layout/section';
import { Button, type ButtonVariant } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { getLocalizedHref, Link } from '@/i18n/navigation';
import type { SanityContentImage } from '@/sanity/lib/image';
import { buildSanityImageUrl, getCroppedImageDimensions } from '@/sanity/lib/image';
import type { Destination } from '@/sanity/lib/types';

type MenuCallToAction = {
    label: string;
    url: Destination;
    variant: ButtonVariant;
};

type MenuImage = SanityContentImage & {
    _key: string;
};

type MenuPdf = {
    url: string;
    originalFilename: string;
};

export type MenuPageData = {
    _id: string;
    title: string;
    subtitle: string;
    images: MenuImage[];
    cta: MenuCallToAction;
    downloadLabel: string;
    menuPdf: MenuPdf;
};

type MenuPageContentProps = {
    menu: MenuPageData;
};

export const MenuPageContent = ({ menu }: MenuPageContentProps) => (
    <div className="bg-background text-foreground">
        <Section isFullWidth animateOnScroll paddingTop="large" paddingBottom="medium" aria-labelledby="menu-page-heading">
            <div className="container mx-auto px-5 text-center sm:px-8 lg:px-10">
                <Heading level="h1" id="menu-page-heading">
                    {menu.title}
                </Heading>

                <p className="mx-auto my-5 max-w-2xl text-lg leading-relaxed">{menu.subtitle}</p>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                    <Button as={Link} href={getLocalizedHref(menu.cta.url)} variant={menu.cta.variant}>
                        {menu.cta.label}
                    </Button>

                    <Button as="a" href={`${menu.menuPdf.url}?dl=${encodeURIComponent(menu.menuPdf.originalFilename)}`} variant="secondary">
                        {menu.downloadLabel}
                    </Button>
                </div>
            </div>
        </Section>

        <Section isFullWidth animateOnScroll paddingBottom="large" aria-label="Menu">
            <div className="container mx-auto space-y-8 px-5 sm:px-8 lg:px-10">
                {menu.images.map((image) => {
                    const dimensions = getCroppedImageDimensions(image);

                    return (
                        <Image
                            key={image._key}
                            src={buildSanityImageUrl(image)}
                            alt={image.alt}
                            width={dimensions.width}
                            height={dimensions.height}
                            sizes="(max-width: 1535px) 100vw, 1536px"
                            placeholder={image.lqip ? 'blur' : 'empty'}
                            blurDataURL={image.lqip ?? undefined}
                            className="h-auto w-full"
                        />
                    );
                })}
            </div>
        </Section>
    </div>
);
