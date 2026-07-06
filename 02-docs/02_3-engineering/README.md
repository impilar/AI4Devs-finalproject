# Ingeniería — plan de implementación

Artefactos para secuenciar y ejecutar el desarrollo en `src/` con OpenSpec + Specboot.

| Artefacto | Descripción |
|-----------|-------------|
| [implementation-plan-mvp.md](implementation-plan-mvp.md) | Plan humano: fases, dependencias, reglas (MVP) |
| [implementation-queue-mvp.json](implementation-queue-mvp.json) | Cola priorizada MVP |
| [implementation-plan-v1.md](implementation-plan-v1.md) | Plan release V1 (pulido UX) |
| [implementation-queue-v1.json](implementation-queue-v1.json) | Cola priorizada V1 |
| [standards/](standards/) | Estándares de codificación (base, backend, frontend, docs) |
| [openspec-setup.md](openspec-setup.md) | Bootstrap OpenSpec CLI (`openspec init`, `openspec update`) |
| [getting-started.md](getting-started.md) | Bootstrap local: Docker, backend, frontend, tests |
| [`../../openspec/`](../../openspec/) | Changes activos, specs de comportamiento, `config.yaml` |
| [`../../AGENTS.md`](../../AGENTS.md) | Entrada para agentes de codificación |

## Generación del plan

**Orden:** enriquecer historias → verificar gate → generar plan/cola.

```bash
npm run check:stories-enriched:v1   # o :mvp
```

1. Enriquecer: `.cursor/skills/enrich-user-story.md` — prompt [`04-prompts/discovery/03-enriquecer-user-story.md`](../../04-prompts/discovery/03-enriquecer-user-story.md)
2. Gate: `05-scripts/check-stories-enriched.mjs` (regla `.cursor/rules/09-enrichment-before-plan.mdc`)
3. Plan: `.cursor/skills/create-implementation-plan.md` + `.cursor/agents/implementation-planner.md`
4. Prompt: [`04-prompts/development/01-implementation-plan.md`](../../04-prompts/development/01-implementation-plan.md)

## Ejecución (OpenSpec)

1. Setup: [openspec-setup.md](openspec-setup.md)
2. Skill apply: `.cursor/skills/openspec-apply-change/SKILL.md`
3. Skill verify (antes de archive): `.cursor/skills/openspec-verify-change/SKILL.md`
4. Prompt: [`04-prompts/development/02-openspec-slice.md`](../../04-prompts/development/02-openspec-slice.md)
5. Workflow: `.cursor/workflows/implementation.md`

**Cerrar slice:** `/opsx:verify <change>` → `/opsx:archive <change>` (verify obligatorio).

**Cerrar release:** `/release:close MVP` — agente `release-manager.md`, skill `close-release/SKILL.md`.

## Uso de la cola

```bash
# Siguiente task pendiente
jq '.queue[] | select(.status == "backlog") | .id' implementation-queue-mvp.json | head -1
```

Tras implementar: marcar `status: done` en `implementation-queue-mvp.json`, `status-v1.json`, y checkbox en `openspec/changes/*/tasks.md`.
