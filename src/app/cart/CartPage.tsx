"use client";

import DecreaseBtn from "@/components/Buttons/DecreaseBtn";
import IncreaseBtn from "@/components/Buttons/IncreaseBtn";
import RemoveItemBtn from "@/components/Buttons/RemoveItemBtn";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { fetchProductById } from "@/lib/api";
import { calculateDiscount } from "@/utils/priceDiscount";
import PriceSummary from "@/components/PriceSummary";

interface ProductWithQuantity extends Product {
  quantity: number;
}

export default function CartPage() {
  const { cart, version } = useCart();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<ProductWithQuantity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    const fetchProducts = async () => {
      setLoading(true);
      const items = cart.getItems();

      const detailedProducts = await Promise.all(
        items.map(async (item) => {
          try {
            const product = await fetchProductById(item.id);
            return { ...product, quantity: item.quantity };
          } catch {
            return null;
          }
        })
      );

      setProducts(detailedProducts.filter(Boolean) as ProductWithQuantity[]);
      setLoading(false);
    };

    fetchProducts();
  }, [cart, version]);

  if (!mounted) return null;
  if (loading)
    return <p className="text-center mt-4 font-semibold" style={{color: "var(--text-muted)", fontFamily: "var(--font-lato)"}}>Loading...</p>;

  if (products.length === 0)
    return <p className="text-center mt-4 font-semibold" style={{color: "var(--text-muted)", fontFamily: "var(--font-lato)"}}>Your cart is empty.</p>;

  return (
    <div className="p-4 space-y-4">
      {products.map((product) => {
        const discountInfo = calculateDiscount(product.price, product.discountedPrice);

        return (
          <div
            key={product.id}
            className="flex justify-between items-start p-2 rounded-md shadow-md"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <div className="flex items-center gap-4">
              <img
                src={product.image?.url}
                alt={product.image?.alt || product.title}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex flex-col gap-2">
                <p className="font-semibold">{product.title}</p>

                <div className="flex items-center gap-2 text-lg font-bold">
                  {discountInfo.hasDiscount ? (
                    <>
                      <p className="line-through text-gray-400">
                        ${(product.price * product.quantity).toFixed(2)}
                      </p>
                      <p className="ml-2" style={{ color: "var(--text-primary)" }}>
                        ${(discountInfo.discountedPrice * product.quantity).toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p>${(product.price * product.quantity).toFixed(2)}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              <RemoveItemBtn
                item={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  quantity: product.quantity,
                  discount: discountInfo.discountPercent,
                }}
              />

              <div className="flex items-center gap-2">
                <DecreaseBtn
                  item={{
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: product.quantity,
                    discount: discountInfo.discountPercent,
                  }}
                />
                <p className="font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-lato)" }}>
                  {product.quantity}
                </p>
                <IncreaseBtn
                  item={{
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: product.quantity,
                    discount: discountInfo.discountPercent,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      <div>
        <PriceSummary />
      </div>
    </div>
  );
}