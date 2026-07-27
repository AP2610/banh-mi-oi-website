export type Destination = '/menu' | '/gallery' | '/#hero' | '/#story' | '/#menu' | '/#order' | '/#gallery' | '/#contact';

export const destinations: { title: string; value: Destination }[] = [
    { title: 'Menu page — /menu', value: '/menu' },
    { title: 'Gallery page — /gallery', value: '/gallery' },
    { title: 'Homepage: Hero — /#hero', value: '/#hero' },
    { title: 'Homepage: Our story — /#story', value: '/#story' },
    { title: 'Homepage: Menu — /#menu', value: '/#menu' },
    { title: 'Homepage: Order — /#order', value: '/#order' },
    { title: 'Homepage: Gallery — /#gallery', value: '/#gallery' },
    { title: 'Homepage: Contact — /#contact', value: '/#contact' },
];
