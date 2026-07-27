import { HiOutlineCursorArrowRays } from 'react-icons/hi2';
import { defineField, defineType } from 'sanity';

import { destinations } from '../../lib/types';
import { requiredFrenchAndEnglishTranslations } from '../validations/validation';

const createCallToActionFields = (isRequired: boolean) => [
    defineField({
        name: 'label',
        title: 'Text',
        type: 'internationalizedArrayString',
        description: 'The text displayed inside the button.',
        validation: isRequired ? requiredFrenchAndEnglishTranslations : undefined,
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
        validation: isRequired ? (rule) => rule.required() : undefined,
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
                { title: 'Inverse', value: 'inverse' },
            ],
            layout: 'radio',
        },
        validation: isRequired ? (rule) => rule.required() : undefined,
    }),
];

export const callToAction = defineType({
    name: 'callToAction',
    title: 'Call to action',
    type: 'object',
    icon: HiOutlineCursorArrowRays,
    fields: createCallToActionFields(true),
});

export const optionalCallToAction = defineType({
    name: 'optionalCallToAction',
    title: 'Optional call to action',
    type: 'object',
    icon: HiOutlineCursorArrowRays,
    fields: createCallToActionFields(false),
});
