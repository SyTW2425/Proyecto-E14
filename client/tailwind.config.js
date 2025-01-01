/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        green1: "#49ab81",
        green2: "#419873",
        green3: "#3a8b66",
        green4: "#328059",
      },
    },
  },
  plugins: [],
};
