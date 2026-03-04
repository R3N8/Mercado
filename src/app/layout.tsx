// app/layout.tsx
import type { Metadata } from "next";
import { Lato, Teachers } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const lato = Lato({
  variable: "--font-lato",
  weight: ["300"],
  subsets: ["latin"],
});

const teachers = Teachers({
  variable: "--font-teachers",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mercado",
  description: "Online shop for all your needs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${teachers.variable}`}>
        {/* Wrap children in a div to ensure hydration */}
        <Providers>
          <div id="app-wrapper">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}