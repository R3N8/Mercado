"use client";

import { Product } from "../types";
import Link from "next/link";
import Image from "next/image";
import { renderStars } from "@/utils/renderStars";
import { calculateDiscount } from "@/utils/priceDiscount";
import { HeartBtn } from "./Buttons/LikeBtn";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Calculate discount percentage
  const { discountedPrice, discountPercent, hasDiscount } = calculateDiscount(
    product.price,
    product.discountedPrice
  );

  return (
    <div className="group relative rounded-xl shadow hover:shadow-xl hover:scale-[1.03] transition overflow-hidden">

      {/* IMAGE */}
      <div>
        <Link href={`/products/${product.id}`}>
            <div className="relative w-full h-60 md:h-80">
                <Image
                    src={product.image.url}
                    alt={product.image.alt || product.title}
                    fill
                    className="object-cover transition group-hover:brightness-75"
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                    priority
                />
            </div>
        </Link>

        <div>
            {/* DISCOUNT TAG */}
            {hasDiscount && (
            <div className="absolute top-4 left-4 font-bold text-xs px-2 py-1 rounded z-10"
                style={{ background: "var(--color-accent)", color: "var(--color-primary)" }}>
                -{discountPercent}%
            </div>
            )}

            {/* HEART BUTTON */}
            <div className="absolute top-4 right-4 z-10">
                <HeartBtn />
            </div>
        </div>
      </div>

      {/* OVERLAY */}
      <div
        className="
          absolute bottom-0 w-full
          h-17.5 group-hover:h-42.5
          p-4 flex flex-col
          transition-all duration-300
          overflow-hidden
        "
        style={{
          background:
            "linear-gradient(to top, oklch(21.6% 0.006 56.043 / 0.8), oklch(21.6% 0.006 56.043 / 0))",
          color: "var(--color-surface)",
        }}
      >

        {/* EXPANDING CONTENT */}
        <div
          className="
            flex-1 flex flex-col justify-center
            opacity-0 translate-y-4
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all duration-300
            md:flex
          "
        >
          <div className="text-sm">{renderStars(product.rating)}</div>
          <p className="text-sm line-clamp-2" style={{fontFamily: "var(--font-lato)"}}>
            {product.description}
          </p>
        </div>

        {/* HEADER */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 justify-between tracking-widest" style={{fontFamily: "var(--font-teachers)"}}>
          <h2 className="font-bold text-sm md:text-lg truncate">{product.title}</h2>
          {hasDiscount ? (
            <h2 className="font-bold text-sm md:text-lg" style={{ color: "var(--color-accent)" }}>
                ${discountedPrice.toFixed(2)}
            </h2>
            ) : (
            <h2 className="font-bold text-sm md:text-lg">${product.price.toFixed(2)}</h2>
            )}
        </div>
      </div>
    </div>
  );
}