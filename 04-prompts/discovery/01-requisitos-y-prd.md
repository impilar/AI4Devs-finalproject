# Prompts — Discovery

## Prompt 1: Requisitos iniciales

Genera un fichero .md descargable con los requisitos detallados del producto: Organizador de conocimiento (tipo Notion simplificado):

**Concepto** — Un sistema minimalista para guardar: notas, links, ideas.

**MVP** — CRUD notas, tags, búsqueda simple.

**Escalado** — backlinks, grafo de conocimiento, plugins.

**Buenas prácticas** — arquitectura limpia, extensibilidad.

---

## Prompt 2: Generar PRD

Utiliza el agente `.cursor/agents/product-manager.md` (Product Manager):

- **Requisitos:** `01-knowledge/business-context.md`
- **Plantilla:** `01-knowledge/templates/product/prd_template.md`
- **Salida:** `02-docs/02_1-product/prd/PRD-v1.md`

Instrucciones: seguir la plantilla, priorizar MVP, separar alcance futuro, requisitos testables y métricas medibles.

---

## Prompt 3: User Story Map

Utiliza el agente `.cursor/agents/user-story-mapper.md`:

- **Input:** `02-docs/02_1-product/prd/PRD-v1.md`
- **Plantilla:** `01-knowledge/templates/product/user_story_mapping_template.md`
- **Salida:** `02-docs/02_1-product/user-story-map/user-story-map-v1.md`

Instrucciones: backbone del viaje de usuario, historias INVEST, slices MVP/V1/V2+.
