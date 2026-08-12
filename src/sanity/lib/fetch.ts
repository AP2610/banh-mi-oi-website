import type { QueryParams } from 'next-sanity';

import { liveSanityFetch } from './live';

type SanityFetchOptions<Params extends QueryParams> = {
    query: string;
    params?: Params;
    // Override the automatic published/draft selection for operational data.
    perspective?: 'published' | 'drafts';
    // Disable invisible editing markers where values are used outside the page.
    stega?: boolean;
};

// Keeps the application's existing data-only API while delegating caching,
// draft selection, editing markers, and live query tags to next-sanity.
export const sanityFetch = async <Result, Params extends QueryParams = QueryParams>({
    query,
    params,
    perspective,
    stega,
}: SanityFetchOptions<Params>): Promise<Result> => {
    const { data } = await liveSanityFetch({ query, params, perspective, stega });

    return data as Result;
};
