# Release v0.3.0 — V2+

**Nombre:** Evolución avanzada  
**Fecha:** 2026-07-06  
**Branch:** `feature/entrega2-PCG`

## Objetivo

Extender el producto con capacidades avanzadas de organización y navegación del conocimiento: ordenación del listado, catálogo global de etiquetas con conteo y backlinks bidireccionales entre notas.

## Historias entregadas

| ID | Título | Épica |
|----|--------|-------|
| US-004 | Ordenar listado de notas por fecha o título | EPIC-001 |
| US-011 | Listado de etiquetas con conteo de notas | EPIC-003 |
| US-017 | Enlazar nota con otra (backlink) | EPIC-005 |

## Fases implementadas

| Fase | Historias | OpenSpec archive |
|------|-----------|------------------|
| PHASE-001 | US-004 | `2026-07-06-us-004-list-sort` |
| PHASE-002 | US-011 | `2026-07-06-us-011-tag-catalog` |
| PHASE-003 | US-017 | `2026-07-06-us-017-backlinks` |

## Evidencia de pruebas

| Suite | Resultado |
|-------|-----------|
| Backend unit | 32/32 |
| Backend integration | 96/96 |
| Frontend unit | 68/68 |
| E2E (Playwright) | 46/46 |

E2E V2+: `tests/e2e/us-004-ordenacion-listado.spec.ts`, `us-011-catalogo-etiquetas.spec.ts`, `us-017-backlinks.spec.ts`

## Artefactos de seguimiento

- Cola: `02-docs/02_3-engineering/implementation-queue-v2.json` — 12/12 tasks `done`
- Estado: `02-docs/02_1-product/user-stories/status-v1.json` — 3/3 historias V2+ `done`
- Specs actualizadas: `notes-list`, `note-tags`, `note-backlinks`, `note-detail`, `notes-relations-data-model`

## Fuera de alcance

- Grafo visual de notas, sintaxis wiki `[[nota]]`, eliminación de backlinks, auth multi-usuario
