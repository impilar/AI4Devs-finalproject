# Proposal: PHASE-005 — Filter notes by tag (US-009)

## Why

Users can assign tags to notes (US-008) but cannot narrow the home list to a single topic. US-009 delivers tag filtering so users recover content by theme without full-text search (RF-011, RF-017).

## What Changes

- Confirm `idx_nota_etiqueta_etiqueta` index for filter performance (TASK-035)
- Extend `GET /api/v1/notas` with optional `?etiqueta=` query param (TASK-033)
- Add `TagFilter` panel on `HomePage` with active filter and clear action (TASK-034)
- Add minimal `GET /api/v1/etiquetas` (names only) to populate filter options including orphan tags
- Add integration and E2E tests for filter, empty results, and clear (TASK-036)

**Out of scope:** tag catalog with counts (US-011), remove tag from note (US-010), search coexistence rules (US-012).

## Capabilities

### New Capabilities

- `note-tag-filter`: `?etiqueta=` on list API, `TagFilter` UI, empty state for no matches, E2E US-009

### Modified Capabilities

- `notes-list`: `GET /notas` accepts optional `etiqueta` filter; home page shows tag filter panel

## Impact

| Area | Impact |
|------|--------|
| `src/backend/prisma/` | Verify index `idx_nota_etiqueta_etiqueta` (TASK-035) |
| `src/backend/src/` | `nota.repository.findAll` filter; `GET /etiquetas` names list |
| `src/frontend/src/` | `TagFilter`, `useNotes` with `etiqueta`, `EmptyState`, `notesApi` |
| `tests/` | `notas.filter-etiqueta.test.ts`, `us-009-filtro-etiqueta.spec.ts` |
| Queue | TASK-035, 033, 034, 036 (sequences 21–24) |

**References:** [US-009](02-docs/02_1-product/user-stories/US-009.md), LLD-v1 §4.2, §5.4, §7.2, logical-model-v1 §3.4, §9.4.
