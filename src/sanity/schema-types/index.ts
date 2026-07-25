import { type SchemaTypeDefinition } from 'sanity';

import { accessibleImage } from './custom-types/accessible-image';
import { callToAction } from './custom-types/call-to-action';
import { homePage } from './document-types/homepage';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [accessibleImage, callToAction, homePage],
};
