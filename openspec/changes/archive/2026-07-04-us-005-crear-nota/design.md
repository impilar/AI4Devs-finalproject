# Design: PHASE-003 — Create note and links (US-005, US-006)

## Context

PHASE-002 delivered read-only detail with empty or populated `links`/`tags`. PHASE-003 adds write path: `POST /api/v1/notas` and create UI. Table `notas` and relations (`enlaces`, `etiquetas`) already exist from prior phases.

**Current state:** `GET /api/v1/notas` and `GET /api/v1/notas/:id` only; no create route or form.  
**Target state:** User clicks «Nueva nota» → form → save → note appears in list; optional links validated and stored.

**Constraints:** LLD layered architecture; Zod validation with Spanish messages; RNF-003 ≤ 2 interactions from home to save.

## Goals / Non-Goals

**Goals:**

- `POST /api/v1/notas` → `201 { data: NotaDetail }` with server-generated `id`, `createdAt`, `updatedAt`
- `CreateNotaDtoSchema`: required `title`/`content`; optional `links`/`tags` default `[]`
- US-005: insert into `notas` only; response with `links: []`, `tags: []`
- US-006: transaction creating `nota` + `enlaces` rows; tags still `[]` until US-008
- `NoteForm` (create mode), `NoteCreatePage` at `/notas/nueva`, prominent «Nueva nota» on `HomePage`
- E2E TASK-020 and TASK-024
- Mark TASK-017, 018, 021, 022, 020, 024 done in queue JSON

**Non-Goals:**

- Tag creation/association on create (US-008)
- Edit or delete (US-015, US-016)
- Search or filter by tag (US-009+)

## Decisions

### D1: Create API (LLD §4.2, §5.1)

| Layer | Responsibility |
|-------|----------------|
| routes | `POST /` + `validateBody(CreateNotaDtoSchema)` |
| controller | `createNota` → `201 { data }` |
| service | `create(dto)` — US-005: basic insert; US-006: add link persistence in transaction |
| repository | `create({ title, content })` or `createWithRelations` for links |
| mapper | `toDetail` on row with `include` |

### D2: Validation middleware

Add `validateBody<T>(schema)` in `middleware/validate.ts` mirroring `validateQuery` / `validateParams`: `safeParse(req.body)`, attach parsed body, forward `ZodError` to `errorHandler` → 400 `VALIDATION_ERROR`.

### D3: CreateNotaDtoSchema (LLD §4.3)

```typescript
title: z.string().trim().min(1).max(500)
content: z.string().trim().min(1)
links: z.array(z.string().url()).default([])
tags: z.array(z.string().trim().min(1)).default([])
```

Spanish error messages per US-005/US-006.

### D4: US-005 vs US-006 service split

**US-005 (TASK-017):** `NotaService.create` inserts note only; ignores `links`/`tags` in body (or accepts but does not persist links until TASK-021). Simplest path: persist title/content only; return empty arrays.

**US-006 (TASK-021):** Extend `create` to validate links and `$transaction` insert `enlaces`.

### D5: Frontend flow (LLD §7.1)

```
HomePage → Link «Nueva nota» → /notas/nueva (NoteCreatePage)
NoteForm submit → POST /notas → navigate('/')
```

Client validation: trim + required before submit; display API `error.details` inline.

### D6: Task order (queue sequences 12–17)

1. TASK-017 — POST /notas (backend)
2. TASK-018 — NoteForm + home entry (frontend)
3. TASK-021 — links persistence (backend)
4. TASK-022 — dynamic link fields (frontend)
5. TASK-020 — E2E US-005
6. TASK-024 — E2E US-006

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| POST before FE ready | Integration tests + MSW optional for FE |
| Links in DTO before TASK-021 | Schema accepts `links`; service ignores until TASK-021 |

## Open Questions

None — US-005/US-006 enriched stories and LLD §5.1 define behaviour.
