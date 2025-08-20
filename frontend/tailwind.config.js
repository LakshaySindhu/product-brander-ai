/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#0D0D0D',
        'brand-secondary': '#F2F2F2',
        'brand-accent': '#4F46E5',
        'brand-accent-hover': '#4338CA',
      }
    },
  },
  plugins: [],
}