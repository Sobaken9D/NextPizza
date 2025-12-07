import {defineConfig, globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals.map(config => ({
    ...config,
    rules: {
      ...config.rules,
      "@next/next/no-img-element": "off", // ← ОТКЛЮЧАЕМ правило
    },
  })),
  ...nextTs.map(config => ({
    ...config,
    rules: {
      ...config.rules,
      "@next/next/no-img-element": "off", // ← ОТКЛЮЧАЕМ правило
    },
  })),
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);


export default eslintConfig;

