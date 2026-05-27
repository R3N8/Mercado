"use client";

import { useEffect, useMemo, useState } from "react";

import ContinueShopBtn from "@/components/Buttons/ContinueShopBtn";
import LogoutBtn from "@/components/Buttons/LogoutBtn";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

import { fetchProductById } from "@/lib/api";

import { Product } from "@/types";

import { calculateDiscount } from "@/utils/priceDiscount";

interface ProductWithQuantity extends Product {
  quantity: number;
}

export default function CheckoutPage() {
  const { cart, version, clearCart } = useCart();
  const { showToast } = useToast();

  const [products, setProducts] = useState<ProductWithQuantity[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCheckout() {
      try {
        setLoading(true);
        setError(null);

        const items = cart.getItems();

        if (!items.length) {
          setProducts([]);
          return;
        }

        const data = await Promise.all(
          items.map(async (item) => {
            const product = await fetchProductById(item.id);

            return {
              ...product,
              quantity: item.quantity,
            };
          })
        );

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load checkout data.");
      } finally {
        setLoading(false);
      }
    }

    loadCheckout();
  }, [cart, version]);

  async function handleConfirmPurchase() {
    if (!products.length) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 400));

      clearCart();
      setPurchaseComplete(true);

      showToast(
        "Purchase complete! Thank you for your order.",
        "success"
      );
    } catch (err) {
      console.error(err);
      setError("Unable to confirm your order.");
    } finally {
      setLoading(false);
    }
  }

  const { subtotal, discount, total } = useMemo(() => {
    const subtotal = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    const discount = products.reduce((sum, product) => {
      if (!product.discountedPrice) return sum;

      return (
        sum +
        (product.price - product.discountedPrice) *
          product.quantity
      );
    }, 0);

    return {
      subtotal,
      discount,
      total: subtotal - discount,
    };
  }, [products]);

  const mutedTextStyle = {
    color: "var(--text-muted)",
    fontFamily: "var(--font-lato)",
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p
          className="font-semibold"
          style={{
            color: "var(--text-primary)",
            fontFamily: "var(--font-lato)",
          }}
        >
          Loading checkout...
        </p>
      </main>
    );
  }

  if (error && !products.length) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
        <p className="font-semibold" style={mutedTextStyle}>
          {error}
        </p>

        <ContinueShopBtn />
      </main>
    );
  }

  if (purchaseComplete) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 text-center">
        <section
          className="max-w-md w-full p-6 rounded-xl shadow-md"
          style={{
            background: "var(--color-surface)",
            color: "var(--text-primary)",
          }}
        >
          <h1 className="text-2xl font-bold mb-4">
            Order confirmed
          </h1>

          <p className="mb-4" style={mutedTextStyle}>
            Your order has been placed successfully.
          </p>

          <div className="border-t pt-4 text-left space-y-2">
            <p className="font-semibold">Order total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </section>

        <section className="flex items-center gap-4">
          <ContinueShopBtn />
          <LogoutBtn />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4">
      <section
        className="max-w-md w-full p-6 shadow-md font-mono"
        style={{
          background: "var(--color-surface)",
          color: "var(--text-primary)",
        }}
      >
        <h1 className="text-xl text-center mb-4">
          Mercado Receipt
        </h1>

        <div className="border-y py-2">
          {products.map((product) => {
            const discountInfo = calculateDiscount(
              product.price,
              product.discountedPrice
            );

            const unitPrice = discountInfo.hasDiscount
              ? discountInfo.discountedPrice
              : product.price;

            const lineTotal =
              unitPrice * product.quantity;

            return (
              <div
                key={product.id}
                className="flex justify-between mb-2 text-sm"
              >
                <div>
                  <p>{product.title}</p>

                  <p
                    className="text-xs"
                    style={mutedTextStyle}
                  >
                    x{product.quantity} @ $
                    {unitPrice.toFixed(2)}
                  </p>
                </div>

                <p>${lineTotal.toFixed(2)}</p>
              </div>
            );
          })}
        </div>

        <div className="border-t mt-4 pt-2 text-sm space-y-1">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p>Discount</p>
            <p>- ${discount.toFixed(2)}</p>
          </div>

          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs" style={mutedTextStyle}>
            Thank you for shopping with Mercado!
          </p>
        </div>
      </section>

      <section className="flex items-center gap-4">
        <LogoutBtn />
        <ContinueShopBtn />
      </section>
    </main>
  );
}