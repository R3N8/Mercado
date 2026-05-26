"use client";

import { useCart } from "@/context/CartContext";
import { FaPlus } from "react-icons/fa6";
import { CartItem } from "@/types";

export default function IncreaseBtn({ item }: { item: CartItem }) {
  const { increaseQuantity } = useCart();
  return (
    <button
      type="button"
      aria-label={`Increase quantity of ${item.title}`}
      onClick={() => increaseQuantity(item.id)}
      className="p-2 rounded-md cursor-pointer"
      style={{ background: "var(--color-bg)", color: "var(--font-primary)" }}
    >
      <FaPlus />
    </button>
  );
}



                  