import AsideNav from "@/components/Nav";
import CartPage from "./CartPage";
import BackButton from "@/components/Buttons/BackBtn";
import { BiShoppingBag } from "react-icons/bi";

export default async function Page() {

  return (
    <main className="grid grid-cols-1 md:grid-cols-[minmax(220px,auto)_1fr] md:gap-6 md:p-4">
      <aside>
        <AsideNav />
      </aside>
      <section>
        <article className="flex items-start justify-between p-4">
          <div><BackButton /></div>
          <div>
            <h1 
            className="text-2xl capitalize font-bold" 
            style={{color: "var(--color-primary)", fontFamily: "var(--font-teachers)"}}
            >
              shopping cart
            </h1>
          </div>
          <div><BiShoppingBag className="size-7" style={{ color: "var(--color-primary)" }} /></div>
        </article>
        <article className="mb-44"><CartPage /></article>
      </section>
      
    </main>
  );
}