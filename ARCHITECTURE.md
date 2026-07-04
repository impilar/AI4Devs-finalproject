# Architecture

Índice ejecutivo de arquitectura del **Organizador de Conocimiento**.

## Documentación vigente

| Documento | Ubicación |
|-----------|-----------|
| HLD v1 | [docs/architecture/hld/HLD-v1.md](docs/architecture/hld/HLD-v1.md) |
| Modelo de datos v1 | [docs/architecture/data-model/logical-model-v1.md](docs/architecture/data-model/logical-model-v1.md) |
| ADRs | [docs/architecture/adr/](docs/architecture/adr/) |

## Resumen

- **Estilo:** monolito modular en capas
- **Stack:** React + Vite, Express + Prisma, PostgreSQL 16
- **API:** REST JSON `/api/v1`
- **Patrón backend:** `routes → controllers → services → repositories → Prisma`

## Contexto estático

Stack y restricciones de partida: [knowledge/technical-context.md](knowledge/technical-context.md).

## Decisiones

| ADR | Título |
|-----|--------|
| [ADR-001](docs/architecture/adr/ADR-001-monolito-modular-en-capas.md) | Monolito modular en capas |
| [ADR-002](docs/architecture/adr/ADR-002-postgresql-prisma.md) | PostgreSQL + Prisma |
| [ADR-003](docs/architecture/adr/ADR-003-sin-autenticacion-mvp.md) | Sin autenticación en MVP |
