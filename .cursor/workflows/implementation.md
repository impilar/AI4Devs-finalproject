# Workflow — Implementation

Implementación del MVP en `src/` con **OpenSpec** + cola priorizada.

## Prerrequisitos

1. `docs/architecture/lld/LLD-v1.md`
2. User stories MVP enriquecidas
3. `docs/engineering/implementation-plan-v1.md` y `implementation-queue-v1.json`
4. **OpenSpec bootstrap:** `docs/engineering/openspec-setup.md` (`openspec init`, `openspec update`)
5. **Estándares:** `docs/engineering/standards/base-standards.md`, `AGENTS.md`

## Fases

| Fase | Acción | Output |
|------|--------|--------|
| 0 | Plan ya generado | `implementation-plan-v1.md`, `implementation-queue-v1.json` |
| 0b | OpenSpec + standards | `openspec/`, `docs/engineering/standards/` |
| 1 | PHASE-000 bootstrap | `src/infra/`, health endpoint |
| 2+ | Por historia MVP | `openspec/changes/us-NNN-*/` → `src/`, `tests/` |

## Flujo por slice (user story)

```text
/opsx:propose us-NNN-name     →  openspec/changes/us-NNN-name/
/opsx:apply                   →  src/ + tests (skill apply-openspec-change)
/opsx:verify us-NNN-name      →  validación vs specs + Gherkin + tests (OBLIGATORIO)
/opsx:archive us-NNN-name     →  merge openspec/specs/, archive change (solo si verify PASS)
```

Prompt detallado: `prompts/development/02-openspec-slice.md`

## Orden de ejecución

Seguir `implementation-queue-v1.json` (`sequence` 1 → 40). Un OpenSpec change agrupa las tasks de una fase/historia (ver `implementation-plan-v1.md`).

**Primera task en cola:** TASK-019 (tabla `notas`).  
**Pre-requisito:** PHASE-000 (`docker-compose`, `GET /api/v1/health`).

## Agentes desarrollador

| Agente | Área |
|--------|------|
| `backend-engineer.md` | `src/backend/` + `[DB]` |
| `frontend-engineer.md` | `src/frontend/` |
| `devops-engineer.md` | `src/infra/` |
| `qa-engineer.md` | `tests/` |

## Skills

| Skill | Uso |
|-------|-----|
| `apply-openspec-change.md` | Implementar task + sync cola/status |
| `create-implementation-plan.md` | Regenerar cola |
| `enrich-user-story.md` | Enriquecer historias |
| `code-review.md` | Revisión |

## Cierre de release

Cuando todas las fases del release están `done` y archivadas en OpenSpec:

| Skill / comando | Uso |
|-----------------|-----|
| `close-release/SKILL.md` | Verificación integral + PR |
| `/release:close MVP` | Invocación en chat |
| `release-manager.md` | Agente responsable |

## Referencias

| Artefacto | Ruta |
|-----------|------|
| Cola | `docs/engineering/implementation-queue-v1.json` |
| OpenSpec | `openspec/config.yaml`, `openspec/changes/` |
| Standards | `docs/engineering/standards/` |
| User stories | `docs/product/user-stories/` |
| DoD | `.cursor/rules/08-definition-of-done.mdc` |
