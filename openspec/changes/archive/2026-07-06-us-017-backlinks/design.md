# Design: US-017 — Note backlinks

## Context

MVP stores external URLs in `enlaces` (separate from note content). V2+ adds directed relationships between notes via `nota_backlink` (`origen_id` → `destino_id`). Detail page currently shows URL links only; the «Notas relacionadas» sidebar rail was deferred and remains out of scope — backlinks render as in-page sections.

Prerequisites: US-002 (detail), US-015 (edit), US-001 (list for picker).

## Goals / Non-Goals

**Goals:**

- Persist note-to-note links with referential integrity and CASCADE on note delete
- Create links via dedicated `POST` (not bundled in `UpdateNotaDto`)
- Show clickable outgoing links on source note detail
- Show «Notas que enlazan aquí» on target note detail
- Reject self-links and duplicate pairs with `400`

**Non-Goals:**

- Wiki `[[title]]` parsing in content
- Visual graph / force layout
- `DELETE` backlink endpoint
- Backlinks on note create (edit flow only per Gherkin)

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Table name | `nota_backlink` | Matches `logical-model-v1.md` §11.2 (not `nota_nota` from roadmap task text) |
| PK | Composite `(origen_id, destino_id)` | Prevents duplicates at DB level |
| Link creation | `POST /notas/:id/backlinks` separate from PUT | Simpler V2+ slice; avoids partial-update ambiguity |
| Picker UX | `<select>` / combobox from `GET /notas` | INVEST negotiable: explicit selector, not wiki syntax |
| Save flow | After successful `PUT`, call `POST` if destination selected | Edit form already handles title/content/tags/links |
| Route order | Mount `/backlinks` routes before generic `/:id` if needed | Avoid Express param shadowing |
| Salientes vs entrantes | Two GET endpoints | Clear semantics for UI sections |
| External `links` field | Unchanged | `enlaces` table remains for URLs; note backlinks are separate |

## API contract

**POST** `/api/v1/notas/:id/backlinks`

```json
{ "destinoId": "uuid" }
```

→ `201` `{ "data": { "origenId", "destinoId", "destino": { "id", "title" } } }`

**GET** `/api/v1/notas/:id/backlinks/salientes` → `{ "data": [{ "id", "title" }] }`  
**GET** `/api/v1/notas/:id/backlinks/entrantes` → `{ "data": [{ "id", "title" }] }`

Errors: `400 VALIDATION_ERROR` (self-link, duplicate, invalid UUID); `404 NOT_FOUND` (missing note).

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Route ordering conflicts | Register backlink sub-routes before `GET /:id` |
| Picker loads full list | Acceptable for MVP scale (<500 notes); no search in picker V2+ |
| Orphan UX if target deleted | CASCADE removes backlink rows automatically |
| Confusion with URL `links` | UI labels: «Enlaces externos» vs «Notas enlazadas» |

## Migration Plan

1. Add Prisma model + `prisma migrate dev`
2. Deploy BE with new routes (backward compatible)
3. Deploy FE with picker/panel (graceful empty states if no links)
4. Rollback: revert FE/BE; migration down only if no production data (academic env)

## Open Questions

None — API shape confirmed in US-017 enrichment and this design.
