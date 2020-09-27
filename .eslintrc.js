module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "after-used",
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true
      }
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off"
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
};
