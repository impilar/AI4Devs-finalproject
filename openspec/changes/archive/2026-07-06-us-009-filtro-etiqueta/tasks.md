# Tasks: PHASE-005 — Filter by tag (US-009)

> Queue sequences 21–24. Detail: [US-009](docs/product/user-stories/US-009.md).

## 1. TASK-035 — [DB] Index nota_etiqueta (backend-engineer)

- [x] 1.1 Verify `idx_nota_etiqueta_etiqueta` in `schema.prisma` and migration SQL
- [x] 1.2 Mark TASK-035 done in queue and status JSON

## 2. TASK-033 — [BE] GET /notas?etiqueta= (backend-engineer)

- [x] 2.1 Implement `filterByTag` in `nota.repository.findAll`
- [x] 2.2 Add `GET /api/v1/etiquetas` for tag names list
- [x] 2.3 Add integration tests `notas.filter-etiqueta.test.ts`
- [x] 2.4 Mark TASK-033 done

## 3. TASK-034 — [FE] TagFilter (frontend-engineer)

- [x] 3.1 Create `TagFilter` component with active state and clear
- [x] 3.2 Extend `useNotes` and `notesApi` with `etiqueta` param
- [x] 3.3 Integrate in `HomePage` with `EmptyState` for filtered empty
- [x] 3.4 Mark TASK-034 done

## 4. TASK-036 — [QA] E2E US-009 (qa-engineer)

- [x] 4.1 Extend e2e seed with filter scenarios (trabajo, personal, archivo orphan)
- [x] 4.2 Create `tests/e2e/us-009-filtro-etiqueta.spec.ts`
- [x] 4.3 Mark TASK-036 done

## 5. Verification

- [x] 5.1 All tests pass — ready to archive
