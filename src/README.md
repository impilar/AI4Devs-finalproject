# Software

Código fuente del Organizador de Conocimiento.

```
src/
├── frontend/   # React + Vite + TypeScript
├── backend/    # Express + Prisma
└── infra/      # Docker Compose, Dockerfiles
```

Tests transversales en [tests/](../tests/).

## Arrancar el entorno

Guía completa: [docs/engineering/getting-started.md](../docs/engineering/getting-started.md)

```bash
cp src/infra/.env.example src/infra/.env
cd src/infra && docker compose up -d --build
curl http://localhost:3000/api/v1/health
```
