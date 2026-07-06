# Prompts — Discovery / Product (enriquecer historias)

## Prompt: Enriquecer user story

Ejecuta el agente `.cursor/agents/user-story-enricher.md` (User Story Enricher):

- **Argumento:** `US-NNN` (ej. `US-003`) o release `V1` / `MVP` para todas las historias del release pendientes
- **Input:** `02-docs/02_1-product/user-stories/US-NNN.md`
- **Contexto:** `02-docs/02_2-architecture/lld/LLD-v1.md`, `02-docs/02_2-architecture/data-model/logical-model-v1.md`, `02-docs/02_1-product/prd/PRD-v1.md`
- **Plantilla secciones:** `01-knowledge/templates/product/user-story-enriched_sections.md`
- **Salida:** mismo fichero `02-docs/02_1-product/user-stories/US-NNN.md` actualizado in place + `enriched: true` en `status-v1.json`

**Prerrequisitos:** LLD-v1 y logical-model-v1 disponibles.

**Skill:** `.cursor/skills/enrich-user-story.md`

## Verificación (obligatoria antes del plan)

```bash
node 05-scripts/check-stories-enriched.mjs --release V1
```

Si falla, completar enriquecimiento de las historias listadas antes de generar plan/cola.

## Siguiente paso

Solo tras exit 0 del check anterior → [`04-prompts/development/01-implementation-plan.md`](../development/01-implementation-plan.md) con argumento `V1`.
