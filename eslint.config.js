import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Added TypeScript support
    languageOptions: {
      ecmaVersion: 'latest', // Use 'latest' directly
      globals: {
        ...globals.browser,
        ...globals.node, // Add Node.js globals if needed
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        project: './tsconfig.json', // Enable TypeScript support if using TypeScript
      },
      parser: '@typescript-eslint/parser', // Add TypeScript parser if using TypeScript
    },
    settings: { react: { version: 'detect' } }, // Use 'detect' for automatic version detection
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': '@typescript-eslint', // Add TypeScript plugin if using TypeScript
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended', // Add TypeScript recommended rules if using TypeScript
    ],
    rules: {
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 'warn', // Example: Warn on unused variables
      'no-console': 'warn', // Example: Warn on console.log statements
      // Add more custom rules here
    },
  },
];