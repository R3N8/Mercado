"use client";

import AsideNav from "@/components/Nav";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import SubNav from "@/components/ProductsFilterSortNav";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
import { fetchAllProducts } from "@/lib/api";
import { Product } from "@/types";
import { applyProductFilters } from "@/utils/productFilters";
import { ProductFilters } from "@/types";

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({
    selectedCategories: [],
    showDeals: false,
    sortBy: "none",
  });

  useEffect(() => {
    fetchAllProducts().then((data) => setProducts(data.data));
  }, []);

  // All filtering happens here
  const filteredProducts = applyProductFilters(products, filters);

  return (
    <main className="grid grid-cols-1 md:grid-cols-[minmax(220px,auto)_1fr] gap-6 p-4 pb-24 md:pb-4">
      <aside>
        <AsideNav />
      </aside>

      <section className="w-full flex flex-col gap-4 md:gap-8">
        <SearchBar products={products} />

        <SubNav filters={filters} setFilters={setFilters}/>

        <ProductList products={filteredProducts} />

        <Footer />
      </section>
    </main>
  );
}