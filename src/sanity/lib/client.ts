import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
    stega: {
        // Draft queries can encode the source document and field into displayed
        // strings, allowing Presentation overlays to open the matching field.
        studioUrl: '/studio',
    },
});
