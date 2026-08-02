import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { defineField, defineType } from 'sanity';

import { requiredFrenchAndEnglishTranslations } from '../validations/validation';

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    icon: HiOutlineCog6Tooth,
    fields: [
        defineField({
            name: 'address',
            title: 'Address',
            type: 'object',
            description: 'Optional address details displayed on the Contact page.',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                defineField({
                    name: 'houseNumber',
                    title: 'House number',
                    type: 'string',
                }),
                defineField({
                    name: 'street',
                    title: 'Street',
                    type: 'string',
                }),
                defineField({
                    name: 'city',
                    title: 'City',
                    type: 'string',
                }),
                defineField({
                    name: 'postalCode',
                    title: 'Post code',
                    type: 'string',
                }),
            ],
        }),
        defineField({
            name: 'openingTimes',
            title: 'Opening times',
            type: 'internationalizedArrayText',
            description: 'Displayed in the homepage hero and on the Contact page.',
            validation: requiredFrenchAndEnglishTranslations,
        }),
        defineField({
            name: 'instagramUrl',
            title: 'Instagram URL',
            type: 'url',
            description: 'Used by the Instagram links on the Contact page and in the footer.',
            validation: (rule) =>
                rule.required().uri({
                    scheme: ['http', 'https'],
                }),
        }),
        defineField({
            name: 'contactRecipientEmail',
            title: 'Contact form recipient',
            type: 'string',
            description: 'The email address that receives messages submitted through the Contact page.',
            validation: (rule) => rule.required().email(),
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Site Settings' }),
    },
});
