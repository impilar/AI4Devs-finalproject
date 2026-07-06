# Ingeniería — plan de implementación

Artefactos para secuenciar y ejecutar el desarrollo en `src/` con OpenSpec + Specboot.

| Artefacto | Descripción |
|-----------|-------------|
| [implementation-plan-mvp.md](implementation-plan-mvp.md) | Plan humano: fases, dependencias, reglas (MVP, 8 fases, 40 tasks) |
| [implementation-queue-mvp.json](implementation-queue-mvp.json) | Cola priorizada de tasks para agentes desarrollador |
| [standards/](standards/) | Estándares de codificación (base, backend, frontend, docs) |
| [openspec-setup.md](openspec-setup.md) | Bootstrap OpenSpec CLI (`openspec init`, `openspec update`) |
| [getting-started.md](getting-started.md) | Bootstrap local: Docker, backend, frontend, tests |
| [`../../openspec/`](../../openspec/) | Changes activos, specs de comportamiento, `config.yaml` |
| [`../../AGENTS.md`](../../AGENTS.md) | Entrada para agentes de codificación |

## Generación del plan

1. Skill: `.cursor/skills/create-implementation-plan.md`
2. Agente: `.cursor/agents/implementation-planner.md`
3. Prompt: [`prompts/development/01-implementation-plan.md`](../../prompts/development/01-implementation-plan.md)

## Ejecución (OpenSpec)

1. Setup: [openspec-setup.md](openspec-setup.md)
2. Skill apply: `.cursor/skills/openspec-apply-change/SKILL.md`
3. Skill verify (antes de archive): `.cursor/skills/openspec-verify-change/SKILL.md`
4. Prompt: [`prompts/development/02-openspec-slice.md`](../../prompts/development/02-openspec-slice.md)
5. Workflow: `.cursor/workflows/implementation.md`

**Cerrar slice:** `/opsx:verify <change>` → `/opsx:archive <change>` (verify obligatorio).

**Cerrar release:** `/release:close MVP` — agente `release-manager.md`, skill `close-release/SKILL.md`.

## Uso de la cola

```bash
# Siguiente task pendiente
jq '.queue[] | select(.status == "backlog") | .id' implementation-queue-mvp.json | head -1
```

Tras implementar: marcar `status: done` en `implementation-queue-mvp.json`, `status-v1.json`, y checkbox en `openspec/changes/*/tasks.md`.
