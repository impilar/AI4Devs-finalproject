# Prompts — Development (plan de implementación)

## Prompt 1: Generar plan de implementación priorizado

Ejecuta el agente `.cursor/agents/implementation-planner.md` (Implementation Planner / Product Owner):

- **Argumento:** `MVP` (por defecto)
- **Inputs:** `02-docs/02_2-architecture/lld/LLD-v1.md`, `02-docs/02_1-product/user-stories/`, `status-v1.json`, `02-docs/02_1-product/prd/PRD-v1.md`
- **Plantilla:** `01-knowledge/templates/engineering/implementation-plan-template.md`
- **Salidas:**
  - `02-docs/02_3-engineering/implementation-plan-mvp.md`
  - `02-docs/02_3-engineering/implementation-queue-mvp.json`

**Prerrequisitos:** LLD-v1; user stories MVP enriquecidas recomendadas.

**Siguiente paso:** implementar ítem `sequence: 1` de la cola con `backend-engineer` / `frontend-engineer`.
