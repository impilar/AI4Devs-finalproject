# Design: PHASE-004 V1 — Search empty state (US-014)

## Context

MVP delivered `GET /api/v1/buscar` with envelope `{ data, meta: { q, total } }` and a `SearchBar` on `HomePage` with 300 ms debounce (US-012). US-013 added order param. When search returns zero rows, the API already responds `200` with `data: []` and `meta.total: 0` (see `buscar.test.ts` scenario `xyznonexistent`).

**Current state:**

- Backend `searchService.search` returns `meta.q` from trimmed query
- `NoteList` search-empty branch uses `EmptyState` with copy `No se encontraron notas para «{term}».`
- `SearchBar` stays mounted on `HomePage` when search is active (not inside `NoteList`)
- US-012 E2E asserts the old copy

**Target state:** User searching `xyzabc` with no matches sees **«Sin resultados para xyzabc»** (Gherkin literal, no guillemets, no trailing period), no `ErrorMessage`, and can edit the search input to retry.

**Constraints:** No DDL changes; distinguish search-empty from library-empty (US-003) and tag-filter-empty (US-009) in `NoteList`.

## Goals / Non-Goals

**Goals:**

- Contract verified: empty search → `200`, `data: []`, `meta.q` = trimmed term, `meta.total: 0` (TASK-053, TASK-055)
- `SearchEmptyState` component with prop `searchTerm: string` (TASK-054)
- Gherkin-aligned copy: `Sin resultados para ${searchTerm}`
- `NoteList` uses `SearchEmptyState` when `searchQuery` is non-empty and `notes.length === 0`
- `SearchBar` remains visible and editable (already on `HomePage`; verify no unmount on empty results)
- E2E `us-014-busqueda-sin-resultados.spec.ts` for both Gherkin scenarios (TASK-056)
- Update US-012 E2E copy assertion
- Mark TASK-055, TASK-053, TASK-054, TASK-056 `done` in queue + status JSON

**Non-Goals:**

- Adding `meta.searchTerm` alias (optional; `meta.q` is sufficient per LLD)
- Changing search ranking, debounce, or highlight behavior
- Redesigning `EmptyState` used for library/tag cases
- New migrations or repository query changes

## Decisions

### D1: Separate `SearchEmptyState` from `EmptyState`

**Choice:** New component under `components/search/SearchEmptyState.tsx` rather than extending `EmptyState` with variants.

**Rationale:** US-003 library empty has CTA; search empty has no CTA and different semantics. Keeps `EmptyState` stable for US-003/US-009.

### D2: Copy (Spanish product language)

**Choice:** Exact Gherkin string: `Sin resultados para {término}` — no «guillemets», no period, term interpolated as typed (after trim/debounce).

**Alternatives:** Keep «No se encontraron notas…» — rejected; Gherkin specifies new copy.

### D3: Backend — verification over new code

**Choice:** TASK-053/055 are regression verification. `searchService` already returns correct envelope; add/strengthen integration + unit tests documenting US-014 contract. No schema migration.

### D4: `searchTerm` source in FE

**Choice:** `NoteList` receives `searchQuery` from `HomePage` (`debouncedQuery` when search active). Use that prop for `SearchEmptyState` — it matches the term sent to API and stays in sync with `SearchBar` controlled value.

**Rationale:** Avoid coupling `NoteList` to `useSearch` internals; `debouncedQuery` is the authoritative searched term.

### D5: Three-way empty branching (unchanged order)

**Choice:** Keep `NoteList` branch order:

1. `searchQuery` → `SearchEmptyState` (US-014)
2. `activeTag` → tag-filter `EmptyState` (US-009)
3. else → library `EmptyState` with CTA (US-003)

### D6: E2E seed

**Choice:** Reuse `seedThreeNotes()` or `seedSearchNotes()` — any seed with notes that do not match `xyzabc`. No dedicated DB mode required unless tests need isolation.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| US-012 E2E breaks on copy change | Update `us-012-busqueda.spec.ts` in same change |
| User confuses search-empty with library-empty | Distinct component + copy; `searchQuery` branch first |
| `ErrorMessage` shown on empty results | Only show `ErrorMessage` on real API failures, not `data: []` |

## Migration Plan

No migration. Deploy backend + frontend together (copy-only FE change; API contract unchanged).

## Open Questions

- None — US-014 enriched story and LLD §12 define behavior.
