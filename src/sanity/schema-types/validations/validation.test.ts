import { describe, expect, it } from 'vitest';

import { hasLocalizedValue } from './validation';

describe('hasLocalizedValue', () => {
    it('recognizes populated internationalized-array v5 entries by their language field', () => {
        const translations = [
            { _key: 'random-fr-key', _type: 'internationalizedArrayStringValue', language: 'fr', value: 'Texte français' },
            { _key: 'random-en-key', _type: 'internationalizedArrayStringValue', language: 'en', value: 'English text' },
        ];

        expect(hasLocalizedValue(translations, 'fr')).toBe(true);
        expect(hasLocalizedValue(translations, 'en')).toBe(true);
    });

    it('rejects an empty translation', () => {
        const translations = [{ _key: 'random-en-key', language: 'en', value: '   ' }];

        expect(hasLocalizedValue(translations, 'en')).toBe(false);
    });

    it('supports older entries that stored the locale in _key', () => {
        const translations = [{ _key: 'fr', value: 'Texte français' }];

        expect(hasLocalizedValue(translations, 'fr')).toBe(true);
    });
});
