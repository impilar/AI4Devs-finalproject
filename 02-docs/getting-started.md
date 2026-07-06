# Guía de inicio

## Arranque del software (infra + API + frontend)

**Guía operativa completa:** [02_3-engineering/getting-started.md](02_3-engineering/getting-started.md)

Incluye: requisitos (Node, Docker), primera instalación, `docker compose up`, desarrollo nativo, reinicio día a día, tests y troubleshooting.

## Capas del repositorio

| Capa | Carpeta | Naturaleza |
|------|---------|------------|
| Conocimiento | [`01-knowledge/`](../01-knowledge/) | **Estática** — contexto, plantillas |
| Documentación | [`02-docs/`](../02-docs/) | **Viva** — PRD, HLD, ADR, roadmap |
| Gobernanza IA | [`.cursor/`](../.cursor/) | Agentes, rules, workflows |
| Software | [`src/`](../src/) | Código |
| Entrega | [`03-delivery/`](../03-delivery/) | Releases, evidencias |

## Flujo con IA

1. Consultar workflow en `.cursor/workflows/`
2. Consultar skill en `.cursor/skills/`
3. Ejecutar agente en `.cursor/agents/`
4. Verificar salida en `02-docs/`
5. Registrar prompt en `04-prompts/{fase}/`

## Índices en raíz

- [readme.md](../readme.md) — ficha académica
- [ARCHITECTURE.md](../ARCHITECTURE.md) — índice de arquitectura
- [CONTRIBUTING.md](../CONTRIBUTING.md) — convenciones
- [prompts.md](../prompts.md) — índice de prompts
- [AGENTS.md](../AGENTS.md) — guía para agentes de codificación
