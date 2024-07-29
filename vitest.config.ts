// ./vitest.config.ts
//
// Global config file for vitest.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Files to include and exclude. Exlusion takes precedence.
    include: ["__tests__/**/*.test.ts"],
    exclude: ["src", "node_modules", "dist", "playground", "public"],

    // Enable globals to avoid redundant imports.
    globals: true,

    // Enable typescript typechecking.
    typecheck: {
      enabled: true,
    },

    // Enable coverage generation and reporting via the
    // @vitest/coverage-v8 dev dependency.
    coverage: {
      enabled: true,
      include: ["src/**/*.ts"],
      provider: "v8",

      // Json and json-summary are required for GitHub vitest coverage report.
      // For better debugging, enable generate coverage even on failure.
      reporter: ["text", "html", "clover", "json", "json-summary"],
      reportOnFailure: true,

      reportsDirectory: "coverage",
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },

    // Disable watch mode to simplify workflow.
    watch: false,
  },
});
