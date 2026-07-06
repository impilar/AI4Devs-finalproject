# Contribuir

## Convenciones de documentación

| Tipo | Ubicación | Ejemplo |
|------|-----------|---------|
| Contexto estático | `01-knowledge/` | `business-context.md` |
| Plantillas | `01-knowledge/templates/` | `hld-template.md` |
| Producto (vivo) | `02-docs/02_1-product/` | `PRD-v1.md` |
| Arquitectura (vivo) | `02-docs/02_2-architecture/` | `HLD-v1.md`, `ADR-001-*.md` |
| Prompts IA | `04-prompts/{fase}/` | `discovery/01-requisitos-y-prd.md` |
| Código | `src/` | `frontend/`, `backend/` |
| Tests | `tests/` | `e2e/`, `integration/` |
| Entrega | `03-delivery/` | `releases/`, `demos/` |

Ver [`.cursor/rules/`](.cursor/rules/) (`01`–`08`) y [`.cursor/skills/`](.cursor/skills/).

## Versionado

Al regenerar artefactos con agentes, incrementar versión (`v2`, `v3`…) y conservar la anterior.

## Commits

Mensajes descriptivos por capa:

- `docs: actualizar PRD v2`
- `feat(backend): implementar POST /notas`
- `chore: reorganizar 02-docs/02_1-product`

## Guías del repositorio

- [Getting started (infra y desarrollo)](02-docs/02_3-engineering/getting-started.md)
- [Getting started (índice docs)](02-docs/getting-started.md)
- [Flujo de trabajo con IA](02-docs/ai-workflow.md)
