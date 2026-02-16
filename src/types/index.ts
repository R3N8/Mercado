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
