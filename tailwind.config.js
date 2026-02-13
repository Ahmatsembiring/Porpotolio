/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // darkMode dihapus karena tidak dipakai
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // colors.dark dihapus karena tidak dipakai
    },
  },
  plugins: [],
}