"use client";

import { useState, useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";
import BagLoaderUI from "./LoaderUI";

export default function BagLoader() {
  const [isPending, startTransition] = useTransition();
  const [showLoader, setShowLoader] = useState(true);
  const pathname = usePathname();

  // Show loader on first page load
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 300); // hide after 300ms
    return () => clearTimeout(timer);
  }, [pathname]);

  // You can integrate isPending with actual client-side transitions later
  if (showLoader || isPending) return <BagLoaderUI />;

  return null;
}