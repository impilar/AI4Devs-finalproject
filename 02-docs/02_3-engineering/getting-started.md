# Getting started — Organizador de Conocimiento

Guía para **arrancar el proyecto desde cero** o **volver a levantarlo** tras cerrar el IDE. Corresponde a PHASE-000 (completada).

**Índice rápido:** [Requisitos](#requisitos) · [Primera vez](#primera-vez-clone--setup) · [Levantar stack (Docker)](#levantar-stack-docker) · [Desarrollo nativo](#desarrollo-nativo-sin-docker) · [Día a día](#día-a-día-reiniciar) · [Tests](#tests) · [OpenSpec / Cursor](#openspec--cursor) · [Problemas frecuentes](#problemas-frecuentes)

---

## Requisitos

| Herramienta | Versión | Comprobar |
|-------------|---------|-----------|
| **Git** | cualquiera reciente | `git --version` |
| **Node.js** | 20+ | `node -v` |
| **npm** | incluido con Node | `npm -v` |
| **Docker Desktop** | reciente (recomendado) | `docker info` → debe mostrar sección **Server** |

### Instalar Node.js (si `npm: command not found`)

```bash
brew install node
node -v && npm -v
```

Más detalle: [openspec-setup.md](openspec-setup.md#si-npm-command-not-found).

### Docker Desktop

1. Instalar desde [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/).
2. **Abrir la aplicación** y esperar a que el daemon esté en marcha antes de `docker compose`.
3. Verificar: `docker info` (sin error `docker.sock`).

---

## Primera vez (clone + setup)

```bash
git clone https://github.com/impilar/AI4Devs-finalproject.git
cd AI4Devs-finalproject
git checkout feature/entrega2-PCG   # o la rama de trabajo activa
```

### 1. Variables de entorno

```bash
cp src/infra/.env.example src/infra/.env
```

Editar `src/infra/.env` solo si hay conflicto de puertos (3000, 5173, 5432).

| Variable | Uso |
|----------|-----|
| `DATABASE_URL` | Conexión PostgreSQL |
| `PORT` | Puerto API backend (3000) |
| `CORS_ORIGIN` | Origen frontend para CORS |
| `VITE_API_URL` | URL base API en build del frontend |

### 2. OpenSpec en Cursor (opcional, para `/opsx:*`)

Solo la **primera vez** en este equipo:

```bash
npm install -g @fission-ai/openspec@latest
openspec init --tools cursor
openspec update
```

Reiniciar Cursor tras `openspec update`. Detalle: [openspec-setup.md](openspec-setup.md).

---

## Levantar stack (Docker)

Forma recomendada: Postgres + API + frontend en contenedores.

```bash
cd src/infra
docker compose up -d --build
```

### Verificar

```bash
curl http://localhost:3000/api/v1/health
# {"status":"ok"}
```

| Servicio | URL |
|----------|-----|
| API | http://localhost:3000/api/v1 |
| Frontend | http://localhost:5173 |
| PostgreSQL | `localhost:5432` (user/pass/db: `okc` / `okc` / `okc`) |

### Parar

```bash
cd src/infra
docker compose down          # conserva datos en volumen
docker compose down -v       # borra volumen Postgres (solo dev)
```

### Reconstruir tras cambios en código

```bash
cd src/infra
docker compose up -d --build
```

---

## Desarrollo nativo (sin Docker)

Útil para hot-reload rápido en backend/frontend. Necesitas **PostgreSQL 16** accesible (local o solo el contenedor `postgres`).

### Solo Postgres en Docker

```bash
cd src/infra
docker compose up -d postgres
```

Ajustar `DATABASE_URL` en `.env` si hace falta (`localhost:5432`).

### Backend

```bash
cd src/backend
npm install
npx prisma generate
npm run dev
```

API en http://localhost:3000

### Frontend

```bash
cd src/frontend
npm install
npm run dev
```

SPA en http://localhost:5173

---

## Día a día (reiniciar)

Tras apagar el Mac o Docker:

1. Abrir **Docker Desktop** (esperar a que esté running).
2. `cd src/infra && docker compose up -d`
3. `curl http://localhost:3000/api/v1/health`

No hace falta `npm install` de nuevo salvo que cambien `package.json` o borres `node_modules`.

---

## Prisma migrations

PHASE-000 deja el schema **sin modelos de dominio**. La primera migración (`notas`) llega con **TASK-019** (US-005).

Cuando existan modelos:

```bash
cd src/backend
npx prisma migrate dev --name <descripcion>   # desarrollo
npx prisma migrate deploy                     # Docker / CI
```

---

## Tests

### Integración (backend)

```bash
cd src/backend
npm install   # si aún no
DATABASE_URL=postgresql://okc:okc@localhost:5432/okc npm run test:integration
```

Tests en `tests/integration/` (API, repositorio, health).

### E2E (Playwright — US-001+)

Requisitos: **PostgreSQL en marcha** (`docker compose up -d postgres` en `src/infra/`).

Los E2E usan **puertos dedicados** (backend `3100`, frontend `5174`) distintos del dev (`3000`, `5173`). Puedes tener el stack de desarrollo o Docker Compose corriendo a la vez; Playwright arranca su propio backend y frontend en los puertos E2E con código actualizado (`reuseExistingServer: false`).

```bash
# Desde la raíz del repositorio
npm install
npx playwright install chromium
npm run test:e2e
```

Asignación de puertos (fuente: `tests/e2e/config/ports.ts`):

| Servicio | Dev manual / Docker | E2E Playwright |
|----------|---------------------|----------------|
| Backend | 3000 | 3100 |
| Frontend | 5173 | 5174 |
| PostgreSQL | 5432 | 5432 (compartido) |

Variables opcionales:

| Variable | Default E2E |
|----------|-------------|
| `DATABASE_URL` | `postgresql://okc:okc@localhost:5432/okc` |
| `PLAYWRIGHT_BASE_URL` | `http://localhost:5174` |
| `PLAYWRIGHT_API_URL` | `http://localhost:3100/api/v1` |
| `E2E_BACKEND_PORT` | `3100` |
| `E2E_FRONTEND_PORT` | `5174` |

Si un E2E anterior falló y dejó procesos en `3100`/`5174`, `npm run test:e2e` libera esos puertos automáticamente antes de ejecutar (no toca `3000`/`5173`).

Specs: `tests/e2e/us-001-listado.spec.ts`, `us-012-busqueda.spec.ts`, etc.

---

## OpenSpec / Cursor

| Recurso | Ruta |
|---------|------|
| Config proyecto | `openspec/config.yaml` |
| Setup CLI | [openspec-setup.md](openspec-setup.md) |
| Plan MVP | [implementation-plan-mvp.md](implementation-plan-mvp.md) |
| Cola tasks | [implementation-queue-mvp.json](implementation-queue-mvp.json) |

Siguiente slice de desarrollo: `/opsx:propose us-001-listado-notas`.

---

## Problemas frecuentes

| Error | Causa | Solución |
|-------|--------|----------|
| `npm: command not found` | Node no instalado | `brew install node` |
| `docker.sock: no such file` | Docker Desktop apagado | Abrir Docker Desktop |
| Puerto 3000/5173/5432 en uso | Conflicto dev local | Cambiar `PORT` / `VITE_DEV_PORT` en `.env` |
| Puerto 3100/5174 en uso | E2E anterior colgado | `npm run test:e2e` libera esos puertos; o `lsof -ti:3100,5174 \| xargs kill` |
| `prisma migrate` sin modelos | Normal en PHASE-000 | Esperar a TASK-019 |

---

## Enlaces relacionados

- [Engineering handbook](engineering-handbook.md)
- [ARCHITECTURE.md](../../ARCHITECTURE.md)
- [readme.md](../../readme.md) — ficha académica
- [src/README.md](../../src/README.md) — estructura de código
