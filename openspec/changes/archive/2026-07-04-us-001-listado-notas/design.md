# Design: PHASE-001 — Notes schema and list (US-001)

## Context

PHASE-000 left a runnable Docker stack with `GET /api/v1/health`, Prisma datasource (no models), and a React placeholder. The implementation queue (`implementation-queue-v1.json`, `sequence` 1–5) defines PHASE-001 as the first domain vertical slice: database table `notas`, list API, and home-page UI.

**Current state:** No `notas` table, no domain routes, placeholder `App.tsx`.  
**Target state:** User opens `/` and sees all notes (title + date), backed by `GET /api/v1/notas`, with E2E green.

**Constraints:** LLD-v1 layered architecture (routes → controllers → services → repositories → Prisma); logical-model-v1 §3.1 for `notas`; RNF-001 list response < 2 s; no auth (ADR-003).

## Goals / Non-Goals

**Goals:**

- Prisma model `Nota` + migration `init_mvp` (table `notas` only in this phase)
- Indexes: `idx_notas_created_at` (required), `idx_notas_updated_at`, `idx_notas_title` per logical-model §3.1
- CHECK constraints on non-empty trimmed `title` and `content` (BR-001)
- `GET /api/v1/notas` with `NotaResumen` DTO and default `sort=created_at`, `order=desc` (LLD §5.4)
- `HomePage` + `NoteList` + `NoteListItem` + `useNotes` hook
- Integration tests (API) and Playwright E2E (TASK-004)
- Mark TASK-019, TASK-003, TASK-001, TASK-002, TASK-004 done in queue JSON files

**Non-Goals:**

- Tables `enlaces`, `etiquetas`, `nota_etiqueta` (PHASE-002: TASK-023, TASK-031)
- `GET /notas/:id`, POST/PUT/DELETE (US-002, US-005+)
- Pagination query params `page` / `limit` (US-001 accepts full list < 1 000 notes)
- Tag filter `?etiqueta=`, search endpoint
- Navigation to detail page (optional `<Link>` stub acceptable; full detail in US-002)
- Empty-state UX polish (US-003 V1)

## Decisions

### D1: Migration scope — `notas` only in PHASE-001

**Choice:** Migration `20260704_init_mvp` creates only table `notas`, its indexes, CHECK constraints, and `updated_at` trigger.  
**Alternatives:** Full four-table DDL in one migration (LLD §6.2 table row) — deferred to PHASE-002 when TASK-023/TASK-031 run.  
**Rationale:** Matches implementation queue order; avoids orphan tables with no API until PHASE-002.

### D2: Prisma model mapping

**Choice:** Model `Nota` with `@@map("notas")`, camelCase fields, `@@index([createdAt(sort: Desc)], map: "idx_notas_created_at")` per logical-model §3.1 and LLD §6.2.  
**UUID:** `@default(dbgenerated("gen_random_uuid()")) @db.Uuid`.

### D3: Backend layering (LLD §2.1, §4.2)

| Layer | File | Responsibility |
|-------|------|----------------|
| routes | `notas.routes.ts` | `GET /` + `validateQuery(ListNotasQuerySchema)` |
| controller | `nota.controller.ts` | `listNotas` → 200 `{ data, meta }` |
| service | `nota.service.ts` | `list(params)` orchestration |
| repository | `nota.repository.ts` | `findAll` via `prisma.nota.findMany` |
| schemas | `nota.schema.ts` | `ListNotasQuerySchema`, `NotaResumenSchema` |
| mapper | `nota.mapper.ts` | `toResumen(nota)` → ISO date strings |

Mount at `/api/v1/notas` in `routes/index.ts`. No Prisma in controller/routes.

### D4: List query defaults

**Choice:** `ListNotasQuerySchema` defaults: `sort: 'created_at'`, `order: 'desc'`. Repository uses `orderBy: { createdAt: 'desc' }`.  
**LLD reference:** §5.4 sorting table.

