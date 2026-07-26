import { HiOutlineCursorArrowRays } from 'react-icons/hi2';
import { defineField, defineType } from 'sanity';

import { requiredFrenchAndEnglishTranslations } from '../validations/validation';

const destinations = [
    { title: 'Menu page — /menu', value: '/menu' },
    { title: 'Gallery page — /gallery', value: '/gallery' },
    { title: 'Homepage: Hero — /#hero', value: '/#hero' },
    { title: 'Homepage: Our story — /#story', value: '/#story' },
    { title: 'Homepage: Menu — /#menu', value: '/#menu' },
    { title: 'Homepage: Order — /#order', value: '/#order' },
    { title: 'Homepage: Gallery — /#gallery', value: '/#gallery' },
    { title: 'Homepage: Contact — /#contact', value: '/#contact' },
];

export const callToAction = defineType({
    name: 'callToAction',
    title: 'Call to action',
    type: 'object',
    icon: HiOutlineCursorArrowRays,
    fields: [
        defineField({
            name: 'label',
            title: 'Text',
            type: 'internationalizedArrayString',
            description: 'The text displayed inside the button.',
            validation: requiredFrenchAndEnglishTranslations,
        }),
        defineField({
            name: 'url',
            title: 'Destination',
            type: 'string',
            description: 'Page URLs start with “/”. Homepage section URLs start with “/#”.',
            readOnly: ({ path }) => path.includes('carousel'),
            options: {
                list: destinations,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'variant',
            title: 'Variant',
            type: 'string',
            initialValue: 'primary',
            options: {
                list: [
                    { title: 'Primary', value: 'primary' },
                    { title: 'Secondary', value: 'secondary' },
                ],
                layout: 'radio',
            },
            validation: (rule) => rule.required(),
        }),
    ],
});
