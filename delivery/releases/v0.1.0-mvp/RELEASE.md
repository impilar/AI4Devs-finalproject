# Release v0.1.0 — MVP

**Nombre:** Captura, organización y recuperación básica  
**Fecha:** 2026-07-06  
**Branch:** `feature/entrega2-PCG`

## Objetivo

Ciclo completo **capturar → organizar → recuperar → mantener** notas personales sin backlinks ni grafo. Un único usuario por instancia; sin autenticación multi-usuario.

## Historias entregadas

| ID | Título | Épica |
|----|--------|-------|
| US-001 | Ver listado de todas mis notas | EPIC-001 |
| US-002 | Abrir detalle de una nota desde el listado | EPIC-001 |
| US-005 | Crear nota con título y contenido | EPIC-002 |
| US-006 | Añadir enlaces URL a una nota | EPIC-002 |
| US-008 | Asignar etiquetas a una nota | EPIC-003 |
| US-009 | Filtrar notas por etiqueta | EPIC-003 |
| US-012 | Buscar notas por término de texto | EPIC-004 |
| US-013 | Ordenar resultados de búsqueda | EPIC-004 |
| US-015 | Editar nota existente | EPIC-005 |
| US-016 | Eliminar nota permanentemente | EPIC-005 |

## Fases implementadas

| Fase | Historias | OpenSpec archive |
|------|-----------|------------------|
| PHASE-000 | Bootstrap infra | `2026-07-04-phase-000-bootstrap` |
| PHASE-001 | US-001 | `2026-07-04-us-001-listado-notas` |
| PHASE-002 | US-002 | `2026-07-04-us-002-detalle-nota` |
| PHASE-003 | US-005, US-006 | `2026-07-04-us-005-crear-nota` |
| PHASE-004 | US-008 | `2026-07-04-us-008-etiquetas` |
| PHASE-005 | US-009 | `2026-07-06-us-009-filtro-etiqueta` |
| PHASE-006 | US-012, US-013 | `2026-07-06-us-012-busqueda-ordenacion` |
| PHASE-007 | US-015, US-016 | `2026-07-06-us-015-016-editar-eliminar` |

## Evidencia de pruebas

| Suite | Resultado |
|-------|-----------|
| Backend unit | 20/20 |
| Backend integration | 73/73 |
| Frontend unit | 40/40 |
| E2E (Playwright) | 31/31 |

E2E: `tests/e2e/us-001-listado.spec.ts` … `us-016-eliminacion.spec.ts`

## Artefactos de seguimiento

- Cola: `docs/engineering/implementation-queue-mvp.json` — 34/34 tasks `done`
- Estado: `docs/product/user-stories/status-v1.json` — 10/10 historias MVP `done`
- Specs: `openspec/specs/` (13 capacidades)

## Fuera de alcance (próximos releases)

- **V1:** US-003, US-007, US-010, US-014 (pulido UX)
- **V2+:** US-004, US-011, US-017 (ordenación listado, catálogo etiquetas, backlinks)
