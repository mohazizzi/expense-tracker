/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          // bg: "#2d3250",
          // primary: "#f9b17a",
          // two: "#424769",
          // three: "#676f9d",
          bg: "#1c1d25",
          primary: "#ffc759",
          two: "#848fa550",
          three: "#848fa530",
          green: "#14a44d",
          red: "#dc4c64",
        },
      },
      fontFamily: {
        hoda: "var(--font-hoda)",
        sansmed: "var(--font-sans-med)",
        sanslight: "var(--font-sans-light)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
