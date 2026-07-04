# Prompts — Arquitectura

## Prompt 1: Generar arquitectura técnica

Ejecuta el agente `.cursor/agents/agent_architect.m` (Software Architect) para generar la arquitectura técnica:

- **Input:** `knowledge/product/prd_v1.md`
- **Plantilla:** `knowledge/templates/technical/architecture_template.md`
- **Salida:** `architecture/architecture_v1.md`

Instrucciones: monolito modular en capas, stack explícito (React + Express + PostgreSQL + Prisma), API REST `/api/v1`, diagramas C4 Mermaid, trade-offs documentados, sin microservicios en MVP.
