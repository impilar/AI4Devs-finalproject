# Proposal: PHASE-004 — Tags on notes (US-008)

## Why

Users can create notes with title, content, and links (PHASE-003) but cannot classify them by topic. US-008 delivers tag assignment on create/update with auto-creation of new tag names and M:N association (RF-007, RF-008, RF-009).

## What Changes

- Extend `POST /api/v1/notas` and `PUT /api/v1/notas/:id` to accept `tags[]` with upsert + M:N persistence (TASK-029)
- Add `TagInput` chips component in `NoteForm` (TASK-030)
- Add E2E and integration tests for auto-create, M:N, uniqueness (TASK-032)

**Out of scope:** filter by tag (US-009), tag catalog UI, delete tag entity.

## Capabilities

### New Capabilities

- `note-tags`: `tags[]` on create/update, `EtiquetaService.upsertByNames`, M:N in `nota_etiqueta`, `TagInput` UI, E2E US-008

### Modified Capabilities

- `note-create`: `POST /notas` response includes populated `tags[]` when sent

## Impact

| Area | Impact |
|------|--------|
| `src/backend/src/` | `etiqueta.service`, `etiqueta.repository`, extend `NotaService.create/update`, `UpdateNotaDtoSchema` |
| `src/frontend/src/` | `TagInput`, `NoteForm` tags field |
| `tests/` | `notas.tags.test.ts`, `us-008-etiquetas.spec.ts` |
| Queue | TASK-029, 030, 032 (sequences 18–20) |

**References:** [US-008](docs/product/user-stories/US-008.md), LLD-v1 §5.1–5.2, §5.6, logical-model-v1 §3.3–3.4.
