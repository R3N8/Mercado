import AsideNav from "@/components/Nav";
import ProductPage from "./ProductPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="grid grid-cols-1 md:grid-cols-[minmax(220px,auto)_1fr] md:gap-6 md:p-4">
      <aside>
        <AsideNav />
      </aside>
      <article><ProductPage id={id} /></article>
    </main>
  );
}