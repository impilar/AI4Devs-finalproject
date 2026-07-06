# Workflow — Release

Preparación, verificación y cierre de releases.

| Paso | Skill / comando | Output |
|------|-----------------|--------|
| 1 | `release-planning.md` | `03-delivery/releases/vX.Y.Z/` |
| 2 | `release-planning.md` | `03-delivery/changelogs/CHANGELOG.md` |
| 3 | `close-release/SKILL.md` o `/release:close` | Informe PASS/FAIL + PR |

**Agente:** `.cursor/agents/release-manager.md`

## Cierre de release (post-implementación)

Tras archivar todos los OpenSpec changes del release:

```text
/release:close MVP     →  verifica cola, status-v1.json, OpenSpec, tests, git
                       →  genera informe y abre PR (con confirmación)
```

## DoD release MVP

Ver `.cursor/rules/08-definition-of-done.mdc` — sección MVP release.

## Evidencias

Capturas y demos en `03-delivery/evidence/` (no versionadas).
