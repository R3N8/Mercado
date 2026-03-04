"use client";

import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import SubNav from "@/components/ProductsFilterSortNav";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { Product, ProductFilters } from "@/types";
import { applyProductFilters } from "@/utils/productFilters";

export default function ProductsClientShell({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<ProductFilters>({
    selectedCategories: [],
    showDeals: false,
    sortBy: "none",
  });

  const filteredProducts = applyProductFilters(products, filters);

  return (
      <section className="w-full flex flex-col gap-4 md:gap-8">
        <SearchBar products={products} />

        <SubNav filters={filters} setFilters={setFilters}/>

        <ProductList products={filteredProducts} />

        <Footer />
      </section>
  );
}