import type { QueryParams } from 'next-sanity';

import { client } from './client';

type SanityFetchOptions<Params extends QueryParams> = {
    query: string;
    params?: Params;
};

export const sanityFetch = <Result, Params extends QueryParams = QueryParams>({ query, params }: SanityFetchOptions<Params>): Promise<Result> =>
    params === undefined ? client.fetch<Result>(query) : client.fetch<Result>(query, params);
