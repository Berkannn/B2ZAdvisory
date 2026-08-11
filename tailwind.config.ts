import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1faf6",
          100: "#dcf2e7",
          200: "#b8e4d1",
          300: "#8ccfb4",
          400: "#5bb491",
          500: "#359672",
          600: "#24785b",
          700: "#1d604a",
          800: "#194c3c",
          900: "#163f33",
          950: "#0a221c",
        },
        carbon: {
          50: "#f3f6f5",
          100: "#e2e9e6",
          200: "#c5d3cd",
          300: "#9db4ab",
          400: "#708f84",
          500: "#54726a",
          600: "#425c55",
          700: "#374a45",
          800: "#2a3733",
          900: "#182420",
          950: "#0c1613",
        },
        gold: {
          50: "#fdf8ec",
          100: "#faedc9",
          200: "#f4d98c",
          300: "#eec158",
          400: "#e8ab3f",
          500: "#d78f2a",
          600: "#b46f20",
          700: "#8f531d",
        },
        paper: "#f7faf8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "8xl": "90rem",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(22,63,51,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,63,51,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
