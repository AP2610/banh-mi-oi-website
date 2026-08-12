import { defineDocuments, defineLocations } from 'sanity/presentation';

// Maps each localized website URL to its singleton Sanity document and gives
// editors explicit French/English destinations inside Presentation.
export const presentationResolve = {
    mainDocuments: defineDocuments([
        { route: ['/', '/en'], type: 'homePage' },
        { route: ['/galerie', '/en/gallery'], type: 'galleryPage' },
        { route: ['/menu', '/en/menu'], type: 'menuPage' },
        { route: ['/contact', '/en/contact'], type: 'contactPage' },
    ]),
    locations: {
        homePage: defineLocations({
            locations: [
                { title: 'Accueil (FR)', href: '/' },
                { title: 'Home (EN)', href: '/en' },
            ],
        }),
        galleryPage: defineLocations({
            locations: [
                { title: 'Galerie (FR)', href: '/galerie' },
                { title: 'Gallery (EN)', href: '/en/gallery' },
            ],
        }),
        menuPage: defineLocations({
            locations: [
                { title: 'Menu (FR)', href: '/menu' },
                { title: 'Menu (EN)', href: '/en/menu' },
            ],
        }),
        contactPage: defineLocations({
            locations: [
                { title: 'Contact (FR)', href: '/contact' },
                { title: 'Contact (EN)', href: '/en/contact' },
            ],
        }),
    },
};
