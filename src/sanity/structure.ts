import type { StructureResolver } from 'sanity/structure';

const excludedPageTypes = new Set(['contactPage', 'galleryPage', 'homePage', 'menuPage', 'navigationMenu', 'siteSettings', 'media.tag']);

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .id('pages')
                .title('Pages')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .id('homePage')
                                .title('Homepage')
                                .schemaType('homePage')
                                .child(S.document().schemaType('homePage').documentId('homePage').title('Homepage')),
                            S.listItem()
                                .id('galleryPage')
                                .title('Gallery Page')
                                .schemaType('galleryPage')
                                .child(S.document().schemaType('galleryPage').documentId('galleryPage').title('Gallery Page')),
                            S.listItem()
                                .id('menuPage')
                                .title('Menu Page')
                                .schemaType('menuPage')
                                .child(S.document().schemaType('menuPage').documentId('menuPage').title('Menu Page')),
                            S.listItem()
                                .id('contactPage')
                                .title('Contact Page')
                                .schemaType('contactPage')
                                .child(S.document().schemaType('contactPage').documentId('contactPage').title('Contact Page')),
                            ...S.documentTypeListItems().filter((listItem) => !excludedPageTypes.has(listItem.getId() ?? '')),
                        ]),
                ),
            S.listItem()
                .id('navigationMenu')
                .title('Navigation Menu')
                .schemaType('navigationMenu')
                .child(S.document().schemaType('navigationMenu').documentId('navigationMenu').title('Navigation Menu')),
            S.listItem()
                .id('siteSettings')
                .title('Site Settings')
                .schemaType('siteSettings')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')),
        ]);
