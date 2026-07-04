# Agentes

Roles especializados del proyecto. **Convención:** todos los agentes usan extensión `.md` y nombre kebab-case.

## Producto

| Agente | Skill | Output |
|--------|-------|--------|
| [product-manager.md](product-manager.md) | `create-prd.md` | `docs/product/prd/` |
| [user-story-mapper.md](user-story-mapper.md) | `create-user-story-map.md` | `docs/product/user-story-map/` |
| [roadmap-planner.md](roadmap-planner.md) | `create-roadmap.md` | `docs/product/roadmap/` |

## Arquitectura

| Agente | Skill | Output |
|--------|-------|--------|
| [solution-architect.md](solution-architect.md) | `create-hld.md` | `docs/architecture/hld/` |
| [data-model-architect.md](data-model-architect.md) | `create-data-model.md` | `docs/architecture/data-model/` |

## Implementación *(stubs)*

| Agente | Área |
|--------|------|
| [backend-engineer.md](backend-engineer.md) | `src/backend/` |
| [frontend-engineer.md](frontend-engineer.md) | `src/frontend/` |
| [qa-engineer.md](qa-engineer.md) | `tests/` |
| [devops-engineer.md](devops-engineer.md) | `src/infra/` |
| [security-architect.md](security-architect.md) | Revisión de seguridad |
| [technical-writer.md](technical-writer.md) | Documentación |

## Uso

1. Consultar skill en `.cursor/skills/` para inputs/outputs.
2. Invocar agente para el rol y personalidad.
3. Seguir workflow en `.cursor/workflows/`.
