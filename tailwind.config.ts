import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Islamic Green & Gold Theme
        primary: {
          DEFAULT: "hsl(142, 86%, 28%)", // Emerald Green
          50: "hsl(142, 76%, 95%)",
          100: "hsl(142, 76%, 90%)",
          200: "hsl(142, 76%, 80%)",
          300: "hsl(142, 76%, 70%)",
          400: "hsl(142, 76%, 50%)",
          500: "hsl(142, 86%, 28%)",
          600: "hsl(142, 86%, 24%)",
          700: "hsl(142, 86%, 20%)",
          800: "hsl(142, 86%, 16%)",
          900: "hsl(142, 86%, 12%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(43, 100%, 50%)", // Gold
          50: "hsl(43, 100%, 95%)",
          100: "hsl(43, 100%, 90%)",
          200: "hsl(43, 100%, 80%)",
          300: "hsl(43, 100%, 70%)",
          400: "hsl(43, 100%, 60%)",
          500: "hsl(43, 100%, 50%)",
          600: "hsl(43, 100%, 45%)",
          700: "hsl(43, 100%, 40%)",
          800: "hsl(43, 100%, 35%)",
          900: "hsl(43, 100%, 30%)",
          foreground: "hsl(0, 0%, 0%)",
        },
        accent: {
          DEFAULT: "hsl(142, 76%, 36%)", // Light Green
          foreground: "hsl(0, 0%, 100%)",
        },
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(222.2, 84%, 4.9%)",
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(222.2, 84%, 4.9%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(222.2, 84%, 4.9%)",
        },
        muted: {
          DEFAULT: "hsl(210, 40%, 96.1%)",
          foreground: "hsl(215.4, 16.3%, 46.9%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84.2%, 60.2%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        border: "hsl(214.3, 31.8%, 91.4%)",
        input: "hsl(214.3, 31.8%, 91.4%)",
        ring: "hsl(142, 86%, 28%)",
        chart: {
          "1": "hsl(142, 86%, 28%)",
          "2": "hsl(43, 100%, 50%)",
          "3": "hsl(142, 76%, 36%)",
          "4": "hsl(173, 58%, 39%)",
          "5": "hsl(197, 37%, 24%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;