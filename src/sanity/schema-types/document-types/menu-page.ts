import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { defineArrayMember, defineField, defineType } from 'sanity';

import { accessibleImageFields } from '../custom-types/accessible-image';
import { requiredFrenchAndEnglishTranslations } from '../validations/validation';

export const menuPage = defineType({
    name: 'menuPage',
    title: 'Menu Page',
    type: 'document',
    icon: HiOutlineClipboardDocumentList,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'internationalizedArrayString',
            description: 'The main heading displayed on the Menu page.',
            validation: requiredFrenchAndEnglishTranslations,
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'internationalizedArrayText',
            description: 'Supporting text displayed below the Menu page heading.',
            validation: requiredFrenchAndEnglishTranslations,
        }),
        defineField({
            name: 'images',
            title: 'Menu images',
            type: 'array',
            description:
                'Choose and order the images displayed on the Menu page. Use “Select Uploaded Images” to add several existing assets at once.',
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
            validation: (rule) => rule.required().min(1).error('Add at least one image to the Menu page.'),
        }),
        defineField({
            name: 'cta',
            title: 'Call to action',
            type: 'callToAction',
            description: 'The required button displayed below the menu images.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'downloadLabel',
            title: 'PDF download label',
            type: 'internationalizedArrayString',
            description:
                'Required text for the menu PDF download link. The PDF is selected automatically using the current-menu-{locale} Media Library tag, with current-menu-fr as the fallback.',
            validation: requiredFrenchAndEnglishTranslations,
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Menu Page' }),
    },
});
