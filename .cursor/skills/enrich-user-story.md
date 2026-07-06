# Skill: enrich-user-story

Analiza y enriquece una historia de usuario local con detalle técnico listo para implementación autónoma por el desarrollador.

Adaptado del skill `enrich-us` (LIDR.co / AI4Devs-LTI-extended) al flujo **sin Jira**: ficheros en `02-docs/02_1-product/user-stories/` con tabla de **tasks** hijas.

## Cuándo usar

- Tras tener **LLD** y **modelo de datos** (prerrequisito recomendado).
- Antes de implementar una US concreta en `src/`.
- Cuando la historia solo tiene Gherkin y tasks de una línea, sin detalle técnico.

## Argumento

Identificador de la historia a enriquecer:

- `US-001` … `US-017`
- Ruta: `02-docs/02_1-product/user-stories/US-NNN.md`
- Criterio: `MVP`, `todas las MVP`, `pendientes de enriquecer`

Si no se indica argumento, enriquecer solo historias MVP (`release: MVP` en `status-v1.json`) que aún no tengan sección `## Detalle de implementación`.

## Inputs

| Rol | Ruta |
|-----|------|
| Historia(s) | `02-docs/02_1-product/user-stories/US-NNN.md` |
| Estado (opcional) | `02-docs/02_1-product/user-stories/status-v1.json` |
| PRD | `02-docs/02_1-product/prd/PRD-v1.md` |
| Roadmap (opcional) | `02-docs/02_1-product/roadmap/roadmap-v1.md` |
| HLD | `02-docs/02_2-architecture/hld/HLD-v1.md` |
| LLD | `02-docs/02_2-architecture/lld/LLD-v1.md` |
| Modelo de datos | `02-docs/02_2-architecture/data-model/logical-model-v1.md` |
| DoD | `.cursor/rules/08-definition-of-done.mdc` |
| Plantilla secciones | `01-knowledge/templates/product/user-story-enriched_sections.md` |

## Output

Actualizar **in place** el fichero `02-docs/02_1-product/user-stories/US-NNN.md`:

1. **Conservar** sin cambios: metadatos, `## Historia de usuario`, `## Criterios de aceptación`, tabla `## Tasks`.
2. **Añadir o completar** (si faltan): `## INVEST`, `## Trazabilidad`.
3. **Añadir** secciones nuevas según plantilla: `## Detalle de implementación (historia)`, `## Detalle por task`.
4. En la tabla de metadatos, añadir fila: `| **Enriquecida** | Sí — YYYY-MM-DD |`.

Opcional: en `status-v1.json`, por historia: `"enriched": true`, `"enriched_at": "YYYY-MM-DD"`.

**No** guardar en `tmp/` ni duplicar en otro fichero salvo que el usuario lo pida explícitamente.

## Criterios de calidad (¿está lista para desarrollo?)

La historia está **suficientemente detallada** solo si incluye (a nivel historia y por cada task):

| Criterio | Historia | Cada TASK |
|----------|----------|-----------|
| Descripción funcional clara | ✓ (ya en Gherkin) | Objetivo en una frase |
| Campos / DTOs afectados | Tabla en detalle historia | En tasks BE/FE |
| Endpoints (método, ruta, body, response) | Tabla API | TASK `[BE]` |
| Archivos según LLD | Tabla por capa | Lista por task |
| Pasos de implementación ordenados | Resumen flujo | Lista numerada |
| Criterios de done verificables | DoD historia | Checklist por task |
| Tests (tipo y ubicación) | E2E / Gherkin | TASK `[QA]` + unit/integ |
| NFR (rendimiento, seguridad, validación) | Tabla RNF | Donde aplique |

Si falta detalle, el agente **debe** generarlo cruzando LLD §4–§9, modelo de datos y roadmap.

## Instrucciones por paso

### 1. Localizar la historia

- Leer `02-docs/02_1-product/user-stories/US-NNN.md` y sus tasks de la tabla `## Tasks`.
- Consultar `status-v1.json` para release y estado (no enriquecer `cancelled`).

### 2. Entender el problema

- Interpretar la historia Como/quiero/para y los escenarios Gherkin.
- Identificar dependencias con otras US (ej. US-002 depende de listado US-001).

### 3. Cruzar con arquitectura

- **LLD:** módulos, endpoints, schemas Zod, componentes React, orden de implementación.
- **Modelo de datos:** tablas, índices, queries — sobre todo en tasks `[DB]`.
- **PRD:** RF/RNF en trazabilidad.
- **Roadmap:** INVEST y notas si la historia en `roadmap-v1.md` es más rica que el `.md` actual.

### 4. Evaluar gaps

Comprobar si faltan INVEST, trazabilidad RF/RNF, detalle API, archivos, NFR o detalle por task.

### 5. Enriquecer la historia

- Redactar en **español**, conciso y accionable.
- No contradecir HLD/LLD ni ampliar alcance MVP (sin auth, backlinks, etc.).
- Mensajes de validación alineados con Gherkin (español).

### 6. Enriquecer cada task

Por cada `TASK-XXX` de la tabla:

| Tipo | Debe incluir |
|------|----------------|
| `[BE]` | Endpoint, schema Zod, service/repository, códigos HTTP, errores |
| `[FE]` | Componente/página, hook, servicio API, rutas, estados UI |
| `[DB]` | Migración/índice, tabla, SQL o Prisma, índice y RNF |
| `[QA]` | Tipo test, archivo, escenarios Gherkin cubiertos, datos de prueba |

### 7. Guardar y registrar

- Escribir el `.md` actualizado.
- Actualizar `status-v1.json` si se usa el campo `enriched`.
- No modificar el CSV de Jira ni el roadmap salvo inconsistencia grave (avisar al usuario).

## Formato de salida

Seguir estructura en `01-knowledge/templates/product/user-story-enriched_sections.md`.

Orden final del fichero:

1. Título + tabla metadatos (con `Enriquecida`)
2. `## Historia de usuario`
3. `## Criterios de aceptación (Gherkin)`
4. `## Tasks` (tabla resumen — sin cambios)
5. `## INVEST`
6. `## Trazabilidad`
7. `## Detalle de implementación (historia)`
8. `## Detalle por task` (una subsección `### TASK-NNN` por task)

## Anti-patrones

- ❌ Integración con Jira o MCP externo
- ❌ Borrar o reescribir Gherkin original
- ❌ Omitir el detalle de alguna task listada en la tabla
- ❌ Inventar endpoints o archivos no presentes en LLD sin marcarlo como propuesta
- ❌ Mezclar scope V2+ en historias MVP
- ❌ Placeholders `{{...}}` o `TBD` en la salida

## Agente

`.cursor/agents/user-story-enricher.md`

## Atribución

Basado en `enrich-us` v1.0.0 (LIDR.co, AI4Devs-LTI-extended), adaptado a backlog local y tasks técnicas.
