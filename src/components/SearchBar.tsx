"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../types";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  products: Product[];
  placeholder?: string;
}

export default function SearchBar({ products, placeholder }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      return;
    }
    const q = query.toLowerCase();
    setFiltered(
      products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    );
  }, [query, products]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
    ref={inputRef}
    className="relative w-full max-w-md rounded-full"
    style={{ background: "var(--color-surface)" }}
    >
    <FaSearch
        className="absolute left-3 top-1/2 -translate-y-1/2"
        style={{ color: "var(--text-muted)" }}
    />

    <input
        type="text"
        className="w-full border rounded-full px-3 py-2 pl-10 font-bold focus:outline-none focus:ring"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-lato)" }}
        placeholder={placeholder || "search your next item..."}
        value={query}
        onChange={(e) => {
        setQuery(e.target.value);
        setShowResults(true);
        }}
        onFocus={() => setShowResults(true)}
    />

    {showResults && filtered.length > 0 && (
        <div
        className="absolute left-0 top-full z-9999 w-full mt-2 max-h-64 overflow-y-auto rounded-lg shadow-xl border"
        style={{
            background: "var(--color-surface)",
            color: "var(--text-primary)",
        }}
        >
        {filtered.map((product) => (
            <div
            key={product.id}
            className="px-4 py-2 hover:bg-stone-300 cursor-pointer flex items-center gap-2"
            onClick={() => router.push(`/product/${product.id}`)}
            >
            <img
                src={
                typeof product.image === "string"
                    ? product.image
                    : product.image.url
                }
                alt={product.title}
                className="w-16 h-20 object-cover rounded"
            />

            <div>
                <div
                className="font-medium"
                style={{ fontFamily: "var(--font-teachers)" }}
                >
                {product.title}
                </div>

                <div
                className="text-sm font-semibold text-wrap truncate"
                style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-lato)",
                }}
                >
                {product.description}
                </div>
            </div>
            </div>
        ))}
        </div>
    )}
    </div>
  );
};