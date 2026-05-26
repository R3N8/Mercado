"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { fetchProductById } from "@/lib/api";
import { calculateDiscount } from "@/utils/priceDiscount";
import LogoutBtn from "@/components/Buttons/LogoutBtn";
import ContinueShopBtn from "@/components/Buttons/ContinueShopBtn";
import { useToast } from "@/context/ToastContext";

interface ProductWithQuantity extends Product {
  quantity: number;
}

export default function CheckoutPage() {
  const { cart, version, clearCart } = useCart();
  const { showToast } = useToast();
  const [products, setProducts] = useState<ProductWithQuantity[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ready" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCheckout = async () => {
      setLoading(true);
      setError(null);

      const items = cart.getItems();
      if (items.length === 0) {
        setProducts([]);
        setStatus("ready");
        setLoading(false);
        return;
      }

      try {
        const detailedProducts = await Promise.all(
          items.map(async (item) => {
            const product = await fetchProductById(item.id);
            return { ...product, quantity: item.quantity };
          })
        );
        setProducts(detailedProducts);
        setStatus("ready");
      } catch (error) {
        console.error(error);
        setError("Unable to load checkout data. Please refresh the page.");
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    loadCheckout();
  }, [cart, version]);

  const handleConfirmPurchase = async () => {
    if (products.length === 0) {
      setError("Your cart is empty. Add products before confirming checkout.");
      setStatus("error");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      clearCart();
      setStatus("success");
      showToast("Purchase complete! Thank you for your order.", "success");
    } catch (error) {
      console.error(error);
      setError("Unable to confirm your order. Please try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const discount = products.reduce((sum, p) => {
    if (!p.discountedPrice) return sum;
    return sum + (p.price - p.discountedPrice) * p.quantity;
  }, 0);

  const total = subtotal - discount;

  if (loading) {
    return <p className="text-center mt-8 font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-lato)" }}>Loading checkout...</p>;
  }

  if (status === "error" && products.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
        <p className="font-semibold" style={{ color: "var(--text-muted)", fontFamily: "var(--font-lato)" }}>
          {error ?? "Your cart is empty. Add items to start checkout."}
        </p>
        <ContinueShopBtn />
      </main>
    );
  }

  if (status === "success") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 text-center">
        <section className="max-w-md w-full p-6 rounded-xl shadow-md" style={{ background: "var(--color-surface)", color: "var(--text-primary)" }}>
          <h1 className="text-2xl font-bold mb-4">Order confirmed</h1>
          <p className="mb-4" style={{ color: "var(--text-muted)", fontFamily: "var(--font-lato)" }}>
            Your order has been placed successfully. Your cart has been cleared and your receipt is ready.
          </p>
          <div className="border-t pt-4 text-left space-y-2">
            <p className="font-semibold">Order total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </section>
        <section className="flex flex-wrap justify-center gap-4">
          <ContinueShopBtn />
          <LogoutBtn />
        </section>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
        <p className="font-semibold" style={{ color: "var(--text-muted)", fontFamily: "var(--font-lato)" }}>
          Your cart is empty. Add products to complete checkout.
        </p>
        <ContinueShopBtn />
      </main>
    );
  }

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