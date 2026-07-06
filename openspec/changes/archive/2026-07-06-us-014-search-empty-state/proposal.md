# Proposal: PHASE-004 V1 — Search empty state (US-014)

## Why

US-012 delivers text search, but when a query returns no matches the UI shows a generic message («No se encontraron notas para…») that can feel like a technical error. US-014 (V1) adds a clear, contextual empty-search message with the searched term visible and keeps the search input editable so users can retry (roadmap §Release V1, LLD-v1 §12, RF-012/RF-013 UX extension).

## What Changes

- Verify `GET /api/v1/buscar` returns `200` with `data: []` and `meta.q` echoing the trimmed term when there are no matches (TASK-053, TASK-055)
- Add `SearchEmptyState` component with Gherkin copy **«Sin resultados para {término}»** (TASK-054)
- Replace search branch in `NoteList` to use `SearchEmptyState` instead of generic `EmptyState` copy
- Add integration assertion + unit tests; E2E for both US-014 Gherkin scenarios (TASK-056)
- Update `us-012-busqueda` E2E assertion to match new copy (regression)
- Sync `implementation-queue-v1.json` and `status-v1.json` as tasks complete

**Out of scope:** search algorithm changes, new endpoints, pagination, auth, library empty state (US-003), tag-filter empty (US-009).

## Capabilities

### New Capabilities

- _(none — extends existing search capability)_

### Modified Capabilities

- `note-search`: Formalize no-match API contract (`meta.q` on empty `data`); add `SearchEmptyState` UI requirement and US-014 E2E coverage

## Impact

| Area | Impact |
|------|--------|
| `src/backend/src/services/search.service.ts` | Verify empty-result envelope (likely no logic change) |
| `tests/integration/api/buscar.test.ts` | Strengthen US-014 no-match scenario |
| `src/frontend/src/components/search/SearchEmptyState.tsx` | **New** — contextual message |
| `src/frontend/src/components/notes/NoteList.tsx` | Search-empty branch uses `SearchEmptyState` |
| `tests/e2e/us-014-busqueda-sin-resultados.spec.ts` | **New** — US-014 Gherkin |
| `tests/e2e/us-012-busqueda.spec.ts` | Update expected copy |
| Queue | TASK-055, TASK-053, TASK-054, TASK-056 (`implementation-queue-v1.json` sequences 13–16) |

**References:** [US-014](02-docs/02_1-product/user-stories/US-014.md), [implementation-plan-v1.md §PHASE-004](02-docs/02_3-engineering/implementation-plan-v1.md), LLD-v1 §4.2 `GET /buscar`, §12 `SearchEmptyState`, RF-012, RF-013, RNF-002, RNF-007.
