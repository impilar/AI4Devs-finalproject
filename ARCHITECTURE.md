# Architecture

Índice ejecutivo de arquitectura del **Organizador de Conocimiento**.

## Documentación vigente

| Documento | Ubicación |
|-----------|-----------|
| HLD v1 | [02-docs/02_2-architecture/hld/HLD-v1.md](02-docs/02_2-architecture/hld/HLD-v1.md) |
| Modelo de datos v1 | [02-docs/02_2-architecture/data-model/logical-model-v1.md](02-docs/02_2-architecture/data-model/logical-model-v1.md) |
| LLD v1 | [02-docs/02_2-architecture/lld/LLD-v1.md](02-docs/02_2-architecture/lld/LLD-v1.md) |
| API spec v1 | [02-docs/02_2-architecture/apis/](02-docs/02_2-architecture/apis/) *(pending)* |
| ADRs | [02-docs/02_2-architecture/adr/](02-docs/02_2-architecture/adr/) |
| OpenSpec (runtime behavior) | [openspec/](openspec/) |
| Coding standards | [02-docs/02_3-engineering/standards/](02-docs/02_3-engineering/standards/) |

## Resumen

- **Estilo:** monolito modular en capas
- **Stack:** React + Vite, Express + Prisma, PostgreSQL 16
- **API:** REST JSON `/api/v1`
- **Patrón backend:** `routes → controllers → services → repositories → Prisma`

## Contexto estático

Stack y restricciones de partida: [01-knowledge/technical-context.md](01-knowledge/technical-context.md).

## Decisiones

| ADR | Título |
|-----|--------|
| [ADR-001](02-docs/02_2-architecture/adr/ADR-001-monolito-modular-en-capas.md) | Monolito modular en capas |
| [ADR-002](02-docs/02_2-architecture/adr/ADR-002-postgresql-prisma.md) | PostgreSQL + Prisma |
| [ADR-003](02-docs/02_2-architecture/adr/ADR-003-sin-autenticacion-mvp.md) | Sin autenticación en MVP |
