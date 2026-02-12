import { AnimatedArrowBtn } from "@/components/Buttons/CartBtn";

export default function Welcome() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-around">
        <section>
          <h1 className="text-3xl font-bold underline">
            Hello world!
          </h1>
        </section>
        <section className="flex flex-col text-center items-center gap-12">
          <div>
            <h1 className="text-2xl first-letter:uppercase lowercase">
              welcome to <span className="capitalize">Mercaro</span>!
            </h1>
            <p className="first-letter:uppercase lowercase text-lg">discover amazing products and enjoy seamless shopping experience.</p>
          </div>
          <div>
            <AnimatedArrowBtn />
          </div>
        </section>
      </main>
    </div>
  );
}
