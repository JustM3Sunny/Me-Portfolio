/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
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
  purge: process.env.NODE_ENV === 'production'
    ? {
      enabled: true,
      content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
      ],
      safelist: [],
      // Consider using a more robust extractor for complex class names
      // This extractor is more robust and handles more cases.
      extractors: [
        {
          extractor: (content) => {
            return content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
          },
          extensions: ['js', 'jsx', 'ts', 'tsx', 'html'],
        },
      ],
    }
    : false,
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
  // Add important to fix issues with other CSS
  important: true,
}