import { defineQuery } from 'next-sanity';

import { SEO_PROJECTION } from './fragments/seo';

export const MENU_PAGE_QUERY = defineQuery(/* groq */ `
    *[_id == "menuPage"][0] {
        _id,
        _updatedAt,
        ${SEO_PROJECTION},
        "title": title[language == $locale][0].value,
        "subtitle": subtitle[language == $locale][0].value,
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
        },
        "cta": cta {
            "label": label[language == $locale][0].value,
            url,
            variant
        },
        "downloadLabel": downloadLabel[language == $locale][0].value,
        "menuPdf": coalesce(
            (
                *[
                    _type == "sanity.fileAsset" &&
                    mimeType == "application/pdf" &&
                    references(*[_type == "media.tag" && name.current == "current-menu-" + $locale][0]._id)
                ] | order(_updatedAt desc)[0] {
                    url,
                    originalFilename
                }
            ),
            (
                *[
                    _type == "sanity.fileAsset" &&
                    mimeType == "application/pdf" &&
                    references(*[_type == "media.tag" && name.current == "current-menu-fr"][0]._id)
                ] | order(_updatedAt desc)[0] {
                    url,
                    originalFilename
                }
            )
        )
    }
`);
