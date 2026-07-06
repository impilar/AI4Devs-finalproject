# Proposal: PHASE-002 V2+ — Tag catalog with counts (US-011)

## Why

Users need a global view of how knowledge is distributed across tags. US-011 extends `GET /api/v1/etiquetas` to return `{ id, name, count }` and replaces the sidebar tag list with a catalog showing **name (N)**, reusing the US-009 filter on click.

## What Changes

- Implement `findAllWithCount` in `etiqueta.repository` via Prisma `_count` (TASK-043)
- Migrate `GET /api/v1/etiquetas` response to catalog objects; include tags with `count: 0` (TASK-041)
- Add `TagCatalog` sidebar component; wire `HomePage` / `useNotes` / `notesApi` (TASK-042)
- Integration + E2E `us-011-catalogo-etiquetas.spec.ts`; update US-009 selectors for count labels (TASK-044)
- Sync queue `implementation-queue-v2.json` and `status-v1.json`

**Out of scope:** sort catalog by count, delete tags, tag catalog on non-home routes.

## Capabilities

### Modified Capabilities

- `note-tags`: Catalog API `GET /etiquetas` with counts; `TagCatalog` UI; E2E US-011

## Impact

| Area | Impact |
|------|--------|
| `src/backend/src/repositories/etiqueta.repository.ts` | `_count` query |
| `src/backend/src/schemas/etiqueta.schema.ts` | New response schema |
| `src/frontend/src/components/tags/TagCatalog.tsx` | New sidebar |
| `tests/integration/api/` | `etiquetas.list.test.ts` |
| `tests/e2e/` | `us-011-catalogo-etiquetas.spec.ts`; US-009 label updates |

**References:** [US-011](02-docs/02_1-product/user-stories/US-011.md), HLD-v1 §API, RF-011, RF-017.
