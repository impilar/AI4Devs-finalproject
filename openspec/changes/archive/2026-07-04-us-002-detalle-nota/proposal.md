# Proposal: PHASE-002 — Note detail (US-002)

## Why

PHASE-001 delivered the notes list (US-001) but users cannot read full note content yet. US-002 is the natural next slice: open a note from the list and see title, content, links, and tags (RF-004, RF-016). This requires related tables (`enlaces`, `etiquetas`, `nota_etiqueta`) and `GET /api/v1/notas/:id` with proper 404 handling.

## What Changes

- Add Prisma models and migration for `enlaces`, `etiquetas`, `nota_etiqueta` (TASK-031, TASK-023)
- Extend `prisma/seed.ts` with sample links and tag associations (logical-model §10)
- Implement `GET /api/v1/notas/:id` returning `NotaDetail` with `links[]` and `tags[]` (TASK-005)
- Add `findById` repository query with `include` (TASK-007)
- Add `NotFoundError` and 404 handling in error handler (LLD §8.1)
- Implement `NoteDetailPage` at `/notas/:id` with navigation from list (TASK-006)
- Add Playwright E2E for US-002 Gherkin scenarios (TASK-008)
- Sync queue and status JSON as tasks complete

**Out of scope:** create/edit/delete notes (US-005+), tag assignment UI (US-008), search/filter.

## Capabilities

### New Capabilities

- `notes-relations-data-model`: tables `enlaces`, `etiquetas`, `nota_etiqueta`, FKs, indexes for detail query
- `note-detail`: `GET /api/v1/notas/:id`, detail UI, 404 flow, E2E coverage

### Modified Capabilities

- `notes-list`: list items navigate to detail route (Link already stubbed in TASK-002; behaviour completed in this change)

## Impact

| Area | Impact |
|------|--------|
| `src/backend/prisma/` | New models, migration extending MVP schema |
| `src/backend/src/` | `getNota`, `findById`, `toDetail`, errors, `validateParams` |
| `src/frontend/src/` | `NoteDetailPage`, `NoteDetail`, `useNote`, routing `/notas/:id` |
| `tests/` | API integration, repository, E2E `us-002-detalle.spec.ts` |
| APIs | New `GET /api/v1/notas/:id` |
| Queue | TASK-031, TASK-023, TASK-005, TASK-007, TASK-006, TASK-008 (sequences 6–11) |
| Agents | `backend-engineer`, `frontend-engineer`, `qa-engineer` |

**References:** [US-002](02-docs/02_1-product/user-stories/US-002.md), [implementation-plan-mvp.md §PHASE-002](02-docs/02_3-engineering/implementation-plan-mvp.md), PRD RF-004/RF-016, LLD-v1 §4.2, §5, §7.1, §8.1, §9.2.
