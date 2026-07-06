# Proposal: PHASE-003 V1 — Remove tag from note (US-010)

## Why

US-008 lets users assign tags on create/update, but reorganizing requires replacing the full `tags` array via PUT. US-010 (V1) adds targeted removal: disassociate one tag from a note without deleting the note or the global tag when other notes still use it (roadmap §Release V1, LLD-v1 §4.2, RF-010).

## What Changes

- Verify `nota_etiqueta` bridge delete does not remove `notas` or `etiquetas` rows (TASK-039)
- Add `DELETE /api/v1/notas/:id/etiquetas/:etiquetaId` returning `204` (TASK-037)
- Extend note detail payload with tag IDs for DELETE calls; add removable tag chips in `NoteDetail` (TASK-038)
- Add integration + E2E tests for both Gherkin scenarios (TASK-040)
- Sync `implementation-queue-v1.json` and `status-v1.json` as tasks complete

**Out of scope:** delete global tag entity, bulk untag, auth, new tables, tag rename, filter-panel changes.

## Capabilities

### New Capabilities

- _(none — extends existing tag and detail capabilities)_

### Modified Capabilities

- `note-tags`: Add DELETE association endpoint and persistence rules (US-010 Gherkin)
- `note-detail`: Removable tag chips in read view; detail includes tag `id` + `name` for DELETE

## Impact

| Area | Impact |
|------|--------|
| `src/backend/src/routes/notas.routes.ts` | New DELETE route |
| `src/backend/src/controllers/`, `services/`, `repositories/` | `removeTag` flow |
| `src/backend/src/mappers/nota.mapper.ts` | Detail tags as `{ id, name }[]` |
| `src/frontend/src/components/notes/NoteDetail.tsx` | Removable chips + API call |
| `src/frontend/src/services/notesApi.ts` | `removeTagFromNota` |
| `src/frontend/src/hooks/useNote.ts` | `removeTag` action |
| `tests/integration/api/` | `notas.remove-tag.test.ts` |
| `tests/e2e/` | `us-010-quitar-etiqueta.spec.ts` |
| APIs | New `DELETE`; `GET /notas/:id` tag shape extended on detail |
| Queue | TASK-039, TASK-037, TASK-038, TASK-040 (`implementation-queue-v1.json` sequences 9–12) |

**References:** [US-010](02-docs/02_1-product/user-stories/US-010.md), [implementation-plan-v1.md §PHASE-003](02-docs/02_3-engineering/implementation-plan-v1.md), LLD-v1 §4.2, logical-model-v1 §3.3, RF-010, RNF-001, RNF-006.
