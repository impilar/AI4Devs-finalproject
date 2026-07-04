# Proposal: PHASE-000 — Bootstrap infrastructure

## Why

The MVP implementation queue (TASK-019 onward) requires a runnable local environment: PostgreSQL, backend API scaffold, and frontend build tooling. Without PHASE-000, database migrations and endpoints cannot be developed or verified. This change unblocks all 40 queued tasks in `implementation-queue-v1.json`.

## What Changes

- Add `src/infra/docker-compose.yml` with services: `postgres`, `backend`, `frontend`
- Add `Dockerfile.backend` and `Dockerfile.frontend` per LLD-v1 §2.3
- Add `src/infra/.env.example` with `DATABASE_URL`, `PORT`, `CORS_ORIGIN`, `VITE_API_URL`
- Scaffold minimal `src/backend/` (Express app, Prisma client, health route)
- Scaffold minimal `src/frontend/` (Vite + React shell)
- Initialize Prisma with empty schema placeholder (full models in TASK-019)
- Expose `GET /api/v1/health` returning `{ "status": "ok" }` with HTTP 200
- Document local bootstrap steps in `docs/engineering/getting-started.md` (update if exists)

No user-facing features (notes CRUD) in this change — infrastructure only.

## Capabilities

### New Capabilities

- `platform-health`: API health check endpoint and runtime readiness signal for Docker/local dev
- `local-dev-stack`: Docker Compose stack for PostgreSQL, backend, and frontend with documented env vars

### Modified Capabilities

- _(none — no existing specs in `openspec/specs/` yet)_

## Impact

| Area | Impact |
|------|--------|
| `src/infra/` | New Docker Compose and Dockerfiles |
| `src/backend/` | New package scaffold, Express entry, health route, Prisma init |
| `src/frontend/` | New Vite/React scaffold |
| `docs/engineering/` | Bootstrap instructions |
| APIs | New `GET /api/v1/health` only |
| Queue | Prerequisite before `sequence: 1` (TASK-019); no TASK id in JSON |
| Agents | `devops-engineer` (infra), `backend-engineer` (health + backend shell) |

**References:** `docs/engineering/implementation-plan-v1.md` §PHASE-000, LLD-v1 §2.3, §11, HLD-v1 §10.
