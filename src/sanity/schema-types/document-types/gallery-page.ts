import { HiOutlinePhoto } from 'react-icons/hi2';
import { defineArrayMember, defineField, defineType } from 'sanity';

import { accessibleImageFields } from '../custom-types/accessible-image';
import { optionalCallToAction, requiredFrenchAndEnglishTranslations } from '../validations/validation';

export const galleryPage = defineType({
    name: 'galleryPage',
    title: 'Gallery Page',
    type: 'document',
    icon: HiOutlinePhoto,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'internationalizedArrayString',
            description: 'The main heading displayed on the Gallery page.',
            validation: requiredFrenchAndEnglishTranslations,
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'internationalizedArrayText',
            description: 'Supporting text displayed below the Gallery page heading.',
            validation: requiredFrenchAndEnglishTranslations,
        }),
        defineField({
            name: 'cta',
            title: 'Call to action',
            type: 'optionalCallToAction',
            description:
                'Optional button displayed below the Gallery page introduction. When added, its text, destination, and variant are required and editable.',
            validation: (rule) => optionalCallToAction(rule),
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            description:
                'Choose and order the images displayed in the masonry gallery. Use “Select Uploaded Images” to add several existing assets at once.',
            of: [
                defineArrayMember({
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: accessibleImageFields,
                }),
            ],
            options: {
                layout: 'grid',
            },
            validation: (rule) => rule.required().min(1).error('Add at least one image to the Gallery page.'),
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Gallery Page' }),
    },
});
