# Design: PHASE-003 V1 — Remove tag from note (US-010)

## Context

MVP/US-008 delivers tag assignment via `tags: string[]` on POST/PUT and M:N persistence in `nota_etiqueta`. `TagInput` already removes chips in edit mode locally until save. US-010 adds **persisted** removal of a single association from note detail (read view) without touching note content or the global `etiquetas` row when shared.

**Current state:**

- No `DELETE /api/v1/notas/:id/etiquetas/:etiquetaId`
- `NotaDetail.tags` is `string[]` only — no `etiquetaId` for DELETE path param
- `NoteDetail` renders read-only tag pills without remove action
- Prisma `NotaEtiqueta` composite PK; FK cascade only when parent `Nota` or `Etiqueta` row is deleted

**Target state:** User clicks X on a tag chip in detail → `204` → chip disappears; note remains; shared tags persist on other notes.

**Constraints:** LLD-v1 `DELETE /notas/:id/etiquetas/:tagId`; RNF-006 (mutations via API); no new migration unless FK fix required.

## Goals / Non-Goals

**Goals:**

- `DELETE` removes only `nota_etiqueta` row (TASK-039, TASK-037)
- `204 No Content` on success; `404` if note or association missing
- Detail response includes `{ id, name }` per tag for FE DELETE (TASK-038)
- `NoteDetail` removable chips with `aria-label="Quitar etiqueta {name}"`
- `useNote.removeTag` updates local state after success
- Integration tests for both Gherkin scenarios at API level (TASK-040)
- E2E `us-010-quitar-etiqueta.spec.ts`
- Mark TASK-039, TASK-037, TASK-038, TASK-040 `done` in queue + status

**Non-Goals:**

- DELETE global tag (`etiquetas` row)
- Confirmation dialog (optional per US-010; not required by Gherkin)
- Remove via PUT with full tag array replacement (existing US-008 path)
- List/summary card tag removal

## Decisions

### D1: Detail tag shape — `TagRef[]` on `NotaDetail` only

**Choice:** Extend `NotaDetail` with `tags: { id: string; name: string }[]`. Keep `NotaResumen.tags` as `string[]` for list cards.

**Rationale:** DELETE requires `etiquetaId`; avoids extra lookup round-trip. List API unchanged.

**Alternatives:** Lookup by name via extended `GET /etiquetas` — rejected; names are unique but IDs are canonical in LLD path.

### D2: DELETE route and service flow

**Choice:**

```
DELETE /api/v1/notas/:id/etiquetas/:etiquetaId
→ validate UUID params
→ NotaService.removeTag(notaId, etiquetaId)
  → assert nota exists
  → delete notaEtiqueta composite key
→ 204
```

**LLD reference:** §4.2, `NotaService.removeTag`.

### D3: DB — bridge delete only (TASK-039)

**Choice:** `prisma.notaEtiqueta.delete({ where: { notaId_etiquetaId: { notaId, etiquetaId } } })`. No `delete` on `nota` or `etiqueta`.

**Verification:** Two notes share tag T; remove T from note A → `etiquetas` row T exists; note B still linked.

### D4: Frontend component split

**Choice:**

| Context | Component | Behavior |
|---------|-----------|----------|
| Detail read | `RemovableTagChip` or extend pills in `NoteDetail` | Calls `removeTagFromNota` immediately |
| Form edit | `TagInput` chip X | Local state only until PUT (unchanged US-008) |

### D5: Hook and optimistic UI

**Choice:** On `204`, `useNote` filters removed tag from `note.tags` in state; optional refetch not required for happy path.

**Error:** Show `ErrorMessage` on 404/network failure; restore chip if optimistic (prefer pessimistic: remove after 204 only).

### D6: E2E seed

**Choice:** Extend `e2e-db-setup.ts` with mode or inline seed for US-010: note «Reunión» with `trabajo`+`urgente`; two notes sharing `trabajo`.

**Placement:** `tests/e2e/us-010-quitar-etiqueta.spec.ts`

### D7: Test placement

| Layer | File |
|-------|------|
| Integration | `tests/integration/api/notas.remove-tag.test.ts` |
| Integration DB | `tests/integration/repositories/etiqueta.schema.test.ts` or dedicated remove-tag repo test |
| Unit FE | `RemovableTagChip.test.tsx` or `NoteDetail` remove test |
| E2E | `tests/e2e/us-010-quitar-etiqueta.spec.ts` |

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Breaking change to `NotaDetail.tags` shape | Only detail endpoint changes; update FE types + mapper tests; list unchanged |
| Confusion TagInput remove vs detail remove | D4 documents behavior; E2E covers detail path |
| Shared tag scenario | Integration + E2E assert note B unchanged |

## Migration Plan

1. Verify DB / repository delete (TASK-039)
2. Implement BE DELETE + mapper tag refs (TASK-037)
3. FE chips + hook + API client (TASK-038)
4. Tests + E2E (TASK-040)
5. `/opsx:verify us-010-remove-tag` then archive

**Rollback:** Remove route and UI; revert detail tag shape if needed.

## Open Questions

- _(none — scope fixed by US-010 and implementation-plan-v1 PHASE-003)_
