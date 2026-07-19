import type { Rule } from 'sanity';

type InternationalizedValue = {
    _key?: string;
    language?: string;
    value?: unknown;
};

export const hasLocalizedValue = (value: unknown, locale: 'fr' | 'en'): boolean => {
    if (!Array.isArray(value)) return false;

    return value.some((entry: InternationalizedValue) => {
        const entryLocale = entry?.language ?? entry?._key;

        return entryLocale === locale && typeof entry.value === 'string' && entry.value.trim().length > 0;
    });
};

export const requiredEnglishTranslation = (rule: Rule) =>
    rule.required().custom((value) => hasLocalizedValue(value, 'en') || 'An English translation is required.');

export const requiredFrenchAndEnglishTranslations = (rule: Rule) =>
    rule.required().custom((value) => {
        if (!hasLocalizedValue(value, 'fr')) return 'French text is required.';
        if (!hasLocalizedValue(value, 'en')) return 'An English translation is required.';

        return true;
    });
