# Proposal: PHASE-001 V2+ — List sort (US-004)

## Why

Users with growing libraries need to review notes by date or title. US-004 (release V2+) exposes `sort`/`order` on `GET /api/v1/notas` in the UI with session persistence when navigating detail ↔ list (roadmap §Release V2+, LLD-v1 §12).

## What Changes

- Verify `idx_notas_title` supports title ordering (TASK-015)
- Complete BE integration tests for `sort=created_at|title` and `order=asc|desc` (TASK-013)
- Add `NoteSortSelect` on home list toolbar; persist preference in `sessionStorage` (TASK-014)
- Add Playwright E2E `us-004-ordenacion-listado.spec.ts` (TASK-016)
- Sync `implementation-queue-v2.json` and `status-v1.json` as tasks complete

**Out of scope:** search result ordering (US-013), tag catalog (US-011), backlinks (US-017).

## Capabilities

### Modified Capabilities

- `notes-list`: List sort query params in API; home page sort selector; session persistence; E2E US-004

## Impact

| Area | Impact |
|------|--------|
| `src/backend/` | Integration tests for sort/order |
| `src/frontend/` | `NoteSortSelect`, `useNotes`, `HomePage`, `notesApi` |
| `tests/` | Integration + E2E US-004 |
| Queue | TASK-015–TASK-016 (`implementation-queue-v2.json` sequences 1–4) |

**References:** [US-004](02-docs/02_1-product/user-stories/US-004.md), RF-015, RNF-001, RNF-006.
