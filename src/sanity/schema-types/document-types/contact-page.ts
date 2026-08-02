import { HiOutlineEnvelope } from 'react-icons/hi2';
import { defineField, defineType } from 'sanity';

import { requiredFrenchAndEnglishTranslations } from '../validations/validation';

export const contactPage = defineType({
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    icon: HiOutlineEnvelope,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'internationalizedArrayString',
            description: 'The main heading displayed on the Contact page.',
            validation: requiredFrenchAndEnglishTranslations,
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'internationalizedArrayText',
            description: 'Optional supporting text displayed below the Contact page heading.',
        }),
        defineField({
            name: 'submitLabel',
            title: 'Submit button text',
            type: 'internationalizedArrayString',
            description: 'The required text displayed inside the contact form submit button.',
            validation: requiredFrenchAndEnglishTranslations,
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'accessibleImage',
            description: 'The required image displayed behind the contact details in the left column.',
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Contact Page' }),
    },
});
