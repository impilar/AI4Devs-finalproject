## Índice

0. [Ficha del proyecto](#0-ficha-del-proyecto)
1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

> Documentación de producto e ingeniería generada con agentes de IA. Artefactos en [`knowledge/`](knowledge/), [`architecture/`](architecture/) y [`delivery/`](delivery/).

---

## 0. Ficha del proyecto

### **0.1. Tu nombre completo:**

 Pilar Castro Garrido 

### **0.2. Nombre del proyecto:**

Organizador de Conocimiento (Notion Simplificado)

### **0.3. Descripción breve del proyecto:**

Aplicación web minimalista para capturar, organizar y recuperar información personal —notas, enlaces e ideas— mediante CRUD de notas, etiquetas y búsqueda simple. Arquitectura modular frontend/backend con API REST y PostgreSQL, preparada para evolucionar con backlinks y grafo de conocimiento.

### **0.4. URL del proyecto:**

*(Pendiente — despliegue previsto con Docker Compose o PaaS tras fase de implementación)*

### 0.5. URL o archivo comprimido del repositorio

 https://github.com/impilar/AI4Devs-finalproject 

---

## 1. Descripción general del producto

> Fuente: [`knowledge/product/prd_v1.md`](knowledge/product/prd_v1.md)

### **1.1. Objetivo:**

El Organizador de Conocimiento resuelve la dispersión de información personal en múltiples herramientas (notas del móvil, marcadores, documentos sueltos). Ofrece un sistema unificado y ligero para **almacenar, organizar y recuperar** notas, enlaces e ideas, sin la complejidad de plataformas como Notion u Obsidian.

**Valor para el usuario:** captura rápida (≤ 2 interacciones), clasificación por etiquetas y búsqueda en título y contenido.

**Usuario objetivo:** persona que gestiona conocimiento personal de forma individual (estudiantes, profesionales, investigadores).

### **1.2. Características y funcionalidades principales:**

**MVP (implementación planificada):**

| Área | Funcionalidad |
|------|---------------|
| Notas | CRUD con título, contenido, fechas automáticas y enlaces URL opcionales |
| Etiquetas | Creación automática al asignar, relación many-to-many, filtro por etiqueta |
| Búsqueda | Por término en título y contenido; ordenación por relevancia o fecha |
| Navegación | Listado de notas, vista de detalle, filtro por etiqueta |

**Fuera del MVP (roadmap V2+):** backlinks, grafo de conocimiento, plugins, autenticación multi-usuario.

**Métricas de éxito (PRD):**

- CRUD < 2 s (RNF-001)
- Búsqueda < 300 ms con hasta 500 notas (RNF-002)
- Creación de nota en ≤ 2 interacciones (RNF-003)
- Persistencia consistente tras recarga (RNF-004)

### **1.3. Diseño y experiencia de usuario:**

El viaje de usuario definido en el User Story Map sigue cinco fases: **acceder → capturar → organizar → recuperar → mantener**.

```mermaid
flowchart LR
    A["Listado de notas"] --> B["Crear / editar nota"]
    B --> C["Asignar etiquetas"]
    C --> D["Buscar / filtrar"]
    D --> E["Detalle de nota"]
```

**Pantallas principales (diseño):**

1. **Home** — listado de notas con título y fecha; botón "Nueva nota"; barra de búsqueda; filtro por etiquetas.
2. **Detalle** — título, contenido, enlaces clicables y chips de etiquetas; acciones editar y eliminar.
3. **Formulario** — creación/edición con validación inline de título, contenido y URLs.

> *Capturas de pantalla y videotutorial: pendientes de la fase de implementación del frontend.*

### **1.4. Instrucciones de instalación:**

Stack definido en [`architecture/architecture_v1.md`](architecture/architecture_v1.md): React + Vite, Node.js + Express, PostgreSQL 16, Prisma, Docker Compose.

**Requisitos previos:** Docker y Docker Compose, Node.js 20+ (desarrollo local opcional).

```bash
# Clonar repositorio
git clone <url-repositorio>
cd AI4Devs-finalproject

# Levantar entorno (tras implementación de src/infra/)
cd src/infra
docker-compose build
docker-compose run backend npx prisma migrate deploy
docker-compose run backend npx prisma db seed   # datos de prueba
docker-compose up -d
```

| Servicio | Puerto | URL |
|----------|--------|-----|
| Frontend (Vite dev) | 5173 | http://localhost:5173 |
| Backend API | 3000 | http://localhost:3000/api/v1 |
| PostgreSQL | 5432 | — |

**Variables de entorno (backend):**

```
DATABASE_URL=postgresql://user:pass@localhost:5432/organizador
PORT=3000
```

---

## 2. Arquitectura del Sistema

> Fuente: [`architecture/architecture_v1.md`](architecture/architecture_v1.md)

### **2.1. Diagrama de arquitectura:**

**Estilo:** monolito modular en capas (layered architecture).  
**Patrón:** `routes → controllers → services → repositories → Prisma → PostgreSQL`.  
**Comunicación:** REST JSON sobre HTTP (`/api/v1`).

```mermaid
flowchart LR
    subgraph Client["Presentación"]
        FE["React + TypeScript\nSPA"]
    end

    subgraph Server["Aplicación"]
        API["Express REST API"]
        BL["Services + Repositories"]
    end

    subgraph Data["Persistencia"]
        DB[("PostgreSQL 16")]
    end

    FE -->|HTTP/JSON| API
    API --> BL
    BL --> DB
```

**Beneficios:** despliegue simple (un backend), separación clara de responsabilidades, frontend desacoplado (RNF-005, RNF-006).

**Sacrificios:** escalado horizontal limitado en MVP; sin autenticación; búsqueda ILIKE en lugar de motor full-text dedicado.

**Por qué no microservicios:** overhead operativo injustificado para MVP single-user con < 1 000 notas.

### **2.2. Descripción de componentes principales:**

| Componente | Tecnología | Responsabilidad |
|------------|------------|-----------------|
| SPA Frontend | React 18, Vite, TypeScript, React Router | UI, formularios, búsqueda, consumo de API |
| REST API | Node.js 20, Express 4, TypeScript, Zod | Endpoints, validación, manejo de errores |
| Service Layer | TypeScript | Lógica de negocio (notas, etiquetas, búsqueda) |
| Repository Layer | Prisma 5 | Acceso a datos y transacciones |
| Base de datos | PostgreSQL 16 | Persistencia ACID |

### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

```
AI4Devs-finalproject/
├── .cursor/                  # Gobernanza IA (rules, agents, skills, workflows)
├── knowledge/                # Producto y contexto documental
│   ├── context/              # Requisitos y inputs humanos
│   ├── templates/            # Plantillas producto y técnico
│   └── product/              # PRD, User Story Map, Roadmap
├── architecture/             # Arquitectura y modelo de datos
├── decisions/                # ADRs (decisiones arquitectónicas)
├── prompts/                  # Registro de prompts por fase
├── docs/                     # Guías operativas del repositorio
├── src/                      # Software (frontend, backend, infra)
├── tests/                    # Tests transversales (E2E, integración)
├── delivery/                 # Exports, releases, evidencias
├── prompts.md                # Índice de prompts (entrega académica)
└── readme.md
```

**Estructura de código planificada** (según arquitectura):

```
src/
├── frontend/src/{components,pages,services,hooks,types}
├── backend/src/{routes,controllers,services,repositories,schemas}
├── backend/prisma/{schema.prisma,migrations}
└── infra/{docker-compose.yml,Dockerfile.*}
```

### **2.4. Infraestructura y despliegue**

```mermaid
flowchart TB
    Browser["Navegador"] --> FE["Frontend :80 / :5173"]
    FE -->|proxy /api| BE["Backend :3000"]
    BE --> DB[("PostgreSQL :5432")]
```

**Proceso de despliegue MVP:**

1. `docker-compose build`
2. `docker-compose run backend npx prisma migrate deploy`
3. `docker-compose up -d`
4. Verificar `GET /api/v1/health` y acceso a la SPA

**Entornos:** local (desarrollo), staging (pruebas), producción (demo académica / PaaS).

### **2.5. Seguridad**

| Práctica | MVP | Detalle |
|----------|-----|---------|
| Autenticación | No implementada | Single-user por instancia; documentado como limitación |
| Validación de entrada | Zod (backend) + HTML5/JS (frontend) | Título/contenido obligatorios; URLs con formato válido |
| XSS | Mitigado | React escapa por defecto; sin `dangerouslySetInnerHTML` |
| CORS | Configurado por entorno | `localhost` en dev; dominio explícito en prod |
| HTTPS | Recomendado en prod | Reverse proxy (Nginx / PaaS) |

### **2.6. Tests**

Estrategia definida en arquitectura (pendiente de implementación):

| Tipo | Herramienta | Alcance |
|------|-------------|---------|
| Unitarios | Vitest | Services, validadores Zod |
| Integración | Vitest + Supertest | API + PostgreSQL |
| E2E | Playwright | Flujos Gherkin del roadmap (US-001 a US-016) |
| Rendimiento | k6 / script | Búsqueda < 300 ms con 500 notas |

---

## 3. Modelo de Datos

> Fuente: [`architecture/data_model_v1.md`](architecture/data_model_v1.md)

### **3.1. Diagrama del modelo de datos:**

```mermaid
erDiagram
    NOTAS ||--o{ ENLACES : "contiene"
    NOTAS }o--o{ ETIQUETAS : "clasificada por"
    NOTAS ||--o{ NOTA_ETIQUETA : ""
    ETIQUETAS ||--o{ NOTA_ETIQUETA : ""

    NOTAS {
        uuid id PK
        varchar title "NOT NULL"
        text content "NOT NULL"
        timestamptz created_at "NOT NULL"
        timestamptz updated_at "NOT NULL"
    }

    ENLACES {
        uuid id PK
        uuid nota_id FK "NOT NULL"
        varchar url "NOT NULL"
        timestamptz created_at "NOT NULL"
    }

    ETIQUETAS {
        uuid id PK
        varchar name UK "NOT NULL"
        timestamptz created_at "NOT NULL"
    }

    NOTA_ETIQUETA {
        uuid nota_id FK "PK"
        uuid etiqueta_id FK "PK"
        timestamptz created_at "NOT NULL"
    }
```

### **3.2. Descripción de entidades principales:**

#### `notas`

| Atributo | Tipo | Null | Restricciones | Descripción |
|----------|------|------|---------------|-------------|
| `id` | UUID | NO | PK, default `gen_random_uuid()` | Identificador único |
| `title` | VARCHAR(500) | NO | CHECK no vacío | Título en listados y búsqueda |
| `content` | TEXT | NO | CHECK no vacío | Cuerpo de la nota |
| `created_at` | TIMESTAMPTZ | NO | default `now()` | Fecha de creación |
| `updated_at` | TIMESTAMPTZ | NO | auto en UPDATE | Última modificación |

**Relaciones:** 1:N con `enlaces` (CASCADE); M:N con `etiquetas` vía `nota_etiqueta`.

#### `enlaces`

| Atributo | Tipo | Null | Restricciones | Descripción |
|----------|------|------|---------------|-------------|
| `id` | UUID | NO | PK | Identificador |
| `nota_id` | UUID | NO | FK → `notas.id`, ON DELETE CASCADE | Nota propietaria |
| `url` | VARCHAR(2048) | NO | — | URL externa |
| `created_at` | TIMESTAMPTZ | NO | default `now()` | Fecha de asociación |

#### `etiquetas`

| Atributo | Tipo | Null | Restricciones | Descripción |
|----------|------|------|---------------|-------------|
| `id` | UUID | NO | PK | Identificador |
| `name` | VARCHAR(100) | NO | UNIQUE | Nombre único (single-user MVP) |
| `created_at` | TIMESTAMPTZ | NO | default `now()` | Primera creación |

#### `nota_etiqueta` (tabla puente)

| Atributo | Tipo | Restricciones | Descripción |
|----------|------|---------------|-------------|
| `nota_id` | UUID | PK, FK → `notas.id` CASCADE | Referencia a nota |
| `etiqueta_id` | UUID | PK, FK → `etiquetas.id` CASCADE | Referencia a etiqueta |
| `created_at` | TIMESTAMPTZ | NOT NULL | Fecha de asociación |

---

## 4. Especificación de la API

> Fuente: [`architecture/architecture_v1.md` §4](architecture/architecture_v1.md). Base URL: `/api/v1`

### Endpoint 1 — Listar notas

```yaml
GET /api/v1/notas
Query: ?etiqueta={nombre}&sort=created_at|title&order=asc|desc
Response 200:
  data:
    - id: "550e8400-e29b-41d4-a716-446655440000"
      title: "Ideas de proyecto"
      createdAt: "2026-06-12T10:00:00.000Z"
      updatedAt: "2026-06-12T10:00:00.000Z"
  meta:
    total: 1
```

### Endpoint 2 — Crear nota

```yaml
POST /api/v1/notas
Request:
  title: "Ideas de proyecto"          # obligatorio
  content: "Investigar mercado"       # obligatorio
  links: ["https://docs.ejemplo.com"] # opcional
  tags: ["ideas", "urgente"]          # opcional
Response 201:
  data:
    id: "550e8400-e29b-41d4-a716-446655440000"
    title: "Ideas de proyecto"
    content: "Investigar mercado"
    links: ["https://docs.ejemplo.com"]
    tags: ["ideas", "urgente"]
    createdAt: "2026-06-12T10:00:00.000Z"
    updatedAt: "2026-06-12T10:00:00.000Z"
```

### Endpoint 3 — Buscar notas

```yaml
GET /api/v1/buscar?q={termino}&order=relevance|date
Response 200:
  data:
    - id: "..."
      title: "..."
      createdAt: "..."
      updatedAt: "..."
  meta:
    q: "mercado"
    total: 3
```

---

## 5. Historias de Usuario

> Fuente: [`knowledge/product/user_story_mapping_v1.md`](knowledge/product/user_story_mapping_v1.md)

**Historia de Usuario 1 — US-005 (Capturar contenido, MVP)**

> **Como** usuario final, **quiero** crear una nota con título y contenido en máximo 2 interacciones, **para** capturar ideas sin fricción.

**Criterios de aceptación:**

- Botón "Nueva nota" visible en pantalla principal.
- Título y contenido obligatorios; error de validación si están vacíos.
- Fechas `createdAt` y `updatedAt` generadas automáticamente.
- Trazabilidad: RF-001, RF-003, RNF-003.

---

**Historia de Usuario 2 — US-008 (Organizar con etiquetas, MVP)**

> **Como** usuario final, **quiero** asignar etiquetas a una nota, **para** clasificar mi conocimiento por temas.

**Criterios de aceptación:**

- Etiquetas creadas automáticamente al escribirlas por primera vez.
- Varias etiquetas por nota; nombre único en el sistema.
- Trazabilidad: RF-007, RF-008, RF-009.

---

**Historia de Usuario 3 — US-012 (Recuperar información, MVP)**

> **Como** usuario final, **quiero** buscar notas por un término de texto, **para** encontrar información sin recordar dónde la guardé.

**Criterios de aceptación:**

- Búsqueda en título y contenido.
- Resultados en < 300 ms con hasta 500 notas (RNF-002).
- Trazabilidad: RF-012, RF-013.

---

## 6. Tickets de Trabajo

> Fuente: [`knowledge/product/roadmap_v1.md`](knowledge/product/roadmap_v1.md)

**Ticket 1 — Backend (TASK-017)**

| Campo | Valor |
|-------|-------|
| **ID** | TASK-017 |
| **Historia** | US-005 — Crear nota con título y contenido |
| **Release** | MVP |
| **Estimación** | 3 puntos |

**Descripción:** Implementar `POST /api/v1/notas` con validación Zod de título y contenido obligatorios. Generar `id`, `created_at` y `updated_at`. Devolver 201 con DTO camelCase o 400 con errores por campo.

**Criterios de done:** endpoint testeado con Supertest; integración con Prisma; transacción para nota + enlaces + etiquetas.

---

**Ticket 2 — Frontend (TASK-018)**

| Campo | Valor |
|-------|-------|
| **ID** | TASK-018 |
| **Historia** | US-005 — Crear nota con título y contenido |
| **Release** | MVP |
| **Estimación** | 3 puntos |

**Descripción:** Componente `NoteForm` y botón "Nueva nota" en home. Flujo completable en ≤ 2 interacciones. Validación inline; llamada a `POST /api/v1/notas`; redirección al listado o detalle tras éxito.

**Criterios de done:** formulario accesible desde `/`; mensajes de error sin perder datos; test E2E Playwright.

---

**Ticket 3 — Base de datos (TASK-019)**

| Campo | Valor |
|-------|-------|
| **ID** | TASK-019 |
| **Historia** | US-005 — Crear nota con título y contenido |
| **Release** | MVP |
| **Estimación** | 2 puntos |

**Descripción:** Migración Prisma inicial de tabla `notas` con `id` UUID, `title` VARCHAR(500) NOT NULL, `content` TEXT NOT NULL, `created_at` y `updated_at` TIMESTAMPTZ. CHECK de campos no vacíos. Índice en `created_at DESC`.

**Criterios de done:** migración aplicable con `prisma migrate deploy`; schema alineado con `data_model_v1.md`; seed de desarrollo opcional.

---

## 7. Pull Requests

> *Pendientes de la fase de implementación. Estructura sugerida según roadmap MVP:*

**Pull Request 1 — `feat/db-schema-mvp`**

- Migraciones Prisma: `notas`, `enlaces`, `etiquetas`, `nota_etiqueta`.
- Seeds de desarrollo.
- Documentación en `data_model_v1.md`.

**Pull Request 2 — `feat/api-notas-crud`**

- Endpoints `GET/POST/PUT/DELETE /api/v1/notas`.
- Validación Zod, services y repositories.
- Tests de integración Supertest.

**Pull Request 3 — `feat/frontend-notas-mvp`**

- Componentes `NoteList`, `NoteDetail`, `NoteForm`.
- Integración con API; flujos US-001, US-002, US-005.
- Tests E2E Playwright del slice MVP.

---

## Documentación generada

| Documento | Descripción |
|-----------|-------------|
| [`prd_v1.md`](knowledge/product/prd_v1.md) | Product Requirements Document |
| [`user_story_mapping_v1.md`](knowledge/product/user_story_mapping_v1.md) | User Story Map (Jeff Patton) |
| [`roadmap_v1.md`](knowledge/product/roadmap_v1.md) | Roadmap épicas / historias / tasks |
| [`roadmap_jira_import_v1.csv`](delivery/exports/roadmap_jira_import_v1.csv) | Importación Jira |
| [`architecture_v1.md`](architecture/architecture_v1.md) | Arquitectura técnica |
| [`data_model_v1.md`](architecture/data_model_v1.md) | Modelo de datos detallado |
