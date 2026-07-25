import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

// Loaded automatically by the next-intl plugin configured in next.config.ts.
export default getRequestConfig(async ({ requestLocale }) => {
    const requestedLocale = await requestLocale;
    const locale = hasLocale(routing.locales, requestedLocale) ? requestedLocale : routing.defaultLocale;

    return {
        locale,
        messages: {},
    };
});
