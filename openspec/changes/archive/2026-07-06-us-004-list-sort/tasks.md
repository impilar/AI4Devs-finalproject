# Tasks: PHASE-001 V2+ — List sort (US-004)

> Queue: `implementation-queue-v2.json` sequences 1–4.

## 1. TASK-015 — [DB] Verify title index (backend-engineer)

- [x] 1.1 Confirm `idx_notas_title` in `schema.prisma` and init migration
- [x] 1.2 Add repository integration test for index presence
- [x] 1.3 Add list query test with `sort: title`
- [x] 1.4 Mark TASK-015 `done` in queue and status JSON

## 2. TASK-013 — [BE] Sort query contract (backend-engineer)

- [x] 2.1 Add integration tests title asc/desc and created_at asc
- [x] 2.2 Add `ListNotasQuerySchema` unit tests
- [x] 2.3 Mark TASK-013 `done` in queue and status JSON

## 3. TASK-014 — [FE] NoteSortSelect (frontend-engineer)

- [x] 3.1 Add `noteListSortSession` utility and `NoteSortSelect` component
- [x] 3.2 Wire `useNotes` / `notesApi` / `HomePage`
- [x] 3.3 Unit tests for selector and session helper
- [x] 3.4 Mark TASK-014 `done` in queue and status JSON

## 4. TASK-016 — [QA] E2E US-004 (qa-engineer)

- [x] 4.1 Add `sort` seed mode and `us-004-ordenacion-listado.spec.ts`
- [x] 4.2 Mark TASK-016 `done` in queue and status JSON
