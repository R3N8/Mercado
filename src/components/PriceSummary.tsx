"use client";
import { useCart } from '@/context/CartContext';
import CheckoutBtn from '@/components/Buttons/CheckoutBtn';

export default function PriceSummary() {
  const { cart } = useCart();

  return (
        <div className="fixed md:sticky left-0 bottom-0 w-full md:shadow-lg mb-13.5 md:mb-0 z-50">
            <div className=" p-4" style={{background: "var(--color-surface)", borderColor: "var(--text-primary)"}}>
                <div className="flex justify-between mb-2">
                    <h2 className="text-sm font-semibold capitalize" style={{color: "var(--text-muted)", fontFamily: "var(--font-teachers)"}}>subtotal:</h2>
                    <p className="text-sm font-bold" style={{color: "var(--text-primary)", fontFamily: "var(--font-lato)"}}>${cart.getOriginalTotal().toFixed(2)}</p>
                </div>

                <div className="flex justify-between">
                    <h2 className="text-sm font-semibold capitalize" style={{color: "var(--text-muted)", fontFamily: "var(--font-teachers)"}}>discount:</h2>
                    <p className="text-sm font-bold" style={{color: "var(--color-accent)", fontFamily: "var(--font-lato)"}}>- ${cart.getTotalDiscount().toFixed(2)}</p>
                </div>
            </div>
            
            <div className="flex items-center justify-between p-2" style={{background: "var(--color-bg)"}}>
                <div className="flex gap-2 text-sm">
                    <h2 className="text-sm font-semibold capitalize" style={{color: "var(--text-primary)", fontFamily: "var(--font-teachers)"}}>total:</h2>
                    <p className="text-md font-bold" style={{color: "var(--text-primary)", fontFamily: "var(--font-teachers)"}}>${cart.getSubtotal().toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-center"><CheckoutBtn /></div>
            </div>
            
        </div>
    );
}