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
        'custom-font': ['Arial', 'sans-serif'], // Consider a more modern font stack
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
  // Safelist is generally discouraged. Consider using the `content` array more effectively.
  // If safelisting is absolutely necessary, use a more specific pattern.
  // Example: safelist: [{ pattern: /^(bg|text)-(red|blue|green)-(100|200|300)$/ }],
  safelist: [
    'bg-red-500',
    'text-3xl',
    'lg:text-4xl',
  ],
  // Consider adding prefix to avoid naming conflicts with other CSS libraries
  // prefix: 'tw-',
  // Consider using important: true to increase specificity
  // important: true,
}