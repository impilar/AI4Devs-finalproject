# Design: PHASE-007 — Edit and delete (US-015, US-016)

## Context

CRUD create/read exists (US-005, US-002) with links and tags. Search and tag filter are done (PHASE-006). `schema.prisma` already defines `Nota.updatedAt` with `@updatedAt` and `onDelete: Cascade` on `Enlace.nota` and `NotaEtiqueta.nota` from init migration `20260704120000_init_mvp`. No `PUT` or `DELETE` handlers exist yet. `NoteForm` supports create only; `NoteDetail` is read-only.

## Goals / Non-Goals

**Goals:**

- `PUT /api/v1/notas/:id` with `UpdateNotaDto` (partial fields, ≥1 required); replace `links` and `tags` when present in body (LLD §5.2)
- Prisma `@updatedAt` refreshes timestamp on every update (BR-006); verify in TASK-059
- Edit mode in detail: pre-filled `NoteForm`, save returns to read view with updated `updatedAt`
- `DELETE /api/v1/notas/:id` → 204; CASCADE removes `enlaces` and `nota_etiqueta` rows (BR-004)
- `ConfirmDialog` before delete; cancel keeps note; confirm redirects to `/`
- Meet RNF-001 (< 2 s) for PUT and DELETE in TASK-060 / integration tests

**Non-Goals:**

- Soft-delete, trash, or undo
- PATCH partial semantics beyond documented replace rules for links/tags
- Orphan tag cleanup after delete
- Edit from home list without opening detail

## Decisions

### D1: DB tasks are verification-only

`@updatedAt` and CASCADE are already in `schema.prisma` and init migration (logical-model-v1 §4, §5; LLD §6.2). TASK-059 and TASK-063 verify alignment — no new migration unless drift is found.

### D2: Update uses single Prisma `$transaction`

`NotaService.update` (LLD §5.2): find note → if `links` sent, delete all + recreate → if `tags` sent, upsert tags + replace M:N → update scalar fields. One transaction avoids partial state.

### D3: `UpdateNotaDtoSchema = CreateNotaDtoSchema.partial().refine(≥1 field)`

Same validation rules as create when a field is present. Client must send at least one field (LLD §4.3).

### D4: Reuse `NoteForm` in edit mode

`NoteForm` accepts optional `initialValues` and `onSubmit` callback. `NoteDetailPage` toggles `isEditing`; on success, refetch note and exit edit mode. Avoids duplicate form logic (US-015 negotiable scope).

### D5: `ConfirmDialog` for irreversible delete

Copy: confirm permanent deletion. On confirm: `DELETE` via `notesApi.deleteNote(id)` → `navigate('/')`. On cancel: close dialog, no API call (LLD §7.2).

### D6: Task order

1. TASK-059 + TASK-063 — verify DB (parallel)
2. TASK-057 — PUT endpoint + integration tests
3. TASK-058 — edit UI
4. TASK-060 — QA edit
5. TASK-061 — DELETE endpoint (depends on TASK-057, TASK-063)
6. TASK-062 — delete UI
7. TASK-064 — QA delete

## Risks / Trade-offs

- [Replace links/tags wipes omitted arrays] → Document: omit field = no change; send `[]` = clear all
- [Concurrent edit last-write-wins] → Acceptable MVP single-user; no optimistic locking
- [Delete is irreversible] → ConfirmDialog mitigates mis-clicks; no recovery path in MVP

## Migration Plan

No schema migration expected. Deploy backend PUT/DELETE routes, then frontend edit/delete UI. Rollback: hide buttons; endpoints unused.

## Open Questions

None for MVP.
