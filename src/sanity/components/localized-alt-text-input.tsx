import { useId, type ChangeEvent } from 'react';
import { TextInput } from '@sanity/ui';
import { PatchEvent, set, type ArrayOfObjectsInputProps } from 'sanity';

type Locale = 'fr' | 'en';

type LocalizedAltTextValue = {
    _key: string;
    _type: 'internationalizedArrayStringValue';
    language: Locale;
    value?: string;
};

const locales: Array<{ id: Locale; title: string }> = [
    { id: 'fr', title: 'FR' },
    { id: 'en', title: 'EN' },
];

export const LocalizedAltTextInput = (props: ArrayOfObjectsInputProps<LocalizedAltTextValue>) => {
    const inputId = useId();

    const updateValue = (locale: Locale, event: ChangeEvent<HTMLInputElement>) => {
        const currentValue = props.value ?? [];
        const existingIndex = currentValue.findIndex((item) => item.language === locale);
        const nextEntry: LocalizedAltTextValue = {
            _key: existingIndex >= 0 ? currentValue[existingIndex]._key : crypto.randomUUID().replaceAll('-', ''),
            _type: 'internationalizedArrayStringValue',
            language: locale,
            value: event.currentTarget.value,
        };
        const nextValue =
            existingIndex >= 0 ? currentValue.map((item, index) => (index === existingIndex ? nextEntry : item)) : [...currentValue, nextEntry];

        props.onChange(PatchEvent.from(set(nextValue)));
    };

    return (
        <div style={{ display: 'grid', gap: '1rem' }}>
            {locales.map((locale) => {
                const value = props.value?.find((item) => item.language === locale.id)?.value ?? '';
                const id = `${inputId}-${locale.id}`;

                return (
                    <label key={locale.id} htmlFor={id} style={{ display: 'grid', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{locale.title}</span>
                        <TextInput id={id} value={value} readOnly={props.readOnly} onChange={(event) => updateValue(locale.id, event)} />
                    </label>
                );
            })}
        </div>
    );
};
