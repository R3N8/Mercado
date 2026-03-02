"use client";

import Link from "next/link";

export default function ContinueShopBtn() {
  return (
    <Link href="/products">
        <button
        className="w-full p-2 text-lg font-semibold capitalize rounded-sm hover:scale-105 cursor-pointer transition-transform"
        style={{ background: "var(--text-primary)", color: "var(--color-surface)", fontFamily: "var(--font-teachers)" }}
        >
            continue shopping
        </button>
    </Link>
  );
}