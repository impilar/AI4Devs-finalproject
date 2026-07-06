# Tasks: PHASE-002 V2+ — Tag catalog (US-011)

> Queue: `implementation-queue-v2.json` sequences 5–8.

## 1. TASK-043 — [DB] COUNT query (backend-engineer)

- [x] 1.1 Implement `findAllWithCount` in `etiqueta.repository.ts` with Prisma `_count`
- [x] 1.2 Add repository integration test with known counts
- [x] 1.3 Mark TASK-043 `done` in queue and status JSON

## 2. TASK-041 — [BE] GET /etiquetas catalog (backend-engineer)

- [x] 2.1 Add `etiqueta.schema.ts` with `EtiquetaCatalogItemSchema`
- [x] 2.2 Update `etiqueta.service` and controller response shape
- [x] 2.3 Add `tests/integration/api/etiquetas.list.test.ts`
- [x] 2.4 Mark TASK-041 `done` in queue and status JSON

## 3. TASK-042 — [FE] TagCatalog (frontend-engineer)

- [x] 3.1 Create `TagCatalog.tsx` with `name (count)` labels
- [x] 3.2 Update `notesApi`, types, `useNotes`, `HomePage` sidebar
- [x] 3.3 Unit tests `TagCatalog.test.tsx`
- [x] 3.4 Mark TASK-042 `done` in queue and status JSON

## 4. TASK-044 — [QA] E2E US-011 (qa-engineer)

- [x] 4.1 Add `catalog` seed mode and `us-011-catalogo-etiquetas.spec.ts`
- [x] 4.2 Update US-009 E2E selectors for count labels
- [x] 4.3 Mark TASK-044 `done` in queue and status JSON
