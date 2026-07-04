# Prompts — Architecture (modelo de datos)

## Prompt 1: Generar modelo de datos

Ejecuta el agente `.cursor/agents/data-model-architect.md` (Data Model Architect):

- **Input:** `docs/architecture/hld/HLD-v1.md`
- **Input opcional:** `docs/product/prd/PRD-v1.md`
- **Plantilla:** `knowledge/templates/architecture/data-model-template.md`
- **Salida:** `docs/architecture/data-model/logical-model-v1.md`

Instrucciones: ER Mermaid, catálogo SQL, Prisma, DDL, índices RNF-002, mapeo snake_case → camelCase.
