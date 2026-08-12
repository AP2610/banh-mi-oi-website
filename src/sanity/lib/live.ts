import { defineLive } from 'next-sanity/live';
import { client } from './client';

// This server-only token lets preview queries read drafts. next-sanity only
// shares it with the browser while Draft Mode is active.
const readToken = process.env.SANITY_API_READ_TOKEN;

// liveSanityFetch selects published content normally and draft content in
// Draft Mode. SanityLive listens for content changes and refreshes affected
// queries so edits appear in Presentation without a manual page reload.
export const { sanityFetch: liveSanityFetch, SanityLive } = defineLive({
    client,
    serverToken: readToken,
    browserToken: readToken,
});
