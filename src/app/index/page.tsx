import AsideNav from "@/components/Nav";
import ProductList from "@/components/ProductList";

export default function Index() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[minmax(220px,auto)_1fr] gap-6 p-4">
      {/* Aside will only take as much width as its content */}
      <aside className="w-full">
        <AsideNav />
      </aside>

      {/* Product list takes remaining space */}
      <section className="w-full">
        <ProductList />
      </section>
    </main>
  );
}
