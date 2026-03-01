"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { fetchProductById } from "@/lib/api";
import { calculateDiscount } from "@/utils/priceDiscount";
import { renderStars } from "@/utils/renderStars";
import { FaUser } from "react-icons/fa";
import BackBtn from "@/components/Buttons/BackBtn";
import { HeartBtn } from "@/components/Buttons/LikeBtn";


export default function ProductPage({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProductById(id)
      .then(setProduct)
      .catch(() => setProduct(null));
  }, [id]);

  if (!product) return <p>Product not found</p>;

  const { discountedPrice, discountPercent, hasDiscount } = calculateDiscount(
    product.price,
    product.discountedPrice
  );

  return (
    <div className="max-w-screen min-h-screen md:p-4 md:rounded-lg" style={{background: "var(--color-surface)"}}>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:items-start md:justify-between">
        <div className="relative w-full aspect-4/3 md:w-full md:aspect-square">
          {/* IMAGE */}
          <img
            src={product.image.url}
            alt={product.image.alt || product.title}
            className="w-full h-full md:rounded-lg object-cover"
          />

          <div>
            <div className="absolute top-2 left-2 md:top-4 md:left-4"><BackBtn /></div>
            <div className="absolute top-2 right-2 md:top-4 md:right-4"><HeartBtn /></div>
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-4 p-2">
          <div className="flex items-center justify-between md:hidden">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span 
                key={tag} 
                className="font-bold text-sm px-2 py-1 rounded z-10"
                style={{background: "var(--color-bg)", color: "var(--text-primary)", fontFamily: "var(--font-lato)"}}
                >{tag}</span>
              ))}
            </div>
            <div>{renderStars(product.rating)}</div>
          </div>
          <h1 
          className="text-3xl font-bold" 
          style={{color: "var(--text-primary)", fontFamily: "var(--font-teachers)"}}
          >{product.title}</h1>
          <div className="hidden md:flex items-center justify-between">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span 
                key={tag} 
                className="font-bold text-sm px-2 py-1 rounded z-10"
                style={{background: "var(--color-bg)", color: "var(--text-primary)", fontFamily: "var(--font-lato)"}}
                >{tag}</span>
              ))}
            </div>
            <div>{renderStars(product.rating)}</div>
          </div>
          <div className="flex items-center gap-3 text-xl font-bold">
            {hasDiscount && <span className="line-through" style={{color: "var(--text-muted)"}}>${product.price.toFixed(2)}</span>}
            <span style={{color: "var(--text-primary)"}}>${discountedPrice.toFixed(2)}</span>
          </div>
          <p className="tracking-wide font-semibold" style={{color: "var(--text-muted)", fontFamily: "var(--font-lato)"}}>{product.description}</p>

          

          <button className="mt-4 bg-black text-white py-3 rounded-lg hover:opacity-80 transition">
            Add to Cart
          </button>

          {/* REVIEWS */}
          <div className="pt-12 pb-24 md:pb-0">
            <h2 className="text-2xl" style={{color: "var(--text-primary)", fontFamily: "var(--font-teachers)"}}>Reviews</h2>
            {product.reviews.length === 0 ? (
              <p className="font-bold text-sm" style={{color: "var(--text-muted)", fontFamily: "var(--font-lato)"}}>No reviews yet.</p>
            ) : (
              product.reviews.map((review) => (
                <div key={review.id} className="p-4 rounded-lg shadow-sm mb-4" style={{background: "var(--color-bg)"}}>
                  <div className="flex justify-between mb-2">
                    <span className="flex items-center justify-center gap-2 font-semibold" style={{color: "var(--text-muted)", fontFamily: "var(--font-teachers)"}}><FaUser /> {review.username}</span>
                    <span>{renderStars(review.rating)}</span>
                  </div>
                  <p className="font-semibold" style={{color: "var(--text-primary)", fontFamily: "var(--font-lato)"}}>{review.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}