"use client";

import Link from "next/link";



export default function CheckoutBtn() {
  return (
    <Link href="/checkout">
        <button
        className="w-full px-2 py-1.5 text-md capitalize rounded-full hover:scale-105 cursor-pointer transition-transform"
        style={{ background: "var(--text-primary)", color: "var(--color-surface)", fontFamily: "var(--font-teachers)" }}
        >
            place order
        </button>
    </Link>
  );
}