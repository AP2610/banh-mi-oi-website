export const SEO_PROJECTION = /* groq */ `
    "seo": {
        "title": seo.title[language == $locale][0].value,
        "description": seo.description[language == $locale][0].value,
        "socialImage": seo.socialImage {
            "assetId": asset->_id,
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
            }
        }
    }
`;
