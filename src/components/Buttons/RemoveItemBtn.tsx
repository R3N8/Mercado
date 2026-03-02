"use client";

import { useCart } from "@/context/CartContext";
import { FaTrashCan } from "react-icons/fa6";

export default function RemoveItemBtn({ item }: { item: any }) {
  const { removeFromCart } = useCart();

  return (
    <button 
    type="button" 
    onClick={() => removeFromCart(item.id)} 
    className="p-1.5 rounded-full opacity-80 bg-red-100 text-red-600 hover:scale-105 cursor-pointer transition-transform">
      <FaTrashCan />
    </button>
  );
}