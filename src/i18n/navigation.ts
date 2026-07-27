import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

type AppDestination = keyof (typeof routing)['pathnames'] | `/#${string}`;

export const getLocalizedHref = (destination: AppDestination) => {
    if (destination === '/' || destination === '/gallery' || destination === '/menu') {
        return destination;
    }

    return {
        pathname: '/' as const,
        hash: destination.slice(2),
    };
};
