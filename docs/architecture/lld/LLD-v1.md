# 🔧 Low Level Design (LLD) — Organizador de Conocimiento (Notion Simplificado)

**Versión:** 1.0  
**Fuente:** `docs/architecture/hld/HLD-v1.md`, `docs/architecture/data-model/logical-model-v1.md`  
**Autor:** LLD Architect Agent  
**Última actualización:** 4 de julio de 2026

---

## 0. Resumen ejecutivo

Este documento baja el HLD y el modelo de datos a un diseño **implementable** en `src/`: archivos concretos, contratos entre capas, schemas Zod, métodos de servicios y repositorios, componentes React y trazabilidad a historias US-XXX y tasks TASK-XXX del roadmap MVP.

| Aspecto | Decisión |
|---------|----------|
| **Alcance** | MVP — US-001 a US-016 (sin backlinks, sin auth) |
| **Patrón backend** | `routes → controllers → services → repositories → Prisma` |
| **Patrón frontend** | `pages → components + hooks → services/apiClient` |
| **Validación** | Zod en límites HTTP (backend); HTML5 + mensajes API en frontend |
| **ORM / migraciones** | Prisma 5; una migración inicial `init_mvp` + seeds opcionales |

**Relación con documentos superiores:**

| Documento | Qué aporta al LLD | Qué NO duplica el LLD |
|-----------|-------------------|----------------------|
| HLD | Stack, endpoints overview, NFR, despliegue | Decisiones estratégicas y ADRs |
| Modelo de datos | Entidades, Prisma, DDL, índices, consultas SQL | Catálogo físico completo de tablas |
| **LLD (este doc)** | Módulos, métodos, DTOs, flujos por capa, mapa US → código | Código fuente |

---

## 1. Mapa de módulos del sistema

### 1.1 Vista de módulos (backend + frontend)

```mermaid
flowchart TB
    subgraph FE["src/frontend"]
        Pages["pages/"]
        Comp["components/"]
        Hooks["hooks/"]
        ApiSvc["services/"]
        Types["types/"]
    end

    subgraph BE["src/backend"]
        Routes["routes/"]
        Ctrl["controllers/"]
        Svc["services/"]
        Repo["repositories/"]
        Schemas["schemas/"]
        MW["middleware/"]
    end

    subgraph Data["Persistencia"]
        Prisma["prisma/schema.prisma"]
        DB[("PostgreSQL 16")]
    end

    Pages --> Comp
    Pages --> Hooks
    Hooks --> ApiSvc
    ApiSvc -->|HTTP /api/v1| Routes
    Routes --> MW
    Routes --> Ctrl
    Ctrl --> Svc
    Svc --> Repo
    Repo --> Prisma
    Prisma --> DB
    Ctrl --> Schemas
```

### 1.2 Responsabilidad por capa (backend)

| Capa | Carpeta | Responsabilidad | Puede | No puede |
|------|---------|-----------------|-------|----------|
| Routes | `routes/` | Registrar endpoints, aplicar middleware | Delegar en controller | Lógica de negocio, Prisma directo |
| Controllers | `controllers/` | HTTP ↔ DTO, códigos de estado | Llamar services, formatear `{ data }` | Queries SQL, reglas de dominio |
| Services | `services/` | Reglas de negocio, orquestación, transacciones | Usar repositories, lanzar `AppError` | Conocer `req`/`res` de Express |
| Repositories | `repositories/` | Acceso Prisma, includes optimizados | Queries alineadas a índices | Validación HTTP, reglas de negocio |
| Schemas | `schemas/` | Zod: request/response/query | Exportar tipos `z.infer<>` | Lógica de aplicación |
| Middleware | `middleware/` | Errores globales, validación body/query | `next(error)` tipado | Lógica de dominio |

### 1.3 Responsabilidad por capa (frontend)

