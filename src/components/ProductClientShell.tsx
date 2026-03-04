"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import SubNav from "@/components/ProductsFilterSortNav";
import SearchBar from "@/components/SearchBar";

import { Product, ProductFilters } from "@/types";
import { applyProductFilters } from "@/utils/productFilters";

export default function ProductsClientShell({
  products,
  initialCategories,
  initialSort,
  initialDeals,
}: {
  products: Product[];
  initialCategories: string[];
  initialSort: string;
  initialDeals: boolean
}) {
  const router = useRouter();

  const [filters, setFilters] = useState<ProductFilters>({
    selectedCategories: initialCategories,
    showDeals: initialDeals,
    sortBy: initialSort as ProductFilters["sortBy"],
  });

  const filteredProducts = applyProductFilters(products, filters);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.selectedCategories.length > 0) {
      params.set("categories", filters.selectedCategories.join(","));
    }

    if (filters.sortBy !== "none") {
      params.set("sort", filters.sortBy);
    }

    if (filters.showDeals) {
      params.set("deals", "true");
    }

    const queryString = params.toString();

    router.replace(
      queryString ? `/products?${queryString}` : "/products",
      { scroll: false }
    );
  }, [filters, router]);

  return (
    <section className="w-full flex flex-col gap-4 md:gap-8">
      <SearchBar products={products} />

      <SubNav filters={filters} setFilters={setFilters} />

      <ProductList products={filteredProducts} />

      <Footer />
    </section>
  );
}