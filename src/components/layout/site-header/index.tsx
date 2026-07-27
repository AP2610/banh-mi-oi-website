'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { NavigationMenu } from '@/components/layout/navigation-menu';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import type { NavigationLink } from '@/sanity/queries/navigation-menu';

const HEADER_BACKGROUND_SCROLL_THRESHOLD = 96;

type SiteHeaderProps = {
    links: NavigationLink[];
};

export const SiteHeader = ({ links }: SiteHeaderProps) => {
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const updateBackground = () => setShowBackground(window.scrollY >= HEADER_BACKGROUND_SCROLL_THRESHOLD);

        updateBackground();
        window.addEventListener('scroll', updateBackground, { passive: true });

        return () => window.removeEventListener('scroll', updateBackground);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 isolate z-20 text-white">
            <div
                aria-hidden="true"
                className={cn(
                    'pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-linear-to-b from-black/90 via-black/50 to-transparent transition-opacity duration-500',
                    showBackground ? 'opacity-100' : 'opacity-0',
                )}
            />

            <div className="relative z-10 mx-auto flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
                {/* TODO: Translate this label based on the active locale. */}
                <Link href="/" className="relative z-10 inline-flex items-center" aria-label="Bánh Mì Oi !, accueil">
                    <Image src="/logos/logo-small.svg" width={820} height={448} unoptimized alt="" className="h-14 w-auto sm:h-16" />
                </Link>

                <div className="flex items-center gap-8">
                    <div className="relative z-10">
                        <LanguageSwitcher />
                    </div>

                    <NavigationMenu links={links} />
                </div>
            </div>
        </header>
    );
};