| Capa | Carpeta | Responsabilidad | Puede | No puede |
|------|---------|-----------------|-------|----------|
| Pages | `pages/` | Composición de pantallas, routing | Orquestar hooks y componentes | `fetch` directo sin service |
| Components | `components/` | UI reutilizable, eventos | Llamar callbacks del padre | Acceso HTTP directo |
| Hooks | `hooks/` | Estado local, efectos, llamadas API | Usar `services/` | Reglas de persistencia del servidor |
| Services | `services/` | Cliente HTTP, parseo de errores API | `apiClient.get/post/...` | Duplicar validación Zod del backend |
| Types | `types/` | DTOs TypeScript alineados con API | Tipos compartidos UI | Lógica de negocio |

---

## 2. Estructura de directorios y archivos

### 2.1 Árbol backend (`src/backend/`)

```
src/backend/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── routes/
│   │   ├── index.ts              # Mount /api/v1, /health
│   │   ├── notas.routes.ts       # CRUD + filtro etiqueta
│   │   └── buscar.routes.ts      # GET /buscar
│   ├── controllers/
│   │   ├── nota.controller.ts
│   │   └── search.controller.ts
│   ├── services/
│   │   ├── nota.service.ts
│   │   ├── etiqueta.service.ts
│   │   └── search.service.ts
│   ├── repositories/
│   │   ├── nota.repository.ts
│   │   └── etiqueta.repository.ts
│   ├── schemas/
│   │   ├── nota.schema.ts
│   │   ├── search.schema.ts
│   │   └── common.schema.ts
│   ├── mappers/
│   │   └── nota.mapper.ts        # Prisma → DTO camelCase
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── validate.ts
│   ├── lib/
│   │   └── prisma.ts
│   └── errors/
│       ├── AppError.ts
│       └── errorCodes.ts
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── package.json
└── tsconfig.json
```

### 2.2 Árbol frontend (`src/frontend/`)

```
src/frontend/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── NoteDetailPage.tsx
│   │   └── NoteCreatePage.tsx
│   ├── components/
│   │   ├── notes/
│   │   │   ├── NoteList.tsx
│   │   │   ├── NoteListItem.tsx
│   │   │   ├── NoteDetail.tsx
│   │   │   ├── NoteForm.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── tags/
│   │   │   ├── TagInput.tsx
│   │   │   └── TagFilter.tsx
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchEmptyState.tsx
│   │   └── common/
│   │       ├── ConfirmDialog.tsx
│   │       ├── ErrorMessage.tsx
│   │       └── LoadingSpinner.tsx
│   ├── hooks/
│   │   ├── useNotes.ts
│   │   ├── useNote.ts
│   │   └── useSearch.ts
│   ├── services/
│   │   ├── apiClient.ts
│   │   ├── notesApi.ts
│   │   └── searchApi.ts
│   └── types/
│       ├── nota.ts
│       └── api.ts
├── package.json
└── vite.config.ts
```

### 2.3 Infraestructura (`src/infra/`)

| Archivo | Propósito |
|---------|-----------|
| `docker-compose.yml` | Servicios: `frontend`, `backend`, `postgres` |
| `Dockerfile.backend` | Build multi-stage Node 20 |
| `Dockerfile.frontend` | Build Vite + Nginx |
| `.env.example` | `DATABASE_URL`, `PORT`, `CORS_ORIGIN`, `VITE_API_URL` |

---

## 3. Contratos entre capas (backend)

### 3.1 NotaService

```typescript
interface ListNotasParams {
  etiqueta?: string;
  sort?: "created_at" | "title";
  order?: "asc" | "desc";
}

interface NotaService {
  list(params: ListNotasParams): Promise<{ data: NotaResumen[]; meta: { total: number } }>;
  getById(id: string): Promise<NotaDetail>;
  create(dto: CreateNotaDto): Promise<NotaDetail>;
  update(id: string, dto: UpdateNotaDto): Promise<NotaDetail>;
  delete(id: string): Promise<void>;
}
```

### 3.2 EtiquetaService

```typescript
interface EtiquetaService {
  /** Crea etiquetas inexistentes; devuelve ids por nombre normalizado (trim). */
  upsertByNames(names: string[]): Promise<Map<string, string>>;
  findByName(name: string): Promise<Etiqueta | null>;
}
```

