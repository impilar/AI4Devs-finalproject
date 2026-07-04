# Prompts — Architecture

## Prompt 1: Generar HLD

Ejecuta el agente `.cursor/agents/solution-architect.md` (Solution Architect):

- **Input:** `docs/product/prd/PRD-v1.md`
- **Plantilla:** `knowledge/templates/architecture/hld-template.md`
- **Salida:** `docs/architecture/hld/HLD-v1.md`

Instrucciones: monolito modular en capas, React + Express + PostgreSQL + Prisma, REST `/api/v1`, diagramas C4 Mermaid, trade-offs documentados.
