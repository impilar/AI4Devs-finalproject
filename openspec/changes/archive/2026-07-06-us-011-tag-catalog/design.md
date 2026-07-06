# Design: US-011 — Tag catalog

## Context

MVP `GET /etiquetas` returns `string[]`. V2+ returns catalog items with note counts. Filter flow (US-009) unchanged: click sets `activeTag` and calls `GET /notas?etiqueta=`.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Count query | `etiqueta.findMany({ include: { _count: { select: { notas: true } } } })` | No materialized view for <500 notes |
| Orphan tags | Include with `count: 0` | Gherkin scenario 1 |
| UI | `TagCatalog` replaces `TagFilter` in sidebar | Same filter semantics, count in label |
| Button label | `{name} ({count})` | Matches Gherkin «ideas (5)» |
| Breaking API | Migrate FE + integration test in same slice | Controlled V2+ change |

## Response contract

```json
{ "data": [{ "id": "uuid", "name": "ideas", "count": 5 }] }
```

Ordered by `name` asc.
