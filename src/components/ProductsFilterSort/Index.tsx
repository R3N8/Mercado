"use client";

import { ProductFilters } from "@/types";
import CategoryFilter from "@/components/ProductsFilterSort/FilterCats";
import SortDropdown from "@/components/ProductsFilterSort/FilterSort";

interface Props {
  filters: ProductFilters;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
}

export default function FilterBar({ filters, setFilters }: Props) {
  return (
    <div className="flex flex-wrap items-center p-2 gap-2 md:gap-4">
      <SortDropdown filters={filters} setFilters={setFilters} />
      <CategoryFilter filters={filters} setFilters={setFilters} />
    </div>
  );
}