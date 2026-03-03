"use client";

import FilterBar from "@/components/ProductsFilterSort/Index";
import Button from "@/components/Buttons/Button"
import { ProductFilters } from "@/types";

interface Props {
  filters: ProductFilters;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
}

export default function SubNav({ filters, setFilters }: Props) {
  const isDefaultActive = filters.selectedCategories.length === 0 && !filters.showDeals;
  const isDealsActive = filters.showDeals;

  return (
    <nav
      className="flex flex-wrap items-center justify-between"
      style={{
        background: "var(--color-bg)",
      }}
    >
      <div>
        <Button
          onClick={() => setFilters({ selectedCategories: [], showDeals: false, sortBy: "none" })}
          active={isDefaultActive}
        >
          default
        </Button>

        <Button
          onClick={() => setFilters({ selectedCategories: [], showDeals: true, sortBy: "none" })}
          active={isDealsActive}
        >
          deals
        </Button>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />
    </nav>
  );
}