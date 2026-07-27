import { defineQuery } from 'next-sanity';

import type { Destination } from '../lib/types';

export type NavigationLink = {
    _key: string;
    label: string;
    url: Destination;
};

export type NavigationMenuData = {
    links: NavigationLink[];
};

export const NAVIGATION_MENU_QUERY = defineQuery(/* groq */ `
    *[_id == "navigationMenu"][0] {
        "links": links[] {
            _key,
            "label": label[language == $locale][0].value,
            url
        }
    }
`);
