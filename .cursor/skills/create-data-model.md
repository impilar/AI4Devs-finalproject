# Skill: create-data-model

Genera modelo de datos lógico y físico.

## Inputs

| Rol | Ruta |
|-----|------|
| HLD | `docs/architecture/hld/HLD-v1.md` |
| PRD (opcional) | `docs/product/prd/PRD-v1.md` |
| Plantilla | `knowledge/templates/architecture/data-model-template.md` |

## Output

`docs/architecture/data-model/logical-model-v1.md`

## Instrucciones

1. ER Mermaid con PK/FK/UK.
2. Catálogo SQL + esquema Prisma + DDL.
3. Índices para RNF-002.
4. Mapeo snake_case → camelCase en DTOs.
5. Entidades futuras solo en sección de evolución.

## Agente legacy

`.cursor/agents/data-model-architect.md`
