/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E63946",
        secondary: "#F9C74F",
        dark: "#2D2D2D",
        light: "#F1FAEE",
        gray: {
          100: "#E0E0E0",
          200: "#C2C2C2",
          300: "#A3A3A3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3D3D3D",
          800: "#292929",
          900: "#141414",
        },
      },
      fontFamily: {
        fredoka: ["Fredoka", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
