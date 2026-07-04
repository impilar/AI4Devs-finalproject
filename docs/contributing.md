# Contribuir al repositorio

## Convenciones

- **Artefactos de producto** → `knowledge/product/` con sufijo `_vN.md`
- **Artefactos técnicos** → `architecture/`
- **Decisiones** → `decisions/` como ADR numerado
- **Código** → `src/` (nunca mezclar con documentación)
- **Tests transversales** → `tests/`
- **Exports de entrega** → `delivery/exports/`

## Versionado de documentos

Al regenerar un artefacto con agentes, incrementar la versión (`v2`, `v3`…) y mantener la versión anterior para historial.

## Commits

Mensajes descriptivos por capa, por ejemplo:

- `docs: actualizar PRD v2`
- `feat(backend): implementar POST /notas`
- `chore: reorganizar estructura knowledge/`
