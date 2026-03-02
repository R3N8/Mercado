"use client";

import { useCart } from "@/context/CartContext";
import { FaPlus } from "react-icons/fa6";

export default function QuantityBtns({ item }: { item: any }) {
    const { increaseQuantity } = useCart();
  return (
    <button
    onClick={() => increaseQuantity(item.id)}
    className="p-2 rounded-md cursor-pointer"
    style={{background: "var(--color-bg)", color: "var(--font-primary)"}}
    >
        <FaPlus />
    </button>
  );
}



                  