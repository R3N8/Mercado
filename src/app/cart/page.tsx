import AsideNav from "@/components/Nav";
export default function Cart() {
  return (
    <div>
      <main>
        <AsideNav />
        <div className="ml-0 md:ml-54 p-4">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          <p>Your cart is currently empty.</p>
        </div>
      </main>
    </div>
  );
}