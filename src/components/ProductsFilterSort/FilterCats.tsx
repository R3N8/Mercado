"use client";

import { useState, useRef, useEffect } from "react";
import { FILTER_CATEGORY_CONFIG, CategoryKey } from "@/lib/config/filterCategories";
import { ProductFilters } from "@/types";
import { HiOutlineFilter, HiSelector, HiCheck, HiX } from "react-icons/hi";

interface Props {
  filters: ProductFilters;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
}

export default function CategoryFilter({ filters, setFilters }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleCategory = (key: CategoryKey) => {
    setFilters((prev) => {
      const exists = prev.selectedCategories.includes(key);
      return {
        ...prev,
        selectedCategories: exists
          ? prev.selectedCategories.filter((k) => k !== key)
          : [...prev.selectedCategories, key],
      };
    });
  };

  const clearFilters = () => {
    setFilters((prev) => ({ ...prev, selectedCategories: [] }));
  };

  // Close when clicked outside
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
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative inline-block" ref={ref}>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{fontFamily: "var(--font-teachers)"}}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded border transition-all cursor-pointer
            ${open ? "bg-stone-900 text-stone-100 border-stone-900" : "bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-400"}
          `}
        >
          <HiOutlineFilter className="w-4 h-4" />
          Filter
          {filters.selectedCategories.length > 0 && (
            <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${open ? "bg-stone-100 text-stone-900" : "bg-stone-900 text-stone-100"}`}>
              {filters.selectedCategories.length}
            </span>
          )}
          <HiSelector className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute top-full left-0 md:right-0 mt-1.5 z-50 max-w-[90vw] bg-stone-100 border border-stone-200 rounded-xl shadow-lg overflow-hidden cursor-pointer">
            <div className="p-1.5">
              {FILTER_CATEGORY_CONFIG.map((category) => {
                const isSelected = filters.selectedCategories.includes(category.key);
                return (
                  <button
                    key={category.key}
                    onClick={() => toggleCategory(category.key)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left cursor-pointer
                      ${isSelected ? "bg-stone-900 text-stone-100" : "text-stone-700 hover:bg-stone-100"}`}
                  >
                    <span>{category.name}</span>
                    {isSelected && <HiCheck className="w-4 h-4 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Chips */}
      {filters.selectedCategories.map((key) => {
        const label = FILTER_CATEGORY_CONFIG.find((c) => c.key === key)?.name ?? key;
        return (
          <span key={key} className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-700 text-sm rounded-lg cursor-pointer">
            {label}
            <button onClick={() => toggleCategory(key)} className="text-stone-400 hover:text-stone-700 transition-colors cursor-pointer">
              <HiX className="w-4 h-4" />
            </button>
          </span>
        );
      })}

      {/* Clear button */}
      {filters.selectedCategories.length > 0 && (
        <button onClick={clearFilters} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
          <HiX className="w-4 h-4" />
          Clear all
        </button>
      )}
    </div>
  );
}