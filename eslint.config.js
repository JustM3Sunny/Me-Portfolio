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

let tsProject: boolean | null = null; // Initialize as null to avoid redundant checks

const hasTSConfig = (): boolean => {
  if (tsProject !== null) {
    return tsProject; // Return cached value
  }

  try {
    fs.accessSync(tsConfigPath, fs.constants.F_OK);
    tsProject = true;
    return true;
  } catch (error) {
    tsProject = false;
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
        ...(hasTSConfig() ? { project: tsConfigPath } : {}),
      },
      parser: hasTSConfig() ? tsParser : '@babel/eslint-parser', // Fallback to Babel parser
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      ...(hasTSConfig() ? { '@typescript-eslint': typescriptEslint } : {}),
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      ...(hasTSConfig() ? ['plugin:@typescript-eslint/recommended'] : []),
    ],
    rules: {
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      ...(hasTSConfig()
        ? {
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'warn',
          }
        : {}),
    },
  },
];

export default config;