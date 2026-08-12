'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schema } from './src/sanity/schema-types';
import { presentationResolve } from './src/sanity/presentation/resolve';
import { structure } from './src/sanity/structure';
import { internationalizedArray } from 'sanity-plugin-internationalized-array';
import { imageAssetPickerPlugin } from 'sanity-plugin-image-asset-picker';
import { media } from 'sanity-plugin-media';

const singletonTypes = new Set(['contactPage', 'galleryPage', 'homePage', 'menuPage', 'navigationMenu', 'siteSettings']);

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
        // Embeds the website in Presentation. These routes toggle the private
        // Draft Mode cookie before and after an editor previews unpublished work.
        presentationTool({
            previewUrl: {
                initial: '/',
                previewMode: {
                    enable: '/api/draft-mode/enable',
                    disable: '/api/draft-mode/disable',
                },
            },
            resolve: presentationResolve,
        }),
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
