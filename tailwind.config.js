/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)'],
      },
      colors: {
        main: '#00875F',
        'main-light': '#00B37E',
        background: '#121214',
        elements: '#202024',
        icon: "#8D8D99",
        text: '#C4C4CC',
        title: '#E1E1E6',
        white: '#FFFFFF'
      },
    }
  },
  plugins: []
}
