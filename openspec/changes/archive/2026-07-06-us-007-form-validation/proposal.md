# Proposal: PHASE-002 V1 — Form validation feedback (US-007)

## Why

MVP delivered note create/edit with basic validation, but users can still lose context when required fields fail: messages may be generic, server `details` are not always asserted end-to-end, and there is no dedicated E2E for US-007 Gherkin. V1 PHASE-002 unifies inline validation in `NoteForm` (create and edit) so users see Spanish messages per field without losing entered data (roadmap §Release V1, LLD-v1 §12).

## What Changes

- Verify and harden `POST`/`PUT` `400 VALIDATION_ERROR` responses with `error.details: { field, message }[]` and Gherkin-aligned Spanish messages (TASK-025)
- Confirm `NoteForm` client validation, inline errors, and state preservation on client and server errors in create and edit modes (TASK-026)
- Confirm no schema migration; Zod rejects invalid payloads before Prisma (TASK-027)
- Add Playwright E2E `us-007-validacion-formulario.spec.ts` for both Gherkin scenarios (TASK-028)
- Sync `implementation-queue-v1.json` and `status-v1.json` as tasks complete

**Out of scope for this change:** new fields, blur-on-change validation, toast-only errors, auth, schema migrations, search/tag empty states (US-014/US-009).

## Capabilities

### New Capabilities

- _(none — behavior extends existing create/update form capabilities)_

### Modified Capabilities

- `note-create`: Strengthen validation `details` contract and client/server feedback requirements (US-007 Gherkin)
- `note-update`: Same validation UX in edit mode; PUT `details` for invalid title/content

## Impact

| Area | Impact |
|------|--------|
| `src/backend/src/schemas/` | Verify Zod messages (`nota.schema.ts`) |
| `src/backend/src/middleware/` | Verify `errorHandler` / `validate` → `details[]` |
| `src/frontend/src/components/notes/` | `NoteForm.tsx` — inline errors, state preservation |
| `src/frontend/src/services/` | `apiClient.ts` — `ValidationApiError` mapping |
| `tests/integration/api/` | Assert exact messages on create/update 400 |
| `tests/e2e/` | New `us-007-validacion-formulario.spec.ts` |
| APIs | No new endpoints; `POST`/`PUT /api/v1/notas` error envelope clarified |
| Queue | TASK-025, TASK-027, TASK-026, TASK-028 (`implementation-queue-v1.json` sequences 5–8) |
| Agents | `backend-engineer` (BE + DB verify), `frontend-engineer` (FE), `qa-engineer` (E2E) |

**References:** [US-007](02-docs/02_1-product/user-stories/US-007.md), [implementation-plan-v1.md §PHASE-002](02-docs/02_3-engineering/implementation-plan-v1.md), LLD-v1 §4.3, §8.2, §12, RF-001, RF-003, RNF-008.
