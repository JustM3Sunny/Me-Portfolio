/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Or wherever your source files are
  ],
  theme: {
    extend: {
      boxShadow: {
        'glow-pink': '0 0 15px rgba(255, 182, 193, 0.6)',
        'glow-blue': '0 0 10px rgba(173, 216, 230, 0.7)', // Example of adding another glow
      },
      // Example of adding a custom color
      colors: {
        'custom-pink': '#FFB6C1',
      },
      // Example of adding a custom font family
      fontFamily: {
        'custom-font': ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};