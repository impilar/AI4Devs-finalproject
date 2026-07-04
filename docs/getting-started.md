# Guía de inicio

## Capas del repositorio

| Capa | Carpeta | Naturaleza |
|------|---------|------------|
| Conocimiento | [`knowledge/`](../knowledge/) | **Estática** — contexto, plantillas |
| Documentación | [`docs/`](../docs/) | **Viva** — PRD, HLD, ADR, roadmap |
| Gobernanza IA | [`.cursor/`](../.cursor/) | Agentes, rules, workflows |
| Software | [`src/`](../src/) | Código |
| Entrega | [`delivery/`](../delivery/) | Releases, evidencias |

## Flujo con IA

1. Consultar workflow en `.cursor/workflows/`
2. Consultar skill en `.cursor/skills/`
3. Ejecutar agente en `.cursor/agents/`
4. Verificar salida en `docs/`
5. Registrar prompt en `prompts/{fase}/`

## Índices en raíz

- [README.md](../readme.md) — ficha académica
- [ARCHITECTURE.md](../ARCHITECTURE.md) — índice de arquitectura
- [CONTRIBUTING.md](../CONTRIBUTING.md) — convenciones
- [prompts.md](../prompts.md) — índice de prompts
