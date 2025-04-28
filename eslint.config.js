import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import fs from 'node:fs';
import path from 'node:path';

const tsConfigPath = path.resolve('./tsconfig.json');

const hasTSConfig = () => {
  try {
    fs.accessSync(tsConfigPath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

const tsProject = hasTSConfig();

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
        ...(tsProject ? { project: tsConfigPath } : {}),
      },
      parser: tsProject ? tsParser : '@babel/eslint-parser', // Fallback to Babel parser
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      ...(tsProject ? { '@typescript-eslint': typescriptEslint } : {}),
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      ...(tsProject ? ['plugin:@typescript-eslint/recommended'] : []),
    ],
    rules: {
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      ...(tsProject
        ? {
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'warn',
          }
        : {}),
    },
  },
];

export default config;