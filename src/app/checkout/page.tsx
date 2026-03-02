"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { fetchProductById } from "@/lib/api";
import { calculateDiscount } from "@/utils/priceDiscount";
import LogoutBtn from "@/components/Buttons/LogoutBtn";
import ContinueShopBtn from "@/components/Buttons/ContinueShopBtn";

interface ProductWithQuantity extends Product {
  quantity: number;
}

export default function CheckoutPage() {
  const { cart, version, clearCart } = useCart();
  const [products, setProducts] = useState<ProductWithQuantity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkout = async () => {
      setLoading(true);
      const items = cart.getItems();
      const detailedProducts = await Promise.all(
        items.map(async (item) => {
          const product = await fetchProductById(item.id);
          return { ...product, quantity: item.quantity };
        })
      );
      setProducts(detailedProducts);
      clearCart();
      setLoading(false);
    };

    checkout();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading receipt...</p>;
  if (products.length === 0)
    return <p className="text-center mt-4">No products in your cart.</p>;

  const subtotal = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const discount = products.reduce((sum, p) => {
    if (!p.discountedPrice) return sum;
    return sum + (p.price - p.discountedPrice) * p.quantity;
  }, 0);

  const total = subtotal - discount;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <section className="max-w-md mx-auto p-6 shadow-md font-mono" style={{background: "var(--color-surface)", color: "var(--text-primary)"}}>
        <h1 className="text-xl text-center mb-4">Mercado Receipt</h1>
        <div className="border-t border-b py-2">
          {products.map((product) => {
            const discountInfo = calculateDiscount(
              product.price,
              product.discountedPrice
            );
            const price = discountInfo.hasDiscount
              ? discountInfo.discountedPrice * product.quantity
              : product.price * product.quantity;

            return (
              <div
                key={product.id}
                className="flex justify-between mb-2 text-sm"
              >
                <div>
                  <p>{product.title}</p>
                  <p className="text-xs" style={{color: "var(--text-muted)"}}>
                    x{product.quantity} @ $
                    {discountInfo.hasDiscount
                      ? discountInfo.discountedPrice.toFixed(2)
                      : product.price.toFixed(2)}
                  </p>
                </div>
                <p>${price.toFixed(2)}</p>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="border-t mt-4 pt-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            <p>- ${discount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-bold mt-1">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs" style={{color: "var(--text-muted)"}}>
            Thank you for shopping with Mercado!
          </p>
        </div>
      </section>

      <section className="flex items-center justify-around gap-4">
        <LogoutBtn />
        <ContinueShopBtn />
      </section>
    </main>
  );
}