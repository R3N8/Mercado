
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const navItems = [
  { name: "Home", href: "/index" },
  { name: "Products", href: "/products" },
  { name: "Deals", href: "/deals" },
  { name: "Cart", href: "/cart" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { href: "https://facebook.com", icon: FaFacebookF, label: "Facebook" },
  { href: "https://twitter.com", icon: FaTwitter, label: "Twitter" },
  { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="rounded-lg" style={{background: "var(--text-primary)", color: "var(--color-surface)"}}>
      <div className="mx-auto px-2 py-4 flex items-end justify-between">

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row gap-1 md:gap-6">
          {navItems.map(({ name, href }) => (
            <Link key={name} href={href} className="flex items-center gap-2 text-base tracking-wide" style={{fontFamily: "var(--font-teachers)"}}>
              <span className="font-body text-base">{name}</span>
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex gap-1 md:gap-6">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-accent hover:text-primary transition">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto px-2 pb-2 text-center text-sm tracking-wider" style={{fontFamily: "var(--font-lato)"}}>
        &copy; {new Date().getFullYear()} Mercado - Noroff, Front-End Y2 Assignment
      </div>
    </footer>
  );
}