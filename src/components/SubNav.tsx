"use client";

import { PiSealPercentFill } from "react-icons/pi";
import { GiClothes } from "react-icons/gi";
import { GiDelicatePerfume } from "react-icons/gi";
import { GiElectric } from "react-icons/gi";
import { useState } from "react";

const categories = [
  { name: "Default", key: "default", tags: [] },
  { name: "Electronics", key: "electronics", icon: <GiElectric />, tags: ["electronics", "audio", "gaming", "peripherals", "computers"] },
  { name: "Beauty", key: "beauty", icon: <GiDelicatePerfume />, tags: ["beauty", "perfume", "skin care", "shampoo"] },
  { name: "Clothes", key: "clothes", icon: <GiClothes />, tags: ["fashion", "shoes", "bags", "jewelry", "glasses"] },
  { name: "Deals", key: "deals", icon: <PiSealPercentFill />, tags: [] }, // We'll filter by discounted products later
];

export default function SubNav({ onSelect }: { onSelect?: (category: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("default");

  const handleClick = (key: string) => {
    setActiveCategory(key);
    if (onSelect) onSelect(key);
  };

  return (
    <nav className="flex flex-wrap gap-3 rounded" style={{background: "var(--color-bg)", color: "var(--text-primary)", fontFamily: "var(--font-teachers)"}}>
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => handleClick(cat.key)}
          className="flex items-center gap-1 px-4 py-2 rounded tracking-wide transition-colors duration-200 cursor-pointer"
          style={{background: activeCategory === cat.key ? "var(--color-surface)" : "var(--color-bg)", color: activeCategory === cat.key ? "var(--text-primary)" : "var(--text-muted)", fontWeight: activeCategory === cat.key ? "bold" : "normal"}}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </nav>
  );
}