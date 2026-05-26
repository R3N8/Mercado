"use client";

import { useCart } from "@/context/CartContext";
import { FaMinus } from "react-icons/fa6";
import { CartItem } from "@/types";

export default function DecreaseBtn({ item }: { item: CartItem }) {
  const { decreaseQuantity } = useCart();
  return (
    <button
      type="button"
      aria-label={`Decrease quantity of ${item.title}`}
      onClick={() => decreaseQuantity(item.id)}
      className="p-2 rounded-md cursor-pointer"
      style={{ background: "var(--color-bg)", color: "var(--font-primary)" }}
    >
      <FaMinus />
    </button>
  );
}



                  