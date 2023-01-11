/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        money: ["1.5em", "2.0em"],
      },
    },
  },
  plugins: [],
};
