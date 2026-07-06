# Agentes

Roles especializados del proyecto. **Convención:** todos los agentes usan extensión `.md` y nombre kebab-case.

## Producto

| Agente | Skill | Output |
|--------|-------|--------|
| [product-manager.md](product-manager.md) | `create-prd.md` | `02-docs/02_1-product/prd/` |
| [user-story-mapper.md](user-story-mapper.md) | `create-user-story-map.md` | `02-docs/02_1-product/user-story-map/` |
| [roadmap-planner.md](roadmap-planner.md) | `create-roadmap.md` | `02-docs/02_1-product/roadmap/` |
| [user-story-enricher.md](user-story-enricher.md) | `enrich-user-story.md` | `02-docs/02_1-product/user-stories/` |
| [implementation-planner.md](implementation-planner.md) | `create-implementation-plan.md` | `02-docs/02_3-engineering/` |

## Arquitectura

| Agente | Skill | Output |
|--------|-------|--------|
| [solution-architect.md](solution-architect.md) | `create-hld.md` | `02-docs/02_2-architecture/hld/` |
| [data-model-architect.md](data-model-architect.md) | `create-data-model.md` | `02-docs/02_2-architecture/data-model/` |
| [lld-architect.md](lld-architect.md) | `create-lld.md` | `02-docs/02_2-architecture/lld/` |

## Implementación *(stubs)*

| Agente | Skill / área |
|--------|----------------|
| [implementation-planner.md](implementation-planner.md) | `create-implementation-plan.md` → cola priorizada |
| [backend-engineer.md](backend-engineer.md) | `src/backend/` |
| [frontend-engineer.md](frontend-engineer.md) | `src/frontend/` |
| [qa-engineer.md](qa-engineer.md) | `tests/` |
| [devops-engineer.md](devops-engineer.md) | `src/infra/` |
| [release-manager.md](release-manager.md) | `close-release/SKILL.md` → cierre release + PR |
| [security-architect.md](security-architect.md) | Revisión de seguridad |
| [technical-writer.md](technical-writer.md) | Documentación |

## Uso

1. Consultar skill en `.cursor/skills/` para inputs/outputs.
2. Invocar agente para el rol y personalidad.
3. Seguir workflow en `.cursor/workflows/`.
