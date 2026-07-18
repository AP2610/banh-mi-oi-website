import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  prettierRecommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'prettier/prettier': 'warn',
      'react/no-unescaped-entities': 'off',
    },
  },
]);

export default eslintConfig;
