# Tasks: PHASE-001 — Notes schema and list (US-001)

> Queue: `implementation-queue-mvp.json` sequences 1–5.  
> After each TASK-XXX section: mark `done` in `implementation-queue-mvp.json` and `02-docs/02_1-product/user-stories/status-v1.json`.  
> Detail: [US-001](02-docs/02_1-product/user-stories/US-001.md), [US-005 §TASK-019](02-docs/02_1-product/user-stories/US-005.md).

## 1. TASK-019 — [DB] Tabla notas (backend-engineer)

- [x] 1.1 Define Prisma model `Nota` in `schema.prisma` per logical-model-v1 §3.1 (UUID, title, content, timestamps)
- [x] 1.2 Create migration `init_mvp` with table `notas`, CHECK constraints on non-empty trimmed title/content (BR-001)
- [x] 1.3 Add indexes `idx_notas_created_at`, `idx_notas_updated_at`, `idx_notas_title` and `updated_at` trigger
- [x] 1.4 Run `npx prisma migrate dev` and `prisma generate`
- [x] 1.5 Add `prisma/seed.ts` with at least 3 sample notes
- [x] 1.6 Add integration test `tests/integration/repositories/nota.repository.test.ts` (INSERT + constraint rejection)
- [x] 1.7 Mark TASK-019 `done` in queue and status JSON

## 2. TASK-003 — [DB] Índice created_at para listado (backend-engineer)

- [x] 2.1 Verify `idx_notas_created_at` in migration SQL and `@@index` in `schema.prisma` (consistent)
- [x] 2.2 Confirm repository list query uses `orderBy: { createdAt: 'desc' }`
- [x] 2.3 Mark TASK-003 `done` in queue and status JSON

## 3. TASK-001 — [BE] GET /api/v1/notas (backend-engineer)

- [x] 3.1 Add `src/backend/src/lib/prisma.ts` singleton and disconnect on SIGTERM
- [x] 3.2 Create `nota.schema.ts` — `ListNotasQuerySchema` (defaults sort/order), `NotaResumenSchema`
- [x] 3.3 Create `nota.mapper.ts` — `toResumen()` with ISO date strings
- [x] 3.4 Create `nota.repository.ts` — `findAll()` with select id, title, createdAt, updatedAt
- [x] 3.5 Create `nota.service.ts` — `list(params)` delegating to repository + mapper
- [x] 3.6 Create `nota.controller.ts` — `listNotas` → 200 `{ data, meta: { total } }`
- [x] 3.7 Create `notas.routes.ts` — `GET /` with query validation; mount in `routes/index.ts` at `/notas`
- [x] 3.8 Add integration test `tests/integration/api/notas.list.test.ts` (200, structure, order, empty list)
- [x] 3.9 Add unit test `nota.mapper.test.ts`
- [x] 3.10 Mark TASK-001 `done` in queue and status JSON

## 4. TASK-002 — [FE] NoteList en pantalla principal (frontend-engineer)

- [x] 4.1 Add `types/nota.ts` — `NotaResumen` aligned with API
- [x] 4.2 Add `apiClient.ts` and `notesApi.listNotas()`
- [x] 4.3 Create `useNotes` hook (loading, error, notes state)
- [x] 4.4 Create `NoteListItem` — title + `createdAt` formatted (`es-ES`)
- [x] 4.5 Create `NoteList` — map items, empty message, loading/error states
- [x] 4.6 Create `HomePage` and route `/` in `App.tsx`
- [x] 4.7 Add unit test `NoteList.test.tsx` with mock props
- [x] 4.8 Mark TASK-002 `done` in queue and status JSON

## 5. TASK-004 — [QA] E2E listado US-001 (qa-engineer)

- [x] 5.1 Create `tests/e2e/fixtures/seed.ts` helper (3 notes with known titles/dates)
- [x] 5.2 Create `tests/e2e/us-001-listado.spec.ts` — scenario «Usuario con notas existentes ve el listado»
- [x] 5.3 Add scenario «El listado es la pantalla principal al iniciar»
- [x] 5.4 Add case: empty DB → no 500, list renders empty
- [x] 5.5 Document or wire `npm run test:e2e` command
- [x] 5.6 Mark TASK-004 `done` in queue and status JSON

## 6. Verification (all)

- [x] 6.1 `curl http://localhost:3000/api/v1/notas` returns seeded notes (200)
- [x] 6.2 Home page at `/` shows list without extra navigation
- [x] 6.3 All integration and E2E tests pass
- [x] 6.4 PHASE-001 complete — ready to archive or start PHASE-002
