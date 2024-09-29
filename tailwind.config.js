/** @type {import('tailwindcss').Config} */
/* eslint-env node */
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}' //esto también es una forma de englobar subdirectorios
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["IBM Plex Sans", "sans-serif"]
      },
      screens: {
        'celular': '320px'
      }
    }
  },
  variants: {},
  plugins: []
}
