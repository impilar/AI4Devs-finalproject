# Prompts — Historias y roadmap

## Prompt 1: User Story Map (referencia)

Ver **Prompt 3** de [01-producto.md](01-producto.md) (agente `agent_user_story_mapping.m`). El mapa generado en `knowledge/product/user_story_mapping_v1.md` contiene 17 historias INVEST priorizadas en MVP/V1/V2+, alineadas con el backbone acceder → capturar → organizar → recuperar → mantener.

---

## Prompt 2: Generar roadmap

Utiliza el agente `.cursor/agents/agent_roadmap.m` para convertir el User Story Map en roadmap con épicas, historias y tasks:

- **Input:** `knowledge/product/user_story_mapping_v1.md`
- **Plantilla:** `knowledge/templates/product/roadmap_template.md`
- **Salida:** `knowledge/product/roadmap_v1.md` + `delivery/exports/roadmap_jira_import_v1.csv`

Instrucciones: jerarquía Epic → Story → Task, release en cada ítem (MVP/V1/V2+), checklist INVEST, criterios Gherkin por historia, CSV importable en Jira.
