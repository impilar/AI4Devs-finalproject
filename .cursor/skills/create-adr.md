# Skill: create-adr

Registra una Architecture Decision Record.

## Inputs

- Contexto de la decisión
- Plantilla mental: ver ADRs existentes en `docs/architecture/adr/`

## Output

`docs/architecture/adr/ADR-NNN-titulo-kebab-case.md`

## Formato

```markdown
# ADR-NNN: Título

- **Estado:** Propuesto | Aceptado | Deprecado
- **Fecha:** YYYY-MM-DD

## Contexto
## Decisión
## Consecuencias
## Alternativas consideradas
```

## ADRs existentes

- ADR-001: Monolito modular
- ADR-002: PostgreSQL + Prisma
- ADR-003: Sin autenticación MVP
