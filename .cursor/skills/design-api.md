# Skill: design-api

Diseña o actualiza la especificación OpenAPI.

## Inputs

| Rol | Ruta |
|-----|------|
| HLD | `docs/architecture/hld/HLD-v1.md` |
| LLD (recomendado) | `docs/architecture/lld/LLD-v1.md` |
| Modelo de datos | `docs/architecture/data-model/logical-model-v1.md` |

## Output

`docs/architecture/apis/api-spec-v1.yaml`

## Endpoints MVP

- `GET/POST/PUT/DELETE /api/v1/notas`
- `GET /api/v1/buscar?q=`
- `GET /api/v1/etiquetas`

Base URL: `/api/v1`. DTOs en camelCase.

## Estado

Pendiente — extraer de LLD §4 o HLD §4 al iniciar implementación.
