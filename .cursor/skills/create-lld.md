# Skill: create-lld

Genera el **Low Level Design (LLD)** — detalle implementable de la arquitectura, un nivel por debajo del HLD.

## Cuándo usar

Después de tener **HLD** y **modelo de datos** aprobados, y **antes** de escribir código en `src/`.

## Inputs

| Rol | Ruta |
|-----|------|
| HLD | `02-docs/02_2-architecture/hld/HLD-v1.md` |
| Modelo de datos | `02-docs/02_2-architecture/data-model/logical-model-v1.md` |
| Roadmap (opcional) | `02-docs/02_1-product/roadmap/roadmap-v1.md` |
| User stories (opcional) | `02-docs/02_1-product/user-stories/` |
| Plantilla | `01-knowledge/templates/architecture/lld-template.md` |

## Output

`02-docs/02_2-architecture/lld/LLD-v1.md`

Al regenerar, incrementar versión (`LLD-v2.md`) y conservar la anterior.

## Instrucciones

1. **No reabrir decisiones del HLD** — stack, patrones y alcance MVP ya cerrados.
2. **Árbol de `src/`** — archivos y carpetas concretos en backend y frontend.
3. **Contratos por capa** — routes → controllers → services → repositories; dependencias solo hacia abajo.
4. **API detallada** — cada endpoint MVP con controller, service, schema Zod, respuesta y errores.
5. **DTOs** — camelCase en JSON; mapeo desde snake_case del modelo de datos.
6. **Servicios** — pasos de negocio (crear etiquetas, transacciones, búsqueda ILIKE).
7. **Prisma** — orden de migraciones, queries críticas, índices para RNF-001/RNF-002.
8. **Frontend** — páginas, componentes, hooks y servicios API mapeados a US-XXX.
9. **Trazabilidad** — tablas US/TASK → módulos; orden de implementación sugerido.
10. **Alcance** — V1/V2+ solo en sección de diferidos; sin auth ni backlinks en MVP.

## Agente

`.cursor/agents/lld-architect.md`

## Relación con otros artefactos

| Documento | Nivel | LLD… |
|-----------|-------|------|
| HLD | Alto | …baja el detalle de componentes a archivos y métodos |
| Modelo de datos | Datos | …referencia entidades; no duplica DDL completo |
| OpenAPI (`design-api.md`) | Contrato HTTP | puede generarse después desde LLD §4 |
| Código `src/` | Implementación | sigue el LLD como guía |
