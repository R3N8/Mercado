"use client";
 
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
 
export default function ContinueShopBtn() {
  const { clearCart } = useCart();
  const router = useRouter();
 
  const handleClick = () => {
    clearCart();
    router.push("/products");
  };
 
  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full p-2 font-semibold capitalize rounded hover:scale-105 cursor-pointer transition-transform"
      style={{ background: "var(--text-primary)", color: "var(--color-surface)", fontFamily: "var(--font-teachers)" }}
    >
      continue
    </button>
  );
}
