import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ["**/stubs/**/*.{ts,tsx}"], // match all TS inside stubs folder
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },

  {
    // Global rules for all files
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
