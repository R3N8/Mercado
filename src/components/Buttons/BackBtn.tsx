"use client";

import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';


export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button type="button" onClick={handleBack} className="p-2 opacity-80 rounded-full hover:scale-110 cursor-pointer transition-transform" style={{background: "var(--color-surface)", color: "var(--text-primary)"}}>
      <FaArrowLeftLong />
    </button>
  );
}