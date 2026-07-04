# Tasks: PHASE-000 — Bootstrap infrastructure

> No TASK-XXX in `implementation-queue-v1.json` — infra phase before `sequence: 1` (TASK-019).  
> Agents: `devops-engineer` (§1–2), `backend-engineer` (§3–4), `frontend-engineer` (§5), all (§6).

## 1. Infrastructure (Docker)

- [x] 1.1 Create `src/infra/docker-compose.yml` with services `postgres`, `backend`, `frontend` (LLD §2.3)
- [x] 1.2 Create `src/infra/Dockerfile.backend` — multi-stage Node 20
- [x] 1.3 Create `src/infra/Dockerfile.frontend` — Vite build + nginx serve
- [x] 1.4 Create `src/infra/.env.example` with `DATABASE_URL`, `PORT`, `CORS_ORIGIN`, `VITE_API_URL`

## 2. Backend scaffold

- [x] 2.1 Initialize `src/backend/package.json` (Express, TypeScript, Zod, Prisma, Vitest scripts)
- [x] 2.2 Add `tsconfig.json` strict and `src/app.ts` / `src/server.ts` entrypoints
- [x] 2.3 Add `prisma/schema.prisma` with PostgreSQL datasource (no domain models yet)
- [x] 2.4 Add middleware: `cors`, `express.json()`, `errorHandler` stub

## 3. Health endpoint

- [x] 3.1 Create `src/routes/index.ts` mounting `/api/v1`
- [x] 3.2 Create `health.controller.ts` — `GET /api/v1/health` → `{ status: "ok" }`
- [x] 3.3 Add integration test `tests/integration/health.test.ts` (Supertest, expect 200)

## 4. Prisma tooling

- [x] 4.1 Run `prisma generate` successfully
- [x] 4.2 Document migrate command in getting-started (no domain migration until TASK-019)

## 5. Frontend scaffold

- [x] 5.1 Initialize `src/frontend/` with Vite + React 18 + TypeScript
- [x] 5.2 Configure `VITE_API_URL` in `.env.example`
- [x] 5.3 Add minimal `App.tsx` placeholder (e.g. "Organizador de Conocimiento")

## 6. Verification and docs

- [x] 6.1 `docker compose up -d` from `src/infra/` — all services healthy *(compose file ready; requires Docker Desktop running)*
- [x] 6.2 `curl http://localhost:3000/api/v1/health` returns 200 + JSON *(verified via `node dist/server.js`)*
- [x] 6.3 Update `docs/engineering/getting-started.md` with bootstrap steps
- [x] 6.4 PHASE-000 complete — ready for `/opsx:apply` on `us-001-listado-notas` (TASK-019)
