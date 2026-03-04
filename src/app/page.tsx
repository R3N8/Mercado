import { AnimatedArrowBtn } from "@/components/Buttons/CartBtn";

export default function Welcome() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for content */}
      <div className="relative z-10 flex flex-col md:flex-row items-end md:items-end justify-center md:justify-center min-h-screen p-6 md:p-12">
        {/* Welcome Section */}
        <div className="md:w-auto flex flex-col items-center gap-6 bg-stone-100/30 p-4 rounded-lg text-center"
        style={{color: "var(--color-surface)", fontFamily: "var(--font-teachers)"}}>
          <h1 className="text-2xl md:text-5xl font-bold">
            Welcome to <span className="capitalize" style={{color: "var(--color-accent)"}}>Mercaro</span>
          </h1>
          <p className="text-md md:text-xl">
            Discover amazing products and enjoy a seamless shopping experience
          </p>
          <div className="flex gap-4 items-center">
            <AnimatedArrowBtn />
          </div>
        </div>
      </div>
    </div>
  );
}