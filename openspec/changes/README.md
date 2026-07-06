# Active changes

One folder per implementation slice. Naming: `us-NNN-short-name` or `phase-000-bootstrap`.

## Suggested order (MVP)

| Change | Phase | Stories | Queue tasks |
|--------|-------|---------|-------------|
| `phase-000-bootstrap` | PHASE-000 | — | infra only |
| `us-001-listado-notas` | PHASE-001 | US-001 | TASK-019, 003, 001, 002, 004 |
| `us-002-detalle-nota` | PHASE-002 | US-002 | TASK-031, 023, 005, 007, 006, 008 |
| … | … | … | see `implementation-queue-mvp.json` |

Create with `/opsx:propose <name>` in Cursor after `openspec update`.
