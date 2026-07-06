# Prompt — Cierre de release

**Fase:** development  
**Agente:** `.cursor/agents/release-manager.md`  
**Skill:** `.cursor/skills/close-release/SKILL.md`  
**Comando:** `/release:close [MVP|V1|V2+]`

## Cuándo usar

Al terminar todas las historias de un release y archivar todos los OpenSpec changes.

## Prompt sugerido

```text
Actúa como release-manager. Ejecuta close-release para el release MVP:
- Verifica implementation-queue-v1.json y status-v1.json
- Confirma que no hay changes activos en openspec/changes/
- Ejecuta la batería de tests completa
- Revisa git (commit, push)
- Si todo pasa, prepara el pull request con gh
```

## Inputs

- `docs/product/roadmap/roadmap-v1.md`
- `docs/engineering/implementation-queue-v1.json`
- `docs/product/user-stories/status-v1.json`
- `openspec/changes/archive/`

## Output esperado

- Informe PASS/FAIL con tabla de checks
- PR URL (si PASS y confirmado)
