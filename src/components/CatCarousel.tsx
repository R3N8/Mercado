"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import CategoryCard from "@/components/CatCard";
import { categories } from "@/lib/config/category";

export default function CategorySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const isHovering = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCarousel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (isHovering.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % categories.length;
        setFadingIndex(prev);
        setTimeout(() => setFadingIndex(null), 500);
        return next;
      });
    }, 1800);
  };

  useEffect(() => {
    startCarousel();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Ensure initial scroll to first card after refs are set
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;
    const node = cardRefs.current[0];
    if (node) {
      node.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
    }
  }, []);

  // Auto-scroll to active card on mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;
    const node = cardRefs.current[activeIndex];
    if (node) {
      node.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeIndex]);

  const handleMouseEnter = () => {
    isHovering.current = true;
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    startCarousel();
  };

  return (
    <article>
      <div
        ref={containerRef}
        className="flex gap-4 items-center justify-start md:justify-center
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory md:snap-none
          px-[10vw] md:px-0
          scroll-px-[10vw] md:scroll-px-0"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {categories.map((category, index) => (
          <div
            key={category.slug}
            ref={(el) => { cardRefs.current[index] = el; }}
            className="shrink-0 w-[80vw] max-w-xs md:shrink md:w-full md:max-w-none snap-center md:snap-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CategoryCard
              category={category}
              isActive={index === activeIndex || index === fadingIndex}
            />
          </div>
        ))}
      </div>
    </article>
  );
}