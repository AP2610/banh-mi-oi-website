import { HiOutlineHome } from 'react-icons/hi2';
import { defineField, defineType } from 'sanity';

import { requiredFrenchAndEnglishTranslations } from '../validations/validation';

export const homePage = defineType({
    name: 'homePage',
    title: 'Homepage',
    type: 'document',
    icon: HiOutlineHome,
    fields: [
        defineField({
            name: 'hero',
            title: 'Hero',
            type: 'object',
            description: 'The main introduction shown at the top of the homepage.',
            validation: (rule) => rule.required(),
            fields: [
                defineField({
                    name: 'heroTitle',
                    title: 'Hero Title',
                    type: 'internationalizedArrayString',
                    description: 'The primary homepage title.',
                    validation: requiredFrenchAndEnglishTranslations,
                }),
                defineField({
                    name: 'heroSubtitle',
                    title: 'Hero Subtitle',
                    type: 'internationalizedArrayText',
                    description: 'A short introduction displayed below the heading.',
                    validation: requiredFrenchAndEnglishTranslations,
                }),
                defineField({
                    name: 'primaryCta',
                    title: 'Primary call to action',
                    type: 'callToAction',
                    description: 'The first button displayed in the hero.',
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: 'secondaryCta',
                    title: 'Secondary call to action',
                    type: 'callToAction',
                    description: 'The second button displayed in the hero.',
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: 'image',
                    title: 'Hero image',
                    type: 'accessibleImage',
                    description: 'Choose the crop and focal point that should remain visible on different screen sizes.',
                    validation: (rule) => rule.required(),
                }),
            ],
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Homepage' }),
    },
});
