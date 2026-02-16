import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        accent: "var(--color-accent)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
      },
      fontFamily: {
        head: "var(--font-head)",
        body: "var(--font-body)",
      },
    },
  },
};

export default config;