# Documentation standards (implementation phase)

Aligns with `.cursor/rules/06-documentation-rules.mdc`. This file covers docs touched **during development**.

## Layer rules

| Content | Location | Versioning |
|---------|----------|------------|
| Business context, templates | `knowledge/` | Rarely changes |
| PRD, stories, HLD, LLD, ADR | `docs/` | `vN` suffix on regeneration |
| OpenSpec behavior specs | `openspec/specs/` | Merged on archive |
| Active implementation | `openspec/changes/<name>/` | Deleted/archived when done |
| Code | `src/`, `tests/` | No living docs inside `src/` |

## OpenSpec artifacts

| File | Language | Content |
|------|----------|---------|
| `proposal.md` | English | Why, scope, links to US-NNN |
| `specs/**/*.md` | English | Requirements + Gherkin scenarios |
| `design.md` | English | Technical approach from LLD |
| `tasks.md` | English | Checkboxes = TASK-XXX ids |

Do not duplicate full LLD in `design.md` — cite sections and list files to create.

## API documentation

- OpenAPI 3: `docs/architecture/apis/api-spec-v1.yaml`
- Update when adding or changing endpoints
- Keep in sync with Zod schemas and integration tests

## Prompt traceability

Register significant AI prompts in `prompts/{phase}/` and index in `prompts.md`.

## Commits

Format per `CONTRIBUTING.md`:

- `feat(backend): implement GET /notas`
- `feat(frontend): NoteList component`
- `test(qa): E2E US-001 listado`

## Status tracking

After each TASK:

1. `docs/engineering/implementation-queue-v1.json` → `"status": "done"`
2. `docs/product/user-stories/status-v1.json` → task/story status

## References

- Project standards: `.cursor/rules/01-project-standards.mdc`
- DoD: `.cursor/rules/08-definition-of-done.mdc`
