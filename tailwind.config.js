/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "mainBG":"url('./src/assets/bg-img.svg')"
      },
      fontFamily:{
        "primaryFont":['Jockey One','sans-serif']
      }
    },
  },
  plugins: [],
}

