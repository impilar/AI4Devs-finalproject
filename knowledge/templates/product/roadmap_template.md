# 🗓 Roadmap — {{product_name}}

**Versión:** {{version}}  
**Fuente:** {{input_document}}  
**Proyecto Jira:** {{jira_project_key}}  
**Última actualización:** {{last_updated}}

---

## 0. Visión del roadmap

{{roadmap_vision}}

### Jerarquía de trabajo (Jira)

| Nivel | Issue Type Jira | Descripción | Convención ID |
|-------|-----------------|-------------|---------------|
| 1 | Epic | Agrupación por capacidad de negocio / fase del viaje | `EPIC-XXX` |
| 2 | Story | Historia de usuario INVEST con criterios Gherkin | `US-XXX` |
| 3 | Task / Sub-task | Trabajo técnico ejecutable (FE, BE, DB, QA) | `TASK-XXX` |

### Releases planificados

| Release | Nombre | Objetivo | Fecha objetivo |
|---------|--------|----------|----------------|
| MVP | {{mvp_release_name}} | {{mvp_release_goal}} | {{mvp_target_date}} |
| V1 | {{v1_release_name}} | {{v1_release_goal}} | {{v1_target_date}} |
| V2+ | {{v2_release_name}} | {{v2_release_goal}} | {{v2_target_date}} |

---

## 1. Resumen ejecutivo del roadmap

| Métrica | Valor |
|---------|-------|
| Total épicas | {{total_epics}} |
| Total historias | {{total_stories}} |
| Total tasks | {{total_tasks}} |
| Historias MVP | {{mvp_stories_count}} |
| Historias V1 | {{v1_stories_count}} |
| Historias V2+ | {{v2_stories_count}} |

---

## 2. Épicas

| ID | Epic | Release principal | Descripción | Historias |
|----|------|-------------------|-------------|-----------|
| EPIC-001 | {{epic_1_name}} | {{epic_1_release}} | {{epic_1_description}} | {{epic_1_stories}} |
| EPIC-002 | {{epic_2_name}} | {{epic_2_release}} | {{epic_2_description}} | {{epic_2_stories}} |
| EPIC-003 | {{epic_3_name}} | {{epic_3_release}} | {{epic_3_description}} | {{epic_3_stories}} |
| EPIC-004 | {{epic_4_name}} | {{epic_4_release}} | {{epic_4_description}} | {{epic_4_stories}} |
| EPIC-005 | {{epic_5_name}} | {{epic_5_release}} | {{epic_5_description}} | {{epic_5_stories}} |

---

## 3. Detalle por épica

> Cada historia incluye: validación **INVEST**, **criterios de aceptación en Gherkin** y **tasks** desglosadas por capa (Backend, Frontend, Base de datos, QA).

---

### EPIC-001 — {{epic_1_name}}

**Release:** {{epic_1_release}}  
**Descripción:** {{epic_1_description}}  
**Objetivo de negocio:** {{epic_1_business_goal}}

---

#### US-XXX — {{story_title}}

| Campo | Valor |
|-------|-------|
| **Release** | {{release}} |
| **Epic** | EPIC-001 |
| **Prioridad** | {{priority}} |
| **Story Points** | {{story_points}} |
| **Componentes** | {{components}} |
| **Labels** | {{labels}} |
| **Trazabilidad** | {{prd_reference}} |

**Historia de usuario (INVEST):**

> Como {{persona}}, quiero {{action}}, para {{value}}.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | {{invest_i}} | {{invest_i_note}} |
| **N**egociable | {{invest_n}} | {{invest_n_note}} |
| **V**aliosa | {{invest_v}} | {{invest_v_note}} |
| **E**stimable | {{invest_e}} | {{invest_e_note}} |
| **S**mall (pequeña) | {{invest_s}} | {{invest_s_note}} |
| **T**esteable | {{invest_t}} | {{invest_t_note}} |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: {{feature_name}}

  Scenario: {{scenario_1_name}}
    Given {{given_1}}
    When {{when_1}}
    Then {{then_1}}

  Scenario: {{scenario_2_name}}
    Given {{given_2}}
    When {{when_2}}
    Then {{then_2}}

  Scenario: {{scenario_3_name}} (opcional — caso excepción)
    Given {{given_3}}
    When {{when_3}}
    Then {{then_3}}
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-XXX | {{task_1_summary}} | Backend | {{release}} | {{task_1_description}} | {{task_1_points}} |
| TASK-XXX | {{task_2_summary}} | Frontend | {{release}} | {{task_2_description}} | {{task_2_points}} |
| TASK-XXX | {{task_3_summary}} | Database | {{release}} | {{task_3_description}} | {{task_3_points}} |
| TASK-XXX | {{task_4_summary}} | QA | {{release}} | {{task_4_description}} | {{task_4_points}} |

