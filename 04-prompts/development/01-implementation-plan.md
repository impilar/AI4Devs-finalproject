# Prompts — Development (plan de implementación)

## Prompt 1: Generar plan de implementación priorizado

### Paso 0 — Enrichment gate (obligatorio)

```bash
node 05-scripts/check-stories-enriched.mjs --release MVP   # o V1, V2+
```

Si el comando falla, **no** ejecutar el planner. Enriquecer historias con `.cursor/agents/user-story-enricher.md` primero.

### Paso 1 — Plan y cola

Ejecuta el agente `.cursor/agents/implementation-planner.md` (Implementation Planner / Product Owner):

- **Argumento:** `MVP` (por defecto), `V1`, `MVP+V1`, o `US-NNN`
- **Inputs:** `02-docs/02_2-architecture/lld/LLD-v1.md`, `02-docs/02_1-product/user-stories/`, `status-v1.json`, `02-docs/02_1-product/prd/PRD-v1.md`
- **Plantilla:** `01-knowledge/templates/engineering/implementation-plan-template.md`
- **Salidas por alcance:**

| Alcance | Plan | Cola |
|---------|------|------|
| MVP | `02-docs/02_3-engineering/implementation-plan-mvp.md` | `implementation-queue-mvp.json` |
| V1 | `02-docs/02_3-engineering/implementation-plan-v1.md` | `implementation-queue-v1.json` |
| V2+ | `02-docs/02_3-engineering/implementation-plan-v2.md` | `implementation-queue-v2.json` |

**Prerrequisitos:** LLD-v1; historias del release con `enriched: true` (verificado por `check-stories-enriched.mjs`).

**Siguiente paso:** implementar ítem `sequence: 1` de la cola del release con `backend-engineer` / `frontend-engineer`.
