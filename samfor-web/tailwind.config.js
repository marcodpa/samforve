/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        samred: '#C8102E',
        samblue: '#1A6FB5',
        dark: '#0D1117',
        secondary: '#4A5568',
        border: '#E2E8F0',
        surface: '#F4F6F9',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sub: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
