import Image from 'next/image';

import { ContactForm } from '@/components/features/contact-page/contact-form';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/ui/heading';
import type { Locale } from '@/i18n/routing';
import { buildSanityImageUrl, getSanityImageObjectPosition, type SanityContentImage } from '@/sanity/lib/image';
import type { PublicSiteSettings } from '@/sanity/queries/site-settings';

export type ContactPageData = {
    _id: string;
    title: string;
    subtitle: string | null;
    submitLabel: string;
    image: SanityContentImage;
};

type ContactPageContentProps = {
    contactPage: ContactPageData;
    locale: Locale;
    settings: PublicSiteSettings;
};

export const ContactPageContent = ({ contactPage, locale, settings }: ContactPageContentProps) => {
    const streetLine = [settings.address?.houseNumber, settings.address?.street].filter(Boolean).join(' ');
    const cityLine = [settings.address?.postalCode, settings.address?.city].filter(Boolean).join(' ');

    return (
        <div className="bg-background text-foreground">
            <div className="bg-secondary text-white">
                <Section isFullWidth animateOnScroll paddingTop="large" paddingBottom="large" aria-labelledby="contact-page-heading">
                    <div className="container mx-auto px-5 sm:px-8 lg:px-10">
                        <Heading level="h1" id="contact-page-heading" className="text-white">
                            {contactPage.title}
                        </Heading>

                        {contactPage.subtitle ? <p className="mt-5 max-w-2xl text-lg leading-relaxed">{contactPage.subtitle}</p> : null}
                    </div>
                </Section>
            </div>

            <Section isFullWidth animateOnScroll paddingTop="large" paddingBottom="large">
                <div className="container mx-auto grid gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
                    <div className="relative min-h-128 overflow-hidden rounded-sm lg:min-h-168">
                        <Image
                            src={buildSanityImageUrl(contactPage.image)}
                            alt={contactPage.image.alt}
                            fill
                            sizes="(max-width: 1023px) 100vw, 50vw"
                            placeholder={contactPage.image.lqip ? 'blur' : 'empty'}
                            blurDataURL={contactPage.image.lqip ?? undefined}
                            className="object-cover"
                            style={{ objectPosition: getSanityImageObjectPosition(contactPage.image) }}
                        />
                    </div>

                    <div>
                        <div className="mb-10 space-y-4">
                            {streetLine || cityLine ? (
                                <address className="text-lg leading-relaxed not-italic">
                                    {streetLine ? <div>{streetLine}</div> : null}
                                    {cityLine ? <div>{cityLine}</div> : null}
                                </address>
                            ) : null}

                            <p className="text-lg leading-relaxed whitespace-pre-line">{settings.openingTimes}</p>
                        </div>

                        <ContactForm locale={locale} submitLabel={contactPage.submitLabel} />
                    </div>
                </div>
            </Section>
        </div>
    );
};
