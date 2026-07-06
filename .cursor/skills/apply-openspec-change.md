# Skill: apply-openspec-change

Implement the next task from the active OpenSpec change and sync project tracking files.

Bridge between **OpenSpec** (`openspec/changes/*/tasks.md`) and **implementation queue** (`02-docs/02_3-engineering/implementation-queue-mvp.json`).

## When to use

- During `/opsx:apply` or when user asks to implement the next TASK.
- After PHASE-000 bootstrap, starting at `sequence: 1` (TASK-019).

## Arguments

- Change name: e.g. `us-001-listado-notas` (folder under `openspec/changes/`)
- Task id (optional): e.g. `TASK-019` — if omitted, pick next unchecked checkbox in `tasks.md` that matches next `backlog` item in queue

## Inputs

| Source | Path |
|--------|------|
| OpenSpec change | `openspec/changes/<name>/` |
| Queue | `02-docs/02_3-engineering/implementation-queue-mvp.json` |
| User story | `02-docs/02_1-product/user-stories/US-NNN.md` |
| Standards | `02-docs/02_3-engineering/standards/base-standards.md` |
| Agent | Per `layer` in queue: backend-engineer, frontend-engineer, qa-engineer |

## Steps

### 1. Resolve next task

```bash
jq '.queue[] | select(.status == "backlog") | {sequence, id, story_id, layer, agent}' 02-docs/02_3-engineering/implementation-queue-mvp.json | head -1
```

Confirm the task exists as `- [ ] TASK-XXX` in `openspec/changes/<active>/tasks.md`.

### 2. Load context

- Read `US-NNN.md` §Detalle por task for `TASK-XXX`
- Read `openspec/changes/<name>/design.md` for technical approach
- Read layer standard (backend or frontend)

### 3. Implement

- Follow TDD per `base-standards.md`
- Do not skip dependencies (`depends_on` in queue must be `done`)
- Code only in `src/` and `tests/` — no product doc regeneration unless API spec update required

### 4. Update tracking

On task completion:

1. `tasks.md`: `- [x] TASK-XXX`
2. `implementation-queue-mvp.json`: `"status": "done"` for matching queue entry
3. `02-docs/02_1-product/user-stories/status-v1.json`: update task status if tracked

### 5. Report

Summarize: files changed, tests run, next task in queue.

## Agent mapping

| `layer` in queue | Agent |
|------------------|-------|
| database, backend | `backend-engineer.md` |
| frontend | `frontend-engineer.md` |
| qa | `qa-engineer.md` |

Infra (PHASE-000): `devops-engineer.md` — no TASK id in queue.

## Related

- `openspec/config.yaml` — global rules
- `.cursor/workflows/implementation.md`
- Prompt: `04-prompts/development/02-openspec-slice.md`
