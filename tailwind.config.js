/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html", // Added public index.html to content for more complete purging
  ],
  darkMode: 'class',
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
        'custom-font': ['Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
  // prefix: 'tw-', // Uncomment if prefixing is needed
  // important: true, // Uncomment if increased specificity is needed
  // Purge unused styles in production for performance
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html',
    ],
    options: {
      safelist: [], // Add any classes that are dynamically added and not detected by purgecss
      // Add defaultExtractor to handle classes with dynamic names
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    },
  },
}