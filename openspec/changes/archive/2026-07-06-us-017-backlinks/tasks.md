# Tasks: PHASE-003 V2+ — Note backlinks (US-017)

> Queue: `implementation-queue-v2.json` sequences 9–12.

## 1. TASK-067 — [DB] nota_backlink table (backend-engineer)

- [x] 1.1 Add `NotaBacklink` model and inverse relations on `Nota` in `schema.prisma`
- [x] 1.2 Generate and apply Prisma migration with indexes
- [x] 1.3 Add `tests/integration/repositories/backlink.repository.test.ts` (insert + CASCADE)
- [x] 1.4 Mark TASK-067 `done` in queue and status JSON

## 2. TASK-065 — [BE] Backlinks API (backend-engineer)

- [x] 2.1 Create `backlink.schema.ts`, repository, service, controller
- [x] 2.2 Register `POST /:id/backlinks`, `GET .../salientes`, `GET .../entrantes` in `notas.routes.ts`
- [x] 2.3 Add `tests/integration/api/notas.backlinks.test.ts` and service unit tests
- [x] 2.4 Mark TASK-065 `done` in queue and status JSON

## 3. TASK-066 — [FE] NoteLinkPicker and BacklinksPanel (frontend-engineer)

- [x] 3.1 Add types and `notesApi` methods for backlinks
- [x] 3.2 Create `NoteLinkPicker.tsx` and `BacklinksPanel.tsx` with MindVault styles
- [x] 3.3 Wire `NoteForm`, `NoteDetail`, `NoteDetailPage`, `useNote`
- [x] 3.4 Unit tests for picker and panel components
- [x] 3.5 Mark TASK-066 `done` in queue and status JSON

## 4. TASK-068 — [QA] E2E US-017 (qa-engineer)

- [x] 4.1 Add `backlinks` seed mode in `e2e-db-setup.ts` and `seed.ts`
- [x] 4.2 Add `tests/e2e/us-017-backlinks.spec.ts` for both Gherkin scenarios
- [x] 4.3 Verify no regression in US-002 / US-015 E2E
- [x] 4.4 Mark TASK-068 `done` in queue and status JSON
