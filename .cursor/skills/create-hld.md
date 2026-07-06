# Skill: create-hld

Genera el High Level Design (arquitectura de sistema).

## Inputs

| Rol | Ruta |
|-----|------|
| PRD | `02-docs/02_1-product/prd/PRD-v1.md` |
| Plantilla | `01-knowledge/templates/architecture/hld-template.md` |

## Output

`02-docs/02_2-architecture/hld/HLD-v1.md`

## Instrucciones

1. Monolito modular en capas.
2. Stack: React + Express + PostgreSQL + Prisma.
3. REST `/api/v1`, diagramas C4 Mermaid.
4. Trade-offs documentados; sin microservicios en MVP.

## Agente

`.cursor/agents/solution-architect.md`
