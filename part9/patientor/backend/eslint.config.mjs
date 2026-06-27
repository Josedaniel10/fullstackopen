import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,

  // Equivale a plugin:@typescript-eslint/recommended
  ...tseslint.configs.recommended,

  // Equivale a plugin:@typescript-eslint/recommended-requiring-type-checking
  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        project: true,
         
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },

  {
    rules: {
      // Ya no es necesaria en la mayoría de proyectos
      // porque ESLint maneja los semicolons con la regla base
      semi: ["error", "always"],

      "@typescript-eslint/explicit-function-return-type": "off",

      "@typescript-eslint/explicit-module-boundary-types": "off",

      "@typescript-eslint/restrict-template-expressions": "off",

      "@typescript-eslint/restrict-plus-operands": "off",

      "@typescript-eslint/no-unsafe-member-access": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],

      "no-case-declarations": "off",
    },
  },

  {
    ignores: ["dist/", "node_modules/", "build/", "eslint.config.mjs"],
  },
);
