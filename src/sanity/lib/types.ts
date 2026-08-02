export type Destination = '/menu' | '/gallery' | '/contact' | '/#hero' | '/#story' | '/#menu' | '/#order' | '/#gallery';

export const destinations: { title: string; value: Destination }[] = [
    { title: 'Menu page — /menu', value: '/menu' },
    { title: 'Gallery page — /gallery', value: '/gallery' },
    { title: 'Contact page — /contact', value: '/contact' },
    { title: 'Homepage: Hero — /#hero', value: '/#hero' },
    { title: 'Homepage: Our story — /#story', value: '/#story' },
    { title: 'Homepage: Menu — /#menu', value: '/#menu' },
    { title: 'Homepage: Order — /#order', value: '/#order' },
    { title: 'Homepage: Gallery — /#gallery', value: '/#gallery' },
];
