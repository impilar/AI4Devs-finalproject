# Proposal: PHASE-003 V2+ — Note backlinks (US-017)

## Why

Users need to connect related ideas and navigate between notes bidirectionally. US-017 (release V2+) introduces directed note-to-note links with outgoing links in the source detail view and an incoming «Notas que enlazan aquí» panel on the target (PRD §8 Futuro, HLD-v1 §12.2, logical-model §11.2).

## What Changes

- Add `nota_backlink` table with CASCADE FKs and indexes (TASK-067)
- Expose `POST /notas/:id/backlinks`, `GET .../salientes`, `GET .../entrantes` (TASK-065)
- Add `NoteLinkPicker` in edit mode and `BacklinksPanel` in detail; wire `useNote` / `notesApi` (TASK-066)
- Integration + E2E `us-017-backlinks.spec.ts` with seed scenario (TASK-068)
- Sync `implementation-queue-v2.json` and `status-v1.json` as tasks complete

**Out of scope:** wiki syntax `[[nota]]`, graph visualization, delete backlink API, backlinks in note create flow.

## Capabilities

### New Capabilities

- `note-backlinks`: REST API to create and list outgoing/incoming note backlinks; validation rules; E2E US-017

### Modified Capabilities

- `notes-relations-data-model`: `nota_backlink` table and indexes
- `note-detail`: Outgoing note links section and incoming backlinks panel in detail view

## Impact

| Area | Impact |
|------|--------|
| `src/backend/prisma/` | New `NotaBacklink` model + migration |
| `src/backend/src/` | `backlink.*` module; routes under `notas.routes.ts` |
| `src/frontend/src/components/notes/` | `NoteLinkPicker`, `BacklinksPanel`; updates to `NoteDetail`, `NoteForm` |
| `tests/` | Repository, API integration, E2E US-017 |

**References:** [US-017](02-docs/02_1-product/user-stories/US-017.md), RF backlinks (PRD §8), RNF-001, RNF-005, RNF-006.
