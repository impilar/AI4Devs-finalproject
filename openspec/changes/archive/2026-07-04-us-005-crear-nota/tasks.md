# Tasks: PHASE-003 — Create note and links (US-005, US-006)

> Queue: `implementation-queue-v1.json` sequences 12–17.  
> After each TASK-XXX section: mark `done` in `implementation-queue-v1.json` and `docs/product/user-stories/status-v1.json`.  
> Detail: [US-005](docs/product/user-stories/US-005.md), [US-006](docs/product/user-stories/US-006.md).

## 1. TASK-017 — [BE] POST /api/v1/notas (backend-engineer)

- [x] 1.1 Add `CreateNotaDtoSchema` in `nota.schema.ts`
- [x] 1.2 Add `validateBody` middleware in `validate.ts`
- [x] 1.3 Add `create()` in `nota.repository.ts`
- [x] 1.4 Add `create(dto)` in `nota.service.ts`
- [x] 1.5 Add `createNota` in controller; register `POST /` in `notas.routes.ts`
- [x] 1.6 Add integration test `tests/integration/api/notas.create.test.ts`
- [x] 1.7 Add unit test `src/backend/src/schemas/nota.schema.test.ts`
- [x] 1.8 Mark TASK-017 `done` in queue and status JSON

## 2. TASK-018 — [FE] NoteForm y botón Nueva nota (frontend-engineer)

- [x] 2.1 Add «Nueva nota» link on `HomePage`
- [x] 2.2 Create `NoteCreatePage` and route `/notas/nueva`
- [x] 2.3 Implement `NoteForm` (create mode) with client validation
- [x] 2.4 Add `notesApi.createNota` and `CreateNotaDto` type
- [x] 2.5 Redirect to `/` on successful create
- [x] 2.6 Mark TASK-018 `done` in queue and status JSON

## 3. TASK-021 — [BE] Validación URLs y persistencia enlaces (backend-engineer)

- [x] 3.1 Extend `NotaService.create` to persist `links` in transaction
- [x] 3.2 Add repository method for create with enlaces
- [x] 3.3 Integration tests for links on create
- [x] 3.4 Mark TASK-021 `done` in queue and status JSON

## 4. TASK-022 — [FE] Campo dinámico de enlaces (frontend-engineer)

- [x] 4.1 Add dynamic link rows to `NoteForm`
- [x] 4.2 Inline URL validation
- [x] 4.3 Mark TASK-022 `done` in queue and status JSON

## 5. TASK-020 — [QA] E2E US-005 (qa-engineer)

- [x] 5.1 Create `tests/e2e/us-005-crear-nota.spec.ts`
- [x] 5.2 Mark TASK-020 `done` in queue and status JSON

## 6. TASK-024 — [QA] E2E US-006 (qa-engineer)

- [x] 6.1 Create E2E for links validation and multi-link create
- [x] 6.2 Mark TASK-024 `done` in queue and status JSON

## 7. Verification (all)

- [x] 7.1 `POST /api/v1/notas` returns 201 with valid body
- [x] 7.2 Create flow from home ≤ 2 interactions; note in list
- [x] 7.3 Links persisted and validated (US-006)
- [x] 7.4 All integration and E2E tests pass
- [x] 7.5 PHASE-003 complete — ready to archive
