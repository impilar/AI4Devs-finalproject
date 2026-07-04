# Ingeniería — plan de implementación

Artefactos para secuenciar y ejecutar el desarrollo en `src/` con OpenSpec + Specboot.

| Artefacto | Descripción |
|-----------|-------------|
| [implementation-plan-v1.md](implementation-plan-v1.md) | Plan humano: fases, dependencias, reglas (MVP, 8 fases, 40 tasks) |
| [implementation-queue-v1.json](implementation-queue-v1.json) | Cola priorizada de tasks para agentes desarrollador |
| [standards/](standards/) | Estándares de codificación (base, backend, frontend, docs) |
| [openspec-setup.md](openspec-setup.md) | Bootstrap OpenSpec CLI (`openspec init`, `openspec update`) |
| [`../../openspec/`](../../openspec/) | Changes activos, specs de comportamiento, `config.yaml` |
| [`../../AGENTS.md`](../../AGENTS.md) | Entrada para agentes de codificación |

## Generación del plan

1. Skill: `.cursor/skills/create-implementation-plan.md`
2. Agente: `.cursor/agents/implementation-planner.md`
3. Prompt: [`prompts/development/01-implementation-plan.md`](../../prompts/development/01-implementation-plan.md)

## Ejecución (OpenSpec)

1. Setup: [openspec-setup.md](openspec-setup.md)
2. Skill: `.cursor/skills/apply-openspec-change.md`
3. Prompt: [`prompts/development/02-openspec-slice.md`](../../prompts/development/02-openspec-slice.md)
4. Workflow: `.cursor/workflows/implementation.md`

## Uso de la cola

```bash
# Siguiente task pendiente
jq '.queue[] | select(.status == "backlog") | .id' implementation-queue-v1.json | head -1
```

Tras implementar: marcar `status: done` en `implementation-queue-v1.json`, `status-v1.json`, y checkbox en `openspec/changes/*/tasks.md`.
