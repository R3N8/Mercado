import type { Metadata } from "next";
import { Lato, Teachers } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Mercaro",
  description: "Online shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${teachers.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
