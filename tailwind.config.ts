import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "hsl(var(--surface) / <alpha-value>)",
          2: "hsl(var(--surface-2) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "hsl(var(--ink) / <alpha-value>)",
          muted: "hsl(var(--ink-muted) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-fg) / <alpha-value>)",
        },
        care: {
          DEFAULT: "hsl(var(--care) / <alpha-value>)",
          soft: "hsl(var(--care-soft) / <alpha-value>)",
        },
        warn: "hsl(var(--warn) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, hsl(var(--surface)) 0%, transparent 40%), radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--accent) / 0.18), transparent)",
        "hero-glow":
          "radial-gradient(ellipse 100% 80% at 50% 0%, hsl(var(--accent) / 0.12), transparent 55%)",
      },
      boxShadow: {
        card: "0 0 0 1px hsl(var(--ink) / 0.06), 0 12px 40px -16px hsl(var(--ink) / 0.25)",
        lift: "0 0 0 1px hsl(var(--ink) / 0.06), 0 20px 50px -24px hsl(var(--ink) / 0.35)",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.45s ease-out forwards",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
