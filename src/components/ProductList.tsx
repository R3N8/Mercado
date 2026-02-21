"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/index";
import { fetchAllProducts } from "@/lib/api/index";
import ProductCard from "@/components/ProductCard";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

type ProductListProps = {
  limit?: number;
  category?: string;
};

// Moved above the component so it's in scope when the useEffect runs
const categories = [
  { name: "Default", key: "default", tags: [] },
  { name: "Electronics", key: "electronics", tags: ["electronics", "audio", "gaming", "peripherals", "computers"] },
  { name: "Beauty", key: "beauty", tags: ["beauty", "perfume", "skin care", "shampoo"] },
  { name: "Clothes", key: "clothes", tags: ["fashion", "shoes", "bags", "jewelry", "glasses"] },
  { name: "Deals", key: "deals", tags: [] },
];



export default function ProductList({ category = "default" }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPageDesktop = 9;
  const productsPerPageMobile = 6;
  const [productsPerPage, setProductsPerPage] = useState(productsPerPageDesktop);

  // Responsive products per page
  useEffect(() => {
    const updateSize = () => {
      setProductsPerPage(window.innerWidth < 768 ? productsPerPageMobile : productsPerPageDesktop);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Fetch products async
  useEffect(() => {
    let isMounted = true;
    fetchAllProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(data.data);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  // Filter products based on category
  const filtered = (() => {
    if (category === "default") {
      return products;
    } else if (category === "deals") {
      return products.filter((p) => p.discountedPrice < p.price);
    } else {
      const cat = categories.find((c) => c.key === category);
      return products.filter((p) => cat?.tags.some((tag) => p.tags.includes(tag)));
    }
  })();

  if (loading) return <p>Loading products...</p>;

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const displayedProducts = filtered.slice(start, start + productsPerPage);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        <button
          key="arrow-left"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 rounded cursor-pointer"
          disabled={currentPage === 1}
          style={{ color: currentPage === 1 ? "var(--text-muted)" : "var(--text-primary)" }}
        >
          <FaLongArrowAltLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className="px-3 py-1 rounded cursor-pointer"
            style={{ color: currentPage === i + 1 ? "var(--text-primary)" : "var(--text-muted)", fontWeight: currentPage === i + 1 ? "bold" : "normal", fontFamily: "var(--font-teachers)" }}
          >
            {i + 1}
          </button>
        ))}
        <button
          key="arrow-right"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 rounded cursor-pointer"
          disabled={currentPage === totalPages}
          style={{ color: currentPage === totalPages ? "var(--text-muted)" : "var(--text-primary)" }}
        >
          <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
}