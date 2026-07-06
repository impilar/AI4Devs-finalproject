# Tasks: PHASE-002 V1 — Form validation feedback (US-007)

> Queue: `implementation-queue-v1.json` sequences 5–8.  
> After each TASK-XXX section: mark `done` in `implementation-queue-v1.json` and `02-docs/02_1-product/user-stories/status-v1.json`.  
> Detail: [US-007](02-docs/02_1-product/user-stories/US-007.md), [implementation-plan-v1.md §PHASE-002](02-docs/02_3-engineering/implementation-plan-v1.md).

## 1. TASK-025 — [BE] 400 responses with per-field details (backend-engineer)

- [x] 1.1 Verify `CreateNotaDtoSchema` and `UpdateNotaDtoSchema` use Spanish messages: «El título es obligatorio», «El contenido es obligatorio»
- [x] 1.2 Confirm `errorHandler` maps `ZodError` to `details: { field, message }[]` with paths `title`, `content`, `links.N`
- [x] 1.3 Harden `tests/integration/api/notas.create.test.ts`: assert exact `message` in `details` for empty title and content
- [x] 1.4 Add `tests/integration/api/notas.update.test.ts` cases: PUT with empty title/content → 400 + exact `details`
- [x] 1.5 Confirm unit tests in `src/backend/src/schemas/nota.schema.test.ts` cover Spanish messages
- [x] 1.6 Mark TASK-025 `done` in `implementation-queue-v1.json` and `status-v1.json`

## 2. TASK-027 — [DB] No schema changes (backend-engineer)

- [x] 2.1 Confirm `notas.title` and `notas.content` are NOT NULL in Prisma schema and migration
- [x] 2.2 Verify invalid create/update never reaches Prisma on normal API flow (400 from Zod first)
- [x] 2.3 Document in PR/commit: no new migration for US-007
- [x] 2.4 Mark TASK-027 `done` in queue and status JSON

## 3. TASK-026 — [FE] Inline validation and form state preservation (frontend-engineer)

- [x] 3.1 Verify `NoteForm` uses controlled state; errors do not reset `title`, `content`, `links`, or `tags`
- [x] 3.2 Verify `validateClient()` shows «El título es obligatorio» / «El contenido es obligatorio» with `role="alert"` near fields
- [x] 3.3 Verify `ValidationApiError` maps server `details` to `fieldErrors` without clearing inputs (create and edit)
- [x] 3.4 Add `NoteForm.validation.test.tsx`: content preserved when title empty; server error mapping smoke
- [x] 3.5 Confirm `noValidate` on form; identical behavior in create (`/notas/nueva`) and edit (detail page)
- [x] 3.6 Mark TASK-026 `done` in queue and status JSON

## 4. TASK-028 — [QA] E2E validation and no data loss (qa-engineer)

- [x] 4.1 Create `tests/e2e/us-007-validacion-formulario.spec.ts`
- [x] 4.2 Scenario: `/notas/nueva` — content without title → «El título es obligatorio» + content preserved
- [x] 4.3 Scenario: edit seeded note — clear title, keep content → same validation message + content preserved
- [x] 4.4 Run `npm run test:e2e -- tests/e2e/us-007-validacion-formulario.spec.ts`
- [x] 4.5 No regression in `us-005-crear-nota` and `us-015-edicion` E2E specs
- [x] 4.6 Mark TASK-028 `done` in queue and status JSON

## 5. Verification (all)

- [x] 5.1 Integration: POST/PUT invalid → 400 with `details` and exact Spanish messages
- [x] 5.2 Unit: `NoteForm.validation.test.tsx` green
- [x] 5.3 E2E: US-007 scenarios green
- [x] 5.4 PHASE-002 V1 complete — ready for `/opsx:verify us-007-form-validation`
