export interface Review {
  id: string;
  username: string;
  rating: number;
  description: string;
}

export interface Image {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: Image;
  rating: number;
  tags: string[];
  reviews: Review[];
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
}

export interface CartItem {
  id: string;
  image: Image;
  title: string;
  price: number;
  quantity: number;
  discount?: number;
}

export type CategoryFilter = "electronics" | "beauty" | "clothes";

export type SortOption = "price-low" | "price-high" | "none";

export interface ProductFilters {
  selectedCategories: string[];
  showDeals: boolean;
  sortBy: SortOption;
}