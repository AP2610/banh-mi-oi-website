import type { MetadataRoute } from 'next';

import { getSiteUrl, SITE_URL } from '@/lib/site';

const robots = (): MetadataRoute.Robots => ({
    rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
    },
    sitemap: getSiteUrl('/sitemap.xml'),
    host: SITE_URL.origin,
});

export default robots;
