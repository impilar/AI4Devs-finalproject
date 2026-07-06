# Tasks: PHASE-004 — Tags (US-008)

> Queue sequences 18–20. Detail: [US-008](02-docs/02_1-product/user-stories/US-008.md).

## 1. TASK-029 — [BE] API etiquetas (backend-engineer)

- [x] 1.1 Add `etiqueta.repository.ts` and `etiqueta.service.ts` with `upsertByNames`
- [x] 1.2 Extend `createWithRelations` / add `updateWithRelations` for M:N tags
- [x] 1.3 Extend `NotaService.create` and add `update` with tags
- [x] 1.4 Add `UpdateNotaDtoSchema` and `PUT /notas/:id`
- [x] 1.5 Add tests `etiqueta.service.test.ts`, `notas.tags.test.ts`
- [x] 1.6 Mark TASK-029 done in queue and status JSON

## 2. TASK-030 — [FE] TagInput (frontend-engineer)

- [x] 2.1 Create `TagInput` component
- [x] 2.2 Integrate tags in `NoteForm`
- [x] 2.3 Mark TASK-030 done

## 3. TASK-032 — [QA] E2E US-008 (qa-engineer)

- [x] 3.1 Create `tests/e2e/us-008-etiquetas.spec.ts`
- [x] 3.2 Mark TASK-032 done

## 4. Verification

- [x] 4.1 All tests pass — ready to archive
