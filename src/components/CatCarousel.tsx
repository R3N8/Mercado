/**
 * A horizontally scrollable carousel of category cards with auto-advance and visibility-based behavior.
 * - Auto-advances every 1.8s when visible and not hovered (desktop) or on mobile.
 * - Auto-scrolls into view on mobile if initially above viewport.
 * - Pauses auto-advance on hover (desktop).
 */

"use client";

import { useState, useEffect, useRef } from "react";
import CategoryCard from "@/components/CatCard";
import { categories } from "@/lib/config/heroCategories";

export default function CategoryCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const isHovering = useRef(false);
  const hasAutoScrolled = useRef(false);
  const userInteracted = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMobile = useRef(false);

  // Detect mobile once
  useEffect(() => {
    isMobile.current = window.innerWidth < 768;
  }, []);

  // Detect user interaction → stop forced Y scrolling
  useEffect(() => {
    const stopAutoScroll = () => { userInteracted.current = true; };
    window.addEventListener("touchstart", stopAutoScroll, { passive: true });
    window.addEventListener("wheel", stopAutoScroll, { passive: true });
    return () => {
      window.removeEventListener("touchstart", stopAutoScroll);
      window.removeEventListener("wheel", stopAutoScroll);
    };
  }, []);

  // Visibility observer (for horizontal auto-scroll)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Vertical auto-scroll ONCE when carousel is initially above viewport
  useEffect(() => {
    if (!isMobile.current) return;
    if (hasAutoScrolled.current) return;
    if (userInteracted.current) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (rect.top < 0) {
      container.scrollIntoView({ behavior: "smooth", block: "nearest" });
      hasAutoScrolled.current = true;
    }
  }, [activeIndex]);

  // Horizontal auto-scroll for carousel cards (mobile only)
  useEffect(() => {
    if (!isMobile.current || !isVisible) return;

    const container = containerRef.current;
    const node = cardRefs.current[activeIndex];

    if (!container || !node) return;

    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    const scrollLeft =
      container.scrollLeft +
      (nodeRect.left - containerRect.left) -
      containerRect.width / 2 +
      nodeRect.width / 2;

    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [activeIndex, isVisible]);

  // Auto carousel interval
  const startCarousel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (isHovering.current || !isVisible) return;

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
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isVisible]);

  const handleMouseEnter = () => { isHovering.current = true; };
  const handleMouseLeave = () => {
    isHovering.current = false;
    startCarousel();
  };

  return (
    <article>
      <div
        ref={containerRef}
        className="
          flex gap-4 items-center justify-start md:justify-center
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory md:snap-none
          px-[10vw] md:px-0
          scroll-px-[10vw] md:scroll-px-0
        "
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}
      >
        {categories.map((category, index) => (
          <div
            key={category.slug}
            ref={(el: HTMLDivElement | null) => { cardRefs.current[index] = el; }}
            className="
              shrink-0 w-[80vw] max-w-xs
              md:shrink md:w-full md:max-w-none
              snap-center md:snap-none
            "
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