// /products/page.tsx
import AsideNav from "@/components/Nav";
import ProductsClientShell from "@/components/ProductClientShell";
import { fetchAllProducts } from "@/lib/api";
import { Product } from "@/types";

export default async function ProductsPage() {
  const data = await fetchAllProducts();
  const products: Product[] = data.data;

  return (
    <main className="grid grid-cols-1 md:grid-cols-[minmax(220px,auto)_1fr] gap-6 p-4 pb-24 md:pb-4">
      <aside>
        <AsideNav />
      </aside>
      <ProductsClientShell products={products} />
    </main>
  );
}