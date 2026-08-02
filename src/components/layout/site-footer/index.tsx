import Image from 'next/image';

import { InstagramLink } from '@/components/ui/instagram-link';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type SiteFooterProps = {
    instagramUrl?: string;
    locale: Locale;
};

export const SiteFooter = ({ instagramUrl, locale }: SiteFooterProps) => (
    <footer className="bg-sodalite-blue text-white">
        <div className="mx-auto flex items-center justify-between gap-6 px-5 py-8 sm:px-8 lg:px-10">
            <Link href="/">
                <Image src="/logos/logo.svg" width={820} height={448} unoptimized alt="" className="h-12 w-auto shrink-0 sm:h-14" />
            </Link>

            <div className="flex items-center gap-4">
                {instagramUrl ? (
                    <InstagramLink
                        href={instagramUrl}
                        label={locale === 'fr' ? 'Suivez Bánh Mì Oi ! sur Instagram' : 'Follow Bánh Mì Oi! on Instagram'}
                        className="hover:bg-white hover:text-sodalite-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    />
                ) : null}

                <p className="text-right text-sm font-medium sm:text-base">© 2026 Bánh Mì Oi! Paris</p>
            </div>
        </div>
    </footer>
);
