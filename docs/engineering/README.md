# Ingeniería — plan de implementación

Artefactos para secuenciar el trabajo de desarrollo antes de codificar en `src/`.

| Artefacto | Descripción |
|-----------|-------------|
| [implementation-plan-v1.md](implementation-plan-v1.md) | Plan humano: fases, dependencias, reglas (MVP, 8 fases, 40 tasks) |
| [implementation-queue-v1.json](implementation-queue-v1.json) | Cola priorizada de tasks para agentes desarrollador |

## Generación

1. Skill: `.cursor/skills/create-implementation-plan.md`
2. Agente: `.cursor/agents/implementation-planner.md`
3. Prompt: [`prompts/development/01-implementation-plan.md`](../../prompts/development/01-implementation-plan.md)

## Uso de la cola

```bash
# Siguiente task pendiente
jq '.queue[] | select(.status == "backlog") | .id' implementation-queue-v1.json | head -1
```

Tras implementar: marcar `status: done` en `implementation-queue-v1.json` y en `docs/product/user-stories/status-v1.json`.
