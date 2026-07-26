import { HiOutlineHome } from 'react-icons/hi2';
import { defineArrayMember, defineField, defineType } from 'sanity';

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
        defineField({
            name: 'carousel',
            title: 'Carousel',
            type: 'object',
            description: 'The homepage gallery preview.',
            options: {
                collapsible: true,
                collapsed: true,
            },
            validation: (rule) => rule.required(),
            fields: [
                defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'internationalizedArrayString',
                    description: 'The heading displayed beside the carousel.',
                    validation: requiredFrenchAndEnglishTranslations,
                }),
                defineField({
                    name: 'subtitle',
                    title: 'Subtitle',
                    type: 'internationalizedArrayText',
                    description: 'Optional supporting text displayed below the heading.',
                }),
                defineField({
                    name: 'cta',
                    title: 'Call to action',
                    type: 'callToAction',
                    description: 'Optional button displayed below the carousel text. The destination is read-only and fixed to the Gallery page.',
                    initialValue: {
                        url: '/gallery',
                        variant: 'primary',
                    },
                }),
                defineField({
                    name: 'images',
                    title: 'Images',
                    type: 'array',
                    description: 'Choose and order the images displayed in the carousel.',
                    of: [
                        defineArrayMember({
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        }),
                    ],
                    options: {
                        layout: 'grid',
                    },
                    validation: (rule) => rule.required().min(1).error('Add at least one image to the carousel.'),
                }),
            ],
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Homepage' }),
    },
});
