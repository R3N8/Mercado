export const FILTER_CATEGORY_CONFIG = [
    {
        key: "electronics",
        name: "Electronics",
        tags: ["electronics", "audio", "gaming", "peripherals", "computers"],
    },
    {
        key: "beauty",
        name: "Beauty",
        tags: ["beauty", "perfume", "skin care", "shampoo"],
    },
    {
        key: "clothes",
        name: "Clothes",
        tags: ["fashion", "shoes", "bags", "jewelry", "glasses"]
    },
];

export type CategoryKey = (typeof FILTER_CATEGORY_CONFIG)[number]["key"];