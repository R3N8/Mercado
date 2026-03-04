import AsideNav from "@/components/Nav";
import ProductsClientShell from "@/components/ProductClientShell";
import { fetchAllProducts } from "@/lib/api";
import { Product } from "@/types";

interface Props {
  searchParams: {
    categories?: string;
    sort?: string;
    deals?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const data = await fetchAllProducts();
  const products: Product[] = data.data;

  const initialCategories = searchParams.categories
    ? searchParams.categories.split(",")
    : [];

  const initialSort = searchParams.sort ?? "none";
  const initialDeals = searchParams.deals === "true";

  return (
    <main className="grid grid-cols-1 md:grid-cols-[minmax(220px,auto)_1fr] gap-6 p-4 pb-24 md:pb-4">
      <aside>
        <AsideNav />
      </aside>
      <ProductsClientShell
      products={products} 
      initialCategories={initialCategories} 
      initialSort={initialSort}
      initialDeals={initialDeals} />
    </main>
  );
}