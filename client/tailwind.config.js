/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pageGreen: '#9bd1bc',
        buttonBlue: '#0a384a',
        hoverBlue: '#072733',
        bottomBar: '#3d3b3c'
      },
    },
  },
  plugins: [],
}

