# Tasks: PHASE-006 — Search and sort (US-012, US-013)

> Queue sequences 25–32. Detail: [US-012](docs/product/user-stories/US-012.md), [US-013](docs/product/user-stories/US-013.md).

## 1. TASK-047 — [DB] Search indexes (backend-engineer)

- [x] 1.1 Verify `idx_notas_title` in `schema.prisma` and `20260704120000_init_mvp/migration.sql`
- [x] 1.2 Document MVP approach for `content` ILIKE (sequential scan ≤ 500 rows; no B-tree on content per logical-model-v1)
- [x] 1.3 Mark TASK-047 done in queue and status JSON

## 2. TASK-051 — [DB] updated_at index (backend-engineer)

- [x] 2.1 Verify `idx_notas_updated_at` in `schema.prisma` and migration SQL
- [x] 2.2 Mark TASK-051 done in queue and status JSON

## 3. TASK-045 — [BE] GET /buscar?q= (backend-engineer)

- [x] 3.1 Create `search.schema.ts`, `search.service.ts`, `search.controller.ts`, `buscar.routes.ts`
- [x] 3.2 Add `nota.repository.search` with ILIKE on title and content
- [x] 3.3 Mount `/buscar` in routes index; integration tests
- [x] 3.4 Mark TASK-045 done

## 4. TASK-049 — [BE] order param (backend-engineer)

- [x] 4.1 Extend `SearchService` with relevance post-sort and `order=date`
- [x] 4.2 Tests for both order modes
- [x] 4.3 Mark TASK-049 done

## 5. TASK-046 — [FE] SearchBar (frontend-engineer)

- [x] 5.1 Create `searchApi.ts`, `useSearch.ts`, `SearchBar.tsx`
- [x] 5.2 Integrate in `HomePage`; clear tag filter on search start
- [x] 5.3 Mark TASK-046 done

## 6. TASK-050 — [FE] Order selector (frontend-engineer)

- [x] 6.1 Create `SearchOrderSelect.tsx`; extend `useSearch` and `searchApi`
- [x] 6.2 Mark TASK-050 done

## 7. TASK-048 — [QA] Search tests (qa-engineer)

- [x] 7.1 Unit + integration tests; benchmark 300 ms with 500 notes
- [x] 7.2 E2E `us-012-busqueda.spec.ts`
- [x] 7.3 Mark TASK-048 done

## 8. TASK-052 — [QA] Sort tests (qa-engineer)

- [x] 8.1 Tests for relevance and date order
- [x] 8.2 E2E `us-013-orden-busqueda.spec.ts`
- [x] 8.3 Mark TASK-052 done

## 9. Verification

- [x] 9.1 All tests pass — ready to archive
