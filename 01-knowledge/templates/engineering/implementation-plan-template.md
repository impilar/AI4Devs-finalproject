# 📋 Plan de implementación — {{product_name}}

**Versión:** {{version}}  
**Alcance:** {{scope}} (ej. MVP)  
**Fuente:** LLD-v1, user stories enriquecidas, PRD, HLD  
**Autor:** Implementation Planner Agent  
**Última actualización:** {{last_updated}}

---

## 0. Resumen ejecutivo

{{plan_summary}}

| Métrica | Valor |
|---------|-------|
| Historias en alcance | {{story_count}} |
| Tasks en cola | {{task_count}} |
| Fases de entrega | {{phase_count}} |
| Duración estimada (sprints) | {{estimated_sprints}} |

**Principio de ordenación:** slices verticales por valor de usuario; dentro de cada slice: **infra/DB → backend → frontend → QA**.

**Artefacto ejecutable:** [`implementation-queue-mvp.json`](implementation-queue-mvp.json) — cola priorizada para agentes desarrollador.

---

## 1. Objetivo de negocio (MVP)

{{mvp_business_goal}}

| Objetivo PRD | Historias que lo cubren |
|--------------|-------------------------|
| {{objective_1}} | {{stories_1}} |
| {{objective_2}} | {{stories_2}} |

---

## 2. Dependencias entre historias

```mermaid
flowchart LR
    {{dependency_diagram_nodes}}
```

| Historia | Depende de | Motivo |
|----------|------------|--------|
| US-002 | US-001 | Requiere listado para navegar al detalle |
| {{us_dep_row}} | {{dep}} | {{reason}} |

---

## 3. Fases de implementación

### Fase {{phase_n}} — {{phase_name}}

**Objetivo:** {{phase_objective}}  
**Historias:** {{phase_stories}}  
**Criterio de cierre:** {{phase_done_criteria}}

| Orden | ID | Tipo | Capa | Agente | Depende de | Descripción breve |
|-------|-----|------|------|--------|------------|-------------------|
| 1 | TASK-XXX | task | database | backend-engineer | — | {{desc}} |
| 2 | TASK-YYY | task | backend | backend-engineer | TASK-XXX | {{desc}} |

*(Repetir tabla por fase)*

---

## 4. Cola priorizada global (top 20)

| # | ID | Historia | Capa | Agente | Estado |
|---|-----|----------|------|--------|--------|
| 1 | TASK-019 | US-005 | database | backend-engineer | backlog |
| 2 | TASK-003 | US-001 | database | backend-engineer | backlog |
| … | | | | | |

> Cola completa en `implementation-queue-mvp.json` → array `queue[]`.

---

## 5. Reglas de priorización aplicadas

| Regla | Descripción |
|-------|-------------|
| R1 | Infra y migraciones antes de endpoints |
| R2 | API antes de UI que la consume |
| R3 | Historia padre bloqueada hasta tasks BE+DB mínimas |
| R4 | QA E2E al cierre de cada slice vertical |
| R5 | NFR críticos (RNF-001, RNF-002) verificados en fase de búsqueda |

---

## 6. Invocación de agentes desarrollador

Para implementar el ítem **N** de la cola:

1. Leer `implementation-queue-mvp.json` → `queue[N-1]`
2. Cargar user story enriquecida: `02-docs/02_1-product/user-stories/{story_id}.md`
3. Invocar agente indicado en `agent` (ej. `backend-engineer.md`)
4. Al completar: actualizar `status` en `implementation-queue-mvp.json` y `status-v1.json`

**Prompt sugerido:**

```
Implementa {id} según 02-docs/02_3-engineering/implementation-queue-mvp.json
y 02-docs/02_1-product/user-stories/{story_id}.md (sección TASK).
```

---

## 7. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| {{risk_1}} | {{impact_1}} | {{mitigation_1}} |

---

## 8. Fuera de alcance (este plan)

- Historias V1 / V2+ (US-003, US-004, …)
- OpenAPI (`api-spec-v1.yaml`) — opcional post-MVP
- {{out_of_scope_other}}

---

## Guía para el agente generador

1. Leer **todas** las user stories MVP enriquecidas y `status-v1.json`.
2. Cruzar dependencias con LLD §9.2 y detalle por task (campo **Depende de**).
3. Ordenar tasks respetando: DB → BE → FE → QA dentro de cada slice.
4. Generar **fases** alineadas con slices verticales del LLD.
5. Poblar `implementation-queue-mvp.json` con cada task en orden único (`sequence` 1…N).
6. No incluir esta sección en el documento de salida.
