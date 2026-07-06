# Prompts — Discovery (planificación)

## Prompt 1: User Story Map (referencia)

Ver **Prompt 3** de [01-requisitos-y-prd.md](01-requisitos-y-prd.md). El mapa en `02-docs/02_1-product/user-story-map/user-story-map-v1.md` contiene 17 historias INVEST (MVP/V1/V2+).

---

## Prompt 2: Generar roadmap

Utiliza el agente `.cursor/agents/roadmap-planner.md`:

- **Input:** `02-docs/02_1-product/user-story-map/user-story-map-v1.md`
- **Plantilla:** `01-knowledge/templates/product/roadmap_template.md`
- **Salida:** `02-docs/02_1-product/roadmap/roadmap-v1.md` + `02-docs/02_1-product/roadmap/exports/roadmap-jira-import-v1.csv`

Instrucciones: Epic → Story → Task, release MVP/V1/V2+, INVEST, Gherkin, CSV Jira.
