/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#38bdf8", // cyan-400
        secondary: "#818cf8", // indigo-400
        accent: "#a78bfa", // violet-400
        dark: "#0f172a", // slate-900
        darker: "#020617", // slate-950
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
