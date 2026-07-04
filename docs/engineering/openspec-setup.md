# OpenSpec + Specboot setup

One-time bootstrap for spec-driven development in this repository.

## Prerequisites

- Node.js **20.19.0+** (includes `npm`)
- npm

### Si `npm: command not found`

Node.js no está instalado o no está en el `PATH`. En macOS con Homebrew:

```bash
brew install node
node -v   # debe mostrar v20+
npm -v
```

Cierra y abre la terminal (o reinicia Cursor) tras instalar. Los binarios quedan en `/opt/homebrew/bin/`.

Alternativa: instalador LTS desde [nodejs.org](https://nodejs.org/).

## 1. Install OpenSpec CLI

```bash
npm install -g @fission-ai/openspec@latest
```

## 2. Initialize in this project

```bash
cd /path/to/AI4Devs-finalproject
openspec init
```

This repo already contains:

- `openspec/config.yaml` — project context (customized)
- `openspec/specs/`, `openspec/changes/` — folder layout
- `docs/engineering/standards/` — coding standards (Specboot-adapted)
- `AGENTS.md` — agent entry point

`openspec init` adds Cursor slash commands (`/opsx:*`) without overwriting a customized `config.yaml`.

**Este repositorio ya ejecutó** (tras instalar Node):

```bash
openspec init --tools cursor --force
openspec update
```

Archivos generados en `.cursor/commands/` y `.cursor/skills/openspec-*/` — versionar en git.

## 3. Optional: expanded workflow profile

For Specboot-aligned flow (`/opsx:ff`, `/opsx:verify`):

```bash
openspec config profile
# select expanded profile when prompted
openspec update
```

## 4. Verify

```bash
openspec list
openspec validate
```

In Cursor chat, `/opsx:` commands should autocomplete after `openspec update`.

## 5. First development slice

| Step | Action |
|------|--------|
| 1 | Complete PHASE-000: `docker-compose`, `.env`, `GET /api/v1/health` |
| 2 | `/opsx:propose phase-000-bootstrap` or manual infra |
| 3 | `/opsx:propose us-001-listado-notas` |
| 4 | `/opsx:apply` — TASK-019 through TASK-004 |
| 5 | `/opsx:verify us-001-listado-notas` — **obligatorio antes de archive** |
| 6 | `/opsx:archive us-001-listado-notas` |

Use skill `.cursor/skills/apply-openspec-change.md` to keep `implementation-queue-v1.json` in sync.

## What we did NOT copy from Specboot

| Specboot default | This project |
|------------------|--------------|
| `docs/base-standards.md` at root of `docs/` | `docs/engineering/standards/` (avoids clash with product docs) |
| `ai-specs/agents/` canonical | `.cursor/agents/` canonical |
| Jira `enrich-us` | `enrich-user-story.md` (local MD backlog) |
| Generic LTI API spec | `docs/architecture/apis/api-spec-v1.yaml` (create during dev) |

## References

- [OpenSpec getting started](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md)
- [LIDR Specboot](https://github.com/LIDR-academy/lidr-specboot)
- [openspec/README.md](../../openspec/README.md)
- [AGENTS.md](../../AGENTS.md)
