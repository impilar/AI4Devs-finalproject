# Proposal: PHASE-001 V1 — Library empty state (US-003)

## Why

MVP delivered a functional note list, but first-time users with an empty library may see a minimal or ambiguous screen. US-003 (release V1) adds an orienting empty state with clear copy and a **Crear nota** CTA so users know how to start capturing content (roadmap §Release V1, LLD-v1 §12). This is the first slice of V1 after MVP completion.

## What Changes

- Verify and test `GET /api/v1/notas` returns `200` with `{ data: [], meta: { total: 0 } }` when no notes exist (TASK-009)
- Align `EmptyState` + `NoteList` empty-library branch with US-003 Gherkin: orienting message and CTA label **Crear nota** linking to `/notas/nueva` (TASK-010)
- Confirm list query needs no schema migration; empty `findMany` is safe (TASK-011)
- Add Playwright E2E `us-003-empty-state.spec.ts` for both Gherkin scenarios and CTA navigation (TASK-012)
- Sync `implementation-queue-v1.json` and `status-v1.json` as tasks complete

**Out of scope for this change:** search empty state (US-014), tag-filter empty state (US-009), form validation (US-007), remove tag (US-010), new API endpoints, schema migrations.

## Capabilities

### New Capabilities

- _(none — behavior extends existing list capability)_

### Modified Capabilities

- `notes-list`: Strengthen library empty-state requirements (US-003 Gherkin), distinguish from filter/search empty states, add dedicated E2E coverage

## Impact

| Area | Impact |
|------|--------|
| `src/backend/src/` | Verify `listNotas` empty response; optional integration test reinforcement |
| `src/frontend/src/components/notes/` | `EmptyState.tsx`, `NoteList.tsx` copy/CTA alignment |
| `tests/integration/api/` | Empty list contract test (if not already explicit) |
| `tests/e2e/` | New `us-003-empty-state.spec.ts` |
| APIs | No new endpoints; `GET /api/v1/notas` contract unchanged |
| Queue | TASK-009, TASK-011, TASK-010, TASK-012 (`implementation-queue-v1.json` sequences 1–4) |
| Agents | `backend-engineer` (BE + DB verify), `frontend-engineer` (FE), `qa-engineer` (E2E) |

**References:** [US-003](02-docs/02_1-product/user-stories/US-003.md), [implementation-plan-v1.md §PHASE-001](02-docs/02_3-engineering/implementation-plan-v1.md), LLD-v1 §7.1, §12, PRD (extends RF-015 UX), RNF-006, RNF-007.
