import { defineEnableDraftMode } from 'next-sanity/draft-mode';

import { client } from '@/sanity/lib/client';

// Presentation calls this route before loading the preview. It verifies the
// request with the read-only token, enables Next.js Draft Mode in a cookie,
// and redirects back to the requested page so queries can include drafts.
export const { GET } = defineEnableDraftMode({
    client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN ?? '' }),
});
