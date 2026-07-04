# Contexto técnico

Restricciones y stack de partida. Para diseño detallado versionado, ver [`docs/architecture/hld/`](../docs/architecture/hld/).

## Stack objetivo (MVP)

| Capa | Tecnología |
|------|------------|
| Frontend | React 18, Vite, TypeScript, React Router |
| Backend | Node.js 20, Express 4, TypeScript, Zod |
| Persistencia | PostgreSQL 16, Prisma 5 |
| Infra | Docker Compose |

## Restricciones arquitectónicas

- Monolito modular en capas (no microservicios en MVP)
- API REST JSON bajo `/api/v1`
- Frontend desacoplado — acceso a datos solo vía API
- Sin autenticación en MVP (single-user por instancia)

## Requisitos no funcionales de partida

| ID | Requisito |
|----|-----------|
| RNF-001 | CRUD < 2 s |
| RNF-002 | Búsqueda < 300 ms (hasta ~500 notas) |
| RNF-003 | Crear nota en ≤ 2 interacciones |
| RNF-004 | Persistencia consistente tras recarga |
| RNF-005 | Modelo extensible |
| RNF-006 | Datos solo vía API |
| RNF-007 | Navegadores modernos |

## Evolución prevista (V2+)

- Backlinks y grafo de conocimiento
- Plugins
- Autenticación multi-usuario
