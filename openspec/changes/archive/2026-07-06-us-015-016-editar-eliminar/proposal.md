# Proposal: PHASE-007 — Edit and delete (US-015, US-016)

## Why

Users can create, list, filter, and search notes but cannot update or remove them. US-015 and US-016 complete the CRUD lifecycle so users maintain accurate knowledge and remove obsolete content (RF-005, RF-006, BR-004, BR-006, RNF-001).

## What Changes

- Verify `updated_at` auto-refresh via Prisma `@updatedAt` on `notas` (TASK-059)
- Verify `ON DELETE CASCADE` on `enlaces` and `nota_etiqueta` FKs (TASK-063)
- Add `PUT /api/v1/notas/:id` with `UpdateNotaDto` — partial update, replace links/tags when sent (TASK-057)
- Add edit mode in `NoteDetailPage` reusing `NoteForm` pre-filled (TASK-058)
- Add `DELETE /api/v1/notas/:id` returning 204 — hard delete, no soft-delete (TASK-061)
- Add delete button with `ConfirmDialog` and redirect to home list (TASK-062)
- Add QA: integration + E2E for edit fields, `updatedAt` refresh, SLA < 2 s (TASK-060)
- Add QA: integration + E2E for confirm, cancel, irreversible delete (TASK-064)

**Out of scope:** soft-delete / trash, undo, edit from list inline, remove individual tag without full replace (US-010), backlinks (US-017).

## Capabilities

### New Capabilities

- `note-update`: `PUT /notas/:id`, `NotaService.update`, edit mode in detail view, E2E US-015
- `note-delete`: `DELETE /notas/:id`, `ConfirmDialog`, cascade cleanup, E2E US-016

### Modified Capabilities

- `note-detail`: add edit and delete actions on detail page; detail view after save shows refreshed `updatedAt`

## Impact

| Area | Impact |
|------|--------|
| `src/backend/prisma/` | Verify `@updatedAt` and CASCADE (TASK-059, TASK-063) — no new migration expected |
| `src/backend/src/` | `notas.routes`, `nota.controller`, `nota.service`, `nota.repository`, `nota.schema` (`UpdateNotaDtoSchema`) |
| `src/frontend/src/` | `NoteDetailPage`, `NoteDetail`, `NoteForm` (edit mode), `ConfirmDialog`, `useNote`, `notesApi` |
| `tests/` | `notas.update.test.ts`, `notas.delete.test.ts`, `us-015-edicion.spec.ts`, `us-016-eliminar.spec.ts` |
| Queue | TASK-059, 063, 057, 058, 060, 061, 062, 064 (sequences 33–40) |

**References:** [US-015](docs/product/user-stories/US-015.md), [US-016](docs/product/user-stories/US-016.md), [PHASE-007](docs/engineering/implementation-plan-mvp.md), LLD-v1 §4.2, §5.2, §5.3, §7.2, logical-model-v1 §4–5.
