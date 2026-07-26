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
            title: 'Hero Section',
            type: 'object',
            description: 'The main introduction shown at the top of the homepage.',
            options: {
                collapsible: true,
                collapsed: true,
            },
            validation: (rule) => rule.required(),
            fieldsets: [
                {
                    name: 'heroText',
                    title: 'Hero text',
                    description: 'Configure the hero title and subtitle. Both fields require French and English content.',
                    options: {
                        collapsible: true,
                        collapsed: true,
                    },
                },
                {
                    name: 'callsToAction',
                    title: 'Calls to action',
                    description: 'Configure both buttons shown in the hero. Both calls to action are required.',
                    options: {
                        collapsible: true,
                        collapsed: true,
                    },
                },
                {
                    name: 'heroImage',
                    title: 'Hero image',
                    description: 'Upload the required hero image and provide alternative text in French and English.',
                    options: {
                        collapsible: true,
                        collapsed: true,
                    },
                },
            ],
            fields: [
                defineField({
                    name: 'heroTitle',
                    title: 'Hero Title',
                    type: 'internationalizedArrayString',
                    description: 'The primary homepage title.',
                    fieldset: 'heroText',
                    validation: requiredFrenchAndEnglishTranslations,
                }),
                defineField({
                    name: 'heroSubtitle',
                    title: 'Hero Subtitle',
                    type: 'internationalizedArrayText',
                    description: 'A short introduction displayed below the heading.',
                    fieldset: 'heroText',
                    validation: requiredFrenchAndEnglishTranslations,
                }),
                defineField({
                    name: 'primaryCta',
                    title: 'Primary call to action',
                    type: 'callToAction',
                    description: 'The first button displayed in the hero.',
                    fieldset: 'callsToAction',
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: 'secondaryCta',
                    title: 'Secondary call to action',
                    type: 'callToAction',
                    description: 'The second button displayed in the hero.',
                    fieldset: 'callsToAction',
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: 'image',
                    title: 'Hero image',
                    type: 'accessibleImage',
                    description: 'Choose the crop and focal point that should remain visible on different screen sizes.',
                    fieldset: 'heroImage',
                    validation: (rule) => rule.required(),
                }),
            ],
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Homepage' }),
    },
});
