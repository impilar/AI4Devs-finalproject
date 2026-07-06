# Tasks: PHASE-003 V1 — Remove tag from note (US-010)

> Queue: `implementation-queue-v1.json` sequences 9–12.  
> After each TASK-XXX section: mark `done` in `implementation-queue-v1.json` and `02-docs/02_1-product/user-stories/status-v1.json`.  
> Detail: [US-010](02-docs/02_1-product/user-stories/US-010.md), [implementation-plan-v1.md §PHASE-003](02-docs/02_3-engineering/implementation-plan-v1.md).

## 1. TASK-039 — [DB] DELETE on nota_etiqueta only (backend-engineer)

- [x] 1.1 Confirm `NotaEtiqueta` FKs: cascade only when parent `Nota` or `Etiqueta` is deleted, not when bridge row is deleted
- [x] 1.2 Implement `deleteNotaEtiqueta(notaId, etiquetaId)` in repository — no delete on `notas` or `etiquetas`
- [x] 1.3 Add integration test: two notes share tag; remove from one → tag row and other association persist
- [x] 1.4 Document: no new migration for US-010 unless FK correction required
- [x] 1.5 Mark TASK-039 `done` in `implementation-queue-v1.json` and `status-v1.json`

## 2. TASK-037 — [BE] DELETE tag association endpoint (backend-engineer)

- [x] 2.1 Add `NotaTagParamsSchema` (UUID `id`, `etiquetaId`) and route `DELETE /:id/etiquetas/:etiquetaId`
- [x] 2.2 Implement `NotaService.removeTag` — verify nota + association exist; delete bridge; return void
- [x] 2.3 Controller responds `204` on success; `404` for missing note or association
- [x] 2.4 Extend `NotaDetail` mapper: `tags: { id, name }[]` on GET detail (list summary keeps `string[]`)
- [x] 2.5 Create `tests/integration/api/notas.remove-tag.test.ts` — both Gherkin scenarios + 404 cases
- [x] 2.6 Mark TASK-037 `done` in queue and status JSON

## 3. TASK-038 — [FE] Remove action on detail tag chips (frontend-engineer)

- [x] 3.1 Add `TagRef` type and update `NotaDetail.tags` in `src/frontend/src/types/nota.ts`
- [x] 3.2 Add `removeTagFromNota(notaId, etiquetaId)` in `notesApi.ts`
- [x] 3.3 Add `removeTag(etiquetaId)` to `useNote` — call API and update local `note.tags`
- [x] 3.4 Render removable chips in `NoteDetail` with `aria-label="Quitar etiqueta {name}"`
- [x] 3.5 Keep `TagInput` edit-mode remove as local-only (US-008 unchanged)
- [x] 3.6 Add unit test for remove chip callback / `NoteDetail` remove flow
- [x] 3.7 Mark TASK-038 `done` in queue and status JSON

## 4. TASK-040 — [QA] E2E disassociation and shared tag (qa-engineer)

- [x] 4.1 Extend `e2e-db-setup.ts` seed for US-010 (two-tag note + two notes sharing one tag)
- [x] 4.2 Create `tests/e2e/us-010-quitar-etiqueta.spec.ts` — scenario: remove one tag, note persists
- [x] 4.3 E2E scenario: remove shared tag from note A; note B still shows tag
- [x] 4.4 Run `npm run test:e2e -- tests/e2e/us-010-quitar-etiqueta.spec.ts`
- [x] 4.5 No regression in `us-008-etiquetas` E2E
- [x] 4.6 Mark TASK-040 `done` in queue and status JSON

## 5. Verification (all)

- [x] 5.1 Integration: DELETE → 204; shared-tag scenario; 404 cases
- [x] 5.2 Unit: FE remove chip + BE mapper/service tests green
- [x] 5.3 E2E: US-010 scenarios green
- [x] 5.4 PHASE-003 V1 complete — ready for `/opsx:verify us-010-remove-tag`
