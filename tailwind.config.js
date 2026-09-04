/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean-dark': '#0f172a',
        'ocean-blue': '#1e3a8a',
        'ocean-cyan': '#06b6d4',
        'ocean-teal': '#14b8a6',
        safe: '#10b981',
        moderate: '#eab308',
        high: '#f97316',
        critical: '#ef4444',
      }
    },
  },
  plugins: [],
}
