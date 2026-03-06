import { Product, ProductFilters } from "@/types";
import { FILTER_CATEGORY_CONFIG } from "@/lib/config/filterCategories";
import { getSortPrice } from "./priceDiscount";

export function applyProductFilters(
    products: Product[],
    filters: ProductFilters,
): Product[] {
    let result = [...products];

    // filter by deals
    if (filters.showDeals) {
        result = result.filter((p) => p.discountedPrice > 0 && p.discountedPrice < p.price);
    }

    // Filter by selected categories based on tags
    if (filters.selectedCategories.length > 0) {
        result = result.filter((product) => {
            return filters.selectedCategories.some((selectedKey) => {
                const category = FILTER_CATEGORY_CONFIG.find(c => c.key === selectedKey);
                if (!category) return false;

                // Check if product.tags has any of category.tags
                return product.tags?.some(tag => category.tags.includes(tag));
            });
        });
    }

  // sorting
  if (filters.sortBy === "price-low") {
      result.sort((a, b) => getSortPrice(a) - getSortPrice(b));
  }

  if (filters.sortBy === "price-high") {
      result.sort((a, b) => getSortPrice(b) - getSortPrice(a));
  }

  return result;
}