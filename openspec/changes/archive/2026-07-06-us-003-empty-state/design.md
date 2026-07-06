# Design: PHASE-001 V1 — Library empty state (US-003)

## Context

MVP and post-MVP UI work delivered `HomePage`, `NoteList`, and an `EmptyState` component with MindVault styling. The list API already supports an empty array (`notes-list` spec). V1 PHASE-001 formalizes **library-empty** UX per US-003 Gherkin without changing core list/search/filter behavior.

**Current state:**

- `GET /api/v1/notas` returns `{ data: [], meta: { total: 0 } }` when no rows (MVP)
- `NoteList` renders `EmptyState` for three cases: search, tag filter, and empty library
- Library copy may differ from Gherkin (e.g. «Crear primera nota» vs **Crear nota**)

**Target state:** User with zero notes sees orienting Spanish message + **Crear nota** CTA; no blank screen; E2E green for US-003 scenarios.

**Constraints:** LLD-v1 §12; no new tables or routes; distinguish empty-library from US-009/US-014 empty branches in `NoteList`.

## Goals / Non-Goals

**Goals:**

- Contract test: empty `GET /api/v1/notas` → 200 + empty envelope (TASK-009)
- `NoteList` shows library empty state only when `notes.length === 0` **and** no `searchQuery` **and** no `activeTag` (TASK-010)
- Gherkin-aligned copy and CTA **Crear nota** → `/notas/nueva`
- `EmptyState` remains reusable; library branch passes explicit props
- E2E with cleared DB covering both Gherkin scenarios + CTA navigation (TASK-012)
- Mark TASK-009, TASK-010, TASK-011, TASK-012 `done` in `implementation-queue-v1.json` and `status-v1.json`

**Non-Goals:**

- Redesign home KPIs, masonry cards, or MindVault shell
- Search-no-results message (US-014 PHASE-004)
- Tag-filter empty message changes (US-009)
- Pagination, auth, new endpoints

## Decisions

### D1: Three-way empty branching in `NoteList`

**Choice:** Keep single `NoteList` with explicit order:

1. `searchQuery` → search-specific empty (US-014 scope; do not change copy in this change unless blocking)
2. `activeTag` → tag-filter empty (US-009)
3. else → **library empty** (US-003) with Gherkin message + CTA

**Rationale:** Avoids conflating «no notes at all» with «no matches for filter/search».

### D2: Copy and CTA (Spanish product language)

**Choice:**

- Message: communicates that the user has no notes yet (e.g. «Aún no tienes notas» or equivalent per Gherkin «indica que aún no hay notas»)
- CTA label: exactly **Crear nota** (Gherkin)
- CTA target: `/notas/nueva` (existing create route)

**Alternatives:** «Crear primera nota» — rejected; Gherkin specifies «Crear nota».

### D3: Backend — verification over new code

**Choice:** TASK-009 is regression verification: ensure `nota.controller.listNotas` never maps empty to 404/500; reinforce `tests/integration/api/notas.list.test.ts` empty case.

**LLD reference:** §4.2 `GET /notas`, §5.4 list defaults; repository `findAll` without unnecessary JOINs on base list.

### D4: Database — no migration (TASK-011)

**Choice:** No Prisma migration. Document that `findMany` on empty `notas` is valid; list query must not JOIN `etiquetas`/`enlaces` for summary list.

### D5: `EmptyState` component API

**Choice:** Retain props `{ message, ctaLabel?, ctaTo? }`. Library branch always passes both CTA props. Icon/illustration stays to satisfy «no blank screen» scenario.

```tsx
// NoteList — library empty branch (conceptual)
<EmptyState
  message="…"
  ctaLabel="Crear nota"
  ctaTo="/notas/nueva"
/>
```

### D6: E2E data setup

**Choice:** Use `e2e-db-setup.ts` `clear` mode (or equivalent) before US-003 spec so home loads with zero notes. Assert CTA navigates to create form.

**Placement:** `tests/e2e/us-003-empty-state.spec.ts`

### D7: Test placement

| Layer | File |
|-------|------|
| Integration | `tests/integration/api/notas.list.test.ts` — empty list |
| Unit | `EmptyState.test.tsx`, `NoteList.test.tsx` — library branch |
| E2E | `tests/e2e/us-003-empty-state.spec.ts` |

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Partial empty state already implemented; change appears noop | E2E + Gherkin copy asserts; tasks mark done only when tests pass |
| KPI cards on home with zero notes | KPIs may show 0 — acceptable; empty state still visible in list area |
| Confusion with search/filter empties | D1 branching order; unit tests per branch |

## Migration Plan

1. Implement/verify BE test (TASK-009, TASK-011)
2. Align FE copy/CTA (TASK-010)
3. Add E2E (TASK-012)
4. Update queue + status JSON
5. `/opsx:verify us-003-empty-state` then archive

**Rollback:** Revert copy/CTA and E2E file; no DB rollback needed.

## Open Questions

- _(none — scope fixed by US-003 and implementation-plan-v1 PHASE-001)_
