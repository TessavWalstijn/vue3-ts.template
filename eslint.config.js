import typescriptEslint from '@typescript-eslint/eslint-plugin'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import parser from 'vue-eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    'prettier',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      vue,
    },
    languageOptions: {
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key]) => [key, 'off']),
        ),
      },
      parser: parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-member-accessibility': 0,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/indent': 0,
      'vue/no-v-html': 0,
      'vue/no-template-shadow': 0,
      'vue/attribute-hyphenation': [
        'warn',
        'never',
        {
          ignore: ['custom-prop'],
        },
      ],
    },
  },
]