---

*(Repetir sección 3 para cada épica e historia)*

---

## 4. Vista por release

### Release MVP — {{mvp_release_name}}

| Epic | Story | Tasks | Story Points |
|------|-------|-------|--------------|
| {{epic}} | US-XXX | TASK-XXX, TASK-XXX | {{points}} |

**Entregable del release:** {{mvp_deliverable}}

---

### Release V1 — {{v1_release_name}}

| Epic | Story | Tasks | Story Points |
|------|-------|-------|--------------|
| {{epic}} | US-XXX | TASK-XXX, TASK-XXX | {{points}} |

**Entregable del release:** {{v1_deliverable}}

---

### Release V2+ — {{v2_release_name}}

| Epic | Story | Tasks | Story Points |
|------|-------|-------|--------------|
| {{epic}} | US-XXX | TASK-XXX, TASK-XXX | {{points}} |

**Entregable del release:** {{v2_deliverable}}

---

## 5. Dependencias entre historias

| Historia | Depende de | Tipo | Motivo |
|----------|------------|------|--------|
| US-XXX | US-XXX | Blocks / Relates | {{dependency_reason}} |

---

## 6. Importación en Jira

### 6.1 Campos recomendados en Jira

| Campo Jira | Epic | Story | Task |
|------------|------|-------|------|
| Issue Type | Epic | Story | Task |
| Summary | Nombre épica | Título historia | Título task |
| Description | Objetivo + alcance | Historia + contexto | Descripción técnica |
| Epic Link | — | EPIC-XXX | — |
| Parent | — | — | US-XXX |
| Fix Version / Release | MVP / V1 / V2+ | MVP / V1 / V2+ | MVP / V1 / V2+ |
| Priority | High / Medium / Low | High / Medium / Low | Medium |
| Labels | backbone, release | invest, gherkin, release | backend, frontend, db, qa |
| Story Points | — | N | N (opcional) |
| Acceptance Criteria | — | Bloque Gherkin | — |
| Components | {{component}} | {{component}} | {{component}} |

### 6.2 CSV para importación masiva

> Archivo complementario: `roadmap_jira_import_v1.csv`  
> Importar en Jira: **Settings → System → External System Import → CSV**

```csv
Issue Type,Summary,Description,Epic Link,Parent,Fix Version,Priority,Story Points,Labels,Acceptance Criteria,Components
Epic,{{epic_summary}},{{epic_description}},,,MVP,High,,epic;mvp,,
Story,{{story_summary}},{{story_description}},EPIC-001,,MVP,High,3,invest;mvp,"{{gherkin_escaped}}",Frontend
Task,{{task_summary}},{{task_description}},,US-001,MVP,Medium,2,backend;mvp,,Backend
```

### 6.3 Convenciones de nomenclatura

- **Epic:** `[EPIC] {nombre_fase_backbone}`
- **Story:** `[US-XXX] Como {persona}, quiero {acción}`
- **Task:** `[TASK] {BE|FE|DB|QA} — {acción técnica concreta}`
- **Release (Fix Version):** `MVP` | `V1` | `V2+`

---

## 7. Assumptions

- {{assumption_1}}
- {{assumption_2}}

---

## 8. Risks

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| {{risk_1}} | {{risk_impact_1}} | {{risk_mitigation_1}} |

---

## Guía para el agente generador

Al rellenar esta plantilla:

1. **Derivar épicas** de las fases del backbone del User Story Map (1 épica ≈ 1 fase).
2. **Conservar IDs** de historias del mapa (`US-001`, etc.) para trazabilidad.
3. **INVEST:** Completar checklist por historia; si no cumple *Small*, dividir en 2 historias.
4. **Gherkin:** Mínimo 2 escenarios por historia (happy path + excepción o borde).
5. **Tasks:** Desglosar cada historia en 2–5 tasks (BE, FE, DB, QA según aplique); tasks no sustituyen la historia.
6. **Release:** Copiar prioridad del mapa (MVP / V1 / V2+) en Epic, Story y Task.
7. **Jira:** Generar además `roadmap-jira-import-v1.csv` en `docs/product/roadmap/exports/` con todas las filas.
8. **Sin placeholders:** Sustituir todos los `{{...}}` antes de finalizar.

### Anti-patrones

- Tasks redactadas como historias de usuario
- Criterios de aceptación vagos sin Given/When/Then
- Historias sin release asignado
- Épicas que mezclan releases sin criterio
- Omitir escenarios de error en Gherkin
