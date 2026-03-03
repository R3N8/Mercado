"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPageDesktop = 9;
  const productsPerPageMobile = 6;
  const [productsPerPage, setProductsPerPage] = useState(productsPerPageDesktop);

  // Responsive page size
  useEffect(() => {
    const updateSize = () => {
      setProductsPerPage(window.innerWidth < 768 ? productsPerPageMobile : productsPerPageDesktop);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Reset page if products change (IMPORTANT)
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const displayedProducts = products.slice(start, start + productsPerPage);

  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaLongArrowAltLeft />
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{ fontWeight: currentPage === i + 1 ? "bold" : "normal" }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
}