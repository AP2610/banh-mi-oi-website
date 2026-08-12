import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContactPageContent, type ContactPageData } from '@/components/features/contact-page';
import type { Locale } from '@/i18n/routing';
import { buildPageMetadata, type PageSeoData } from '@/lib/seo';
import { sanityFetch } from '@/sanity/lib/fetch';
import { CONTACT_PAGE_QUERY } from '@/sanity/queries/contact-page';
import { SITE_SETTINGS_QUERY, type PublicSiteSettings } from '@/sanity/queries/site-settings';

type ContactPageProps = {
    params: Promise<{ locale: Locale }>;
};

type ContactDocument = ContactPageData & PageSeoData;

export const generateMetadata = async ({ params }: ContactPageProps): Promise<Metadata> => {
    const { locale } = await params;
    const contactPage = await sanityFetch<ContactDocument | null, { locale: Locale }>({
        query: CONTACT_PAGE_QUERY,
        params: { locale },
        stega: false,
    });

    if (!contactPage) notFound();

    return buildPageMetadata({
        page: 'contact',
        locale,
        fallbackTitle: contactPage.title,
        fallbackDescription: contactPage.subtitle ?? contactPage.title,
        fallbackImage: contactPage.image,
        seo: contactPage.seo,
    });
};

const ContactPage = async ({ params }: ContactPageProps) => {
    const { locale } = await params;
    const [contactPage, settings] = await Promise.all([
        sanityFetch<ContactDocument | null, { locale: Locale }>({
            query: CONTACT_PAGE_QUERY,
            params: { locale },
        }),
        sanityFetch<PublicSiteSettings | null, { locale: Locale }>({
            query: SITE_SETTINGS_QUERY,
            params: { locale },
        }),
    ]);

    if (!contactPage || !settings) notFound();

    return <ContactPageContent contactPage={contactPage} locale={locale} settings={settings} />;
};

export default ContactPage;
