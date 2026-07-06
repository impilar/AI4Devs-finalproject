# Design: US-004 — List sort

## Context

`ListNotasQuerySchema` and `nota.repository.resolveOrderBy` already support `sort` and `order` from MVP. `idx_notas_title` exists in init migration. V2+ completes verification, tests, FE selector, and session persistence.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Sort UI placement | Toolbar in notes section header (not search bar) | US-004 applies to normal list only; search has its own order (US-013) |
| Persistence | `sessionStorage` key `okc.noteListSort` | Gherkin: session current, not cross-tab permanent |
| Selector UX | Single `<select>` with 4 presets | Maps to `sort` + `order` pairs; mirrors `SearchOrderSelect` pattern |
| API | Existing `GET /notas?sort=&order=` | No new endpoints |

## Session state shape

```json
{ "sort": "created_at" | "title", "order": "asc" | "desc" }
```

Default: `{ "sort": "created_at", "order": "desc" }`.
