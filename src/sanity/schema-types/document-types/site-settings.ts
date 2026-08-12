import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { defineArrayMember, defineField, defineType } from 'sanity';

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
            name: 'structuredOpeningHours',
            title: 'Opening hours for search engines',
            type: 'array',
            description:
                'Optional machine-readable opening hours used by search engines. Add one entry per schedule, for example “Mo-Fr 11:30-21:30” or “Sa-Su 12:00-22:00”.',
            of: [defineArrayMember({ type: 'string' })],
            validation: (rule) =>
                rule.unique().custom((values) => {
                    if (!values) return true;

                    return values.every(
                        (value) =>
                            typeof value === 'string' && /^(Mo|Tu|We|Th|Fr|Sa|Su)(-(Mo|Tu|We|Th|Fr|Sa|Su))? \d{2}:\d{2}-\d{2}:\d{2}$/.test(value),
                    )
                        ? true
                        : 'Use the format “Mo-Fr 11:30-21:30”.';
                }),
        }),
        defineField({
            name: 'telephone',
            title: 'Telephone number',
            type: 'string',
            description:
                'Optional public telephone number used in restaurant search information. Include the country code, for example +33 1 23 45 67 89.',
        }),
        defineField({
            name: 'priceRange',
            title: 'Price range',
            type: 'string',
            description: 'Optional price indicator used in restaurant search information, for example € or €€.',
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
