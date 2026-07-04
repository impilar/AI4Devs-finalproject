# Design: PHASE-002 — Note detail (US-002)

## Context

PHASE-001 left `notas` table, list API/UI, and `NoteListItem` with `<Link to={/notas/:id}>` stub. PHASE-002 completes navigation by adding related tables, detail API, and `NoteDetailPage`. Arrays `links` and `tags` may be empty until US-006/US-008 populate data; detail must still render.

**Current state:** `GET /api/v1/notas` only; route `/notas/:id` not registered in frontend.  
**Target state:** Click list item → detail with content; unknown id → 404 message + return to list.

**Constraints:** LLD layered architecture; single Prisma query with `include` (no N+1); `NotFoundError` → 404 per LLD §8.1.

## Goals / Non-Goals

**Goals:**

- Migration adding `enlaces`, `etiquetas`, `nota_etiqueta` per logical-model-v1 §3.2–3.4
- `GET /api/v1/notas/:id` → `{ data: NotaDetail }` with `content`, `links`, `tags`
- `findById` with `include: { enlaces, etiquetas: { include: { etiqueta: true } } }`
- `NoteDetailPage`, `useNote`, 404 UX with link back to `/`
- E2E TASK-008 (both Gherkin scenarios)
- Mark TASK-031, 023, 005, 007, 006, 008 done in queue JSON

**Non-Goals:**

- POST/PUT/DELETE notas (US-005, US-015, US-016)
- Tag creation UI (US-008)
- Edit mode on detail page (US-015)
- Full seed from logical-model §10 (minimal seed: 1 link + 1 tag on demo note sufficient)

## Decisions

### D1: Second migration `add_relations_mvp`

**Choice:** New migration `20260704_add_relations_mvp` (or timestamped) adding three tables — do not rewrite `init_mvp` already deployed.  
**Alternatives:** Extend `init_mvp` — only for fresh installs; existing DBs need additive migration.  
**Rationale:** PHASE-001 shipped `notas`-only migration; additive migration is safer.

### D2: Prisma relations on `Nota`

```prisma
model Nota {
  enlaces   Enlace[]
  etiquetas NotaEtiqueta[]
}
```

Models `Enlace`, `Etiqueta`, `NotaEtiqueta` per logical-model-v1 §6.

### D3: Detail API (LLD §4.2, §5)

| Layer | Responsibility |
|-------|----------------|
| routes | `GET /:id` + `validateParams(IdParamSchema)` |
| controller | `getNota` → 200 `{ data }` |
| service | `getById`; throw `NotFoundError` if null |
| repository | `findById` with include |
| mapper | `toDetail` → `links[]` from `enlaces[].url`, `tags[]` from `etiqueta.name` sorted |

Response envelope: `{ data: NotaDetail }` (consistent with list using `{ data, meta }`).

### D4: Error handling

- `NotFoundError` extends `AppError`, code `NOT_FOUND`, HTTP 404
- `errorHandler` maps `NotFoundError` and existing `ZodError` → 400
- Message: `"Nota no encontrada"` (US-002)

### D5: Frontend routing (LLD §7.1)

```
App.tsx routes:
  /           → HomePage
  /notas/:id  → NoteDetailPage
```

`useNote(id)` fetches on mount; `notFound` flag when API returns 404.  
`NoteDetailPage`: loading → detail | not-found message + `Link` to `/`.

### D6: Task order (queue sequences 6–11)

1. TASK-031 — `etiquetas`, `nota_etiqueta`
2. TASK-023 — `enlaces`
3. TASK-005 — BE endpoint (can return empty arrays)
4. TASK-007 — verify `findById` include + indexes
5. TASK-006 — FE detail page
6. TASK-008 — E2E

## File manifest

| Path | Task |
|------|------|
| `prisma/schema.prisma` | TASK-031, TASK-023 |
| `prisma/migrations/*_add_relations_mvp/` | TASK-031, TASK-023 |
| `prisma/seed.ts` | TASK-031 (extend) |
| `errors/NotFoundError.ts`, `AppError.ts` | TASK-005 |
| `schemas/common.schema.ts` | TASK-005 |
| `repositories/nota.repository.ts` | TASK-005, TASK-007 |
| `controllers/nota.controller.ts` | TASK-005 |
| `pages/NoteDetailPage.tsx` | TASK-006 |
| `components/notes/NoteDetail.tsx` | TASK-006 |
| `hooks/useNote.ts` | TASK-006 |
| `tests/e2e/us-002-detalle.spec.ts` | TASK-008 |

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| TASK-031/023 listed under US-008/US-006 but needed for US-002 | Implement schema only; no create APIs until PHASE-003 |
| Empty links/tags confuse testers | Seed minimal relations; UI shows empty sections gracefully |
| Detail route 404 vs invalid UUID | 400 for bad UUID; 404 for valid UUID not found |

## Migration Plan

1. `npx prisma migrate dev --name add_relations_mvp`
2. `npx prisma db seed`
3. Verify `GET /api/v1/notas/:id` with seeded note
4. Manual: list → click → detail
5. `npm run test:e2e` includes `us-002-detalle.spec.ts`

## Open Questions

- _(none — scope fixed by US-002 and implementation-plan PHASE-002)_
