# Skill: create-lld

Genera diseño de bajo nivel (detalle de implementación).

## Inputs

| Rol | Ruta |
|-----|------|
| HLD | `docs/architecture/hld/HLD-v1.md` |
| Modelo de datos | `docs/architecture/data-model/logical-model-v1.md` |

## Output

`docs/architecture/lld/LLD-v1.md` *(crear al iniciar implementación)*

## Alcance LLD

- Estructura de módulos en `src/backend/` y `src/frontend/`
- Contratos de interfaces entre capas
- Detalle de endpoints y DTOs
- Estrategia de migraciones Prisma

## Estado

Pendiente de fase de implementación. Usar `create-data-model.md` como base actual.
