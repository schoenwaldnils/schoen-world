import eslint from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import { defineConfig } from 'eslint/config'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

const production = process.env.NODE_ENV === 'production'

export default defineConfig(
  {
    ignores: [
      'node_modules/**',
      '**/*.js',
      '**/*.mjs',
      '**/*.mts',
      '.next/**',
      '*.d.ts',
      'migrations',
    ],
  },
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react,
      'simple-import-sort': simpleImportSort,
      jsxA11y,
    },
    rules: {
      'no-console': [production ? 2 : 1, { allow: ['error', 'warn', 'info'] }],
      'no-unused-vars': ['warn', { args: 'none' }],
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-prototype-builtins': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
    },
  },
)
