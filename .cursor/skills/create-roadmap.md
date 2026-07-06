# Skill: create-roadmap

Genera roadmap con épicas, historias, tasks y CSV Jira.

## Inputs

| Rol | Ruta |
|-----|------|
| User Story Map | `02-docs/02_1-product/user-story-map/user-story-map-v1.md` |
| Plantilla | `01-knowledge/templates/product/roadmap_template.md` |

## Outputs

1. `02-docs/02_1-product/roadmap/roadmap-v1.md`
2. `02-docs/02_1-product/roadmap/exports/roadmap-jira-import-v1.csv`

## Instrucciones

1. Jerarquía Epic → Story → Task.
2. Release en cada ítem (MVP/V1/V2+).
3. Checklist INVEST por historia.
4. ≥ 2 escenarios Gherkin por historia.
5. Tasks con prefijos `[BE]`, `[FE]`, `[DB]`, `[QA]`.

## Agente legacy

`.cursor/agents/roadmap-planner.md`
