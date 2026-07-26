import type { StructureResolver } from 'sanity/structure';

const excludedPageTypes = new Set(['homePage', 'media.tag']);

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
                            ...S.documentTypeListItems().filter((listItem) => !excludedPageTypes.has(listItem.getId() ?? '')),
                        ]),
                ),
        ]);
