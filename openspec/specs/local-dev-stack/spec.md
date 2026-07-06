# local-dev-stack Specification

## Purpose
TBD - created by archiving change phase-000-bootstrap. Update Purpose after archive.
## Requirements
### Requirement: Docker Compose local stack

The project SHALL provide a Docker Compose file at `src/infra/docker-compose.yml` defining services for PostgreSQL, backend, and frontend suitable for local development.

#### Scenario: Start PostgreSQL service

- **WHEN** a developer runs `docker compose up -d postgres` from `src/infra/`
- **THEN** PostgreSQL 16 is reachable on the configured host port

#### Scenario: Start full stack

- **WHEN** a developer runs `docker compose up -d` from `src/infra/`
- **THEN** postgres, backend, and frontend containers start without exit

### Requirement: Environment variable documentation

The project SHALL ship `src/infra/.env.example` documenting required variables: `DATABASE_URL`, `PORT`, `CORS_ORIGIN`, and `VITE_API_URL` per LLD-v1 §11.

#### Scenario: Copy env template

- **WHEN** a developer copies `.env.example` to `.env` and fills values
- **THEN** backend and frontend can read configuration from environment variables

### Requirement: Backend and frontend package scaffolds

The repository SHALL contain minimal runnable scaffolds at `src/backend/` and `src/frontend/` with TypeScript, matching the stack in HLD-v1 §7.

#### Scenario: Backend dev script

- **WHEN** dependencies are installed in `src/backend/`
- **THEN** `npm run dev` starts the Express server on the configured `PORT`

#### Scenario: Frontend dev script

- **WHEN** dependencies are installed in `src/frontend/`
- **THEN** `npm run dev` starts the Vite dev server

### Requirement: Prisma initialization

The backend SHALL include Prisma configured for PostgreSQL with a `schema.prisma` file and migration tooling ready for TASK-019 (notes table).

#### Scenario: Prisma client generation

- **WHEN** a developer runs `npx prisma generate` in `src/backend/`
- **THEN** the Prisma client is generated without error

