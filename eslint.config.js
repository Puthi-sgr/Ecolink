import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['features/**/pages/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.object.name='quoteRequests'][callee.property.name='filter']",
          message: 'Use the shared operations selectors instead of filtering quoteRequests inline on screens.',
        },
        {
          selector: "CallExpression[callee.object.name='plans'][callee.property.name='filter']",
          message: 'Use the shared operations selectors instead of filtering plans inline on screens.',
        },
        {
          selector: "CallExpression[callee.object.name='trips'][callee.property.name='filter']",
          message: 'Use the shared operations selectors instead of filtering trips inline on screens.',
        },
      ],
    },
  }
);
