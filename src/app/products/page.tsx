"use client";

import AsideNav from "@/components/Nav";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import SubNav from "@/components/SubNav";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import { fetchAllProducts } from "@/lib/api";
import { Product } from "@/types";

export default function Index() {
  // State for selected category
  const [category, setCategory] = useState("default");
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchAllProducts().then((data) => setProducts(data.data));
  }, []);

  return (
    <main className="grid grid-cols-1 md:grid-cols-[minmax(220px,auto)_1fr] gap-6 p-4 pb-24 md:pb-4">
      {/* Aside will only take as much width as its content */}
      <aside>
        <AsideNav />
      </aside>

      {/* Product list takes remaining space */}
      <section className="w-full flex flex-col gap-4 md:gap-8">
        <article>
          <SearchBar products={products} />
        </article>

        <article>
          <SubNav onSelect={setCategory} />
        </article>
        
        <article>
          <ProductList category={category}/>
        </article>

        <article>
          <Footer />
        </article>
      </section>
    </main>
  );
}
