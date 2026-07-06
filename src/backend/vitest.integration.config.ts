import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const backendRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(backendRoot, "../..");

export default defineConfig({
  root: repoRoot,
  resolve: {
    alias: {
      supertest: path.join(backendRoot, "node_modules/supertest"),
      express: path.join(backendRoot, "node_modules/express"),
      cors: path.join(backendRoot, "node_modules/cors"),
      "@prisma/client": path.join(backendRoot, "node_modules/@prisma/client"),
    },
  },
  test: {
    include: ["tests/integration/**/*.test.ts", "tests/perf/**/*.bench.ts"],
    environment: "node",
    fileParallelism: false,
  },
});
