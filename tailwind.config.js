/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DB4C3F",
        secondary: "#EB8909",
        gray: {
          100: "#F9F9F9",
          200: "#F5F5F5",
          300: "#EDEDED",
          400: "#E0E0E0",
          500: "#BDBDBD",
          600: "#9E9E9E",
          700: "#757575",
          800: "#616161",
          900: "#424242",
        },
      },
    },
  },
  plugins: [],
};
