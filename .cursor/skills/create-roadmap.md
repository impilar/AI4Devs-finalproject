# Skill: create-roadmap

Genera roadmap con épicas, historias, tasks y CSV Jira.

## Inputs

| Rol | Ruta |
|-----|------|
| User Story Map | `docs/product/user-story-map/user-story-map-v1.md` |
| Plantilla | `knowledge/templates/product/roadmap_template.md` |

## Outputs

1. `docs/product/roadmap/roadmap-v1.md`
2. `docs/product/roadmap/exports/roadmap-jira-import-v1.csv`

## Instrucciones

1. Jerarquía Epic → Story → Task.
2. Release en cada ítem (MVP/V1/V2+).
3. Checklist INVEST por historia.
4. ≥ 2 escenarios Gherkin por historia.
5. Tasks con prefijos `[BE]`, `[FE]`, `[DB]`, `[QA]`.

## Agente legacy

`.cursor/agents/roadmap-planner.md`
