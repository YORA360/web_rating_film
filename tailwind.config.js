import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit', // Tambahkan ini jika menggunakan Tailwind versi 2.x
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Anda bisa menambahkan tema kustom jika perlu
    },
  },
  plugins: [daisyui],
}
