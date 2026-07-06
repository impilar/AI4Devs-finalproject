# Design: PHASE-006 — Search and sort (US-012, US-013)

## Context

Table `notas` and indexes `idx_notas_title`, `idx_notas_updated_at`, `idx_notas_created_at` exist from PHASE-001 init migration (`20260704120000_init_mvp`). No search endpoint or frontend search UI exists yet. Tag filter (US-009) is on `HomePage`.

## Goals / Non-Goals

**Goals:**

- Text search via `GET /api/v1/buscar?q=` (ILIKE case-insensitive on `title` and `content`)
- Post-query relevance sort (title match before content-only) or `orderBy updatedAt DESC`
- `SearchBar` with 300 ms debounce; results replace list while query is active
- `SearchOrderSelect` for relevance vs date when search is active
- Meet RNF-002 (< 300 ms with 500 notes) using B-tree on `title` + sequential scan acceptable for `content` at MVP scale

**Non-Goals:**

- PostgreSQL GIN / `pg_trgm` unless TASK-048 benchmark fails
- Empty-search dedicated message (US-014)
- Combined tag filter + search (clear one when starting the other)

## Decisions

### D1: Indexes already in init migration

`idx_notas_title` and `idx_notas_updated_at` are in `schema.prisma` and `20260704120000_init_mvp/migration.sql`. TASK-047 and TASK-051 verify alignment only — no new migration unless drift is found.

### D2: MVP search uses Prisma `contains` + `mode: 'insensitive'`

Equivalent to ILIKE `%term%`. `take: 50` limits result set. Relevance scoring is post-query in `SearchService` (title matches ranked above content-only).

### D3: `order=date` uses `orderBy: { updatedAt: 'desc' }`

Uses `idx_notas_updated_at`. Default `order=relevance` applies post-sort after fetch.

### D4: Search and tag filter are mutually exclusive on HomePage

Starting a search clears active tag filter; selecting a tag clears search query. Avoids undefined combined behaviour in MVP.

### D5: Task order

1. TASK-047 + TASK-051 — verify DB indexes (parallel)
2. TASK-045 — search endpoint
3. TASK-049 — `order` param
4. TASK-046 — SearchBar + useSearch
5. TASK-050 — order selector
6. TASK-048 + TASK-052 — QA

## Risks / Trade-offs

- [ILIKE on `content` may not use B-tree] → Acceptable for ≤ 500 rows; benchmark in TASK-048; GIN deferred to V1
- [Debounce + network latency] → 300 ms debounce per LLD §7.3; separate from server SLA
- [Search vs tag filter] → Clear one when using the other (D4)

## Migration Plan

No schema migration expected. Deploy backend search routes then frontend SearchBar. Rollback: hide SearchBar; endpoint unused.

## Open Questions

None for MVP — full-text GIN only if TASK-048 benchmark fails.
