"use client";

import CategoryCarousel from "@/components/CatCarousel";
import AsideNav from "@/components/Nav";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaTruckFast, FaArrowRightLong } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "@/lib/api";
import { Product } from "@/types";

export default function Index() {
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
      <section className="w-full flex flex-col gap-12">
        <article>
          <div>
            <SearchBar products={products}/>
          </div>
        </article>

        <article>
          <div>
            <CategoryCarousel />
          </div>
        </article>

        <article>
          <div className="flex flex-col items-start justify-center w-full"> 
            <h1 className="text-2xl lowercase first-letter:uppercase font-bold mb-2 tracking-wider" style={{fontFamily: "var(--font-teachers)", color: "var(--text-secondary)"}}>why shop with us?</h1>

            <div className="flex items-center justify-between md:justify-around w-full">
              <div 
              className="flex flex-col items-center justify-center gap-1 md:gap-2 w-25 h-25 md:w-45 md:h-45 rounded-lg md:rounded-full text-center p-2" 
              style={{background: "var(--color-surface)", color: "var(--text-primary)", borderColor: "var(--text-primary)", fontFamily: "var(--font-lato)"}}
              >
                <FaTruckFast 
                className="text-base md:text-4xl h-15 w-15 p-2 md:rounded-full md:border-2 md:border-dashed" 
                style={{color: "var(--color-accent)"}} 
                />
                <p className="text-xs md:text-sm lowercase first-letter:uppercase">free shipping on orders over $50</p>
              </div>
              <div 
              className="flex flex-col items-center justify-center gap-1 md:gap-2 w-25 h-25 md:w-45 md:h-45 rounded-lg md:rounded-full text-center p-2"
              style={{background: "var(--color-surface)", color: "var(--text-primary)", borderColor: "var(--text-primary)", fontFamily: "var(--font-lato)"}}
              >
                <GiPayMoney 
                className="text-base md:text-4xl h-15 w-15 p-1 md:p-2 md:rounded-full md:border-2 md:border-dashed" 
                style={{color: "var(--color-accent)"}} 
                />
                <p className="text-xs md:text-sm lowercase first-letter:uppercase">30-day money-back guarantee</p>
              </div>
              <div 
              className="flex flex-col items-center justify-center gap-1 md:gap-2 w-25 h-25 md:w-45 md:h-45 rounded-lg md:rounded-full text-center p-2"
              style={{background: "var(--color-surface)", color: "var(--text-primary)", borderColor: "var(--text-primary)", fontFamily: "var(--font-lato)"}}
              >
                <RiSecurePaymentFill 
                className="text-base md:text-4xl h-15 w-15 p-1 md:p-2 md:rounded-full md:border-2 md:border-dashed" 
                style={{color: "var(--color-accent)"}} 
                />
                <p className="text-xs md:text-sm lowercase first-letter:uppercase">secure checkout and payment</p>
              </div>
            </div>
          </div>
        </article>

        <article>
          <div className="flex items-center justify-between w-full mb-2">
            <h1 className="text-2xl capitalize font-bold tracking-wider" style={{fontFamily: "var(--font-teachers)", color: "var(--text-secondary)"}}>featured products</h1>
            <Link href="/products">
              <p className="flex items-center gap-1.5 font-bold hover:underline" style={{fontFamily: "var(--font-teachers)", color: "var(--color-accent)"}}>View all <FaArrowRightLong /></p>
            </Link>
          </div>
          <ProductList />
        </article>

        <article>
          <Footer />
        </article>
      </section>
    </main>
  );
}
