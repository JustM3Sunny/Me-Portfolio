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

let tsProject: boolean | null = null; // Initialize as null, indicating not yet checked

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

const basePlugins = {
  react,
  'react-hooks': reactHooks,
  'react-refresh': reactRefresh,
};

const baseExtends = [
  'eslint:recommended',
  'plugin:react/recommended',
  'plugin:react/jsx-runtime',
  'plugin:react-hooks/recommended',
];

const baseRules = {
  'react/jsx-no-target-blank': 'off',
  'react-refresh/only-export-components': [
    'warn',
    { allowConstantExport: true },
  ],
  'no-unused-vars': 'warn',
  'no-console': 'warn',
};

const typescriptExtends = ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-type-checked'];
const typescriptPlugins = { ...basePlugins, '@typescript-eslint': typescriptEslint };
const typescriptRules = {
  ...baseRules,
  '@typescript-eslint/explicit-function-return-type': 'warn',
  '@typescript-eslint/explicit-module-boundary-types': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn', // Consider adding this rule
  '@typescript-eslint/no-unused-vars': 'warn', // Override base rule for TS
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
      parser: hasTSConfig() ? tsParser : require.resolve('@babel/eslint-parser'), // Fallback to Babel parser
    },
    settings: { react: { version: 'detect' } },
    ...(() => {
      const useTypescript = hasTSConfig();
      const plugins = useTypescript ? typescriptPlugins : basePlugins;
      const extendsList = useTypescript ? typescriptExtends : baseExtends;
      const rules = useTypescript ? typescriptRules : baseRules;

      return {
        plugins,
        extends: extendsList,
        rules,
      };
    })(),
  },
];

export default config;