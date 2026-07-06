# Design: PHASE-005 — Filter by tag (US-009)

## Context

Tables `etiquetas` / `nota_etiqueta` and index `idx_nota_etiqueta_etiqueta` exist from US-008 (TASK-031). `ListNotasQuerySchema` already accepts `etiqueta` but `notaRepository.findAll` ignores it.

## Goals

- Filter list via `where: { etiquetas: { some: { etiqueta: { name } } } }`
- `TagFilter` on `HomePage` with active state and clear
- Empty message when filter returns no notes
- E2E covering Gherkin scenarios + clear filter

## Decisions

### D1: Index already in TASK-031 migration

`idx_nota_etiqueta_etiqueta` on `(etiqueta_id, nota_id)` is present in `20260704130000_add_etiquetas_mvp`. TASK-035 verifies alignment only — no new migration.

### D2: Unknown or orphan tag returns empty list

`GET /notas?etiqueta=archivo` with no matching notes → `200 { data: [], meta: { total: 0 } }` (no 404).

### D3: Minimal `GET /etiquetas` for filter options

Returns sorted tag names `{ data: string[] }`. Not US-011 catalog (no counts). Needed so orphan tags like "archivo" appear in `TagFilter`.

### D4: Task order

1. TASK-035 — verify DB index
2. TASK-033 — BE filter + etiquetas names endpoint
3. TASK-034 — `TagFilter` + `useNotes(etiqueta)`
4. TASK-036 — QA E2E + integration
