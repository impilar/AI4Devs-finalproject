# Workflow — Implementation

Implementación del MVP en `src/`.

## Prerrequisitos

1. `docs/architecture/lld/LLD-v1.md`
2. User stories MVP enriquecidas (recomendado)
3. **`docs/engineering/implementation-plan-v1.md`** y **`implementation-queue-v1.json`** generados

| Paso | Skill / Agente | Output |
|------|----------------|--------|
| 0 | `create-implementation-plan.md` → `implementation-planner.md` | `docs/engineering/implementation-plan-v1.md`, `implementation-queue-v1.json` |
| 1+ | Seguir `queue[].sequence` | `src/`, `tests/` |

Prompt plan: `prompts/development/01-implementation-plan.md`

## Agentes desarrollador (por capa)

| Agente | Área |
|--------|------|
| `backend-engineer.md` | `src/backend/` |
| `frontend-engineer.md` | `src/frontend/` |
| `devops-engineer.md` | `src/infra/` |
| `qa-engineer.md` | `tests/` |

## Skills

- `create-implementation-plan.md` — cola priorizada con dependencias
- `enrich-user-story.md` — detalle técnico en historias
- `code-review.md`
- `design-api.md`

## Referencias

- Cola: `docs/engineering/implementation-queue-v1.json`
- User stories: `docs/product/user-stories/`
- DoD: `.cursor/rules/08-definition-of-done.mdc`
