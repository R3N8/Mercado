"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Cart } from "@/features/cart/cart";
import { CartItem } from "@/types";

type CartContextType = {
  cart: Cart;
  version: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart] = useState(() => new Cart()); 
  const [version, setVersion] = useState(0); // expose version

  const refresh = () => setVersion((v) => v + 1);

  const value = {
    cart,
    version, // <-- expose version here
    addToCart: (item: CartItem) => {
      cart.addItem(item);
      refresh();
    },
    removeFromCart: (id: string) => {
      cart.removeItem(id);
      refresh();
    },
    increaseQuantity: (id: string) => {
      cart.increaseQuantity(id);
      refresh();
    },
    decreaseQuantity: (id: string) => {
      cart.decreaseQuantity(id);
      refresh();
    },
    updateQuantity: (id: string, quantity: number) => {
      cart.updateQuantity(id, quantity);
      refresh();
    },
    clearCart: () => {
      cart.clear();
      refresh();
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be inside CartProvider");
  return context;
}