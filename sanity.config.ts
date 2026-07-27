'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schema } from './src/sanity/schema-types';
import { structure } from './src/sanity/structure';
import { internationalizedArray } from 'sanity-plugin-internationalized-array';
import { imageAssetPickerPlugin } from 'sanity-plugin-image-asset-picker';
import { media } from 'sanity-plugin-media';

const singletonTypes = new Set(['galleryPage', 'homePage', 'menuPage', 'navigationMenu']);

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    document: {
        actions: (previousActions, { schemaType }) =>
            singletonTypes.has(schemaType) ? previousActions.filter(({ action }) => action !== 'duplicate') : previousActions,
        newDocumentOptions: (previousOptions) => previousOptions.filter(({ templateId }) => !singletonTypes.has(templateId)),
    },
    // Add and edit the content schema in the './sanity/schema-types' folder
    schema,
    plugins: [
        structureTool({ structure }),
        // Vision is for querying with GROQ from inside the Studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
        internationalizedArray({
            languages: [
                { id: 'fr', title: 'French' },
                { id: 'en', title: 'English' },
            ],
            defaultLanguages: ['fr', 'en'],
            fieldTypes: ['string', 'text'],
        }),
        imageAssetPickerPlugin(),
        media(),
    ],
});
