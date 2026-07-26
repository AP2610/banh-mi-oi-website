'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

const HEADER_BACKGROUND_SCROLL_THRESHOLD = 96;

// TODO: Implement correct site header and connect to sanity Navigation schema
export const SiteHeader = () => {
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

            <div className="container mx-auto flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
                {/* TODO: Translate this label based on the active locale. */}
                <Link href="/" className="inline-flex items-center" aria-label="Bánh Mì Oi !, accueil">
                    <Image src="/logos/logo-small.svg" width={820} height={448} unoptimized alt="" className="h-14 w-auto sm:h-16" />
                </Link>

                <div className="flex items-center gap-3">
                    {/* TODO: Translate this label and link text based on the active locale. */}
                    <nav aria-label="Navigation principale" className="hidden sm:block">
                        <a
                            href="#hero"
                            aria-current="page"
                            className="inline-flex min-h-11 items-center rounded-full border border-white/70 px-5 font-medium transition-colors hover:bg-white hover:text-sodalite-blue"
                        >
                            Accueil
                        </a>
                    </nav>

                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
};
