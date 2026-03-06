"use client";

import { Lato, Teachers } from "next/font/google";
import Providers from "@/components/Providers";
import BagLoader from "@/components/Loader/Loader";
import "./globals.css";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${teachers.variable}`}>
        <Providers>
          <BagLoader />
          <div id="app-wrapper">{children}</div>
        </Providers>
      </body>
    </html>
  );
}