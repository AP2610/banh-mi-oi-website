import { HiOutlineBars3 } from 'react-icons/hi2';
import { defineArrayMember, defineField, defineType } from 'sanity';

import { destinations } from '../../lib/types';
import { requiredFrenchAndEnglishTranslations } from '../validations/validation';

export const navigationMenu = defineType({
    name: 'navigationMenu',
    title: 'Navigation Menu',
    type: 'document',
    icon: HiOutlineBars3,
    fields: [
        defineField({
            name: 'links',
            title: 'Links',
            type: 'array',
            description: 'Choose which links appear in the site navigation and drag them into the desired order.',
            of: [
                defineArrayMember({
                    name: 'navigationLink',
                    title: 'Navigation link',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'internationalizedArrayString',
                            description: 'The text displayed for this navigation link.',
                            validation: requiredFrenchAndEnglishTranslations,
                        }),
                        defineField({
                            name: 'url',
                            title: 'Destination',
                            type: 'string',
                            description: 'Select the page or homepage section opened by this navigation link.',
                            options: {
                                list: destinations,
                            },
                            validation: (rule) => rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            frenchLabel: 'label.0.value',
                            url: 'url',
                        },
                        prepare: ({ frenchLabel, url }) => ({
                            title: frenchLabel || 'Untitled link',
                            subtitle: url,
                        }),
                    },
                }),
            ],
            validation: (rule) => rule.required().min(1).error('Add at least one link to the Navigation Menu.'),
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Navigation Menu' }),
    },
});
