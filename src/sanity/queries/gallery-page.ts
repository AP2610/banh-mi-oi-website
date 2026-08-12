import { defineQuery } from 'next-sanity';

import { SEO_PROJECTION } from './fragments/seo';

export const GALLERY_PAGE_QUERY = defineQuery(/* groq */ `
    *[_id == "galleryPage"][0] {
        _id,
        _updatedAt,
        ${SEO_PROJECTION},
        "title": title[language == $locale][0].value,
        "subtitle": subtitle[language == $locale][0].value,
        "cta": cta {
            "label": label[language == $locale][0].value,
            url,
            variant
        },
        "images": images[] {
            _key,
            "assetId": asset->_id,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
            "lqip": asset->metadata.lqip,
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
