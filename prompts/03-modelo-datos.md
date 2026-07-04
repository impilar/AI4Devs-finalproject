# Prompts — Modelo de datos

## Prompt 1: Generar modelo de datos

Ejecuta el agente `.cursor/agents/agent_data_model.m` (Data Model Generator) a partir de la arquitectura:

- **Input:** `architecture/architecture_v1.md`
- **Input opcional:** `knowledge/product/prd_v1.md`
- **Plantilla:** `knowledge/templates/technical/data_model_template.md`
- **Salida:** `architecture/data_model_v1.md`

Instrucciones: diagrama ER Mermaid con PK/FK/UK, catálogo de entidades con tipos SQL y restricciones, esquema Prisma, DDL SQL, índices para RNF-002, mapeo snake_case → camelCase en DTOs, entidades futuras solo en sección de evolución.
