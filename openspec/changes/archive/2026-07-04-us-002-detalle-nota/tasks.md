# Tasks: PHASE-002 — Note detail (US-002)

> Queue: `implementation-queue-mvp.json` sequences 6–11.  
> After each TASK-XXX section: mark `done` in `implementation-queue-mvp.json` and `02-docs/02_1-product/user-stories/status-v1.json`.  
> Detail: [US-002](02-docs/02_1-product/user-stories/US-002.md), [US-006 §TASK-023](02-docs/02_1-product/user-stories/US-006.md), [US-008 §TASK-031](02-docs/02_1-product/user-stories/US-008.md).

## 1. TASK-031 — [DB] Tablas etiquetas y nota_etiqueta (backend-engineer)

- [x] 1.1 Add Prisma models `Etiqueta`, `NotaEtiqueta` with relations to `Nota`
- [x] 1.2 Create migration `add_etiquetas_mvp` with DDL `etiquetas`, `nota_etiqueta`, indexes
- [x] 1.3 Run `npx prisma migrate deploy` and `prisma generate`
- [x] 1.4 Extend `seed.ts` with sample etiquetas and associations (logical-model §10)
- [x] 1.5 Mark TASK-031 `done` in queue and status JSON

## 2. TASK-023 — [DB] Tabla enlaces (backend-engineer)

- [x] 2.1 Add Prisma model `Enlace` with FK to `Nota` ON DELETE CASCADE
- [x] 2.2 Create migration `add_enlaces_mvp` with `enlaces` table and `idx_enlaces_nota_id`
- [x] 2.3 Extend seed with sample enlaces for demo note
- [x] 2.4 Mark TASK-023 `done` in queue and status JSON

## 3. TASK-005 — [BE] GET /api/v1/notas/:id (backend-engineer)

- [x] 3.1 Add `schemas/common.schema.ts` — `IdParamSchema`
- [x] 3.2 Add `errors/AppError.ts`, `NotFoundError.ts`; extend `errorHandler` for 404
- [x] 3.3 Add `validateParams` middleware
- [x] 3.4 Extend `nota.schema.ts` — `NotaDetailSchema`
- [x] 3.5 Add `toDetail()` in `nota.mapper.ts`
- [x] 3.6 Add `findById()` in `nota.repository.ts` with include
- [x] 3.7 Add `getById()` in `nota.service.ts`
- [x] 3.8 Add `getNota` in controller; register `GET /:id` in `notas.routes.ts`
- [x] 3.9 Add integration test `tests/integration/api/notas.getById.test.ts`
- [x] 3.10 Mark TASK-005 `done` in queue and status JSON

## 4. TASK-007 — [DB] JOIN query for detail (backend-engineer)

- [x] 4.1 Verify `findById` uses single Prisma query with `include` (no N+1)
- [x] 4.2 Confirm indexes `idx_enlaces_nota_id`, `idx_nota_etiqueta_nota` used
- [x] 4.3 Add integration test for `findById` with links and tags in repository test
- [x] 4.4 Mark TASK-007 `done` in queue and status JSON

## 5. TASK-006 — [FE] NoteDetailPage y navegación (frontend-engineer)

- [x] 5.1 Add `NotaDetail` type in `types/nota.ts`
- [x] 5.2 Add `notesApi.getNota(id)` and `apiGet` error handling for 404
- [x] 5.3 Create `useNote` hook (loading, error, notFound, note)
- [x] 5.4 Create `NoteDetail` component (title, content, links, tags)
- [x] 5.5 Create `NoteDetailPage` with back link to `/`
- [x] 5.6 Register route `/notas/:id` in `App.tsx`
- [x] 5.7 Add unit test `NoteDetail.test.tsx`
- [x] 5.8 Mark TASK-006 `done` in queue and status JSON

## 6. TASK-008 — [QA] E2E detalle US-002 (qa-engineer)

- [x] 6.1 Extend `tests/e2e/fixtures/seed.ts` — note with content, link, tag
- [x] 6.2 Create `tests/e2e/us-002-detalle.spec.ts` — scenario «Abrir detalle desde el listado»
- [x] 6.3 Add scenario «Nota no encontrada» with return to list
- [x] 6.4 Mark TASK-008 `done` in queue and status JSON

## 7. Verification (all)

- [x] 7.1 `GET /api/v1/notas/:id` returns detail with links/tags for seeded note
- [x] 7.2 List click opens detail; 404 shows message and path back to `/`
- [x] 7.3 All integration and E2E tests pass
- [x] 7.4 PHASE-002 complete — ready to archive or start PHASE-003
