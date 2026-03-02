"use client";

import Link from "next/link";
import { FiLogOut } from "react-icons/fi";


export default function LogoutBtn() {
  return (
    <Link href="/">
        <button
        className="flex items-center gap-2 w-full border-2 p-2 text-lg capitalize font-bold rounded-sm hover:scale-105 cursor-pointer transition-transform"
        style={{ background: "var(--color-bg)", color: "var(--text-muted)", borderColor: "var(--text-muted)", fontFamily: "var(--font-teachers)" }}
        >
            <FiLogOut /> logout
        </button>
    </Link>
  );
}