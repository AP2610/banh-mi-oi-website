import { HiOutlinePhoto } from 'react-icons/hi2';
import { defineField, defineType } from 'sanity';

import { requiredFrenchAndEnglishTranslations } from '../validations/validation';

export const accessibleImage = defineType({
    name: 'accessibleImage',
    title: 'Accessible image',
    type: 'image',
    icon: HiOutlinePhoto,
    options: {
        hotspot: true,
    },
    fields: [
        defineField({
            name: 'alt',
            title: 'Alternative text',
            type: 'internationalizedArrayString',
            description: 'Describe the image for visitors who cannot see it. Do not start with “Image of”. Alt text is required for SEO purposes.',
            validation: requiredFrenchAndEnglishTranslations,
        }),
    ],
});
