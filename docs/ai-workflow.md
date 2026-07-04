# Flujo de trabajo con IA

## Workflows disponibles

| Workflow | Objetivo | Archivo |
|----------|----------|---------|
| 01 | Product Discovery | `.cursor/workflows/01-product-discovery.md` |
| 02 | Technical Design | `.cursor/workflows/02-technical-design.md` |
| 03 | Delivery Planning | `.cursor/workflows/03-delivery-planning.md` |

## Agentes

| Agente | Rol |
|--------|-----|
| `agent_prd.m` | Generar PRD |
| `agent_user_story_mapping.m` | Generar User Story Map |
| `agent_architect.m` | Generar arquitectura técnica |
| `agent_data_model.m` | Generar modelo de datos |
| `agent_roadmap.m` | Generar roadmap y CSV Jira |

## Reglas del proyecto

Las reglas persistentes están en `.cursor/rules/`:

- `product.mdc` — convenciones de producto y MVP
- `architecture.mdc` — stack y patrones
- `coding.mdc` — estándares de código
- `repo-structure.mdc` — dónde va cada tipo de archivo

## Registro de prompts

Documentar cada prompt significativo en `prompts/` por fase. El índice académico está en [`prompts.md`](../prompts.md).