### 3.3 SearchService

```typescript
interface SearchService {
  search(q: string, order: "relevance" | "date"): Promise<{
    data: NotaResumen[];
    meta: { q: string; total: number };
  }>;
}
```

### 3.4 NotaRepository

```typescript
interface NotaRepository {
  findAll(filters: ListNotasParams): Promise<NotaWithRelations[]>;
  findById(id: string): Promise<NotaWithRelations | null>;
  create(data: CreateNotaData): Promise<NotaWithRelations>;
  update(id: string, data: UpdateNotaData): Promise<NotaWithRelations>;
  delete(id: string): Promise<void>;
  search(term: string, order: "relevance" | "date"): Promise<NotaWithRelations[]>;
  count(): Promise<number>;
}
```

### 3.5 Diagrama de dependencias

```mermaid
flowchart BT
    Routes --> Controllers
    Controllers --> Services
    Controllers --> Schemas
    Services --> Repositories
    Services --> EtiquetaService
    Repositories --> Prisma
    Routes --> Middleware
    Controllers --> Mappers
```

**Regla:** dependencias solo hacia abajo; `repositories` no importan `services` ni `controllers`.

---

## 4. API — detalle de implementación

### 4.1 Envelope de respuesta

| Caso | Formato | HTTP |
|------|---------|------|
| Éxito con datos | `{ "data": T }` | 200 |
| Éxito con lista | `{ "data": T[], "meta": { total, ... } }` | 200 |
| Creado | `{ "data": T }` | 201 |
| Sin contenido | cuerpo vacío | 204 |
| Validación | `{ "error": { "code": "VALIDATION_ERROR", "message", "details": [{ field, message }] } }` | 400 |
| No encontrado | `{ "error": { "code": "NOT_FOUND", "message" } }` | 404 |
| Interno | `{ "error": { "code": "INTERNAL_ERROR", "message" } }` | 500 |

### 4.2 Catálogo de endpoints MVP

| Método | Ruta | Controller | Service | Schema request | Response | US / TASK |
|--------|------|------------|---------|----------------|----------|-----------|
| GET | `/api/v1/health` | `healthCheck` | — | — | `{ status: "ok" }` | Infra |
| GET | `/api/v1/notas` | `listNotas` | `NotaService.list` | `ListNotasQuery` | `NotaResumen[]` + meta | US-001, TASK-001 |
| GET | `/api/v1/notas/:id` | `getNota` | `NotaService.getById` | `IdParam` | `NotaDetail` | US-002, TASK-005 |
| POST | `/api/v1/notas` | `createNota` | `NotaService.create` | `CreateNotaDto` | `NotaDetail` 201 | US-005, TASK-017 |
| PUT | `/api/v1/notas/:id` | `updateNota` | `NotaService.update` | `UpdateNotaDto` | `NotaDetail` | US-015, TASK-057 |
| DELETE | `/api/v1/notas/:id` | `deleteNota` | `NotaService.delete` | `IdParam` | 204 | US-016, TASK-061 |
| GET | `/api/v1/notas?etiqueta=` | `listNotas` | `NotaService.list` | `ListNotasQuery` | `NotaResumen[]` | US-009, TASK-033 |
| GET | `/api/v1/buscar` | `searchNotas` | `SearchService.search` | `SearchQuery` | `NotaResumen[]` + meta | US-012, US-013, TASK-045 |

### 4.3 Schemas Zod

```typescript
// schemas/common.schema.ts
export const IdParamSchema = z.object({
  id: z.string().uuid("Identificador de nota inválido"),
});

export const ErrorDetailSchema = z.object({
  field: z.string(),
  message: z.string(),
});
```

