# Contribuir

## Convenciones de documentación

| Tipo | Ubicación | Ejemplo |
|------|-----------|---------|
| Contexto estático | `knowledge/` | `business-context.md` |
| Plantillas | `knowledge/templates/` | `hld-template.md` |
| Producto (vivo) | `docs/product/` | `PRD-v1.md` |
| Arquitectura (vivo) | `docs/architecture/` | `HLD-v1.md`, `ADR-001-*.md` |
| Prompts IA | `prompts/{fase}/` | `discovery/01-requisitos-y-prd.md` |
| Código | `src/` | `frontend/`, `backend/` |
| Tests | `tests/` | `e2e/`, `integration/` |
| Entrega | `delivery/` | `releases/`, `demos/` |

Ver [`.cursor/rules/`](.cursor/rules/) (`01`–`08`) y [`.cursor/skills/`](.cursor/skills/).

## Versionado

Al regenerar artefactos con agentes, incrementar versión (`v2`, `v3`…) y conservar la anterior.

## Commits

Mensajes descriptivos por capa:

- `docs: actualizar PRD v2`
- `feat(backend): implementar POST /notas`
- `chore: reorganizar docs/product`

## Guías del repositorio

- [Getting started (infra y desarrollo)](docs/engineering/getting-started.md)
- [Getting started (índice docs)](docs/getting-started.md)
- [Flujo de trabajo con IA](docs/ai-workflow.md)
