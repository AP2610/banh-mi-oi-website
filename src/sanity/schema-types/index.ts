import { type SchemaTypeDefinition } from 'sanity';

import { accessibleImage } from './custom-types/accessible-image';
import { callToAction, optionalCallToAction } from './custom-types/call-to-action';
import { contactPage } from './document-types/contact-page';
import { galleryPage } from './document-types/gallery-page';
import { homePage } from './document-types/homepage';
import { menuPage } from './document-types/menu-page';
import { navigationMenu } from './document-types/navigation-menu';
import { siteSettings } from './document-types/site-settings';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [accessibleImage, callToAction, optionalCallToAction, contactPage, galleryPage, homePage, menuPage, navigationMenu, siteSettings],
};