```typescript
// schemas/nota.schema.ts
export const CreateNotaDtoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "El título es obligatorio")
    .max(500, "El título no puede superar 500 caracteres"),
  content: z
    .string()
    .trim()
    .min(1, "El contenido es obligatorio"),
  links: z
    .array(z.string().url("URL con formato inválido"))
    .default([]),
  tags: z
    .array(z.string().trim().min(1))
    .default([]),
});

export const UpdateNotaDtoSchema = CreateNotaDtoSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "Debe enviar al menos un campo para actualizar" }
);

export const ListNotasQuerySchema = z.object({
  etiqueta: z.string().trim().optional(),
  sort: z.enum(["created_at", "title"]).default("created_at"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export const NotaResumenSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const NotaDetailSchema = NotaResumenSchema.extend({
  content: z.string(),
  links: z.array(z.string().url()),
  tags: z.array(z.string()),
});
```

```typescript
// schemas/search.schema.ts
export const SearchQuerySchema = z.object({
  q: z.string().trim().min(1, "El término de búsqueda es obligatorio"),
  order: z.enum(["relevance", "date"]).default("relevance"),
});
```

| DTO | Validaciones clave | Trazabilidad Gherkin |
|-----|-------------------|---------------------|
| `CreateNotaDto` | title/content NOT empty; URL válida | US-005, US-006, US-007 |
| `UpdateNotaDto` | mismas reglas si campo presente | US-015 |
| `ListNotasQuery` | enum sort/order | US-009 (filtro etiqueta) |
| `SearchQuery` | q obligatorio; order relevance\|date | US-012, US-013 |

### 4.4 Mapeo persistencia ↔ API

Implementado en `mappers/nota.mapper.ts`:

| Campo DB | Campo JSON | Transformación |
|----------|------------|----------------|
| `created_at` | `createdAt` | `.toISOString()` |
| `updated_at` | `updatedAt` | `.toISOString()` |
| `enlaces[].url` | `links: string[]` | orden por `created_at` asc |
| `etiquetas[].name` | `tags: string[]` | orden alfabético |

---

## 5. Lógica de negocio por servicio

### 5.1 NotaService.create

| Paso | Acción |
|------|--------|
| 1 | Recibir `CreateNotaDto` ya validado por Zod |
| 2 | Normalizar tags: `trim`, deduplicar case-sensitive |
| 3 | `EtiquetaService.upsertByNames(tags)` → Map nombre → id |
| 4 | `prisma.$transaction`: crear `nota`, `enlaces` (bulk), `nota_etiqueta` (bulk) |
| 5 | Recargar con `include: { enlaces, etiquetas: { include: { etiqueta } } }` |
| 6 | Retornar `NotaDetail` vía mapper |

**Errores:** `VALIDATION_ERROR` 400 (Zod); `INTERNAL_ERROR` 500 (fallo transacción).

### 5.2 NotaService.update

| Paso | Acción |
|------|--------|
| 1 | `findById`; si null → `NOT_FOUND` 404 |
| 2 | Si `tags` presente: upsert etiquetas y reemplazar asociaciones M:N |
| 3 | Si `links` presente: delete all enlaces de la nota + recreate |
| 4 | Update campos escalares; Prisma `@updatedAt` refresca timestamp |
| 5 | Retornar detalle actualizado |

**SLA:** respuesta < 2 s (RNF-001, US-015).

### 5.3 NotaService.delete

| Paso | Acción |
|------|--------|
| 1 | Verificar existe; si no → 404 |
| 2 | `notaRepository.delete(id)` — CASCADE elimina enlaces y `nota_etiqueta` |
| 3 | Retornar void → controller responde 204 |

### 5.4 NotaService.list

| Parámetro | Comportamiento Prisma |
|-----------|----------------------|
| `etiqueta` | `where: { etiquetas: { some: { etiqueta: { name: etiqueta } } } }` |
| `sort=created_at` | `orderBy: { createdAt: order }` — índice `idx_notas_created_at` |
| `sort=title` | `orderBy: { title: order }` — índice `idx_notas_title` |
| default | `created_at DESC` |

### 5.5 SearchService.search

| order | Algoritmo MVP |
|-------|---------------|
| `relevance` | Post-query sort: coincidencia en `title` ILIKE antes que solo `content` |
| `date` | `orderBy: { updatedAt: 'desc' }` |

Prisma (MVP):

