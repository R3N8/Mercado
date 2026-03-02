import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/config/category";
import { CgArrowLongRight } from "react-icons/cg";

type Props = {
  category: Category;
  isActive?: boolean;
};

export default function CategoryCard({ category, isActive = false }: Props) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative w-full h-80 md:h-150 overflow-hidden rounded-md p-6 flex items-center justify-between min-h-60 transition-colors duration-300 tracking-widest"
      style={{ background: "var(--color-surface)", color: isActive ? "var(--color-surface)" : "var(--text-primary)", fontFamily: "var(--font-teachers)" }}
      data-active={isActive}
    >
      {/* Background Image */}
      <Image
        src={category.image}
        alt={category.title}
        fill
        className={`object-cover transition duration-500
          ${isActive ? "opacity-100 scale-105" : "opacity-0 scale-100"}
          group-hover:opacity-100 group-hover:scale-105`}
      />
      {/* Color Overlay */}
      <div
        className={`absolute inset-0 transition duration-500 ${category.color}
          ${isActive ? "opacity-70" : "opacity-0"}
          group-hover:opacity-70`}
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-2 w-full items-start justify-between">
        <h3 className="text-xl font-semibold">{category.title}</h3>
        <div
          className={`arrow flex items-center justify-center text-2xl min-w-14 h-7 border-2 rounded-full p-1 transition-transform duration-300
            ${isActive ? "translate-x-2" : "translate-x-0"}
            group-hover:translate-x-2`}
        >
          <CgArrowLongRight />
        </div>
      </div>
    </Link>
  );
}