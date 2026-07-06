# Tasks: PHASE-007 — Edit and delete (US-015, US-016)

> Queue sequences 33–40. Detail: [US-015](docs/product/user-stories/US-015.md), [US-016](docs/product/user-stories/US-016.md).

## 1. TASK-059 — [DB] updated_at on UPDATE (backend-engineer)

- [x] 1.1 Verify `Nota.updatedAt` has `@updatedAt` in `schema.prisma`
- [x] 1.2 Confirm `updated_at TIMESTAMPTZ` in `20260704120000_init_mvp/migration.sql`
- [x] 1.3 Mark TASK-059 done in queue and status JSON

## 2. TASK-063 — [DB] ON DELETE CASCADE (backend-engineer)

- [x] 2.1 Verify `onDelete: Cascade` on `Enlace.nota` and `NotaEtiqueta.nota` in `schema.prisma`
- [x] 2.2 Confirm FK CASCADE in init migration SQL for `enlaces` and `nota_etiqueta`
- [x] 2.3 Mark TASK-063 done in queue and status JSON

## 3. TASK-057 — [BE] PUT /notas/:id (backend-engineer)

- [x] 3.1 Add `UpdateNotaDtoSchema` in `nota.schema.ts`
- [x] 3.2 Implement `nota.repository.update`, `nota.service.update` with `$transaction` (links/tags replace)
- [x] 3.3 Add `PUT /:id` route and `notaController.updateNota`
- [x] 3.4 Integration tests in `tests/integration/api/notas.update.test.ts`
- [x] 3.5 Mark TASK-057 done

## 4. TASK-058 — [FE] Edit mode in NoteDetail (frontend-engineer)

- [x] 4.1 Extend `NoteForm` with `mode`, `initialValues`, edit submit
- [x] 4.2 Add `updateNota` to `notesApi` and `useNote.updateNote`
- [x] 4.3 Wire edit/save/cancel in `NoteDetailPage` and show `updatedAt` in read view
- [x] 4.4 Mark TASK-058 done

## 5. TASK-060 — [QA] Edit tests (qa-engineer)

- [x] 5.1 Integration assertions for `updatedAt` refresh and partial update
- [x] 5.2 E2E `us-015-edicion.spec.ts` — Gherkin scenarios + SLA < 2 s
- [x] 5.3 Mark TASK-060 done

## 6. TASK-061 — [BE] DELETE /notas/:id (backend-engineer)

- [x] 6.1 Implement `nota.repository.delete`, `nota.service.delete`, `notaController.deleteNota`
- [x] 6.2 Add `DELETE /:id` route returning 204
- [x] 6.3 Integration tests in `tests/integration/api/notas.delete.test.ts` (CASCADE)
- [x] 6.4 Mark TASK-061 done

## 7. TASK-062 — [FE] Delete with ConfirmDialog (frontend-engineer)

- [x] 7.1 Create or reuse `ConfirmDialog` component
- [x] 7.2 Add `deleteNota` to `notesApi` and `useNote.deleteNote`
- [x] 7.3 Wire delete button, dialog, and redirect to `/` in `NoteDetailPage`
- [x] 7.4 Mark TASK-062 done

## 8. TASK-064 — [QA] Delete tests (qa-engineer)

- [x] 8.1 Integration assertions for 204, 404, and relation cleanup
- [x] 8.2 E2E `us-016-eliminacion.spec.ts` — confirm and cancel scenarios
- [x] 8.3 Mark TASK-064 done

## 9. Verification

- [x] 9.1 All tests pass — ready to archive
