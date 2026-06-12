/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        heading: ["'Outfit'", "sans-serif"],
      },
      boxShadow: {
        "premium-soft": "0 4px 20px -2px rgba(17, 24, 39, 0.04), 0 2px 6px -1px rgba(17, 24, 39, 0.02)",
        "premium-card": "0 10px 30px -5px rgba(17, 24, 39, 0.05), 0 4px 12px -2px rgba(17, 24, 39, 0.03)",
        "premium-hover": "0 20px 40px -5px rgba(17, 24, 39, 0.08), 0 8px 20px -4px rgba(17, 24, 39, 0.04)",
        "premium-glow": "0 0 25px -5px rgba(59, 130, 246, 0.15)",
      },
    },
  },
  plugins: [],
}