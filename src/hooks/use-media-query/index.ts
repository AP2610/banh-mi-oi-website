'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

export type Breakpoints = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type QueryOrKeyType = Breakpoints | string;

const twBreakpoints: Record<Breakpoints, string> = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
} as const;

const resolveQuery = (queryOrKey: QueryOrKeyType) => {
    if (queryOrKey in twBreakpoints) {
        return twBreakpoints[queryOrKey as Breakpoints];
    }

    // A plain media query string like '(prefers-reduced-motion: reduce)'
    return queryOrKey;
};

/**
 * @function useMediaQuery
 * @description Accepts a breakpoint key or a media query string and returns a boolean for whether it matches or not.
 * The function also subscribes to the media change event so it updates when media changes.
 *
 * @param queryOrKey - Either a breakpoint key or a regular media query string.
 *
 * @example
 *
 * const isMediumScreenOrLarger = useMediaQuery('MD');
 * Returns true when viewport width >= 904px (MD);
 *
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 */
export const useMediaQuery = (queryOrKey: QueryOrKeyType) => {
    const query = useMemo(() => resolveQuery(queryOrKey), [queryOrKey]);

    const subscribeToMediaQuery = useCallback(
        (onStoreChange: () => void) => {
            const media = window.matchMedia(query);

            media.addEventListener('change', onStoreChange);

            return () => {
                media.removeEventListener('change', onStoreChange);
            };
        },
        [query],
    );

    const getCurrentMediaQuery = useCallback(() => {
        return window.matchMedia(query).matches;
    }, [query]);

    // MatchMedia is a browser API, so react considers it an external store. Unlike useEffect, react calls getCurrentMediaQuery during render.
    const matches = useSyncExternalStore(subscribeToMediaQuery, getCurrentMediaQuery, () => false);

    return matches;
};
