# Skill: create-prd

Genera un Product Requirements Document.

## Inputs

| Rol | Ruta |
|-----|------|
| Requisitos | `01-knowledge/business-context.md` |
| Plantilla | `01-knowledge/templates/product/prd_template.md` |

## Output

`02-docs/02_1-product/prd/PRD-v1.md` (incrementar versión al regenerar)

## Instrucciones

1. Seguir la plantilla exactamente; sin placeholders.
2. Priorizar MVP; separar V2+ (backlinks, grafo, plugins).
3. Requisitos testables y métricas RNF medibles.
4. Registrar prompt en `04-prompts/discovery/`.

## Agente

`.cursor/agents/product-manager.md`
