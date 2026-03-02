import { CartItem } from "@/types";

export class Cart {
  private products: CartItem[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      if (stored) this.products = JSON.parse(stored);
    }
  }

  private save() {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(this.products));
    }
  }

  /* BASIC CRUD */

  getItems(): CartItem[] {
    return this.products;
  }

  addItem(product: CartItem) {
    const existing = this.products.find((p) => p.id === product.id);

    if (existing) {
      existing.quantity += product.quantity ?? 1;
    } else {
      this.products.push({ ...product });
    }

    this.save();
  }

  increaseQuantity(id: string) {
    const product = this.products.find((p) => p.id === id);
    if (product) product.quantity += 1;
    this.save();
  }

  decreaseQuantity(id: string) {
    const product = this.products.find((p) => p.id === id);
    if (product && product.quantity > 1) product.quantity -= 1;
    this.save();
  }

  updateQuantity(id: string, quantity: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) return;

    if (quantity <= 0) {
      this.removeItem(id);
    } else {
      product.quantity = quantity;
    }

    this.save();
  }

  removeItem(id: string) {
    this.products = this.products.filter((p) => p.id !== id);
    this.save();
  }

  clear() {
    this.products = [];
    this.save();
  }

  /* PRICE CALCULATIONS */

  // Original total before discounts
  getOriginalTotal(): number {
    return this.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  }

  // Discount amount per product
  getProductDiscountAmount(product: CartItem): number {
    const percent = product.discount ?? 0;
    return (product.price * percent / 100) * product.quantity;
  }

  // Discounted subtotal per product
  getProductSubtotal(product: CartItem): number {
    const discountedPrice =
      product.price * (1 - (product.discount ?? 0) / 100);

    return discountedPrice * product.quantity;
  }

  // Total discount across cart
  getTotalDiscount(): number {
    return this.products.reduce(
      (sum, product) => sum + this.getProductDiscountAmount(product),
      0
    );
  }

  // Final subtotal after discounts
  getSubtotal(): number {
    return this.products.reduce(
      (sum, product) => sum + this.getProductSubtotal(product),
      0
    );
  }

  // Total quantity
  getCount(): number {
    return this.products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
  }
}