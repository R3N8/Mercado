"use client";

import { BiShoppingBag } from "react-icons/bi";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Image } from "@/types";

interface Props {
  id: string;
  image: Image;
  title: string;
  price: number;
  discount?: number;
}

export default function AddToCartButton({
  id,
  image,
  title,
  price,
  discount,
}: Props) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAdd = () => {
    addToCart({
      id,
      image: image ?? { url: "", alt: "" },
      title,
      price,
      quantity: 1,
      discount: discount ?? 0,
    });
    showToast(`${title} added to cart`, "success");
  };

  return (
    <button
      type="button"
      aria-label={`Add ${title} to cart`}
      onClick={handleAdd}
      className="w-2/3 flex items-center justify-center gap-2 p-2 text-lg capitalize rounded-md hover:scale-105 cursor-pointer transition-transform"
      style={{ background: "var(--text-primary)", color: "var(--color-surface)", fontFamily: "var(--font-teachers)" }}
    >
      <BiShoppingBag /> Add to Cart
    </button>
  );
}