"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/index";
import { fetchAllProducts } from "@/utils/api/index";
import ProductCard from "@/components/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts()
      .then(data => setProducts(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
