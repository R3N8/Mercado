"use client";

import { useState, useRef, useEffect } from "react";
import { ProductFilters } from "@/types";
import { HiSelector, HiCheck, HiSortAscending, HiSortDescending } from "react-icons/hi";

interface Props {
  filters: ProductFilters;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
}

export default function SortDropdown({ filters, setFilters }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const sortLabels: Record<ProductFilters["sortBy"], string> = {
    none: "Sort By",
    "price-low": "Price: Low → High",
    "price-high": "Price: High → Low",
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 p-2 text-sm font-medium rounded border transition-all cursor-pointer
          ${open ? "bg-stone-900 text-stone-100 border-stone-900" : "bg-stone-100 text-stone-700 border-stone-100 hover:border-stone-400"}
        `}
      >
        {filters.sortBy === "price-low" ? <HiSortAscending className="w-4 h-4" /> : <HiSortDescending className="w-4 h-4" />}
        {sortLabels[filters.sortBy]}
        <HiSelector className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 z-50 min-w-50 bg-stone-100 border border-stone-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-1.5">
            {(["none", "price-low", "price-high"] as ProductFilters["sortBy"][]).map((val) => {
              const isSelected = filters.sortBy === val;
              return (
                <button
                  key={val}
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, sortBy: val }));
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-3 p-2 rounded-lg text-sm cursor-pointer transition-colors text-left
                    ${isSelected ? "bg-stone-900 text-stone-100" : "text-stone-700 hover:bg-stone-200"}`}
                >
                  <span>{sortLabels[val]}</span>
                  {isSelected && <HiCheck className="w-4 h-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}