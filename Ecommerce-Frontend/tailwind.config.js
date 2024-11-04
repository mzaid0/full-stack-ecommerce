/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        'custom-left':'calc(100% - 100px)'
      }
    },
  },
  plugins: [
  ],
}

