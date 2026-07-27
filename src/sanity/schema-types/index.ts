import { type SchemaTypeDefinition } from 'sanity';

import { accessibleImage } from './custom-types/accessible-image';
import { callToAction, optionalCallToAction } from './custom-types/call-to-action';
import { galleryPage } from './document-types/gallery-page';
import { homePage } from './document-types/homepage';
import { menuPage } from './document-types/menu-page';
import { navigationMenu } from './document-types/navigation-menu';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [accessibleImage, callToAction, optionalCallToAction, galleryPage, homePage, menuPage, navigationMenu],
};
