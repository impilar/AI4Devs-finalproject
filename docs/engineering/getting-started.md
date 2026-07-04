# Getting started — Organizador de Conocimiento

Bootstrap local environment (PHASE-000). Full stack per LLD-v1 §11.

## Prerequisites

- Node.js 20+
- Docker and Docker Compose (recommended)
- npm

## 1. Environment

```bash
cp src/infra/.env.example src/infra/.env
# Edit values if ports conflict
```

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | Backend listen port (default 3000) |
| `CORS_ORIGIN` | Frontend origin for CORS |
| `VITE_API_URL` | API base URL for frontend build |

## 2. Docker Compose (full stack)

```bash
cd src/infra
docker compose up -d --build
```

Verify:

```bash
curl http://localhost:3000/api/v1/health
# {"status":"ok"}
```

Frontend: http://localhost:5173

Stop:

```bash
docker compose down
```

## 3. Native development (without Docker)

### PostgreSQL

Run PostgreSQL 16 locally and match `DATABASE_URL` in `.env`.

### Backend

```bash
cd src/backend
npm install
npx prisma generate
npm run dev
```

### Frontend

```bash
cd src/frontend
npm install
npm run dev
```

## 4. Prisma migrations

PHASE-000 ships an empty schema (no domain models). First migration for `notas` table: **TASK-019** (US-005).

When models exist:

```bash
cd src/backend
npx prisma migrate dev --name <description>   # development
npx prisma migrate deploy                     # production / CI
```

## 5. Tests

```bash
cd src/backend
npm install
npm run test:integration
```

Integration tests live in `tests/integration/`.

## Next step

OpenSpec change `us-001-listado-notas` — TASK-019 (notes table) in `implementation-queue-v1.json`.
