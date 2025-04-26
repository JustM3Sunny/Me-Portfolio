import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const isTypeScriptProject = () => {
  try {
    require.resolve('typescript');
    return true;
  } catch (e) {
    return false;
  }
};

const config = [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        ...(isTypeScriptProject() ? { project: './tsconfig.json' } : {}),
      },
      parser: isTypeScriptProject() ? tsParser : '@babel/eslint-parser', // Fallback to Babel parser
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      ...(isTypeScriptProject() ? { '@typescript-eslint': typescriptEslint } : {}),
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      ...(isTypeScriptProject() ? ['plugin:@typescript-eslint/recommended'] : []),
    ],
    rules: {
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      ...(isTypeScriptProject() ? {
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
      } : {}),
    },
  },
];

export default config;