"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaHome, FaSearch, FaRegUserCircle  } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { PiSealPercentFill } from "react-icons/pi";



const navItems = [
    { name: "Home", href: "/index", icon: FaHome },
    { name: "Search", href: "/search", icon: FaSearch },
    { name: "Deals", href: "/deals", icon: PiSealPercentFill },
    { name: "Cart", href: "/cart", icon: FaCartShopping },
    { name: "Contact", href: "/contact", icon: FaRegUserCircle },
];

export default function AsideNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-60 flex-col p-2 gap-2" style={{ background: "var(--color-surface)" }}>
        <div className="flex items-center justify-center">
            <Image src="/images/logo.svg" alt="Logo" width={150} height={150} />
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition`}
                style={{
                    background: active ? "var(--color-bg)" : "transparent",
                    color: active ? "var(--color-primary)" : "var(--text-muted)",
                    fontFamily: "var(--font-teachers)",
                    fontWeight: active ? "bold" : "normal",
                }}
              >
                <Icon size={20} />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around py-2" style={{ background: "var(--color-surface)" }}>
        {navItems.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className={`flex flex-col items-center text-xs transition-transform duration-200
                ${active ? "scale-95" : "scale-80"}
            `}
              style={{
                    color: active ? "var(--color-primary)" : "var(--text-muted)",
                    fontFamily: "var(--font-teachers)",
                    fontWeight: active ? "bold" : "normal",
                }}
            >
              <Icon size={22} />
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
