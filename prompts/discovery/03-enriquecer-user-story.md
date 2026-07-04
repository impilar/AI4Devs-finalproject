# Prompts — Discovery / Product (enriquecer historias)

## Prompt: Enriquecer user story

Ejecuta el agente `.cursor/agents/user-story-enricher.md` (User Story Enricher):

- **Argumento:** `US-NNN` (ej. `US-001`) o `MVP` para todas las historias MVP pendientes
- **Input:** `docs/product/user-stories/US-NNN.md`
- **Contexto:** `docs/architecture/lld/LLD-v1.md`, `docs/architecture/data-model/logical-model-v1.md`, `docs/product/prd/PRD-v1.md`
- **Plantilla secciones:** `knowledge/templates/product/user-story-enriched_sections.md`
- **Salida:** mismo fichero `docs/product/user-stories/US-NNN.md` actualizado in place

**Prerrequisitos:** LLD-v1 y logical-model-v1 disponibles.

**Skill:** `.cursor/skills/enrich-user-story.md`
