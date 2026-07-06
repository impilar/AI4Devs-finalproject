# User stories del roadmap

Historias de usuario extraídas de [`../roadmap/exports/roadmap-jira-import-v1.csv`](../roadmap/exports/roadmap-jira-import-v1.csv), una por fichero (`US-001.md` … `US-017.md`).

Plantilla vacía para nuevas historias: [`01-knowledge/templates/product/user-story_template.md`](../../../01-knowledge/templates/product/user-story_template.md).

Secciones de enriquecimiento técnico (post-LLD): [`01-knowledge/templates/product/user-story-enriched_sections.md`](../../../01-knowledge/templates/product/user-story-enriched_sections.md).  
Agente: `.cursor/agents/user-story-enricher.md` — skill `enrich-user-story.md`.

## Seguimiento de estado

El fichero [`status-v1.json`](status-v1.json) sustituye al tablero Jira para conocer el avance.

### Estados válidos

| Valor | Significado |
|-------|-------------|
| `backlog` | Pendiente de empezar |
| `in_progress` | En curso |
| `done` | Completada |
| `cancelled` | Descartada o fuera de alcance |

### Estructura

```json
{
  "stories": {
    "US-001": {
      "status": "in_progress",
      "tasks": {
        "TASK-001": "done",
        "TASK-002": "in_progress"
      }
    }
  }
}
```

- **`stories`**: estado de cada historia y de sus tasks hijas.
- **`epics`**: estado agregado opcional por épica (puedes marcarla `done` cuando todas sus historias estén completas). Al cerrar un release, usar `/release:close` o el agente `release-manager` para sincronizar épicas (`in_progress` si quedan historias V1/V2+).

### Cómo actualizar

1. Edita `status-v1.json` al cerrar una task o historia.
2. Actualiza `last_updated` con la fecha del día.
3. Una historia puede pasar a `done` cuando todas sus tasks están en `done` (criterio recomendado, alineado con la Definition of Done del proyecto).

### Consulta rápida

Historias MVP pendientes:

```bash
jq '.stories | to_entries[] | select(.value.release == "MVP" and .value.status != "done") | .key' status-v1.json
```

Tasks completadas de una historia:

```bash
jq '.stories["US-001"].tasks | to_entries[] | select(.value == "done") | .key' status-v1.json
```
