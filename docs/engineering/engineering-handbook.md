# Engineering Handbook

Guía operativa del repositorio.

## Capas

| Capa | Carpeta | Tipo |
|------|---------|------|
| Estática | `knowledge/` | Contexto, plantillas |
| Viva | `docs/` | PRD, HLD, ADR, roadmap |
| IA | `.cursor/` | Rules, agents, skills, workflows |
| Código | `src/`, `tests/` | Software |

## Flujo con IA

1. Elegir workflow en `.cursor/workflows/`
2. Consultar skill en `.cursor/skills/`
3. Invocar agente si aplica
4. Verificar output en `docs/`
5. Registrar prompt en `prompts/{fase}/`

## Plan de implementación

Antes de codificar en `src/`:

- Cola priorizada: `implementation-plan-v1.md`, `implementation-queue-v1.json`
- OpenSpec: [openspec-setup.md](openspec-setup.md), `openspec/config.yaml`
- Estándares: [standards/base-standards.md](standards/base-standards.md)
- Entrada agentes: [AGENTS.md](../../AGENTS.md)

## Enlaces

- [Getting started](getting-started.md)
- [AI workflow](ai-workflow.md)
- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [ARCHITECTURE.md](../ARCHITECTURE.md)
