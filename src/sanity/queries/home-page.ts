import { defineQuery } from 'next-sanity';

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
    *[_id == "homePage"][0] {
        _id,
        "title": hero.heroTitle[language == $locale][0].value,
        "subtitle": hero.heroSubtitle[language == $locale][0].value,
        "image": hero.image {
            "assetId": asset->_id,
            "lqip": asset->metadata.lqip,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
            crop {
                top,
                right,
                bottom,
                left
            },
            hotspot {
                x,
                y,
                width,
                height
            },
            "alt": alt[language == $locale][0].value
        }
    }
`);
