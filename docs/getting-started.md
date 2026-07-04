# Guía de inicio

## Estructura por capas

| Capa | Carpeta | Qué contiene |
|------|---------|--------------|
| Producto | [`knowledge/product/`](../knowledge/product/) | PRD, User Story Map, Roadmap |
| Conocimiento | [`knowledge/`](../knowledge/) | Requisitos, plantillas, contexto |
| Arquitectura | [`architecture/`](../architecture/) | Diseño técnico y modelo de datos |
| Decisiones | [`decisions/`](../decisions/) | ADRs |
| Gobernanza IA | [`.cursor/`](../.cursor/) | Agentes, rules, workflows |
| Software | [`src/`](../src/) | Frontend, backend, infra |
| Tests | [`tests/`](../tests/) | E2E, integración, rendimiento |
| Entrega | [`delivery/`](../delivery/) | Exports, releases, evidencias |

## Flujo de trabajo con IA

1. Consultar el workflow en `.cursor/workflows/`.
2. Ejecutar el agente correspondiente en `.cursor/agents/`.
3. Verificar que el artefacto se guarda en la ruta indicada en el workflow.
4. Registrar el prompt usado en `prompts/`.

## Clonar y explorar

```bash
git clone https://github.com/impilar/AI4Devs-finalproject
cd AI4Devs-finalproject
```

Documentación académica principal: [`readme.md`](../readme.md).
