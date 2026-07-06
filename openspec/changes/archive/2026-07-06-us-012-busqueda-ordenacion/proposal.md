# Proposal: PHASE-006 — Search and sort (US-012, US-013)

## Why

Users can list and filter notes by tag (US-001, US-009) but cannot find content by free text or control result order. US-012 and US-013 deliver text search and relevance/date sorting so users recover information without remembering where they saved it (RF-012, RF-013, RF-014, RNF-002).

## What Changes

- Verify search indexes `idx_notas_title` and `idx_notas_updated_at` in schema and migration (TASK-047, TASK-051)
- Add `GET /api/v1/buscar?q=` with ILIKE on title and content, max 50 results (TASK-045)
- Add `order=relevance|date` query param on search endpoint (TASK-049)
- Add `SearchBar` with 300 ms debounce and live results on `HomePage` (TASK-046)
- Add relevance/date selector in search results view (TASK-050)
- Add QA tests for search relevance, 300 ms benchmark, and sort order (TASK-048, TASK-052)

**Out of scope:** empty-search message UI (US-014), full-text GIN index (V1 unless RNF-002 fails), tag filter + search coexistence rules beyond clearing one when starting the other.

## Capabilities

### New Capabilities

- `note-search`: `GET /buscar`, `SearchService`, `SearchBar`, `useSearch`, relevance/date ordering, E2E US-012/US-013

### Modified Capabilities

- `notes-list`: `HomePage` shows search bar; search results temporarily replace normal list while query is active

## Impact

| Area | Impact |
|------|--------|
| `src/backend/prisma/` | Verify `idx_notas_title`, `idx_notas_updated_at` (TASK-047, TASK-051) |
| `src/backend/src/` | `buscar.routes`, `search.controller`, `search.service`, `nota.repository.search`, `search.schema` |
| `src/frontend/src/` | `SearchBar`, `SearchOrderSelect`, `useSearch`, `searchApi`, `HomePage` integration |
| `tests/` | `buscar.test.ts`, `search.service.test.ts`, `us-012-busqueda.spec.ts`, `us-013-orden-busqueda.spec.ts` |
| Queue | TASK-047, 051, 045, 049, 046, 050, 048, 052 (sequences 25–32) |

**References:** [US-012](02-docs/02_1-product/user-stories/US-012.md), [US-013](02-docs/02_1-product/user-stories/US-013.md), LLD-v1 §4.2, §5.5, §7.2, logical-model-v1 §3.1, §9.3.
