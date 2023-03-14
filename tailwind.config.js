const colors = require("tailwindcss/colors")
const Color = require("color")

const getColors = (baseColor) => {
  const colors = {
    600: baseColor,
  }
  for (let i = 700; i <= 900; i += 100) {
    colors[i] = Color(baseColor)
      .darken(i / 1750)
      .hex()
  }
  for (let i = 500; i >= 100; i -= 100) {
    colors[i] = Color(baseColor)
      .lighten(i / 250)
      .hex()
  }
  return colors
}

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
        gray: getColors("#3C415E"),
        blue: getColors("#1CB3C8"),
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
