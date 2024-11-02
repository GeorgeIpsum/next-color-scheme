import next from "@tilli-pro/eslint-config/next.mjs";

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  ...next,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.lint.json"
      }
    }
  }
]
