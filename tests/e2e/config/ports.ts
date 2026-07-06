/**
 * Port allocation — keep dev and E2E isolated so they can run at the same time.
 *
 * | Service   | Dev  | E2E (Playwright) | Docker Compose |
 * |-----------|------|------------------|----------------|
 * | Backend   | 3000 | 3100             | 3000           |
 * | Frontend  | 5173 | 5174             | 5173           |
 * | PostgreSQL| 5432 | 5432 (shared)    | 5432           |
 */
export const DEV_PORTS = {
  backend: 3000,
  frontend: 5173,
  postgres: 5432,
} as const;

export const E2E_PORTS = {
  backend: Number(process.env.E2E_BACKEND_PORT ?? 3100),
  frontend: Number(process.env.E2E_FRONTEND_PORT ?? 5174),
  postgres: Number(process.env.E2E_POSTGRES_PORT ?? 5432),
} as const;

export const e2eBackendUrl = `http://localhost:${E2E_PORTS.backend}`;
export const e2eFrontendUrl = `http://localhost:${E2E_PORTS.frontend}`;
export const e2eApiUrl = `${e2eBackendUrl}/api/v1`;
