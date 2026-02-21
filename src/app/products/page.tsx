"use client";

import AsideNav from "@/components/Nav";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import SubNav from "@/components/SubNav";
import { useState } from "react";

export default function Index() {
  // State for selected category
  const [category, setCategory] = useState("default");

  return (
    <main className="grid grid-cols-1 md:grid-cols-[minmax(220px,auto)_1fr] gap-6 p-4 pb-24 md:pb-4">
      {/* Aside will only take as much width as its content */}
      <aside>
        <AsideNav />
      </aside>

      {/* Product list takes remaining space */}
      <section className="w-full flex flex-col gap-12">
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