```typescript
const rows = await prisma.nota.findMany({
  where: {
    OR: [
      { title: { contains: term, mode: "insensitive" } },
      { content: { contains: term, mode: "insensitive" } },
    ],
  },
  take: 50,
  include: { enlaces: true, etiquetas: { include: { etiqueta: true } } },
});
```

**SLA:** < 300 ms con 500 notas (RNF-002, TASK-048).

### 5.6 EtiquetaService.upsertByNames

| Paso | Acción |
|------|--------|
| 1 | Normalizar cada nombre (`trim`) |
| 2 | Por cada nombre: `upsert` where `name`, create si no existe |
| 3 | UNIQUE en BD impide duplicados (BR-002) |

### 5.7 Secuencia — Crear nota (LLD)

```mermaid
sequenceDiagram
    participant C as NotaController
    participant V as validate(CreateNotaDto)
    participant S as NotaService
    participant ES as EtiquetaService
    participant R as NotaRepository
    participant P as Prisma

    C->>V: parse req.body
    alt inválido
        V-->>C: ZodError → 400 details[]
    end
    C->>S: create(dto)
    S->>ES: upsertByNames(dto.tags)
    ES-->>S: Map name→id
    S->>R: createWithRelations(...)
    R->>P: $transaction
    P-->>R: NotaWithRelations
    R-->>S: entity
    S-->>C: NotaDetail
    C-->>C: 201 { data }
```

---

## 6. Capa de persistencia y migraciones

### 6.1 Cliente Prisma

- Singleton en `lib/prisma.ts`
- `prisma.$disconnect()` en `SIGTERM` (server.ts)
- Pool por defecto de Prisma; sin raw SQL en controllers

### 6.2 Orden de migraciones

| # | Nombre | Contenido | TASK |
|---|--------|-----------|------|
| 1 | `20260704_init_mvp` | Tablas `notas`, `enlaces`, `etiquetas`, `nota_etiqueta` + índices + trigger `updated_at` | TASK-019, TASK-023, TASK-031 |

Esquema: ver `logical-model-v1.md` §6 (Prisma). Una sola migración inicial para MVP.

### 6.3 Métodos repository → Prisma

| Método | Prisma | Índice |
|--------|--------|--------|
| `findAll` | `nota.findMany({ where, orderBy, select/include })` | `idx_notas_created_at` |
| `findById` | `nota.findUnique({ where: { id }, include })` | PK |
| `createWithRelations` | `$transaction([nota.create, enlace.createMany, notaEtiqueta.createMany])` | — |
| `search` | `findMany({ where: { OR: [title, content] }, take: 50 })` | `idx_notas_title` |
| `filterByTag` | `findMany({ where: { etiquetas: { some: { etiqueta: { name } } } } })` | `idx_nota_etiqueta_etiqueta` |

### 6.4 Seeds

`prisma/seed.ts` — datos de `logical-model-v1.md` §10 (3 notas, 4 etiquetas, 2 enlaces, 5 asociaciones).

---

## 7. Frontend — diseño de componentes y estado

### 7.1 Routing (React Router)

| Ruta | Página | Descripción | US |
|------|--------|-------------|-----|
| `/` | `HomePage` | Listado principal, búsqueda, filtro etiquetas | US-001 |
| `/notas/nueva` | `NoteCreatePage` | Formulario creación | US-005 |
| `/notas/:id` | `NoteDetailPage` | Lectura, edición, eliminar | US-002, US-015, US-016 |

### 7.2 Mapa página → componentes → API

| Página | Componentes | Hook / Service | US |
|--------|-------------|----------------|-----|
| `HomePage` | `NoteList`, `SearchBar`, `TagFilter`, `EmptyState` | `useNotes`, `useSearch` | US-001, US-009, US-012 |
| `NoteDetailPage` | `NoteDetail`, `NoteForm`, `ConfirmDialog` | `useNote` | US-002, US-015, US-016 |
| `NoteCreatePage` | `NoteForm`, `TagInput` | `notesApi.create` | US-005, US-006, US-008 |

### 7.3 Estado

