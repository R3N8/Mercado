"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { FaTrashCan } from "react-icons/fa6";
import { CartItem } from "@/types";

export default function RemoveItemBtn({ item }: { item: CartItem }) {
  const { removeFromCart } = useCart();
  const { showToast } = useToast();

  const handleRemove = () => {
    removeFromCart(item.id);
    showToast(`${item.title} removed from cart`, "error");
  };

  return (
    <button
      type="button"
      aria-label={`Remove ${item.title} from cart`}
      onClick={handleRemove}
      className="p-1.5 rounded-full opacity-80 bg-red-100 text-red-600 hover:scale-105 cursor-pointer transition-transform"
    >
      <FaTrashCan />
    </button>
  );
}