# Tasks: PHASE-001 V1 — Library empty state (US-003)

> Queue: `implementation-queue-v1.json` sequences 1–4.  
> After each TASK-XXX section: mark `done` in `implementation-queue-v1.json` and `02-docs/02_1-product/user-stories/status-v1.json`.  
> Detail: [US-003](02-docs/02_1-product/user-stories/US-003.md), [implementation-plan-v1.md §PHASE-001](02-docs/02_3-engineering/implementation-plan-v1.md).

## 1. TASK-009 — [BE] Consistent empty list API (backend-engineer)

- [x] 1.1 Verify `GET /api/v1/notas` returns HTTP 200 with `{ data: [], meta: { total: 0 } }` when `notas` table is empty
- [x] 1.2 Confirm `listNotas` controller does not map empty result to 404 or 500
- [x] 1.3 Confirm `nota.repository.findAll` base list avoids unnecessary JOINs on `etiquetas`/`enlaces`
- [x] 1.4 Add or reinforce integration test in `tests/integration/api/notas.list.test.ts` for empty library case
- [x] 1.5 Mark TASK-009 `done` in `implementation-queue-v1.json` and `status-v1.json`

## 2. TASK-011 — [DB] No schema changes (backend-engineer)

- [x] 2.1 Confirm no new Prisma migration is required for US-003
- [x] 2.2 Run empty-table list query in test environment without SQL errors
- [x] 2.3 Document verification in PR/commit message
- [x] 2.4 Mark TASK-011 `done` in queue and status JSON

## 3. TASK-010 — [FE] EmptyState with Crear nota CTA (frontend-engineer)

- [x] 3.1 Align library-empty message with US-003 Gherkin (user has no notes yet)
- [x] 3.2 Set CTA label to **Crear nota** and target `/notas/nueva`
- [x] 3.3 Ensure `NoteList` shows library empty only when no `searchQuery` and no `activeTag`
- [x] 3.4 Keep icon/illustration in `EmptyState` so screen is not blank
- [x] 3.5 Add or update unit tests: `EmptyState.test.tsx`, `NoteList.test.tsx` (library branch)
- [x] 3.6 Mark TASK-010 `done` in queue and status JSON

## 4. TASK-012 — [QA] E2E empty state US-003 (qa-engineer)

- [x] 4.1 Create `tests/e2e/us-003-empty-state.spec.ts`
- [x] 4.2 Seed/clear DB with zero notes (`e2e-db-setup clear` or fixture)
- [x] 4.3 Scenario: orienting message + **Crear nota** visible on `/`
- [x] 4.4 Scenario: CTA navigates to `/notas/nueva` and create form is visible
- [x] 4.5 Scenario: home is not a blank screen (visible content in list area)
- [x] 4.6 Run `npm run test:e2e -- tests/e2e/us-003-empty-state.spec.ts`
- [x] 4.7 Mark TASK-012 `done` in queue and status JSON

## 5. Verification (all)

- [x] 5.1 `curl` or integration test: empty `GET /api/v1/notas` → 200
- [x] 5.2 Manual or E2E: first visit with empty library shows **Crear nota**
- [x] 5.3 No regression in existing E2E suite (`us-001-listado`, etc.)
- [x] 5.4 PHASE-001 V1 complete — ready for `/opsx:verify us-003-empty-state`