| Concern | Enfoque MVP |
|---------|-------------|
| Estado servidor | Hooks con `useState` + `useEffect`; sin Redux |
| Errores validación | `apiClient` parsea `error.details` → `Record<string, string>` en `NoteForm` |
| Loading | `isLoading`, `isSaving` por hook |
| Búsqueda | Debounce 300 ms en `SearchBar` antes de llamar `searchApi` |

### 7.4 apiClient

```typescript
// services/apiClient.ts — contrato
const BASE = import.meta.env.VITE_API_URL ?? "/api/v1";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.error);
  }
  if (res.status === 204) return undefined as T;
  const json = await res.json();
  return json.data as T;
}
```

### 7.5 Flujo UI — Listado → Detalle

```mermaid
flowchart LR
    Home["HomePage /"] -->|click item| Detail["NoteDetailPage /notas/:id"]
    Home -->|Nueva nota| Create["NoteCreatePage /notas/nueva"]
    Detail -->|Editar| Form["NoteForm mode=edit"]
    Detail -->|Eliminar| Confirm["ConfirmDialog"]
    Confirm -->|confirmar| Home
    Create -->|guardar OK| Home
```

---

## 8. Manejo de errores y observabilidad

### 8.1 Jerarquía de errores

| Clase | code | HTTP | Cuándo |
|-------|------|------|--------|
| `ValidationError` | `VALIDATION_ERROR` | 400 | Zod en middleware `validate` |
| `NotFoundError` | `NOT_FOUND` | 404 | Nota inexistente (US-002 escenario 404) |
| `AppError` | custom | 4xx | Dominio |
| default | `INTERNAL_ERROR` | 500 | No capturado |

### 8.2 errorHandler middleware

```typescript
// Pseudocódigo
if (err instanceof ZodError) {
  return res.status(400).json({
    error: {
      code: "VALIDATION_ERROR",
      message: "Los datos enviados no son válidos",
      details: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    },
  });
}
if (err instanceof NotFoundError) {
  return res.status(404).json({ error: { code: "NOT_FOUND", message: err.message } });
}
```

### 8.3 Logging MVP

| Evento | Nivel | Campos |
|--------|-------|--------|
| Request | info | `method`, `path`, `durationMs` |
| Error 5xx | error | `message`, `stack` (solo servidor) |
| Query > 500 ms | warn | `operation`, `durationMs` |

---

## 9. Trazabilidad roadmap → código

### 9.1 Historias MVP → módulos

| US | Backend | Frontend | Tests |
|----|---------|----------|-------|
| US-001 | `GET /notas`, `nota.repository.findAll` | `NoteList`, `HomePage` | E2E TASK-004 |
| US-002 | `GET /notas/:id` | `NoteDetailPage` | E2E TASK-008 |
| US-005 | `POST /notas`, `CreateNotaDto` | `NoteForm`, `NoteCreatePage` | E2E TASK-020 |
| US-006 | validación `links` en schema | campo URLs en `NoteForm` | TASK-024 |
| US-008 | `EtiquetaService.upsert` | `TagInput` | TASK-032 |
| US-009 | `ListNotasQuery.etiqueta` | `TagFilter` | TASK-036 |
| US-012 | `SearchService` | `SearchBar` | TASK-048 |
| US-013 | `SearchQuery.order` | selector en resultados | TASK-052 |
| US-015 | `PUT /notas/:id` | `NoteForm` edit | TASK-060 |
| US-016 | `DELETE /notas/:id` | `ConfirmDialog` | TASK-064 |

### 9.2 Orden de implementación (vertical slices)

```mermaid
flowchart TD
    A["1. Infra + Prisma migrate + health"] --> B["2. GET /notas + NoteList US-001"]
    B --> C["3. GET /notas/:id + Detail US-002"]
    C --> D["4. POST /notas + NoteForm US-005"]
    D --> E["5. Tags en create/update US-008"]
    E --> F["6. Filtro etiqueta US-009"]
    F --> G["7. GET /buscar US-012/013"]
    G --> H["8. PUT + DELETE US-015/016"]
```

