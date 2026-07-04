# Prompts — Producto

## Prompt 1: Requisitos iniciales

Genera un fichero .md descargable con los requisitos detallados del producto: Organizador de conocimiento (tipo Notion simplificado):

**Concepto** — Un sistema minimalista para guardar: notas, links, ideas.

**MVP** — CRUD notas, tags, búsqueda simple.

**Escalado** — backlinks, grafo de conocimiento, plugins.

**Buenas prácticas** — arquitectura limpia, extensibilidad.

---

## Prompt 2: Generar PRD

Utiliza el agente `.cursor/agents/agent_prd.m` (PRD Generator — Senior Product Manager) para generar el documento de producto a partir de los requisitos y la plantilla indicados en su sección EXECUTION:

- **Requisitos:** `knowledge/context/requisitos_organizador_conocimiento.md`
- **Plantilla:** `knowledge/templates/product/prd_template.md`
- **Salida:** `knowledge/product/prd_v1.md`

Instrucciones al agente: seguir la plantilla exactamente, rellenar todas las secciones sin placeholders, priorizar el MVP, separar alcance futuro (backlinks, grafo, plugins), definir requisitos testables y métricas medibles.

---

## Prompt 3: User Story Map

Utiliza el agente `.cursor/agents/agent_user_story_mapping.m` para generar el User Story Map a partir del PRD:

- **Input:** `knowledge/product/prd_v1.md`
- **Plantilla:** `knowledge/templates/product/user_story_mapping_template.md`
- **Salida:** `knowledge/product/user_story_mapping_v1.md`

Instrucciones: backbone del viaje de usuario, historias INVEST (Como/quiero/para), slices MVP/V1/V2+, sin mezclar alcance futuro en MVP.
