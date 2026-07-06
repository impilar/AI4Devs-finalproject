# AGENTS.md — AI development guide

Entry point for coding agents (Cursor and compatible tools). Adapted from [LIDR Specboot](https://github.com/LIDR-academy/lidr-specboot) for this repository.

## Project

**Organizador de Conocimiento** — MVP: CRUD notes, tags, simple search. Modular monolith; no multi-user auth in MVP.

## Before any implementation

1. Read **`docs/engineering/standards/base-standards.md`** (single source of truth for coding).
2. Read layer-specific standards:
   - Backend / DB: `docs/engineering/standards/backend-standards.md`
   - Frontend: `docs/engineering/standards/frontend-standards.md`
3. Check **`docs/engineering/implementation-queue-v1.json`** for the next `backlog` task (`sequence`).
4. Open the active OpenSpec change in **`openspec/changes/`** (or create via `/opsx:propose`).
5. Read task detail in **`docs/product/user-stories/US-NNN.md`** (§Detalle por task).

## Sources of truth (do not regenerate)

| Artefact | Path |
|----------|------|
| PRD | `docs/product/prd/PRD-v1.md` |
| User stories | `docs/product/user-stories/US-NNN.md` |
| HLD | `docs/architecture/hld/HLD-v1.md` |
| LLD | `docs/architecture/lld/LLD-v1.md` |
| Data model | `docs/architecture/data-model/logical-model-v1.md` |
| Implementation queue | `docs/engineering/implementation-queue-v1.json` |
| OpenSpec config | `openspec/config.yaml` |

## Agents (roles)

| Role | File |
|------|------|
| Backend + DB | `.cursor/agents/backend-engineer.md` |
| Frontend | `.cursor/agents/frontend-engineer.md` |
| QA | `.cursor/agents/qa-engineer.md` |
| DevOps / infra | `.cursor/agents/devops-engineer.md` |
| Implementation planning | `.cursor/agents/implementation-planner.md` |
| Release close + PR | `.cursor/agents/release-manager.md` |

## Skills (workflows)

| Skill | Use |
|-------|-----|
| `openspec-apply-change/SKILL.md` | Implement next task; sync queue + status JSON |
| `openspec-verify-change/SKILL.md` | **Required before archive** — validate vs specs + tests |
| `openspec-archive-change/SKILL.md` | Merge specs and archive change (after verify PASS) |
| `close-release/SKILL.md` | **End of release** — verify queue, status, OpenSpec, tests, git; open PR |
| `enrich-user-story.md` | Enrich user story before planning (already done for MVP) |
| `create-implementation-plan.md` | Regenerate implementation queue |

Index: `.cursor/skills/README.md`

## OpenSpec commands (Cursor chat)

Requires `openspec init` + `openspec update` once (see `docs/engineering/openspec-setup.md`).

| Command | Purpose |
|---------|---------|
| `/opsx:propose <name>` | Create change with proposal, specs, design, tasks |
| `/opsx:apply` | Implement tasks in active change |
| `/opsx:verify <name>` | **Required before archive** — validate implementation vs specs + tests |
| `/opsx:archive <name>` | Merge specs and archive change (only after verify PASS) |
| `/release:close [MVP\|V1\|V2+]` | Verify release readiness and prepare PR (see `release-manager`) |

Expanded profile (optional): `/opsx:ff`, `/opsx:continue` — run `openspec config profile` then `openspec update`.

## Rules

`.cursor/rules/01-project-standards.mdc` … `08-definition-of-done.mdc`

## Workflows

`.cursor/workflows/implementation.md` — full implementation phase.  
`.cursor/workflows/release.md` — release notes and close (`/release:close`).

## Language

- **English:** code, comments, commits, OpenSpec artifacts.
- **Spanish:** product documentation in `docs/product/`.
