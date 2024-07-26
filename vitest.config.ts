// ./vitest.config.ts
//
// Global config file for vitest.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["src", "node_modules", "dist", "playground", "public"],
    include: ["__tests__/**/*.test.ts"],
    typecheck: {
      enabled: true,
    },
    benchmark: {
      include: ["__tests__/**/*.bench.ts"],
    },
    coverage: {
      enabled: true,
      include: ["src/**/*"],
      provider: "v8",
      reporter: [ "text", "html", "clover", "json"],
      reportsDirectory: "coverage",
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
    reporters: "default",
    watch: false,
  },
});
