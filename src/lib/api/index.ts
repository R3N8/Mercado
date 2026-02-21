import { ProductsResponse, Product } from "../../types/index";

const API_BASE: string = process.env.NEXT_PUBLIC_API_URL || "";

if (!API_BASE) throw new Error("NEXT_PUBLIC_API_URL is not defined in .env.local");

export async function fetchAllProducts(): Promise<ProductsResponse> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json() as Promise<ProductsResponse>;
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");

  const json = await res.json();
  if (!json?.data) throw new Error("Product not found");

  return json.data as Product;
}
