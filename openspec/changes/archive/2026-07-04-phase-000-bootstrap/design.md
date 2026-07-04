# Design: PHASE-000 — Bootstrap infrastructure

## Context

`src/` currently contains only `.gitkeep` placeholders. The implementation queue (`implementation-queue-v1.json`) starts at TASK-019 (notes table) but requires PostgreSQL, Express scaffold, and Docker tooling first. LLD-v1 §2.3 and §11 define the target layout; HLD-v1 §10 defines deployment flow.

**Current state:** No runnable code.  
**Target state:** `docker compose up` + `GET /api/v1/health` → 200.

## Goals / Non-Goals

**Goals:**

- Runnable Docker Compose stack (postgres, backend, frontend)
- Minimal Express app with `/api/v1/health`
- Prisma initialized (empty or minimal schema; full models in US-005/TASK-019)
- Vite + React shell (placeholder page)
- `.env.example` and documented bootstrap steps

**Non-Goals:**

- Notes CRUD, tags, search (US-001+)
- Full Prisma models for `notas`, `etiquetas` (TASK-019)
- E2E tests (first QA task is TASK-004)
- Production deployment / CI pipeline
- Authentication

## Decisions

### D1: Docker Compose location `src/infra/`

**Choice:** `src/infra/docker-compose.yml` per LLD-v1 §2.3 and HLD-v1 §7.1.  
**Alternatives:** Root-level `docker-compose.yml` — rejected to keep infra colocated with Dockerfiles.

### D2: Backend structure per LLD §2.1

**Choice:** `src/backend/src/app.ts`, `server.ts`, `routes/index.ts` mounting `/api/v1` and health.  
**Rationale:** Matches layered architecture before adding domain routes in PHASE-001.

### D3: Health route implementation

**Choice:** Simple controller returning `{ status: "ok" }` without DB ping in PHASE-000.  
**Alternatives:** DB connectivity check — deferred to optional enhancement; TASK-019 needs DB anyway.  
**LLD reference:** §4 API table — `GET /api/v1/health`.

### D4: Prisma minimal schema

**Choice:** `schema.prisma` with `datasource` + `generator` only, or empty `User` placeholder removed — use no models until TASK-019.  
**Rationale:** Avoid duplicate migration work.

### D5: Node 20 + TypeScript strict

Per `docs/engineering/standards/backend-standards.md` and ADR-002.

### D6: Ports

| Service | Host port | Notes |
|---------|-----------|-------|
| postgres | 5432 | `okc` DB, user/pass per `.env.example` |
| backend | 3000 | `PORT` env |
| frontend | 5173 | Vite default |

### D7: CORS

Enable `cors` middleware with `CORS_ORIGIN` (default `http://localhost:5173`) per LLD §11.

## File manifest

| Path | Agent | Purpose |
|------|-------|---------|
| `src/infra/docker-compose.yml` | devops-engineer | Stack definition |
| `src/infra/Dockerfile.backend` | devops-engineer | Multi-stage Node 20 |
| `src/infra/Dockerfile.frontend` | devops-engineer | Vite build + nginx |
| `src/infra/.env.example` | devops-engineer | Env template |
| `src/backend/package.json` | backend-engineer | Scripts: dev, build, test |
| `src/backend/tsconfig.json` | backend-engineer | Strict TS |
| `src/backend/prisma/schema.prisma` | backend-engineer | Datasource only |
| `src/backend/src/app.ts` | backend-engineer | Express + middleware |
| `src/backend/src/server.ts` | backend-engineer | Listen on PORT |
| `src/backend/src/routes/index.ts` | backend-engineer | Mount `/api/v1`, health |
| `src/backend/src/controllers/health.controller.ts` | backend-engineer | Health handler |
| `src/frontend/package.json` | frontend-engineer | Vite scripts |
| `src/frontend/vite.config.ts` | frontend-engineer | Proxy optional |
| `src/frontend/src/App.tsx` | frontend-engineer | Placeholder shell |

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Docker not installed locally | Document native `npm run dev` + local Postgres alternative in getting-started |
| Port conflicts 3000/5173/5432 | Document override in `.env` |
| Health without DB check | Acceptable for PHASE-000; integration tests add DB checks in PHASE-001 |
| Large scaffold scope | Keep files minimal; no domain logic |

## Migration Plan

1. `cp src/infra/.env.example .env`
2. `cd src/infra && docker compose up -d`
3. `curl http://localhost:3000/api/v1/health` → `{"status":"ok"}`
4. Open `http://localhost:5173` → placeholder UI

**Rollback:** `docker compose down -v` removes volumes (dev only).

## Open Questions

- _(none — scope fixed by implementation-plan PHASE-000)_
