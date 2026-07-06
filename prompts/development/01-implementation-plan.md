# Prompts — Development (plan de implementación)

## Prompt 1: Generar plan de implementación priorizado

Ejecuta el agente `.cursor/agents/implementation-planner.md` (Implementation Planner / Product Owner):

- **Argumento:** `MVP` (por defecto)
- **Inputs:** `docs/architecture/lld/LLD-v1.md`, `docs/product/user-stories/`, `status-v1.json`, `docs/product/prd/PRD-v1.md`
- **Plantilla:** `knowledge/templates/engineering/implementation-plan-template.md`
- **Salidas:**
  - `docs/engineering/implementation-plan-mvp.md`
  - `docs/engineering/implementation-queue-mvp.json`

**Prerrequisitos:** LLD-v1; user stories MVP enriquecidas recomendadas.

**Siguiente paso:** implementar ítem `sequence: 1` de la cola con `backend-engineer` / `frontend-engineer`.
