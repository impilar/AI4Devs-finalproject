# Skill: create-implementation-plan

Genera el **plan de implementación** priorizado (historias y tasks) con dependencias, listo para invocar agentes desarrollador.

## Cuándo usar

- Tras **LLD-v1** y **user stories MVP enriquecidas** (`enriched: true`).
- **Antes** de escribir código en `src/` o invocar `backend-engineer` / `frontend-engineer`.

## Inputs

| Rol | Ruta |
|-----|------|
| LLD | `docs/architecture/lld/LLD-v1.md` |
| HLD | `docs/architecture/hld/HLD-v1.md` |
| PRD / negocio | `docs/product/prd/PRD-v1.md` |
| User stories | `docs/product/user-stories/US-*.md` |
| Estado backlog | `docs/product/user-stories/status-v1.json` |
| Roadmap (opcional) | `docs/product/roadmap/roadmap-v1.md` |
| DoD | `.cursor/rules/08-definition-of-done.mdc` |
| Plantilla plan | `knowledge/templates/engineering/implementation-plan-template.md` |
| Esquema cola JSON | `knowledge/templates/engineering/implementation-queue.schema.json` |

## Outputs

| Artefacto | Ruta |
|-----------|------|
| Plan (Markdown) | `docs/engineering/implementation-plan-v1.md` |
| Cola priorizada (JSON) | `docs/engineering/implementation-queue-v1.json` |

Al regenerar, incrementar versión (`v2`) y conservar la anterior.

## Argumento

- `MVP` — solo historias con `release: MVP` (por defecto)
- `MVP+V1` — incluir V1
- `US-001` — replanificar slice de una historia

## Instrucciones

### 1. Alcance

- Por defecto: historias **MVP** (US-001…US-016 según roadmap; excluir V1/V2+ salvo argumento).
- Solo tasks presentes en la tabla `## Tasks` de cada historia.
- Preferir historias con `enriched: true`; si no, usar LLD §9 y roadmap.

### 2. Dependencias entre historias

Derivar del LLD §9.2, Gherkin y campo **Depende de** en detalle por task:

| Historia | Depende de (mínimo) |
|----------|---------------------|
| US-002 | US-001 (listado) |
| US-005 | US-001 opcional; infra/schema |
| US-006 | US-005 (formulario crear) |
| US-008 | US-005 |
| US-009 | US-008 (etiquetas existentes) |
| US-012 | US-001 (listado/resultados) |
| US-013 | US-012 |
| US-015 | US-002, US-005, US-006, US-008 |
| US-016 | US-002 |

### 3. Orden dentro de cada slice (reglas)

| Prioridad | Capa | Orden típico |
|-----------|------|--------------|
| 1 | Infra | docker-compose, health, env (si aún no existe) |
| 2 | Database | migraciones, índices (`[DB]` tasks) |
| 3 | Backend | endpoints, services (`[BE]` tasks) |
| 4 | Frontend | componentes, páginas (`[FE]` tasks) |
| 5 | QA | E2E / integración (`[QA]` tasks) al cierre del slice |

### 4. Fases (vertical slices)

Alinear con LLD §9.2:

1. Infra + Prisma init + health  
2. US-001 — listado  
3. US-002 — detalle  
4. US-005 + US-006 — crear nota y enlaces  
5. US-008 — etiquetas  
6. US-009 — filtro  
7. US-012 + US-013 — búsqueda  
8. US-015 + US-016 — editar y eliminar  

### 5. Cola JSON (`implementation-queue-v1.json`)

- `queue[]`: un elemento por task, `sequence` único 1…N global.
- Campos obligatorios por ítem: `sequence`, `id`, `type`, `story_id`, `title`, `layer`, `agent`, `depends_on[]`, `status` (`backlog`).
- `layer`: `database` | `backend` | `frontend` | `infra` | `qa`
- `agent`: `backend-engineer` | `frontend-engineer` | `devops-engineer` | `qa-engineer`
- `phases[]`: agrupación con `task_ids` en orden de fase.
- `stories_summary[]`: historias con `depends_on_stories` y lista de tasks.

### 6. Plan Markdown

Seguir plantilla: resumen, dependencias (mermaid), fases con tablas, cola top-N, reglas, cómo invocar desarrolladores.

### 7. Sincronización

- Inicializar `status: backlog` en cola JSON (independiente de `status-v1.json`).
- No modificar user stories; solo referenciarlas.

## Agente

`.cursor/agents/implementation-planner.md`

## Uso posterior

El agente desarrollador toma el ítem con menor `sequence` y `status != done` de `implementation-queue-v1.json`.
