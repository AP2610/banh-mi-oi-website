import { type SchemaTypeDefinition } from 'sanity';

import { accessibleImage } from './custom-types/accessible-image';
import { callToAction, optionalCallToAction } from './custom-types/call-to-action';
import { galleryPage } from './document-types/gallery-page';
import { homePage } from './document-types/homepage';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [accessibleImage, callToAction, optionalCallToAction, galleryPage, homePage],
};
