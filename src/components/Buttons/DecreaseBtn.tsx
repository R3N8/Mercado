"use client";

import { useCart } from "@/context/CartContext";
import { FaMinus } from "react-icons/fa6";



export default function QuantityBtns({ item }: { item: any }) {
    const { decreaseQuantity } = useCart();
  return (
    <button
    onClick={() => decreaseQuantity(item.id)}
    className="p-2 rounded-md cursor-pointer"
    style={{background: "var(--color-bg)", color: "var(--font-primary)"}}
    >
        <FaMinus />
    </button>
  );
}



                  