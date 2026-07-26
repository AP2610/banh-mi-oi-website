import type { Rule, ValidationError } from 'sanity';

type InternationalizedValue = {
    _key?: string;
    language?: string;
    value?: unknown;
};

type CallToActionValue = {
    label?: unknown;
    url?: unknown;
    variant?: unknown;
};

type OptionalCallToActionOptions = {
    defaultUrl?: string;
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

const hasAnyLocalizedValue = (value: unknown): boolean => {
    if (!Array.isArray(value)) return false;

    return value.some((entry: InternationalizedValue) => typeof entry?.value === 'string' && entry.value.trim().length > 0);
};

const validateCallToActionFields = (value: unknown): true | ValidationError[] => {
    const callToAction = (value ?? {}) as CallToActionValue;
    const errors: ValidationError[] = [];

    if (!hasLocalizedValue(callToAction.label, 'fr')) {
        errors.push({ message: 'French text is required.', path: ['label'] });
    }

    if (!hasLocalizedValue(callToAction.label, 'en')) {
        errors.push({ message: 'An English translation is required.', path: ['label'] });
    }

    if (typeof callToAction.url !== 'string' || callToAction.url.length === 0) {
        errors.push({ message: 'A destination is required.', path: ['url'] });
    }

    if (callToAction.variant !== 'primary' && callToAction.variant !== 'secondary') {
        errors.push({ message: 'A variant is required.', path: ['variant'] });
    }

    return errors.length > 0 ? errors : true;
};

export const optionalCallToAction = (rule: Rule, options: OptionalCallToActionOptions = {}) =>
    rule.custom((value) => {
        const callToAction = (value ?? {}) as CallToActionValue;
        const hasCustomUrl = typeof callToAction.url === 'string' && callToAction.url.length > 0 && callToAction.url !== options.defaultUrl;
        const hasContent = hasAnyLocalizedValue(callToAction.label) || hasCustomUrl;

        if (!hasContent) return true;

        return validateCallToActionFields(value);
    });
