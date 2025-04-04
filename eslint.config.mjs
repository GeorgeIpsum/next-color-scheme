import base from "@tilli-pro/eslint-config/base";
import next from "@tilli-pro/eslint-config/nextjs";

export default [
  ...base,
  ...next,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.lint.json",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@next/next/no-page-custom-font": "off",
      "@next/next/no-html-link-for-pages": "off"
    }
  },
];
