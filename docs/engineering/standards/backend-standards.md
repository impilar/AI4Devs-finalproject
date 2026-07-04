# Backend standards

Stack: **Node.js 20**, **Express 4**, **TypeScript**, **Zod**, **Prisma 5**, **PostgreSQL 16**.

## Architecture

Layered modular monolith (LLD-v1 §4):

```
routes → controllers → services → repositories → Prisma
```

| Layer | Responsibility |
|-------|----------------|
| `routes/` | HTTP method + path; delegate to controller |
| `controllers/` | Parse request, call service, map HTTP status |
| `services/` | Business logic, orchestration |
| `repositories/` | Prisma queries only |
| `schemas/` | Zod request/response validation |

No business logic in routes or controllers. No Prisma outside repositories.

## API conventions

- Base path: `/api/v1`
- JSON bodies and responses; `camelCase` in JSON DTOs
- Database columns: `snake_case` (Prisma `@map` where needed)
- Errors: consistent shape `{ error: string, details?: unknown }`
- Status codes: 200/201 success, 400 validation, 404 not found, 500 unexpected

OpenAPI: `docs/architecture/apis/api-spec-v1.yaml` — create/update when adding endpoints (TASK `[BE]`).

## Database

- Migrations via Prisma only; no raw DDL in application code
- One migration per logical schema change (align with `[DB]` tasks)
- Indexes per LLD and logical-model-v1 for list/search performance (RNF-001, RNF-002)

## Validation

- Zod schemas for every POST/PUT body and query params
- Reject invalid input with 400 before service layer
- URL validation for links (US-006) per LLD

## Testing

| Type | Tool | Location |
|------|------|----------|
| Unit | Vitest | `src/backend/**/*.test.ts` |
| Integration | Vitest + Supertest | `tests/integration/` |

TDD flow for `[BE]` tasks:

1. Write integration test (failing)
2. Implement endpoint + service
3. Refactor; ensure tests pass

## Security (MVP)

- No secrets in code; use `.env` (see `.env.example`)
- Sanitize user input via Zod; parameterized queries via Prisma
- No auth in MVP — do not add session/JWT unless US explicitly requires it

## Agent

`.cursor/agents/backend-engineer.md` — also handles `[DB]` tasks.

## References

- HLD: `docs/architecture/hld/HLD-v1.md`
- LLD: `docs/architecture/lld/LLD-v1.md`
- Data model: `docs/architecture/data-model/logical-model-v1.md`
- ADR-002: PostgreSQL + Prisma
