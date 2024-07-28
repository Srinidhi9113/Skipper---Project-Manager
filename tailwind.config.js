/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/src/keep-preset.js";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [keepPreset],
  theme: {
    extend: {
      backgroundImage:{
        "mainBG":"url('/assets/bg-img.svg')",
        "dashBG":"radial-gradient(circle, rgba(0,0,1,1) 0%, rgba(4,1,114,1) 0%, rgba(21,21,58,1) 0%, rgba(0,0,0,1) 100%)"
      },
      fontFamily:{
        "primaryFont":['Jockey One','sans-serif']
      },
      
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

