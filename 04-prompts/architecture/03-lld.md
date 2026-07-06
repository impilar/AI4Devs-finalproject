# Prompts — Architecture (LLD)

## Prompt 3: Generar Low Level Design

Ejecuta el agente `.cursor/agents/lld-architect.md` (LLD Architect):

- **Input:** `02-docs/02_2-architecture/hld/HLD-v1.md`
- **Input:** `02-docs/02_2-architecture/data-model/logical-model-v1.md`
- **Input opcional:** `02-docs/02_1-product/roadmap/roadmap-v1.md`, `02-docs/02_1-product/user-stories/`
- **Plantilla:** `01-knowledge/templates/architecture/lld-template.md`
- **Salida:** `02-docs/02_2-architecture/lld/LLD-v1.md`

Instrucciones: detalle de módulos en `src/backend/` y `src/frontend/`, contratos entre capas, DTOs Zod por endpoint, lógica de servicios, migraciones Prisma, trazabilidad US/TASK, sin reabrir decisiones del HLD.

**Prerrequisitos:** HLD-v1 y logical-model-v1 completos.

**Siguiente paso:** implementación (`src/`) o `design-api.md` para OpenAPI.
