import { jsBrowser, typescript } from '@any-listen/eslint/eslint.config.mjs'

/** @type {import('eslint').Linter.Config[]} */
export default [
  jsBrowser,
  typescript,
  {
    languageOptions: {
      parserOptions: {
        parser: typescriptParser,
        project: './tsconfig.json',
      },
    },
  },
]
