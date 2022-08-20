/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        earth: ["Satisfy", "cursive"],
      },
      colors: {
        "site-text": "#feebe2",
        "accent-text": "#ffb06d",
        "accent-background": "#d2353a",
      }
    },
  },
  plugins: [],
};
