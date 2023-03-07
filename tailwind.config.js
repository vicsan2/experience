const colors = require("tailwindcss/colors")
const Color = require("color")

const updateColors = (colors) => {
  const newColors = {}
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === "string") {
      newColors[key] = Color(value).lighten(0.3).hex()
    }
  }
  return newColors
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,jsx,js}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        blue: updateColors(colors.teal),
        green: colors.emerald,
        red: colors.rose,
        pink: colors.pink,
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
}
