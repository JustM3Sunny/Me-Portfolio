/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Or wherever your source files are
  ],
  darkMode: 'class', // or 'media' or 'false'
  theme: {
    extend: {
      boxShadow: {
        'glow-pink': '0 0 15px rgba(255, 182, 193, 0.6)',
        'glow-blue': '0 0 10px rgba(173, 216, 230, 0.7)',
      },
      colors: {
        'custom-pink': '#FFB6C1',
      },
      fontFamily: {
        'custom-font': ['Arial', 'sans-serif'],
      },
      // Example of adding custom spacing
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
  // Example of adding safelist to prevent purging of dynamically used classes
  safelist: [
    'bg-red-500',
    'text-3xl',
    'lg:text-4xl',
  ],
};