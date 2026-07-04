# Base standards — Organizador de Conocimiento

Single source of truth for **implementation** practices. Product and architecture docs live in `docs/product/` and `docs/architecture/`. Governs code in `src/` and tests in `tests/`.

Adapted from [LIDR Specboot](https://github.com/LIDR-academy/lidr-specboot) for this repository's layered structure.

## Principles

1. **Small tasks, one at a time** — Follow `implementation-queue-v1.json` sequence; complete one TASK before starting the next.
2. **Test-driven development (TDD)** — Write failing tests first for services and API endpoints; E2E after FE slice.
3. **Type safety** — Strict TypeScript; no `any` without justification.
4. **Clear naming** — Descriptive functions, components, and files per LLD-v1.
5. **Language** — English: code, comments, commits, OpenSpec artifacts. Spanish: product documentation in `docs/product/`.
6. **Incremental changes** — Focused diffs; one concern per commit when possible.
7. **Specs before code** — OpenSpec change approved (`proposal`, `specs`, `design`, `tasks`) before `/opsx:apply`.

## Layered documentation

| Layer | Location | When to read |
|-------|----------|--------------|
| Static context | `knowledge/` | Domain terms, templates |
| Living docs | `docs/product/`, `docs/architecture/` | PRD, HLD, LLD, user stories |
| Engineering standards | `docs/engineering/standards/` | Before every implementation task |
| OpenSpec | `openspec/` | Active change being built |
| Cursor governance | `.cursor/rules/`, `.cursor/agents/` | Automatic / agent invocation |

## Specific standards

| Topic | Document |
|-------|----------|
| Backend | [backend-standards.md](backend-standards.md) |
| Frontend | [frontend-standards.md](frontend-standards.md) |
| Documentation | [documentation-standards.md](documentation-standards.md) |
| Testing | `.cursor/rules/05-testing-rules.mdc`, `docs/qa/test-strategy.md` |
| Security | `.cursor/rules/04-security-rules.mdc` |
| Definition of Done | `.cursor/rules/08-definition-of-done.mdc` |
| Git | `.cursor/rules/07-git-workflow-rules.mdc`, `CONTRIBUTING.md` |

## Implementation workflow

1. Check `implementation-queue-v1.json` for next `backlog` item (lowest `sequence`).
2. Open matching OpenSpec change in `openspec/changes/` (or create with `/opsx:propose`).
3. Read task detail in `docs/product/user-stories/US-NNN.md` §Detalle por task.
4. Implement per [backend-standards.md](backend-standards.md) or [frontend-standards.md](frontend-standards.md).
5. Run tests; mark task `done` in queue and `status-v1.json`.
6. On slice complete: **`/opsx:verify <change>`** (mandatory) → **`/opsx:archive <change>`** (only after verify PASS).

## Coverage targets (MVP)

| Layer | Target |
|-------|--------|
| Services / validators | ≥ 80% line coverage |
| API integration | Happy path + main error cases per endpoint |
| E2E | One flow per user story (Gherkin) |

Stricter 90%+ coverage applies post-MVP if team agrees.

## References

- LLD: `docs/architecture/lld/LLD-v1.md`
- Queue: `docs/engineering/implementation-queue-v1.json`
- Plan: `docs/engineering/implementation-plan-v1.md`
- OpenSpec config: `openspec/config.yaml`
