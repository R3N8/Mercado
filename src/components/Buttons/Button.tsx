"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export default function Button({ children, onClick, active = false, className = "" }: Props) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer capitalize text-sm px-4 py-2 rounded transition ${className}`}
      style={{
        background: active ? "var(--color-surface)" : "transparent",
        color: active ? "var(--text-primary)" : "var(--text-muted)",
        fontWeight: active ? "bold" : "normal",
        fontFamily: "var(--font-teachers)",
      }}
    >
      {children}
    </button>
  );
}