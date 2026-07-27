'use client';

import { useEffect, useState } from 'react';

import { getLocalizedHref, Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import type { NavigationLink } from '@/sanity/queries/navigation-menu';

type NavigationMenuProps = {
    links: NavigationLink[];
};

const HAMBURGER_LINE_COLOR_CLASSES = 'bg-orangeade group-hover:bg-sodalite-blue group-focus-visible:bg-sodalite-blue';
const HAMBURGER_POSITION_TRANSITION_CLASSES = 'transition-transform duration-100 ease-in-out';
const HAMBURGER_ROTATION_TRANSITION_CLASSES = 'transition-[background-color,rotate] duration-300 ease-in-out';

export const NavigationMenu = ({ links }: NavigationMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = ({ key }: KeyboardEvent) => {
            if (key === 'Escape') setIsOpen(false);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <>
            <aside
                id="navigation-drawer"
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={cn(
                    'fixed top-0 right-0 z-0 h-svh w-full max-w-md translate-x-full overflow-y-auto bg-orangeade px-8 pt-32 pb-10 shadow-2xl transition-transform duration-500 ease-in-out sm:w-[70vw] sm:px-10',
                    isOpen && 'translate-x-0',
                )}
            >
                {/* TODO: Translate this label based on the active locale. */}
                <nav aria-label="Navigation principale">
                    <ul className="flex flex-col">
                        {links.map((link) => (
                            <li key={link._key} className="border-b border-white/40">
                                <Link
                                    href={getLocalizedHref(link.url)}
                                    tabIndex={isOpen ? undefined : -1}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-5 font-heading text-4xl leading-none font-black uppercase transition-colors hover:text-sodalite-blue focus-visible:text-sodalite-blue"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <button
                type="button"
                aria-controls="navigation-drawer"
                aria-expanded={isOpen}
                // TODO: Translate this label based on the active locale.
                aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                onClick={() => setIsOpen((currentState) => !currentState)}
                className="group relative z-10 inline-flex size-12 cursor-pointer items-center justify-center rounded-full"
            >
                <span
                    aria-hidden="true"
                    className={cn('absolute h-0.5 w-7 -translate-y-2', HAMBURGER_POSITION_TRANSITION_CLASSES, isOpen && 'translate-y-0')}
                >
                    <span
                        className={cn(
                            'block h-full w-full',
                            HAMBURGER_LINE_COLOR_CLASSES,
                            HAMBURGER_ROTATION_TRANSITION_CLASSES,
                            isOpen && 'rotate-45 bg-sodalite-blue',
                        )}
                    />
                </span>

                <span aria-hidden="true" className="absolute h-0.5 w-7">
                    <span
                        className={cn(
                            'block h-full w-full transition-[background-color,opacity] duration-100 ease-in-out',
                            HAMBURGER_LINE_COLOR_CLASSES,
                            isOpen && 'bg-sodalite-blue opacity-0',
                        )}
                    />
                </span>

                <span
                    aria-hidden="true"
                    className={cn('absolute h-0.5 w-7 translate-y-2', HAMBURGER_POSITION_TRANSITION_CLASSES, isOpen && 'translate-y-0')}
                >
                    <span
                        className={cn(
                            'block h-full w-full',
                            HAMBURGER_LINE_COLOR_CLASSES,
                            HAMBURGER_ROTATION_TRANSITION_CLASSES,
                            isOpen && '-rotate-45 bg-sodalite-blue',
                        )}
                    />
                </span>
            </button>
        </>
    );
};
