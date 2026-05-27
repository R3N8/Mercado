"use client";

import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function LogoutBtn() {
  const router = useRouter();
  const { clearCart } = useCart();

  const handleLogout = () => {
    clearCart();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center gap-2 w-full border p-2 capitalize font-bold rounded hover:scale-105 cursor-pointer transition-transform"
      style={{ background: "var(--color-bg)", color: "var(--text-muted)", borderColor: "var(--text-muted)", fontFamily: "var(--font-teachers)" }}
    >
      <FiLogOut /> logout
    </button>
  );
}
