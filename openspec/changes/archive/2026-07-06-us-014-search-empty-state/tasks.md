# Tasks: PHASE-004 V1 — Search empty state (US-014)

> Queue: `implementation-queue-v1.json` sequences 13–16.  
> After each TASK-XXX section: mark `done` in `implementation-queue-v1.json` and `02-docs/02_1-product/user-stories/status-v1.json`.  
> Detail: [US-014](02-docs/02_1-product/user-stories/US-014.md), [implementation-plan-v1.md §PHASE-004](02-docs/02_3-engineering/implementation-plan-v1.md).

## 1. TASK-055 — [DB] No schema changes (backend-engineer)

- [x] 1.1 Confirm `notaRepository.search` returns `[]` for non-matching term without SQL error
- [x] 1.2 Confirm no new Prisma migration required for US-014
- [x] 1.3 Document in design: US-014 is query-only, no DDL
- [x] 1.4 Mark TASK-055 `done` in `implementation-queue-v1.json` and `status-v1.json`

## 2. TASK-053 — [BE] 200 empty array with meta.q (backend-engineer)

- [x] 2.1 Verify `searchService.search` returns `{ data: [], meta: { q, total: 0 } }` on zero rows
- [x] 2.2 Verify `SearchQuerySchema` trims `q` before search
- [x] 2.3 Strengthen `tests/integration/api/buscar.test.ts` — US-014 term `xyzabc`, assert `meta.q`
- [x] 2.4 Strengthen `src/backend/src/services/search.service.test.ts` — empty list preserves `meta.q`
- [x] 2.5 Mark TASK-053 `done` in queue and status JSON

## 3. TASK-054 — [FE] SearchEmptyState component (frontend-engineer)

- [x] 3.1 Create `src/frontend/src/components/search/SearchEmptyState.tsx` with prop `searchTerm`
- [x] 3.2 Render Gherkin copy: `Sin resultados para ${searchTerm}` (no guillemets, no period)
- [x] 3.3 Update `NoteList` search-empty branch to use `SearchEmptyState` instead of `EmptyState`
- [x] 3.4 Keep library-empty (US-003) and tag-filter-empty (US-009) branches unchanged
- [x] 3.5 Add `SearchEmptyState.test.tsx` — renders term `xyzabc`
- [x] 3.6 Update `NoteList.test.tsx` — assert new copy for `searchQuery`
- [x] 3.7 Mark TASK-054 `done` in queue and status JSON

## 4. TASK-056 — [QA] E2E no-results message and editable field (qa-engineer)

- [x] 4.1 Create `tests/e2e/us-014-busqueda-sin-resultados.spec.ts` — Gherkin scenario: message `Sin resultados para xyzabc`
- [x] 4.2 E2E scenario: after no results, search input visible and editable
- [x] 4.3 Update `tests/e2e/us-012-busqueda.spec.ts` — regression on new copy
- [x] 4.4 Run `npm run test:e2e -- tests/e2e/us-014-busqueda-sin-resultados.spec.ts`
- [x] 4.5 Mark TASK-056 `done` in queue and status JSON

## 5. Verification (all)

- [x] 5.1 Integration: `GET /buscar?q=xyzabc` → 200, `data: []`, `meta.q === "xyzabc"`
- [x] 5.2 Unit: `SearchEmptyState` + `NoteList` search branch green
- [x] 5.3 E2E: US-014 scenarios green; US-012 search E2E green
- [x] 5.4 PHASE-004 V1 complete — ready for `/opsx:verify us-014-search-empty-state`
