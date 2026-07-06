import { defineConfig, devices } from "@playwright/test";
import {
  E2E_PORTS,
  e2eApiUrl,
  e2eBackendUrl,
  e2eFrontendUrl,
} from "./tests/e2e/config/ports";

const databaseUrl =
  process.env.DATABASE_URL ??
  `postgresql://okc:okc@localhost:${E2E_PORTS.postgres}/okc`;

// Expose E2E API URL to specs that read process.env at module load time.
process.env.PLAYWRIGHT_API_URL ??= e2eApiUrl;
process.env.PLAYWRIGHT_BASE_URL ??= e2eFrontendUrl;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? e2eFrontendUrl,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: "npm run dev",
      cwd: "./src/backend",
      url: `${e2eBackendUrl}/api/v1/health`,
      reuseExistingServer: false,
      timeout: 120_000,
      env: {
        DATABASE_URL: databaseUrl,
        CORS_ORIGIN: e2eFrontendUrl,
        PORT: String(E2E_PORTS.backend),
        NODE_ENV: "development",
      },
    },
    {
      command: `npm run dev -- --port ${E2E_PORTS.frontend} --strictPort`,
      cwd: "./src/frontend",
      url: e2eFrontendUrl,
      reuseExistingServer: false,
      timeout: 120_000,
      env: {
        VITE_API_URL: e2eApiUrl,
        VITE_API_PROXY_TARGET: e2eBackendUrl,
      },
    },
  ],
});
