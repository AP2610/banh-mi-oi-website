import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { defineField, defineType } from 'sanity';

export const seo = defineType({
    name: 'seo',
    title: 'SEO',
    type: 'object',
    icon: HiOutlineMagnifyingGlass,
    fields: [
        defineField({
            name: 'title',
            title: 'Search title',
            type: 'internationalizedArrayString',
            description: 'Optional title shown in search results and browser tabs. The page title is used when this is empty.',
        }),
        defineField({
            name: 'description',
            title: 'Search description',
            type: 'internationalizedArrayText',
            description: 'Optional description shown in search results. The page subtitle is used when this is empty.',
        }),
        defineField({
            name: 'socialImage',
            title: 'Social sharing image',
            type: 'image',
            description: 'Optional image used when the page is shared. Use a 1200 × 630 px image. The main page image is used when this is empty.',
            options: {
                hotspot: true,
            },
        }),
    ],
});

export const seoField = defineField({
    name: 'seo',
    title: 'SEO and social sharing',
    type: 'seo',
    description: 'Optional search and social-sharing overrides. Existing page content supplies the defaults.',
    options: {
        collapsible: true,
        collapsed: true,
    },
});
