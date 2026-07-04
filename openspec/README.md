# OpenSpec — Organizador de Conocimiento

Spec-driven execution layer for MVP implementation. Complements existing product/architecture docs in `docs/` — does not replace them.

## Structure

| Path | Purpose |
|------|---------|
| `config.yaml` | Project context and per-artifact rules for AI |
| `specs/` | Source of truth for system behavior (merged on archive) |
| `changes/` | Active changes — one folder per slice (e.g. `us-001-listado-notas/`) |
| `changes/archive/` | Completed changes (after `/opsx:archive`) |

## Setup (one-time, requires Node 20+)

```bash
npm install -g @fission-ai/openspec@latest
cd /path/to/AI4Devs-finalproject
openspec init          # merges Cursor slash commands if not present
openspec config profile  # optional: expanded workflow (ff, verify)
openspec update        # refresh /opsx:* commands in Cursor
```

This repo already includes `config.yaml` and folder layout. Running `openspec init` is safe — it adds agent instructions without overwriting `config.yaml` if customized.

Full setup guide: [docs/engineering/openspec-setup.md](../docs/engineering/openspec-setup.md)

## Workflow (per MVP user story)

1. `/opsx:propose us-001-listado` — or `/opsx:ff` with expanded profile
2. `/opsx:apply` — implement `tasks.md` checkboxes
3. `/opsx:verify` — validate against specs and Gherkin
4. `/opsx:archive` — merge specs, move change to archive

Sync with global queue: skill `.cursor/skills/apply-openspec-change.md`

## Mapping to project artefacts

| OpenSpec | Project |
|----------|---------|
| `proposal.md` | US-NNN + PRD intent |
| `design.md` | LLD-v1 sections |
| `tasks.md` | TASK-XXX from US + `implementation-queue-v1.json` |
| `specs/` delta | Gherkin from user story |
