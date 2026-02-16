export interface DiscountInfo {
  discountedPrice: number;
  discountPercent: number;
  hasDiscount: boolean;
}

/**
 * Calculates discount info for a product
 */
export function calculateDiscount(price: number, discountedPrice: number): DiscountInfo {
  const hasDiscount = price !== discountedPrice;
  const discountPercent = hasDiscount ? Math.round(((price - discountedPrice) / price) * 100) : 0;

  return {
    discountedPrice,
    discountPercent,
    hasDiscount,
  };
}