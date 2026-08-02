import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContactPageContent, type ContactPageData } from '@/components/features/contact-page';
import type { Locale } from '@/i18n/routing';
import { sanityFetch } from '@/sanity/lib/fetch';
import { CONTACT_PAGE_QUERY } from '@/sanity/queries/contact-page';
import { SITE_SETTINGS_QUERY, type PublicSiteSettings } from '@/sanity/queries/site-settings';

type ContactPageProps = {
    params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({ params }: ContactPageProps): Promise<Metadata> => {
    const { locale } = await params;
    const contactPage = await sanityFetch<ContactPageData | null, { locale: Locale }>({
        query: CONTACT_PAGE_QUERY,
        params: { locale },
    });

    if (!contactPage) notFound();

    return {
        title: `${contactPage.title} | Bánh Mì Oi!`,
        description: contactPage.subtitle ?? contactPage.title,
    };
};

const ContactPage = async ({ params }: ContactPageProps) => {
    const { locale } = await params;
    const [contactPage, settings] = await Promise.all([
        sanityFetch<ContactPageData | null, { locale: Locale }>({
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
