# Proposal: PHASE-003 — Create note and links (US-005, US-006)

## Why

PHASE-001 and PHASE-002 let users browse and read notes, but they cannot capture new ideas yet. US-005 is the core capture flow (RF-001, RF-003, RNF-003): create a note with title and content in at most two interactions. US-006 extends the same form with optional links (RF-002). This slice unblocks tags (US-008), edit/delete (US-015/016), and all downstream features that depend on note creation.

## What Changes

- Implement `POST /api/v1/notas` with `CreateNotaDtoSchema` (Zod) and `201 { data: NotaDetail }` (TASK-017)
- Add `NoteForm`, `NoteCreatePage`, and «Nueva nota» entry point on home (TASK-018)
- Extend create flow to validate and persist `links[]` in transaction (TASK-021)
- Add dynamic link fields in `NoteForm` (TASK-022)
- Add Playwright E2E for US-005 and US-006 Gherkin (TASK-020, TASK-024)
- Sync queue and status JSON as tasks complete

**Out of scope:** tag assignment UI (US-008), edit/delete (US-015/016), search/filter.

## Capabilities

### New Capabilities

- `note-create`: `POST /api/v1/notas`, create form UI, validation (title/content required), E2E for US-005
- `note-links-create`: optional `links[]` on create, URL validation, dynamic form fields, E2E for US-006

### Modified Capabilities

- `notes-list`: newly created notes appear in list after redirect to home (behaviour verified in US-005 E2E; no API contract change)

## Impact

| Area | Impact |
|------|--------|
| `src/backend/src/` | `CreateNotaDtoSchema`, `validateBody`, `createNota`, `NotaService.create`, repository `create` |
| `src/frontend/src/` | `NoteForm`, `NoteCreatePage`, `HomePage` button, route `/notas/nueva`, `notesApi.createNota` |
| `tests/` | Integration `notas.create.test.ts`, schema unit test, E2E `us-005-crear-nota.spec.ts`, `us-006-enlaces.spec.ts` |
| APIs | New `POST /api/v1/notas` |
| Queue | TASK-017, 018, 021, 022, 020, 024 (sequences 12–17) |
| Agents | `backend-engineer`, `frontend-engineer`, `qa-engineer` |

**References:** [US-005](02-docs/02_1-product/user-stories/US-005.md), [US-006](02-docs/02_1-product/user-stories/US-006.md), [implementation-plan-mvp.md §PHASE-003](02-docs/02_3-engineering/implementation-plan-mvp.md), PRD RF-001/RF-002/RF-003, LLD-v1 §4.2–4.3, §5.1, §7.1, §9.2.
