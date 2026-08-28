/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090806",
        secondary: "#11100D",
        gold: "#D7A84B",
        goldLight: "#E6BB68",
        parchment: "#E8DFC9",
        redInk: "#B43B35",
        textMain: "#F5EFE4",
      },
      fontFamily: {
        serif: ['"Crimson Pro"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}