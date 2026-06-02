/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#8b5cf6', // Purple accent
        background: '#0a0a0a',
        surface: '#171717', // slightly lighter for cards
        surfaceHover: '#262626',
      },
      fontFamily: {
        heading: ['"Cabinet Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
