import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const projectFiles = ['**/*.{js,mjs,ts,svelte}'];

export default [
  {
    ignores: [
      '.DS_Store',
      'node_modules/**',
      'build/**',
      '.netlify/**',
      '.svelte-kit/**',
      'package/**',
      '.env',
      '.env.*',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock'
    ]
  },
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    files: projectFiles,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      semi: ['error', 'always'],
      eqeqeq: 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-throw-literal': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-duplicate-imports': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      'prefer-template': 'error',
      'max-len': ['error', { code: 160 }],
      'no-nested-ternary': 'error',
      'no-trailing-spaces': 'error',
      'svelte/no-at-html-tags': 'off'
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: { parser: tsParser }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: { parser: tsParser, extraFileExtensions: ['.svelte'] }
    },
    rules: {
      'prefer-const': 'off',
      'svelte/no-navigation-without-resolve': 'off',
      'svelte/require-each-key': 'off'
    }
  },
  prettier
];
