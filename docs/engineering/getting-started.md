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

Requisitos: **PostgreSQL en marcha** (`docker compose up -d postgres` en `src/infra/`). Si usas Docker para el backend (`okc-backend`), deténlo para no bloquear el puerto 3000: `docker stop okc-backend`.

```bash
# Desde la raíz del repositorio
npm install
npx playwright install chromium
npm run test:e2e
```

Playwright arranca backend y frontend en dev si no están ya corriendo (`reuseExistingServer` en local). Variables opcionales:

| Variable | Default |
|----------|---------|
| `DATABASE_URL` | `postgresql://okc:okc@localhost:5432/okc` |
| `PLAYWRIGHT_BASE_URL` | `http://localhost:5173` |

Spec US-001: `tests/e2e/us-001-listado.spec.ts`.

---

## OpenSpec / Cursor

| Recurso | Ruta |
|---------|------|
| Config proyecto | `openspec/config.yaml` |
| Setup CLI | [openspec-setup.md](openspec-setup.md) |
| Plan MVP | [implementation-plan-v1.md](implementation-plan-v1.md) |
| Cola tasks | [implementation-queue-v1.json](implementation-queue-v1.json) |

Siguiente slice de desarrollo: `/opsx:propose us-001-listado-notas`.

---

## Problemas frecuentes

| Error | Causa | Solución |
|-------|--------|----------|
| `npm: command not found` | Node no instalado | `brew install node` |
| `docker.sock: no such file` | Docker Desktop apagado | Abrir Docker Desktop |
| Puerto 3000/5173/5432 en uso | Conflicto local | Cambiar puertos en `.env` y `docker-compose.yml` |
| `prisma migrate` sin modelos | Normal en PHASE-000 | Esperar a TASK-019 |

---

## Enlaces relacionados

- [Engineering handbook](engineering-handbook.md)
- [ARCHITECTURE.md](../../ARCHITECTURE.md)
- [readme.md](../../readme.md) — ficha académica
- [src/README.md](../../src/README.md) — estructura de código
