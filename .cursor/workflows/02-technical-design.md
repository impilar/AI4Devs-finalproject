# Workflow 02 — Technical Design

Cadena de agentes para el diseño técnico.

## Pasos

1. **Arquitectura** — agente `agent_architect.m`
   - Input: `knowledge/product/prd_v1.md` + `knowledge/templates/technical/architecture_template.md`
   - Output: `architecture/architecture_v1.md`

2. **Modelo de datos** — agente `agent_data_model.m`
   - Input: `architecture/architecture_v1.md` + `knowledge/templates/technical/data_model_template.md`
   - Input opcional: `knowledge/product/prd_v1.md`
   - Output: `architecture/data_model_v1.md`

## Prompts de referencia

Ver `prompts/02-arquitectura.md` y `prompts/03-modelo-datos.md`.
