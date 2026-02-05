import { StandardBtn } from "./components/Buttons/StandardBtn";
import { HeartBtn } from "./components/Buttons/LikeBtn";
import { AnimatedArrowBtn } from "./components/Buttons/CartBtn";

export default function Home() {
  return (
    <div>
      <main>
        <h1>Welcome to Next.js!</h1>
        <AnimatedArrowBtn />
        <HeartBtn />
        <StandardBtn>Continue</StandardBtn>
      </main>
    </div>
  );
}