### D5: Frontend data flow (LLD §7.1)

```
HomePage → NoteList → NoteListItem
              ↑
           useNotes → notesApi.listNotas() → apiClient GET /notas
```

- `VITE_API_URL` for API base (from `.env.example`)
- Date display: `createdAt` formatted with `toLocaleDateString('es-ES')`
- `NoteListItem` may wrap content in `<Link to={/notas/${id}}>` as forward-compatible stub

### D6: Seed strategy

**Choice:** `prisma/seed.ts` inserts 3 notes with known titles/dates for E2E determinism. E2E fixture may also seed via API once POST exists; for US-001, DB seed is sufficient.

### D7: Test placement

| Type | Path |
|------|------|
| API integration | `tests/integration/api/notas.list.test.ts` |
| Repository | `tests/integration/repositories/nota.repository.test.ts` |
| Mapper unit | `src/backend/src/mappers/nota.mapper.test.ts` |
| Component unit | `src/frontend/src/components/notes/NoteList.test.tsx` |
| E2E | `tests/e2e/us-001-listado.spec.ts` |

## File manifest

| Path | Task | Agent |
|------|------|-------|
| `src/backend/prisma/schema.prisma` | TASK-019, TASK-003 | backend-engineer |
| `src/backend/prisma/migrations/.../migration.sql` | TASK-019, TASK-003 | backend-engineer |
| `src/backend/prisma/seed.ts` | TASK-019 | backend-engineer |
| `src/backend/src/lib/prisma.ts` | TASK-001 | backend-engineer |
| `src/backend/src/routes/notas.routes.ts` | TASK-001 | backend-engineer |
| `src/backend/src/controllers/nota.controller.ts` | TASK-001 | backend-engineer |
| `src/backend/src/services/nota.service.ts` | TASK-001 | backend-engineer |
| `src/backend/src/repositories/nota.repository.ts` | TASK-001 | backend-engineer |
| `src/backend/src/schemas/nota.schema.ts` | TASK-001 | backend-engineer |
| `src/backend/src/mappers/nota.mapper.ts` | TASK-001 | backend-engineer |
| `src/frontend/src/pages/HomePage.tsx` | TASK-002 | frontend-engineer |
| `src/frontend/src/components/notes/NoteList.tsx` | TASK-002 | frontend-engineer |
| `src/frontend/src/components/notes/NoteListItem.tsx` | TASK-002 | frontend-engineer |
| `src/frontend/src/hooks/useNotes.ts` | TASK-002 | frontend-engineer |
| `src/frontend/src/services/notesApi.ts` | TASK-002 | frontend-engineer |
| `src/frontend/src/services/apiClient.ts` | TASK-002 | frontend-engineer |
| `src/frontend/src/types/nota.ts` | TASK-002 | frontend-engineer |
| `tests/e2e/us-001-listado.spec.ts` | TASK-004 | qa-engineer |

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Split migration vs LLD single `init_mvp` for all tables | Document in design; PHASE-002 adds tables via new migration or extends schema |
| RNF-001 not met without index | TASK-003 mandatory before TASK-001 merge; optional perf script |
| E2E flakiness from stale DB | Reset/seed before each run; use docker compose test profile if needed |
| TASK-019 listed under US-005 but sequenced first | Implement as DB prerequisite for US-001; no POST API in this change |

## Migration Plan

1. `cd src/infra && docker compose up -d` (Postgres running)
2. `cd src/backend && npx prisma migrate dev --name init_mvp`
3. `npx prisma db seed`
4. `curl http://localhost:3000/api/v1/notas` → 200 with seeded notes
5. Open `http://localhost:5173/` → list visible
6. `npm run test:e2e` (or documented equivalent) → US-001 scenarios pass

**Rollback:** `npx prisma migrate reset` (dev only) or `docker compose down -v`.

## Open Questions

- _(none — scope fixed by US-001 and implementation-plan PHASE-001)_
