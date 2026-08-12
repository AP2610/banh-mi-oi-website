import { createNavigation } from 'next-intl/navigation';
import { stegaClean } from 'next-sanity';

import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

type AppDestination = keyof (typeof routing)['pathnames'] | `/#${string}`;

export const getLocalizedHref = (destination: AppDestination) => {
    // Remove Presentation's invisible editing markers before routing logic.
    const cleanDestination = stegaClean(destination);

    if (cleanDestination === '/' || cleanDestination === '/gallery' || cleanDestination === '/menu' || cleanDestination === '/contact') {
        return cleanDestination;
    }

    return {
        pathname: '/' as const,
        hash: cleanDestination.slice(2),
    };
};