| Fase | Tasks backend | Tasks frontend | Tasks DB/QA |
|------|---------------|----------------|-------------|
| 1 | TASK-001 | TASK-002 | TASK-003, TASK-004 |
| 2 | TASK-005 | TASK-006 | TASK-007, TASK-008 |
| 3 | TASK-017, TASK-021 | TASK-018, TASK-022 | TASK-019, TASK-023, TASK-020 |
| 4 | TASK-029 | TASK-030 | TASK-031, TASK-032 |
| 5 | TASK-033 | TASK-034 | TASK-035, TASK-036 |
| 6 | TASK-045, TASK-049 | TASK-046, TASK-050 | TASK-047, TASK-048 |
| 7 | TASK-057, TASK-061 | TASK-058, TASK-062 | TASK-059, TASK-063, TASK-064 |

---

## 10. Testing

| Capa | Qué testear | Herramienta | Ubicación |
|------|-------------|-------------|-----------|
| Schemas | DTOs válidos/inválidos, mensajes ES | Vitest | `src/backend/src/schemas/*.test.ts` |
| Services | upsert etiquetas, scoring búsqueda | Vitest + mocks repo | `src/backend/src/services/*.test.ts` |
| API | Contratos HTTP + BD test | Supertest + Prisma test DB | `tests/integration/api/` |
| E2E | Gherkin US-001…016 | Playwright | `tests/e2e/` |
| Rendimiento | 500 notas, búsqueda | script/k6 | `tests/perf/search.bench.ts` |

---

## 11. Configuración y variables de entorno

| Variable | Entorno | Ejemplo | Consumidor |
|----------|---------|---------|------------|
| `DATABASE_URL` | backend | `postgresql://okc:okc@postgres:5432/okc` | Prisma |
| `PORT` | backend | `3000` | Express |
| `NODE_ENV` | backend | `development` | errorHandler, logging |
| `CORS_ORIGIN` | backend | `http://localhost:5173` | cors middleware |
| `VITE_API_URL` | frontend build | `http://localhost:3000/api/v1` | apiClient |

### 11.1 Bootstrap local

1. `cp src/infra/.env.example .env`
2. `docker-compose up -d postgres` (o stack completo)
3. `cd src/backend && npx prisma migrate deploy && npx prisma db seed`
4. `npm run dev` en backend (`:3000`) y frontend (`:5173`)

---

## 12. MVP vs diferido (V1 / V2+)

| Capacidad | MVP (este LLD) | V1 | V2+ |
|-----------|----------------|-----|-----|
| Empty state orientativo | listado vacío básico | `EmptyState` + CTA US-003 | — |
| Validación inline FE | mensajes desde API | validación cliente US-007 | — |
| Quitar etiqueta de nota | — | `DELETE /notas/:id/etiquetas/:tagId` US-010 | — |
| Mensaje búsqueda vacía | array vacío | `SearchEmptyState` US-014 | — |
| Ordenación listado | solo `created_at DESC` default | — | query sort US-004 |
| Catálogo etiquetas con conteo | — | — | `GET /etiquetas` US-011 |
| Backlinks | — | — | `nota_backlink` US-017 |
| Autenticación | sin módulo auth | — | JWT + `user_id` |

**No incluir en `src/` MVP:** `auth/`, `backlink/`, `plugins/`, rutas `etiquetas` de catálogo V2+.

---

## 13. Riesgos de implementación

| Riesgo | Mitigación en LLD |
|--------|------------------|
| N+1 en detalle | `include: { enlaces, etiquetas: { include: { etiqueta } } }` en una query |
| Búsqueda lenta > 500 notas | `take: 50`; benchmark TASK-048; evolución tsvector en V1 |
| Duplicar validación FE/BE | Zod backend fuente de verdad; FE muestra `details[]` |
| Pérdida datos en replace links/tags | `$transaction` en update |
| Inconsistencia mapper/Prisma | único `nota.mapper.ts`; tests de contrato API |

---

*Generado con el agente LLD Architect a partir de `docs/architecture/hld/HLD-v1.md`, `docs/architecture/data-model/logical-model-v1.md` y `knowledge/templates/architecture/lld-template.md`.*
