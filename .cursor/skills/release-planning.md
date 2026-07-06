# Skill: release-planning

Planifica una release a partir del roadmap.

## Inputs

| Rol | Ruta |
|-----|------|
| Roadmap | `docs/product/roadmap/roadmap-v1.md` |
| DoD | `.cursor/rules/08-definition-of-done.mdc` |

## Outputs

- `delivery/releases/vX.Y.Z-nombre/` — notas de release
- `delivery/changelogs/CHANGELOG.md` — entrada de versión

## Pasos

1. Filtrar historias por release (MVP / V1 / V2+).
2. Verificar DoD por historia.
3. Documentar entregables y evidencias en `delivery/evidence/`.

## Workflow

`.cursor/workflows/release.md` — notas de release y cierre con `close-release/SKILL.md` (`/release:close`).
