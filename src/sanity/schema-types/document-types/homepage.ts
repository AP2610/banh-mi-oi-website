import { HiOutlineHome } from 'react-icons/hi2';
import { defineArrayMember, defineField, defineType } from 'sanity';

import { optionalCallToAction, requiredFrenchAndEnglishTranslations } from '../validations/validation';

const defaultUberEatsUrl =
    'https://www.ubereats.com/fr-en/store/banh-mi-oi-!/FKNrXgOGSUawAmfw8WORTA?diningMode=DELIVERY&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMk1vbnRlbGJhYW5zdHJhYXQlMjAyNCUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMkNoSUpTWGtfN0xzSnhrY1JTdE0zbWhwYzVOcyUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJnb29nbGVfcGxhY2VzJTIyJTJDJTIybGF0aXR1ZGUlMjIlM0E1Mi4zNzI1NzEwOTk5OTk5OTUlMkMlMjJsb25naXR1ZGUlMjIlM0E0LjkwMzU2NzklN0Q%3D';
const defaultDeliverooUrl = 'https://deliveroo.fr/en/menu/paris/9eme-opera/banh-mi-oi-5-rue-guy-patin';

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
                    type: 'optionalCallToAction',
                    description: 'Optional button displayed below the carousel text. The destination is read-only and fixed to the Gallery page.',
                    initialValue: {
                        url: '/gallery',
                        variant: 'primary',
                    },
                    validation: (rule) => optionalCallToAction(rule, { defaultUrl: '/gallery' }),
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
        defineField({
            name: 'imageSection',
            title: 'Image section',
            type: 'object',
            description: 'A full-screen image displayed on the homepage.',
            options: {
                collapsible: true,
                collapsed: true,
            },
            validation: (rule) => rule.required(),
            fields: [
                defineField({
                    name: 'image',
                    title: 'Image',
                    type: 'accessibleImage',
                    description: 'Choose the image displayed across the full screen and provide alternative text in French and English.',
                    validation: (rule) => rule.required(),
                }),
            ],
        }),
        defineField({
            name: 'story',
            title: 'Our story',
            type: 'object',
            description: 'The story behind Bánh Mì Oi.',
            options: {
                collapsible: true,
                collapsed: true,
            },
            validation: (rule) => rule.required(),
            fieldsets: [
                {
                    name: 'contactUs',
                    title: 'Contact us',
                    description: 'Optional contact text and button displayed beneath the Our Story copy.',
                    options: {
                        collapsible: true,
                        collapsed: true,
                    },
                },
            ],
            fields: [
                defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'internationalizedArrayString',
                    description: 'The heading displayed in the Our Story section.',
                    validation: requiredFrenchAndEnglishTranslations,
                }),
                defineField({
                    name: 'text',
                    title: 'Text',
                    type: 'internationalizedArrayText',
                    description: 'The story text displayed below the heading.',
                    validation: requiredFrenchAndEnglishTranslations,
                }),
                defineField({
                    name: 'image',
                    title: 'Image',
                    type: 'accessibleImage',
                    description: 'Choose the image displayed beside the story and provide alternative text in French and English.',
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: 'contactText',
                    title: 'Contact text',
                    type: 'internationalizedArrayText',
                    description: 'Optional text inviting visitors to contact the restaurant.',
                    fieldset: 'contactUs',
                }),
                defineField({
                    name: 'contactCta',
                    title: 'Contact call to action',
                    type: 'optionalCallToAction',
                    description: 'Optional button displayed with the contact text.',
                    fieldset: 'contactUs',
                    validation: (rule) => optionalCallToAction(rule),
                }),
            ],
        }),
        defineField({
            name: 'order',
            title: 'Order Now',
            type: 'object',
            description: 'Links visitors to the available delivery platforms.',
            options: {
                collapsible: true,
                collapsed: true,
            },
            initialValue: {
                uberEatsUrl: defaultUberEatsUrl,
                deliverooUrl: defaultDeliverooUrl,
            },
            validation: (rule) => rule.required(),
            fields: [
                defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'internationalizedArrayString',
                    description: 'The heading displayed in the Order Now section.',
                    validation: requiredFrenchAndEnglishTranslations,
                }),
                defineField({
                    name: 'subtitle',
                    title: 'Subtitle',
                    type: 'internationalizedArrayText',
                    description: 'Optional supporting text displayed below the heading.',
                }),
                defineField({
                    name: 'uberEatsUrl',
                    title: 'Uber Eats URL',
                    type: 'url',
                    description: 'The destination used by the Uber Eats ordering link.',
                    initialValue: defaultUberEatsUrl,
                    validation: (rule) =>
                        rule.required().uri({
                            scheme: ['http', 'https'],
                        }),
                }),
                defineField({
                    name: 'deliverooUrl',
                    title: 'Deliveroo URL',
                    type: 'url',
                    description: 'The destination used by the Deliveroo ordering link.',
                    initialValue: defaultDeliverooUrl,
                    validation: (rule) =>
                        rule.required().uri({
                            scheme: ['http', 'https'],
                        }),
                }),
                defineField({
                    name: 'image',
                    title: 'Image',
                    type: 'accessibleImage',
                    description: 'Choose the image displayed beside the delivery links and provide alternative text in French and English.',
                    validation: (rule) => rule.required(),
                }),
            ],
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Homepage' }),
    },
});
