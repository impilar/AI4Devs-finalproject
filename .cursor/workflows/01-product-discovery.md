# Workflow 01 — Product Discovery

Cadena de agentes para definir el producto.

## Pasos

1. **Requisitos** (input humano)
   - Archivo: `knowledge/context/requisitos_organizador_conocimiento.md`

2. **PRD** — agente `agent_prd.m`
   - Input: requisitos + `knowledge/templates/product/prd_template.md`
   - Output: `knowledge/product/prd_v1.md`

3. **User Story Map** — agente `agent_user_story_mapping.m`
   - Input: `knowledge/product/prd_v1.md` + `knowledge/templates/product/user_story_mapping_template.md`
   - Output: `knowledge/product/user_story_mapping_v1.md`

## Prompts de referencia

Ver `prompts/01-producto.md`.
