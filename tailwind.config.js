const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,jsx,js}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#e0e4eb",
          100: "#d8dae4",
          200: "#bec3d5",
          300: "#98a0bd",
          400: "#6e77a0",
          500: "#535b7f",
          600: "#404664",
          700: "#2e3248",
          800: "#292c3d",
          900: "#242633",
        },
        blue: {
          50: "#ffffff",
          100: "#edfcfd",
          200: "#caf4f7",
          300: "#91e6ee",
          400: "#4fcfde",
          500: "#24cae0",
          600: "#1d9fb9",
          700: "#20849d",
          800: "#266e82",
          900: "#265e73",
        },
      },
      textColor: {
        white: colors.gray[200],
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [require("flowbite/plugin")],
}
