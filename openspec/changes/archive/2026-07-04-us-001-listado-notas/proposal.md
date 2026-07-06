# Proposal: PHASE-001 — Notes schema and list (US-001)

## Why

PHASE-000 delivered a runnable stack (PostgreSQL, Express health check, React shell) but no domain data or user-facing features. US-001 is the first vertical slice of the MVP: users must see all their notes on the home screen to orient themselves in their personal library (PRD RF-015). This change unblocks all subsequent stories (detail, create, tags, search) by establishing the `notas` table and the list API + UI.

## What Changes

- Add Prisma model `Nota` and migration `init_mvp` with table `notas`, CHECK constraints, indexes, and `updated_at` trigger (TASK-019, TASK-003)
- Add `prisma/seed.ts` with sample notes for local dev and E2E
- Implement `GET /api/v1/notas` returning `{ data: NotaResumen[], meta: { total } }` ordered by `createdAt` desc (TASK-001)
- Implement `HomePage` at `/` with `NoteList` / `NoteListItem` consuming the API (TASK-002)
- Add integration tests (API, repository) and Playwright E2E for US-001 Gherkin scenarios (TASK-004)
- Sync `implementation-queue-mvp.json` and `status-v1.json` as tasks complete

**Out of scope for this change:** note detail (US-002), create/edit/delete (US-005+), tags, links tables, search, pagination query params.

## Capabilities

### New Capabilities

- `notes-data-model`: PostgreSQL `notas` table, Prisma schema, indexes (`idx_notas_created_at`), CHECK constraints, seed data
- `notes-list`: `GET /api/v1/notas` API, frontend list on home page, E2E coverage for list scenarios

### Modified Capabilities

- _(none — `platform-health` and `local-dev-stack` unchanged)_

## Impact

| Area | Impact |
|------|--------|
| `src/backend/prisma/` | Model `Nota`, migration `init_mvp`, `seed.ts` |
| `src/backend/src/` | routes, controller, service, repository, schemas, mapper for notes list |
| `src/frontend/src/` | `HomePage`, `NoteList`, `NoteListItem`, `useNotes`, `notesApi` |
| `tests/` | Integration API/repository tests; E2E `us-001-listado.spec.ts` |
| APIs | New `GET /api/v1/notas` |
| Queue | TASK-019, TASK-003, TASK-001, TASK-002, TASK-004 (`sequence` 1–5) |
| Agents | `backend-engineer` (DB + BE), `frontend-engineer` (FE), `qa-engineer` (E2E) |

**References:** [US-001](02-docs/02_1-product/user-stories/US-001.md), [US-005 §TASK-019](02-docs/02_1-product/user-stories/US-005.md), [implementation-plan-mvp.md §PHASE-001](02-docs/02_3-engineering/implementation-plan-mvp.md), PRD RF-015, RNF-001, LLD-v1 §4.2, §5.4, §6.2, §7.1, §9.1.
