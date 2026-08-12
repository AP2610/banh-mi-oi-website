import { defineQuery } from 'next-sanity';

import { SEO_PROJECTION } from './fragments/seo';

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
    *[_id == "homePage"][0] {
        _id,
        _updatedAt,
        ${SEO_PROJECTION},
        "title": hero.heroTitle[language == $locale][0].value,
        "subtitle": hero.heroSubtitle[language == $locale][0].value,
        "openingTimes": *[_id == "siteSettings"][0].openingTimes[language == $locale][0].value,
        "primaryCta": hero.primaryCta {
            "label": label[language == $locale][0].value,
            url,
            variant
        },
        "secondaryCta": hero.secondaryCta {
            "label": label[language == $locale][0].value,
            url,
            variant
        },
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
        },
        "carousel": carousel {
            "title": title[language == $locale][0].value,
            "subtitle": subtitle[language == $locale][0].value,
            "cta": cta {
                "label": label[language == $locale][0].value,
                "url": "/gallery",
                variant
            },
            "images": images[] {
                _key,
                "assetId": asset->_id,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height,
                "lqip": asset->metadata.lqip,
                "alt": coalesce(asset->altText, "")
            }
        },
        "imageSection": imageSection {
            "image": image {
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
        },
        "story": story {
            "title": title[language == $locale][0].value,
            "text": text[language == $locale][0].value,
            "contactText": contactText[language == $locale][0].value,
            "contactCta": contactCta {
                "label": label[language == $locale][0].value,
                url,
                variant
            },
            "image": image {
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
        },
        "order": order {
            "title": title[language == $locale][0].value,
            "subtitle": subtitle[language == $locale][0].value,
            uberEatsUrl,
            deliverooUrl,
            "image": image {
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
    }
`);
