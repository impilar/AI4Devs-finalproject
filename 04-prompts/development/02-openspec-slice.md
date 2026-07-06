# Prompt: OpenSpec slice de implementación

## Objetivo

Crear o ejecutar un change de OpenSpec alineado con la cola MVP y las user stories enriquecidas.

## Prerrequisitos

- `openspec init` + `openspec update` ejecutados (ver `02-docs/02_3-engineering/openspec-setup.md`)
- `implementation-queue-mvp.json` y US MVP enriquecidas

## Crear change (ejemplo US-001)

```
/opsx:propose us-001-listado-notas

Use openspec/config.yaml context. Do NOT regenerate PRD/LLD.

Sources:
- 02-docs/02_1-product/user-stories/US-001.md (Gherkin + Detalle por task)
- 02-docs/02_2-architecture/lld/LLD-v1.md (listado §)
- 02-docs/02_3-engineering/implementation-queue-mvp.json (TASK-019, 003, 001, 002, 004)

tasks.md: one checkbox per TASK-XXX, order DB → BE → FE → QA.
design.md: cite LLD sections, list files to create.
specs/: delta ADDED from US-001 Gherkin scenarios.
```

## Aplicar tasks

```
Implement next backlog task using .cursor/skills/apply-openspec-change.md
Active change: us-001-listado-notas
Sync implementation-queue-mvp.json and status-v1.json on completion.
```

## Cerrar slice

**Orden obligatorio:** verify → archive. No archivar sin verify PASS en la misma sesión.

```
/opsx:verify us-001-listado-notas
/opsx:archive us-001-listado-notas
```

Verify ejecuta: `openspec validate`, revisión specs vs código, tests (unit, integración, e2e). Ver `.cursor/skills/openspec-verify-change/SKILL.md`.

## Trazabilidad

Registrar variaciones de este prompt en `04-prompts/conversations/` si aplica.
