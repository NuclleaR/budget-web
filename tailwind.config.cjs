/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        money: ["1.5em", "2.0em"],
      },
      height: {
        toolbar: "56px",
        page: "calc(100vh - 56px)",
      },
    },
  },
  plugins: [],
};
