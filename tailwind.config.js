/** @type {import('tailwindcss').Config} */
const production = process.env.NODE_ENV === 'production';

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
  purge: production
    ? {
      enabled: true,
      content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
      ],
      safelist: [],
      // Consider using a more robust extractor for complex class names
      // This extractor is more robust and handles more cases.
      // extract: {  // Removed custom extractor as it's generally not needed and can be problematic
      //   DEFAULT: (content) => {
      //     return content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
      //   },
      // },
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
  // optimization: production ? {
  //   minimize: true,
  // } : undefined,
  // Removed optimization.minimize as it's deprecated and handled by other tools
}