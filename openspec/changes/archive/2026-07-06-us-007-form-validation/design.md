# Design: PHASE-002 V1 — Form validation feedback (US-007)

## Context

MVP (US-005/US-015) introduced `NoteForm` with controlled inputs, `validateClient()`, `fieldErrors` state, and `ValidationApiError` from `apiClient`. Backend uses Zod in `validate` middleware and maps `ZodError` to `VALIDATION_ERROR` with `details[]` in `errorHandler`.

**Current state:**

- Client: empty title/content blocked before API; messages «El título es obligatorio» / «El contenido es obligatorio» in `NoteForm`
- Server: `POST /api/v1/notas` returns 400 with `details` (integration tests assert `field` but not always exact `message`)
- `PUT /api/v1/notas/:id` lacks integration tests for empty title/content with `details`
- No `NoteForm.validation.test.tsx` or `us-007-validacion-formulario.spec.ts`
- Edit and create share `NoteForm`; MindVault editorial styling applies to both (post US-003/MindVault)

**Target state:** Gherkin scenarios green — field-specific Spanish messages, no data loss on error, same behavior in create and edit; E2E coverage for US-007.

**Constraints:** LLD-v1 §4.3 Zod schemas, §8.2 error envelope; RNF-008; no new migrations; `noValidate` on form to avoid native browser messages.

## Goals / Non-Goals

**Goals:**

- Standardize `400` envelope: `{ error: { code: "VALIDATION_ERROR", message, details: [{ field, message }] } }` on create and update (TASK-025)
- Zod messages: «El título es obligatorio», «El contenido es obligatorio», «La URL no es válida» for links (TASK-025)
- `NoteForm`: inline errors with `role="alert"` / `aria-describedby`; never reset `title`, `content`, `links`, `tags` on validation failure (TASK-026)
- Map server `details` → `fieldErrors` via `ValidationApiError` without clearing inputs (TASK-026)
- Confirm Prisma `Nota.title` / `Nota.content` NOT NULL; API rejects before INSERT/UPDATE (TASK-027)
- E2E for both Gherkin scenarios + edit-mode smoke (TASK-028)
- Mark TASK-025–028 `done` in `implementation-queue-v1.json` and `status-v1.json`

**Non-Goals:**

- Validate on blur or per-keystroke
- New validation rules (max length changes beyond existing 500-char title)
- Replace Zod with another library
- Server-side-only validation (client remains first line)

## Decisions

### D1: Validation order — client then server

**Choice:** `validateClient()` runs on submit; if pass, call API; on `ValidationApiError`, map `details` to `fieldErrors` and return without navigation.

**Rationale:** Gherkin scenario 1 is client-side; scenario 2 covers server path. RNF-003 preserved (no extra steps on happy path).

### D2: Error field paths

**Choice:** Use dot paths consistent with Zod: `title`, `content`, `links.0`, `tags.0`.

**Rationale:** Matches existing `NoteForm` link row keys (`links.${index}`) and integration tests.

### D3: Spanish messages — single source in Zod

**Choice:** Backend Zod `.min(1, "El título es obligatorio")` etc.; frontend `validateClient()` uses identical strings for required fields.

**Alternatives:** i18n catalog — rejected for V1 scope.

### D4: Backend — verify and tighten tests (not rewrite)

**Choice:** TASK-025 is regression + assertion hardening: integration tests assert exact `message` in `details` for POST and new cases for PUT.

**LLD reference:** §8.2 `errorHandler`, §13 validation.

### D5: Database — no migration (TASK-027)

**Choice:** Document that `notas.title` and `notas.content` are NOT NULL; application layer must reject empties before Prisma.

### D6: Dedicated validation test files

**Choice:**

| Layer | File |
|-------|------|
| Unit FE | `NoteForm.validation.test.tsx` — content preserved when title empty; server error mapping |
| Unit FE | Extend `NoteForm.test.tsx` or `apiClient` tests if needed |
| Integration | `notas.create.test.ts`, `notas.update.test.ts` — exact `details` messages |
| E2E | `tests/e2e/us-007-validacion-formulario.spec.ts` |

### D7: E2E server scenario

**Choice:** Primary E2E covers client validation (content without title). Server scenario covered by integration tests asserting `details`; optional E2E can stub API or use invalid link URL if needed.

**Rationale:** US-007 Gherkin scenario 2 is hard to trigger in E2E without bypassing client; integration provides contract proof.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Validation largely exists; change appears noop | Exact message asserts + new E2E file; tasks done only when tests pass |
| Duplicate messages client vs server | Same Spanish strings in Zod and `validateClient()` |
| Native HTML5 validation | `noValidate` on `<form>`; custom messages only |
| Edit mode regression | Tests in create and edit branches |

## Migration Plan

1. Harden BE integration tests (TASK-025, TASK-027)
2. Add/extend FE unit tests (TASK-026)
3. Add E2E (TASK-028)
4. Update queue + status JSON
5. `/opsx:verify us-007-form-validation` then archive

**Rollback:** Revert test files and any message tweaks; no DB rollback.

## Open Questions

- _(none — scope fixed by US-007 and implementation-plan-v1 PHASE-002)_
