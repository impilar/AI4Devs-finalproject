# Release v0.2.0 — V1

**Nombre:** Pulido de experiencia  
**Fecha:** 2026-07-06  
**Branch:** `feature/entrega2-PCG`

## Objetivo

Mejorar la UX sobre el MVP sin ampliar el núcleo funcional: estados vacíos orientativos, validación de formularios con preservación de datos, desasociación fina de etiquetas y feedback claro en búsqueda sin resultados.

## Historias entregadas

| ID | Título | Épica |
|----|--------|-------|
| US-003 | Estado vacío cuando no hay notas | EPIC-001 |
| US-007 | Validación de formulario con mensajes por campo | EPIC-002 |
| US-010 | Quitar etiqueta de una nota sin borrar la nota | EPIC-003 |
| US-014 | Mensaje cuando búsqueda sin resultados | EPIC-004 |

## Fases implementadas

| Fase | Historias | OpenSpec archive |
|------|-----------|------------------|
| PHASE-001 | US-003 | `2026-07-06-us-003-empty-state` |
| PHASE-002 | US-007 | `2026-07-06-us-007-form-validation` |
| PHASE-003 | US-010 | `2026-07-06-us-010-remove-tag` |
| PHASE-004 | US-014 | `2026-07-06-us-014-search-empty-state` |

## Evidencia de pruebas

| Suite | Resultado |
|-------|-----------|
| Backend unit | 26/26 |
| Backend integration | 81/81 |
| Frontend unit | 58/58 |
| E2E (Playwright) | 40/40 |

E2E V1: `tests/e2e/us-003-empty-state.spec.ts`, `us-007-validacion-formulario.spec.ts`, `us-010-quitar-etiqueta.spec.ts`, `us-014-busqueda-sin-resultados.spec.ts`

## Artefactos de seguimiento

- Cola: `02-docs/02_3-engineering/implementation-queue-v1.json` — 16/16 tasks `done`
- Estado: `02-docs/02_1-product/user-stories/status-v1.json` — 4/4 historias V1 `done`
- Specs actualizadas: `notes-list`, `note-create`, `note-update`, `note-detail`, `note-tags`, `note-search`

## Fuera de alcance (próximos releases)

- **V2+:** US-004, US-011, US-017 (ordenación listado, catálogo etiquetas, backlinks)
