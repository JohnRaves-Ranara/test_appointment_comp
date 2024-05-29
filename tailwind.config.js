/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        calendar_bg: "#d5e2f5",
        main_primary: "#2F4E6E",
        calendar_borders: "#c2cddf"
      },
      fontFamily: {
        poppins: 'poppins'
      }
    },
  },
  plugins: [],
}

