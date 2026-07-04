# 🗓 Roadmap — Organizador de Conocimiento (Notion Simplificado)

**Versión:** 1.0  
**Fuente:** `docs/product/user-story-map/user-story-map-v1.md`  
**Proyecto Jira:** OKC  
**Última actualización:** 12 de junio de 2026

---

## 0. Visión del roadmap

Este roadmap traduce el User Story Map del Organizador de Conocimiento en un plan de entrega ejecutable: **5 épicas** alineadas con el backbone del viaje de usuario, **17 historias** priorizadas en tres releases (MVP, V1, V2+) y **68 tasks** técnicas desglosadas por capa (Backend, Frontend, Base de datos, QA). El objetivo es entregar primero un flujo vertical completo —capturar, organizar, recuperar y mantener notas— y evolucionar con pulido de UX y capacidades avanzadas sin scope creep hacia backlinks o grafo en el lanzamiento inicial.

### Jerarquía de trabajo (Jira)

| Nivel | Issue Type Jira | Descripción | Convención ID |
|-------|-----------------|-------------|---------------|
| 1 | Epic | Agrupación por capacidad de negocio / fase del viaje | `EPIC-XXX` |
| 2 | Story | Historia de usuario INVEST con criterios Gherkin | `US-XXX` |
| 3 | Task / Sub-task | Trabajo técnico ejecutable (FE, BE, DB, QA) | `TASK-XXX` |

### Releases planificados

| Release | Nombre | Objetivo | Fecha objetivo |
|---------|--------|----------|----------------|
| MVP | Captura, organización y recuperación básica | Ciclo completo capturar → organizar → recuperar → mantener sin backlinks ni grafo | Q2 2026 |
| V1 | Pulido de experiencia | Estados vacíos, validación de formularios, gestión fina de etiquetas y feedback de búsqueda | Q3 2026 |
| V2+ | Evolución del producto | Ordenación avanzada, catálogo de etiquetas, backlinks y capacidades futuras del PRD | Q4 2026 |

---

## 1. Resumen ejecutivo del roadmap

| Métrica | Valor |
|---------|-------|
| Total épicas | 5 |
| Total historias | 17 |
| Total tasks | 68 |
| Historias MVP | 10 |
| Historias V1 | 4 |
| Historias V2+ | 3 |

---

## 2. Épicas

| ID | Epic | Release principal | Descripción | Historias |
|----|------|-------------------|-------------|-----------|
| EPIC-001 | Acceder y navegar | MVP | Orientarse en la biblioteca personal y abrir el contenido de interés | US-001, US-002, US-003, US-004 |
| EPIC-002 | Capturar contenido | MVP | Registrar ideas, notas y enlaces de forma rápida antes de que se pierdan | US-005, US-006, US-007 |
| EPIC-003 | Organizar con etiquetas | MVP | Clasificar el conocimiento para encontrarlo por contexto o tema | US-008, US-009, US-010, US-011 |
| EPIC-004 | Recuperar información | MVP | Localizar notas concretas mediante búsqueda y exploración de resultados | US-012, US-013, US-014 |
| EPIC-005 | Mantener el conocimiento | MVP | Actualizar o depurar notas obsoletas para mantener la biblioteca útil | US-015, US-016, US-017 |

---

## 3. Detalle por épica

> Cada historia incluye: validación **INVEST**, **criterios de aceptación en Gherkin** y **tasks** desglosadas por capa (Backend, Frontend, Base de datos, QA).

---

### EPIC-001 — Acceder y navegar

**Release:** MVP (historias US-003 V1, US-004 V2+)  
**Descripción:** Orientarse en la biblioteca personal y abrir el contenido que le interesa.  
**Objetivo de negocio:** El usuario accede a la aplicación, comprende el estado de su biblioteca y navega al detalle de cualquier nota con mínima fricción.

---

#### US-001 — Ver listado de todas mis notas

| Campo | Valor |
|-------|-------|
| **Release** | MVP |
| **Epic** | EPIC-001 |
| **Prioridad** | Alta |
| **Story Points** | 3 |
| **Componentes** | Frontend, Backend |
| **Labels** | mvp, backbone, navegacion |
| **Trazabilidad** | RF-015 |

**Historia de usuario (INVEST):**

> Como usuario final, quiero ver un listado de todas mis notas, para orientarme rápidamente en mi biblioteca personal.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | No requiere otras historias; puede mostrarse listado vacío |
| **N**egociable | ✓ | Campos visibles (título, fecha) negociables con el equipo |
| **V**aliosa | ✓ | Punto de entrada esencial para orientarse en la biblioteca |
| **E**stimable | ✓ | Endpoint GET + vista de listado acotados |
| **S**mall (pequeña) | ✓ | Completable en un sprint |
| **T**esteable | ✓ | Verificable con Gherkin: listado con y sin notas |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Listado de notas

  Scenario: Usuario con notas existentes ve el listado al abrir la app
    Given que tengo 3 notas guardadas con título y fecha de creación
    When abro la aplicación
    Then veo un listado con las 3 notas mostrando título y fecha de cada una

  Scenario: El listado es la pantalla principal al iniciar
    Given que la aplicación está cargada
    When accedo a la URL principal
    Then el listado de notas es visible sin navegación adicional
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-001 | [BE] Endpoint GET /notas con paginación básica | Backend | MVP | Implementar API que devuelve todas las notas con id, título, created_at y updated_at ordenadas por fecha descendente | 2 |
| TASK-002 | [FE] Componente NoteList con título y fecha | Frontend | MVP | Crear vista de listado que consume GET /notas y renderiza cada nota con título y fecha formateada | 2 |
| TASK-003 | [DB] Índice en created_at para ordenación del listado | Database | MVP | Añadir índice en columna created_at de la tabla notas para respuesta < 2 s | 1 |
| TASK-004 | [QA] Tests E2E del listado con datos de prueba | QA | MVP | Validar que el listado muestra todas las notas y es la pantalla inicial de la app | 2 |

---

#### US-002 — Abrir detalle de una nota desde el listado

| Campo | Valor |
|-------|-------|
| **Release** | MVP |
| **Epic** | EPIC-001 |
| **Prioridad** | Alta |
| **Story Points** | 3 |
| **Componentes** | Frontend, Backend |
| **Labels** | mvp, backbone, navegacion |
| **Trazabilidad** | RF-004, RF-016 |

**Historia de usuario (INVEST):**

> Como usuario final, quiero abrir el detalle de una nota desde el listado, para leer su contenido completo.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Depende solo de existir listado (US-001); entrega valor aislado |
| **N**egociable | ✓ | Layout del detalle negociable (campos mostrados) |
| **V**aliosa | ✓ | Permite leer contenido completo de cada nota |
| **E**stimable | ✓ | GET /notas/:id + vista detalle |
| **S**mall (pequeña) | ✓ | Alcance acotado a lectura |
| **T**esteable | ✓ | Navegación listado → detalle verificable |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Detalle de nota

  Scenario: Abrir detalle desde el listado
    Given que estoy en el listado de notas
    And existe una nota con título "Ideas de proyecto" y contenido "Texto de la nota"
    When pulso sobre la nota "Ideas de proyecto"
    Then veo el título, contenido, enlaces y etiquetas de la nota

  Scenario: Nota no encontrada
    Given que intento acceder al detalle de una nota eliminada
    When la aplicación solicita la nota
    Then veo un mensaje informativo y regreso al listado
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-005 | [BE] Endpoint GET /notas/:id con enlaces y etiquetas | Backend | MVP | Devolver nota completa incluyendo arrays de URLs y nombres de etiquetas asociadas | 2 |
| TASK-006 | [FE] Vista NoteDetail y navegación desde listado | Frontend | MVP | Implementar pantalla de detalle y enlace desde cada ítem del listado; botón volver al listado | 3 |
| TASK-007 | [DB] Consulta JOIN notas-etiquetas-enlaces para detalle | Database | MVP | Optimizar query de detalle con relaciones many-to-many etiquetas y tabla de enlaces | 2 |
| TASK-008 | [QA] Tests navegación listado-detalle y nota inexistente | QA | MVP | Verificar flujo completo y manejo de 404 con redirección al listado | 2 |

---

#### US-003 — Estado vacío cuando no hay notas

| Campo | Valor |
|-------|-------|
| **Release** | V1 |
| **Epic** | EPIC-001 |
| **Prioridad** | Media |
| **Story Points** | 2 |
| **Componentes** | Frontend |
| **Labels** | v1, ux, empty-state |
| **Trazabilidad** | — |

**Historia de usuario (INVEST):**

> Como usuario final, quiero ver un mensaje claro cuando aún no tengo notas, para saber cómo empezar a capturar contenido.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Mejora UX del listado vacío sin bloquear otras historias |
| **N**egociable | ✓ | Texto y diseño del empty state negociables |
| **V**aliosa | ✓ | Reduce confusión en primer uso |
| **E**stimable | ✓ | Solo capa de presentación |
| **S**mall (pequeña) | ✓ | Componente UI aislado |
| **T**esteable | ✓ | Verificable con listado sin datos |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Estado vacío del listado

  Scenario: Usuario sin notas ve mensaje orientativo
    Given que no tengo ninguna nota creada
    When abro la aplicación
    Then veo un mensaje que indica que aún no hay notas
    And veo un botón o enlace "Crear nota"

  Scenario: El estado vacío no muestra pantalla en blanco
    Given que el listado de notas está vacío
    When cargo la pantalla principal
    Then no veo una pantalla completamente en blanco sin contexto
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-009 | [BE] Respuesta consistente GET /notas con array vacío | Backend | V1 | Asegurar que la API devuelve `[]` con código 200 cuando no hay notas | 1 |
| TASK-010 | [FE] Componente EmptyState con CTA "Crear nota" | Frontend | V1 | Diseñar e integrar estado vacío en NoteList con llamada a la acción hacia formulario de creación | 2 |
| TASK-011 | [DB] Sin cambios de esquema | Database | V1 | Verificar que consulta vacía no genera errores ni joins innecesarios | 1 |
| TASK-012 | [QA] Test visual y funcional del empty state | QA | V1 | Validar mensaje, CTA visible y navegación a crear nota desde estado vacío | 1 |

---

#### US-004 — Ordenar listado por fecha o título

| Campo | Valor |
|-------|-------|
| **Release** | V2+ |
| **Epic** | EPIC-001 |
| **Prioridad** | Baja |
| **Story Points** | 3 |
| **Componentes** | Frontend, Backend |
| **Labels** | v2, navegacion, ordenacion |
| **Trazabilidad** | — |

**Historia de usuario (INVEST):**

> Como usuario final, quiero ordenar el listado por fecha o título, para priorizar cómo reviso mi biblioteca.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Extensión del listado sin afectar otras fases |
| **N**egociable | ✓ | Criterios de ordenación (asc/desc) negociables |
| **V**aliosa | ✓ | Mejora exploración en bibliotecas grandes |
| **E**stimable | ✓ | Parámetro sort en API + selector UI |
| **S**mall (pequeña) | ✓ | Una funcionalidad de ordenación |
| **T**esteable | ✓ | Orden verificable con datos conocidos |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Ordenación del listado

  Scenario: Ordenar por título alfabético
    Given que tengo notas "Zebra", "Alpha" y "Beta"
    When selecciono ordenar por título
    Then el listado muestra primero "Alpha", luego "Beta" y después "Zebra"

  Scenario: El orden se mantiene en la sesión actual
    Given que he ordenado el listado por fecha descendente
    When navego al detalle de una nota y vuelvo al listado
    Then el listado sigue ordenado por fecha descendente
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-013 | [BE] Parámetro sort en GET /notas (fecha, título) | Backend | V2+ | Aceptar query params `sort=created_at|title` y `order=asc|desc` | 2 |
| TASK-014 | [FE] Selector de ordenación en barra del listado | Frontend | V2+ | Añadir dropdown con opciones fecha/título; persistir selección en estado de sesión | 2 |
| TASK-015 | [DB] Índice compuesto para ordenación por título | Database | V2+ | Crear índice en columna title para ordenación eficiente | 1 |
| TASK-016 | [QA] Tests de ordenación y persistencia en sesión | QA | V2+ | Verificar ambos criterios de orden y que persiste tras navegar detalle-listado | 2 |

---

### EPIC-002 — Capturar contenido

**Release:** MVP (historia US-007 V1)  
**Descripción:** Registrar ideas, notas y enlaces de forma rápida antes de que se pierdan.  
**Objetivo de negocio:** Minimizar la fricción de captura para que el usuario registre ideas en máximo 2 interacciones desde la pantalla principal.

---

#### US-005 — Crear nota con título y contenido

| Campo | Valor |
|-------|-------|
| **Release** | MVP |
| **Epic** | EPIC-002 |
| **Prioridad** | Alta |
| **Story Points** | 5 |
| **Componentes** | Frontend, Backend, Database |
| **Labels** | mvp, captura, crud |
| **Trazabilidad** | RF-001, RF-003, RNF-003 |

**Historia de usuario (INVEST):**

> Como usuario final, quiero crear una nota con título y contenido en máximo 2 interacciones, para capturar ideas sin fricción.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Historia núcleo de captura; no depende de etiquetas ni búsqueda |
| **N**egociable | ✓ | Número exacto de clics negociable manteniendo ≤ 2 interacciones |
| **V**aliosa | ✓ | Funcionalidad central del producto |
| **E**stimable | ✓ | POST /notas + formulario |
| **S**mall (pequeña) | ✓ | CRUD create acotado |
| **T**esteable | ✓ | Creación y validación verificables |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Creación de nota

  Scenario: Crear nota en máximo 2 interacciones
    Given que estoy en la pantalla principal
    When pulso "Nueva nota", escribo título y contenido y guardo
    Then la nota aparece en el listado con fechas de creación y actualización generadas automáticamente

  Scenario: Título o contenido vacíos impiden guardar
    Given que estoy en el formulario de nueva nota
    When dejo el título o el contenido vacío e intento guardar
    Then veo un mensaje de error de validación
    And la nota no se crea
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-017 | [BE] Endpoint POST /notas con validación título y contenido | Backend | MVP | Crear nota con validación de campos obligatorios; generar id, created_at y updated_at | 3 |
| TASK-018 | [FE] Formulario NoteForm y botón "Nueva nota" en pantalla principal | Frontend | MVP | Formulario con título y contenido; flujo accesible en ≤ 2 interacciones desde home | 3 |
| TASK-019 | [DB] Tabla notas con campos id, title, content, timestamps | Database | MVP | Migración inicial de tabla notas con constraints NOT NULL en title y content | 2 |
| TASK-020 | [QA] Tests creación, validación y métrica 2 interacciones | QA | MVP | E2E de creación exitosa, rechazo de campos vacíos y medición de interacciones | 2 |

---

#### US-006 — Añadir enlaces URL a una nota

| Campo | Valor |
|-------|-------|
| **Release** | MVP |
| **Epic** | EPIC-002 |
| **Prioridad** | Alta |
| **Story Points** | 3 |
| **Componentes** | Frontend, Backend |
| **Labels** | mvp, captura, enlaces |
| **Trazabilidad** | RF-002, RNF-008 |

**Historia de usuario (INVEST):**

> Como usuario final, quiero añadir enlaces URL a una nota, para conservar referencias junto a mis ideas.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Extiende creación/edición; valor aislado con nota existente |
| **N**egociable | ✓ | Límite de enlaces por nota negociable |
| **V**aliosa | ✓ | Conserva referencias externas junto a ideas |
| **E**stimable | ✓ | Campo URLs + validación formato |
| **S**mall (pequeña) | ✓ | Gestión de enlaces en formulario |
| **T**esteable | ✓ | URLs válidas e inválidas verificables |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Enlaces en notas

  Scenario: Añadir uno o más enlaces al crear o editar
    Given que estoy creando o editando una nota
    When añado las URLs "https://ejemplo.com" y "https://docs.org/guia"
    And guardo la nota
    Then los enlaces aparecen en el detalle de la nota como links clicables

  Scenario: URL con formato inválido es rechazada
    Given que estoy en el formulario de nota
    When introduzco "no-es-url" en el campo de enlace
    And intento guardar
    Then veo un mensaje indicando que la URL no es válida
    And la nota no se guarda hasta corregir el enlace
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-021 | [BE] Validación de URLs y persistencia de enlaces | Backend | MVP | Validar formato URL en create/update; almacenar múltiples enlaces por nota | 2 |
| TASK-022 | [FE] Campo dinámico de enlaces en NoteForm | Frontend | MVP | UI para añadir/eliminar filas de URL con feedback de error inline | 2 |
| TASK-023 | [DB] Tabla enlaces (nota_id, url) con FK a notas | Database | MVP | Esquema de enlaces one-to-many con nota; cascade delete | 2 |
| TASK-024 | [QA] Tests URLs válidas, inválidas y múltiples enlaces | QA | MVP | Casos de prueba para 0, 1 y N enlaces y rechazo de formato inválido | 2 |

---

#### US-007 — Feedback de validación sin perder datos del formulario

| Campo | Valor |
|-------|-------|
| **Release** | V1 |
| **Epic** | EPIC-002 |
| **Prioridad** | Media |
| **Story Points** | 2 |
| **Componentes** | Frontend, Backend |
| **Labels** | v1, validacion, ux |
| **Trazabilidad** | RNF-008 |

**Historia de usuario (INVEST):**

> Como usuario final, quiero recibir feedback inmediato si olvido el título o el contenido, para corregir el error sin perder lo escrito.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Mejora US-005 sin cambiar flujo base |
| **N**egociable | ✓ | Momento de validación (blur vs submit) negociable |
| **V**aliosa | ✓ | Evita frustración y reescritura |
| **E**stimable | ✓ | Validación cliente + mensajes por campo |
| **S**mall (pequeña) | ✓ | Refinamiento de formulario existente |
| **T**esteable | ✓ | Errores por campo y persistencia de datos |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Validación de formulario de nota

  Scenario: Mensaje específico por campo obligatorio vacío
    Given que estoy en el formulario con contenido escrito pero sin título
    When intento guardar
    Then veo el mensaje "El título es obligatorio" junto al campo título
    And el contenido que escribí permanece en el formulario

  Scenario: Validación en cliente y servidor
    Given que envío el formulario con campos inválidos
    When el servidor responde con error de validación
    Then veo mensajes de error claros por cada campo afectado
    And ningún dato introducido se pierde
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-025 | [BE] Respuestas 400 con detalle por campo | Backend | V1 | Estructurar errores de validación como `{ field, message }[]` en respuestas API | 2 |
| TASK-026 | [FE] Validación inline y preservación de estado del formulario | Frontend | V1 | Validar en cliente antes de submit; mantener valores en estado tras error | 2 |
| TASK-027 | [DB] Sin cambios de esquema | Database | V1 | Confirmar constraints existentes alineados con mensajes de error | 1 |
| TASK-028 | [QA] Tests validación por campo y no pérdida de datos | QA | V1 | Verificar mensajes específicos y que el formulario conserva entrada tras error | 1 |

---

### EPIC-003 — Organizar con etiquetas

**Release:** MVP (historias US-010 V1, US-011 V2+)  
**Descripción:** Clasificar el conocimiento para encontrarlo por contexto o tema.  
**Objetivo de negocio:** Permitir taxonomía flexible mediante etiquetas con creación automática y filtrado del listado por tema.

---

#### US-008 — Asignar etiquetas a una nota

| Campo | Valor |
|-------|-------|
| **Release** | MVP |
| **Epic** | EPIC-003 |
| **Prioridad** | Alta |
| **Story Points** | 5 |
| **Componentes** | Frontend, Backend, Database |
| **Labels** | mvp, etiquetas, organizacion |
| **Trazabilidad** | RF-007, RF-008, RF-009 |

**Historia de usuario (INVEST):**

> Como usuario final, quiero asignar etiquetas a una nota, para clasificar mi conocimiento por temas.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Requiere notas (US-005) pero entrega valor de clasificación aislado |
| **N**egociable | ✓ | UI de etiquetas (chips, autocomplete) negociable |
| **V**aliosa | ✓ | Organización temática es núcleo del producto |
| **E**stimable | ✓ | Modelo many-to-many + UI de tags |
| **S**mall (pequeña) | ✓ | Asignación en create/edit |
| **T**esteable | ✓ | Creación automática y unicidad verificables |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Asignación de etiquetas

  Scenario: Crear etiquetas automáticamente al escribirlas
    Given que estoy editando una nota
    When escribo la etiqueta "productividad" que no existía antes
    And guardo la nota
    Then la etiqueta "productividad" queda asociada a la nota
    And la etiqueta está disponible para otras notas

  Scenario: Varias etiquetas por nota con nombre único
    Given que asigno las etiquetas "ideas" y "urgente" a una nota
    When guardo
    Then ambas etiquetas aparecen en el detalle de la nota
    And no puedo crear dos etiquetas con el mismo nombre para mi biblioteca
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-029 | [BE] API etiquetas: creación automática y asociación M:N | Backend | MVP | POST/PUT notas acepta array de etiquetas; crear etiqueta si no existe; unicidad por nombre | 3 |
| TASK-030 | [FE] Componente TagInput con chips en formulario | Frontend | MVP | Input de etiquetas con autocompletado de existentes y creación al escribir | 3 |
| TASK-031 | [DB] Tablas etiquetas y nota_etiqueta con UNIQUE en nombre | Database | MVP | Esquema many-to-many con constraint UNIQUE(name) en etiquetas | 2 |
| TASK-032 | [QA] Tests asignación, creación automática y unicidad | QA | MVP | Verificar M:N, auto-create y rechazo de duplicados | 2 |

---

#### US-009 — Filtrar notas por etiqueta

| Campo | Valor |
|-------|-------|
| **Release** | MVP |
| **Epic** | EPIC-003 |
| **Prioridad** | Alta |
| **Story Points** | 3 |
| **Componentes** | Frontend, Backend |
| **Labels** | mvp, etiquetas, filtro |
| **Trazabilidad** | RF-011, RF-017 |

**Historia de usuario (INVEST):**

> Como usuario final, quiero filtrar mis notas por una etiqueta, para ver solo el contenido de un tema concreto.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Depende de etiquetas asignadas; valor de filtrado aislado |
| **N**egociable | ✓ | Ubicación del filtro en UI negociable |
| **V**aliosa | ✓ | Recuperación por tema sin búsqueda textual |
| **E**stimable | ✓ | Query param tag + filtro UI |
| **S**mall (pequeña) | ✓ | Un filtro por etiqueta |
| **T**esteable | ✓ | Filtrado y mensaje sin resultados |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Filtro por etiqueta

  Scenario: Filtrar listado por etiqueta seleccionada
    Given que tengo notas etiquetadas con "trabajo" y "personal"
    When selecciono la etiqueta "trabajo" en el filtro
    Then el listado muestra solo las notas con etiqueta "trabajo"

  Scenario: Etiqueta sin notas asociadas
    Given que la etiqueta "archivo" no tiene notas
    When filtro por "archivo"
    Then veo un mensaje indicando que no hay notas con esa etiqueta
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-033 | [BE] GET /notas?etiqueta=nombre con filtrado | Backend | MVP | Endpoint que filtra notas por etiqueta; respuesta vacía con metadata clara | 2 |
| TASK-034 | [FE] Panel de filtro por etiqueta en navegación | Frontend | MVP | Lista de etiquetas clicables en sidebar o barra; indicador de filtro activo | 2 |
| TASK-035 | [DB] Índice en nota_etiqueta para filtrado eficiente | Database | MVP | Índice en (etiqueta_id, nota_id) para queries de filtro < 2 s | 1 |
| TASK-036 | [QA] Tests filtro activo, sin resultados y limpieza de filtro | QA | MVP | Verificar filtrado correcto, mensaje vacío y volver a listado completo | 2 |

---

#### US-010 — Quitar etiqueta de una nota sin borrar la nota

| Campo | Valor |
|-------|-------|
| **Release** | V1 |
| **Epic** | EPIC-003 |
| **Prioridad** | Media |
| **Story Points** | 2 |
| **Componentes** | Frontend, Backend |
| **Labels** | v1, etiquetas, edicion |
| **Trazabilidad** | RF-010 |

**Historia de usuario (INVEST):**

> Como usuario final, quiero quitar una etiqueta de una nota sin borrar la nota, para reorganizar sin perder contenido.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Extiende gestión de etiquetas sin afectar captura |
| **N**egociable | ✓ | Acción quitar (X en chip vs menú) negociable |
| **V**aliosa | ✓ | Reorganización sin pérdida de contenido |
| **E**stimable | ✓ | DELETE asociación en API |
| **S**mall (pequeña) | ✓ | Una acción de desasociación |
| **T**esteable | ✓ | Nota permanece; etiqueta persiste si otras notas la usan |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Quitar etiqueta de nota

  Scenario: Desasociar etiqueta desde detalle o edición
    Given que la nota "Reunión" tiene las etiquetas "trabajo" y "urgente"
    When quito la etiqueta "urgente"
    Then la nota "Reunión" ya no muestra "urgente"
    And la nota sigue existiendo con el resto de sus datos

  Scenario: La etiqueta permanece si otras notas la usan
    Given que "trabajo" está en las notas "A" y "B"
    When quito "trabajo" solo de la nota "A"
    Then la etiqueta "trabajo" sigue existiendo
    And la nota "B" conserva la etiqueta "trabajo"
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-037 | [BE] DELETE asociación nota-etiqueta | Backend | V1 | Endpoint para eliminar relación sin borrar nota ni etiqueta huérfana si hay otras asociaciones | 2 |
| TASK-038 | [FE] Acción "quitar" en chip de etiqueta en detalle/edición | Frontend | V1 | Botón X en cada etiqueta con confirmación opcional y actualización inmediata de UI | 2 |
| TASK-039 | [DB] DELETE en nota_etiqueta sin cascade a entidades | Database | V1 | Asegurar que borrar asociación no elimina filas de notas ni etiquetas | 1 |
| TASK-040 | [QA] Tests desasociación y persistencia de etiqueta global | QA | V1 | Verificar ambos escenarios Gherkin | 1 |

---

#### US-011 — Listado de etiquetas con conteo de notas

| Campo | Valor |
|-------|-------|
| **Release** | V2+ |
| **Epic** | EPIC-003 |
| **Prioridad** | Baja |
| **Story Points** | 3 |
| **Componentes** | Frontend, Backend |
| **Labels** | v2, etiquetas, catalogo |
| **Trazabilidad** | — |

**Historia de usuario (INVEST):**

> Como usuario final, quiero ver un listado de todas mis etiquetas con conteo de notas, para entender cómo está distribuido mi conocimiento.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Vista analítica independiente del filtro básico |
| **N**egociable | ✓ | Orden del panel (alfabético, por conteo) negociable |
| **V**aliosa | ✓ | Visión global de distribución temática |
| **E**stimable | ✓ | GET /etiquetas con COUNT |
| **S**mall (pequeña) | ✓ | Panel de catálogo |
| **T**esteable | ✓ | Conteos verificables con datos conocidos |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Catálogo de etiquetas

  Scenario: Ver todas las etiquetas con número de notas
    Given que la etiqueta "ideas" tiene 5 notas y "archivo" tiene 0
    When abro el panel de etiquetas
    Then veo "ideas (5)" y "archivo (0)" en el listado

  Scenario: Navegar al filtro desde el catálogo
    Given que estoy en el panel de etiquetas
    When pulso sobre "ideas (5)"
    Then el listado de notas se filtra por la etiqueta "ideas"
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-041 | [BE] GET /etiquetas con conteo de notas asociadas | Backend | V2+ | Endpoint que devuelve `{ name, count }[]` ordenado alfabéticamente | 2 |
| TASK-042 | [FE] Panel TagCatalog con nombre y conteo | Frontend | V2+ | Vista o sidebar con listado de etiquetas y conteo; clic navega a filtro | 2 |
| TASK-043 | [DB] Query agregada COUNT por etiqueta optimizada | Database | V2+ | Vista materializada o query con GROUP BY etiqueta_id optimizada | 2 |
| TASK-044 | [QA] Tests conteos correctos y navegación a filtro | QA | V2+ | Datos de prueba con conteos conocidos y verificación de filtro | 2 |

---

### EPIC-004 — Recuperar información

**Release:** MVP (historia US-014 V1)  
**Descripción:** Localizar notas concretas mediante búsqueda y exploración de resultados.  
**Objetivo de negocio:** Permitir recuperar información olvidada mediante búsqueda textual rápida con resultados ordenables.

---

#### US-012 — Buscar notas por término de texto

| Campo | Valor |
|-------|-------|
| **Release** | MVP |
| **Epic** | EPIC-004 |
| **Prioridad** | Alta |
| **Story Points** | 5 |
| **Componentes** | Frontend, Backend, Database |
| **Labels** | mvp, busqueda, recuperacion |
| **Trazabilidad** | RF-012, RF-013, RNF-002 |

**Historia de usuario (INVEST):**

> Como usuario final, quiero buscar notas por un término de texto, para encontrar información sin recordar dónde la guardé.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Funcionalidad de búsqueda independiente del filtro por etiqueta |
| **N**egociable | ✓ | Alcance búsqueda (título+contenido) ya definido; debounce negociable |
| **V**aliosa | ✓ | Recuperación es valor central del producto |
| **E**stimable | ✓ | GET /buscar?q= + índices |
| **S**mall (pequeña) | ✓ | Búsqueda simple acotada |
| **T**esteable | ✓ | Resultados y tiempo < 300 ms medibles |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Búsqueda de notas

  Scenario: Buscar en título y contenido
    Given que tengo una nota con título "Recetas" y otra con "lista de la compra" en el contenido
    When busco "compra"
    Then veo la nota que contiene "compra" en título o contenido

  Scenario: Búsqueda responde en menos de 300 ms con hasta 500 notas
    Given que existen 500 notas en la biblioteca
    When introduzco un término de búsqueda
    Then los resultados aparecen en menos de 300 milisegundos
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-045 | [BE] Endpoint GET /buscar?q= con búsqueda en título y contenido | Backend | MVP | Implementar búsqueda LIKE/ILIKE o full-text básico en title y content | 3 |
| TASK-046 | [FE] Barra de búsqueda con resultados en tiempo real | Frontend | MVP | Input de búsqueda con debounce; listado de resultados sustituyendo o filtrando vista | 3 |
| TASK-047 | [DB] Índices en title y content para búsqueda | Database | MVP | Índices B-tree o full-text según motor; objetivo < 300 ms con 500 notas | 2 |
| TASK-048 | [QA] Tests relevancia, cobertura título/contenido y benchmark 300 ms | QA | MVP | Casos funcionales y prueba de rendimiento con dataset de 500 notas | 3 |

---

#### US-013 — Ordenar resultados de búsqueda

| Campo | Valor |
|-------|-------|
| **Release** | MVP |
| **Epic** | EPIC-004 |
| **Prioridad** | Media |
| **Story Points** | 2 |
| **Componentes** | Frontend, Backend |
| **Labels** | mvp, busqueda, ordenacion |
| **Trazabilidad** | RF-014 |

**Historia de usuario (INVEST):**

> Como usuario final, quiero ordenar los resultados de búsqueda por relevancia o fecha, para priorizar lo más útil.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Extiende US-012; puede entregarse junto o después |
| **N**egociable | ✓ | Algoritmo de relevancia simplificado negociable |
| **V**aliosa | ✓ | Prioriza resultados más útiles |
| **E**stimable | ✓ | Parámetro order en búsqueda |
| **S**mall (pequeña) | ✓ | Selector de orden en resultados |
| **T**esteable | ✓ | Orden por relevancia y fecha verificable |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Ordenación de resultados de búsqueda

  Scenario: Ordenar por relevancia
    Given que busco "proyecto" y hay coincidencias en título y solo en contenido
    When selecciono ordenar por relevancia
    Then las notas con coincidencia en el título aparecen antes que las de solo contenido

  Scenario: Ordenar por fecha
    Given que busco "nota" con múltiples resultados
    When selecciono ordenar por fecha
    Then los resultados se muestran de más reciente a más antigua
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-049 | [BE] Parámetro order=relevance|date en GET /buscar | Backend | MVP | Implementar scoring simple (título > contenido) y orden por updated_at | 2 |
| TASK-050 | [FE] Selector relevancia/fecha en vista de resultados | Frontend | MVP | Dropdown o toggle en barra de resultados de búsqueda | 2 |
| TASK-051 | [DB] Índice en updated_at para ordenación por fecha | Database | MVP | Índice para ORDER BY updated_at DESC en resultados | 1 |
| TASK-052 | [QA] Tests orden relevancia y fecha en búsqueda | QA | MVP | Dataset con coincidencias conocidas; verificar orden esperado | 2 |

---

#### US-014 — Mensaje cuando búsqueda sin resultados

| Campo | Valor |
|-------|-------|
| **Release** | V1 |
| **Epic** | EPIC-004 |
| **Prioridad** | Media |
| **Story Points** | 1 |
| **Componentes** | Frontend |
| **Labels** | v1, busqueda, ux |
| **Trazabilidad** | — |

**Historia de usuario (INVEST):**

> Como usuario final, quiero un mensaje claro cuando la búsqueda no devuelve resultados, para saber que debo probar otros términos.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Mejora UX de búsqueda sin cambiar lógica |
| **N**egociable | ✓ | Texto del mensaje negociable |
| **V**aliosa | ✓ | Evita confusión con error técnico |
| **E**stimable | ✓ | Solo presentación de estado vacío |
| **S**mall (pequeña) | ✓ | Mensaje + campo editable |
| **T**esteable | ✓ | Sin resultados muestra texto esperado |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Búsqueda sin resultados

  Scenario: Mensaje claro sin coincidencias
    Given que no existe ninguna nota con el término "xyzabc"
    When busco "xyzabc"
    Then veo el texto "Sin resultados para xyzabc"
    And no veo mensajes de error técnico

  Scenario: Campo de búsqueda permanece editable
    Given que una búsqueda no devolvió resultados
    When veo el mensaje de sin resultados
    Then el campo de búsqueda sigue visible y puedo modificar el término
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-053 | [BE] Respuesta 200 con array vacío y metadata searchTerm | Backend | V1 | Incluir término buscado en respuesta para mensaje contextual en frontend | 1 |
| TASK-054 | [FE] Componente SearchEmptyState con término dinámico | Frontend | V1 | Mostrar "Sin resultados para [término]"; mantener input activo | 1 |
| TASK-055 | [DB] Sin cambios de esquema | Database | V1 | N/A — consulta vacía ya soportada | 1 |
| TASK-056 | [QA] Test mensaje sin resultados y campo editable | QA | V1 | Verificar texto exacto y que el usuario puede reintentar búsqueda | 1 |

---

### EPIC-005 — Mantener el conocimiento

**Release:** MVP (historia US-017 V2+)  
**Descripción:** Actualizar o depurar notas obsoletas para mantener la biblioteca útil.  
**Objetivo de negocio:** Garantizar que el usuario puede mantener su biblioteca actualizada mediante edición y eliminación segura.

---

#### US-015 — Editar nota existente

| Campo | Valor |
|-------|-------|
| **Release** | MVP |
| **Epic** | EPIC-005 |
| **Prioridad** | Alta |
| **Story Points** | 3 |
| **Componentes** | Frontend, Backend |
| **Labels** | mvp, mantenimiento, crud |
| **Trazabilidad** | RF-005, RNF-001 |

**Historia de usuario (INVEST):**

> Como usuario final, quiero editar una nota existente, para mantener mi información actualizada.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Depende de nota existente; valor de actualización aislado |
| **N**egociable | ✓ | Modo edición (inline vs formulario) negociable |
| **V**aliosa | ✓ | Mantenimiento es parte del ciclo CRUD |
| **E**stimable | ✓ | PUT /notas/:id |
| **S**mall (pequeña) | ✓ | Update acotado |
| **T**esteable | ✓ | Campos editables y updated_at verificables |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Edición de nota

  Scenario: Editar todos los campos y actualizar fecha de modificación
    Given que abro el detalle de una nota existente
    When modifico título, contenido, enlaces o etiquetas y guardo
    Then los cambios se reflejan en el detalle
    And la fecha de última actualización se refresca automáticamente

  Scenario: Respuesta de guardado en menos de 2 segundos
    Given que edito una nota y guardo
    When la operación completa
    Then el guardado responde en menos de 2 segundos en condiciones normales
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-057 | [BE] Endpoint PUT /notas/:id con actualización de updated_at | Backend | MVP | Actualizar todos los campos; refrescar updated_at automáticamente | 2 |
| TASK-058 | [FE] Modo edición en NoteDetail reutilizando NoteForm | Frontend | MVP | Botón editar; formulario pre-rellenado; guardar y volver a vista lectura | 3 |
| TASK-059 | [DB] Trigger o lógica de updated_at en UPDATE | Database | MVP | Asegurar updated_at se actualiza en cada modificación | 1 |
| TASK-060 | [QA] Tests edición campos, timestamp y tiempo respuesta | QA | MVP | Verificar todos los campos editables y SLA < 2 s | 2 |

---

#### US-016 — Eliminar nota permanentemente

| Campo | Valor |
|-------|-------|
| **Release** | MVP |
| **Epic** | EPIC-005 |
| **Prioridad** | Alta |
| **Story Points** | 2 |
| **Componentes** | Frontend, Backend |
| **Labels** | mvp, mantenimiento, crud |
| **Trazabilidad** | RF-006 |

**Historia de usuario (INVEST):**

> Como usuario final, quiero eliminar una nota permanentemente, para depurar contenido obsoleto.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Acción destructiva aislada con confirmación |
| **N**egociable | ✓ | Texto de confirmación negociable |
| **V**aliosa | ✓ | Depuración de biblioteca obsoleta |
| **E**stimable | ✓ | DELETE /notas/:id + modal |
| **S**mall (pequeña) | ✓ | Una operación de borrado |
| **T**esteable | ✓ | Confirmación y desaparición del listado |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Eliminación de nota

  Scenario: Eliminar con confirmación previa
    Given que estoy en el detalle de una nota
    When pulso eliminar y confirmo la acción en el diálogo
    Then la nota desaparece del listado
    And no puedo recuperar la nota eliminada

  Scenario: Cancelar eliminación mantiene la nota
    Given que pulso eliminar en una nota
    When cancelo en el diálogo de confirmación
    Then la nota permanece sin cambios
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-061 | [BE] Endpoint DELETE /notas/:id irreversible | Backend | MVP | Eliminar nota y cascada a enlaces y asociaciones etiqueta; sin soft-delete | 2 |
| TASK-062 | [FE] Botón eliminar con modal de confirmación | Frontend | MVP | Acción en detalle; diálogo "¿Eliminar permanentemente?"; redirección al listado | 2 |
| TASK-063 | [DB] ON DELETE CASCADE en enlaces y nota_etiqueta | Database | MVP | Configurar FK con cascade para limpieza de relaciones al borrar nota | 1 |
| TASK-064 | [QA] Tests eliminación, confirmación y cancelación | QA | MVP | Verificar borrado irreversible y flujo de cancelación | 2 |

---

#### US-017 — Enlazar nota con otra (backlink)

| Campo | Valor |
|-------|-------|
| **Release** | V2+ |
| **Epic** | EPIC-005 |
| **Prioridad** | Baja |
| **Story Points** | 8 |
| **Componentes** | Frontend, Backend, Database |
| **Labels** | v2, backlinks, evolucion |
| **Trazabilidad** | PRD §8 Futuro |

**Historia de usuario (INVEST):**

> Como usuario final, quiero enlazar una nota con otra (backlink), para navegar relaciones entre ideas.

**Checklist INVEST:**

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ✓ | Nueva capacidad fuera de MVP; no bloquea entregas previas |
| **N**egociable | ✓ | Sintaxis de enlace ([[nota]]) negociable |
| **V**aliosa | ✓ | Navegación entre ideas relacionadas |
| **E**stimable | ✓ | Modelo de backlinks + UI; mayor incertidumbre → 8 SP |
| **S**mall (pequeña) | ✓ | Alcance acotado a crear referencia y ver backlinks entrantes |
| **T**esteable | ✓ | Creación y visualización bidireccional verificables |

**Criterios de aceptación (Gherkin):**

```gherkin
Feature: Backlinks entre notas

  Scenario: Crear referencia a otra nota
    Given que estoy editando la nota "Ideas de proyecto"
    When añado un enlace a la nota "Investigación de mercado"
    And guardo
    Then en "Ideas de proyecto" veo el enlace clicable hacia "Investigación de mercado"

  Scenario: Ver notas que enlazan a la actual
    Given que "Plan Q3" enlaza a "Objetivos anuales"
    When abro el detalle de "Objetivos anuales"
    Then veo una sección "Notas que enlazan aquí" con "Plan Q3"
```

**Tasks:**

| ID | Task | Tipo | Release | Descripción | Estimación |
|----|------|------|---------|-------------|------------|
| TASK-065 | [BE] API backlinks: crear referencia y listar entrantes | Backend | V2+ | Modelo nota_nota; endpoints para crear enlace y GET backlinks de una nota | 5 |
| TASK-066 | [FE] UI de enlace a nota y panel de backlinks entrantes | Frontend | V2+ | Selector de nota destino en edición; sección backlinks en detalle | 5 |
| TASK-067 | [DB] Tabla nota_backlink (origen_id, destino_id) | Database | V2+ | Esquema bidireccional con índices en origen y destino | 3 |
| TASK-068 | [QA] Tests creación enlace y visualización backlinks | QA | V2+ | E2E de enlace saliente y panel de entrantes | 3 |

---

## 4. Vista por release

### Release MVP — Captura, organización y recuperación básica

| Epic | Story | Tasks | Story Points |
|------|-------|-------|--------------|
| EPIC-001 | US-001 | TASK-001, TASK-002, TASK-003, TASK-004 | 3 |
| EPIC-001 | US-002 | TASK-005, TASK-006, TASK-007, TASK-008 | 3 |
| EPIC-002 | US-005 | TASK-017, TASK-018, TASK-019, TASK-020 | 5 |
| EPIC-002 | US-006 | TASK-021, TASK-022, TASK-023, TASK-024 | 3 |
| EPIC-003 | US-008 | TASK-029, TASK-030, TASK-031, TASK-032 | 5 |
| EPIC-003 | US-009 | TASK-033, TASK-034, TASK-035, TASK-036 | 3 |
| EPIC-004 | US-012 | TASK-045, TASK-046, TASK-047, TASK-048 | 5 |
| EPIC-004 | US-013 | TASK-049, TASK-050, TASK-051, TASK-052 | 2 |
| EPIC-005 | US-015 | TASK-057, TASK-058, TASK-059, TASK-060 | 3 |
| EPIC-005 | US-016 | TASK-061, TASK-062, TASK-063, TASK-064 | 2 |

**Entregable del release:** El usuario abre la app, ve sus notas, crea una nueva con enlaces opcionales, la etiqueta, la busca, la edita y la elimina si lo necesita. Cubre el ciclo completo capturar → organizar → recuperar → mantener y los casos de uso CU-001 a CU-006 del PRD.

---

### Release V1 — Pulido de experiencia

| Epic | Story | Tasks | Story Points |
|------|-------|-------|--------------|
| EPIC-001 | US-003 | TASK-009, TASK-010, TASK-011, TASK-012 | 2 |
| EPIC-002 | US-007 | TASK-025, TASK-026, TASK-027, TASK-028 | 2 |
| EPIC-003 | US-010 | TASK-037, TASK-038, TASK-039, TASK-040 | 2 |
| EPIC-004 | US-014 | TASK-053, TASK-054, TASK-055, TASK-056 | 1 |

**Entregable del release:** Mejora la experiencia en estados vacíos, validación de formularios, gestión fina de etiquetas y feedback de búsqueda sin ampliar el alcance funcional del núcleo.

---

### Release V2+ — Evolución del producto

| Epic | Story | Tasks | Story Points |
|------|-------|-------|--------------|
| EPIC-001 | US-004 | TASK-013, TASK-014, TASK-015, TASK-016 | 3 |
| EPIC-003 | US-011 | TASK-041, TASK-042, TASK-043, TASK-044 | 3 |
| EPIC-005 | US-017 | TASK-065, TASK-066, TASK-067, TASK-068 | 8 |

**Entregable del release:** Ordenación avanzada del listado, catálogo de etiquetas con conteo, backlinks entre notas y base para evoluciones futuras del PRD (grafo, plugins, multi-usuario).

---

## 5. Dependencias entre historias

| Historia | Depende de | Tipo | Motivo |
|----------|------------|------|--------|
| US-002 | US-001 | Blocks | Requiere listado para seleccionar nota y navegar al detalle |
| US-003 | US-001 | Relates | Mejora el estado vacío del listado existente |
| US-004 | US-001 | Relates | Extiende ordenación sobre el listado base |
| US-006 | US-005 | Relates | Los enlaces se añaden al crear o editar notas |
| US-007 | US-005 | Relates | Refina validación del formulario de creación |
| US-008 | US-005 | Blocks | Las etiquetas se asignan a notas existentes |
| US-009 | US-008 | Blocks | El filtro requiere etiquetas asignadas previamente |
| US-010 | US-008 | Relates | Quitar etiqueta extiende la asignación |
| US-011 | US-008, US-009 | Relates | El catálogo agrega conteo sobre etiquetas y filtro |
| US-013 | US-012 | Relates | La ordenación aplica sobre resultados de búsqueda |
| US-014 | US-012 | Relates | Mensaje de sin resultados en flujo de búsqueda |
| US-015 | US-002 | Blocks | La edición parte del detalle de nota existente |
| US-016 | US-002 | Relates | La eliminación se accede desde detalle o listado |
| US-017 | US-002, US-015 | Blocks | Backlinks requieren notas existentes y capacidad de edición |

---

## 6. Importación en Jira

### 6.1 Campos recomendados en Jira

| Campo Jira | Epic | Story | Task |
|------------|------|-------|------|
| Issue Type | Epic | Story | Task |
| Summary | Nombre épica | Título historia | Título task |
| Description | Objetivo + alcance | Historia + contexto | Descripción técnica |
| Epic Link | — | EPIC-XXX | — |
| Parent | — | — | US-XXX |
| Fix Version / Release | MVP / V1 / V2+ | MVP / V1 / V2+ | MVP / V1 / V2+ |
| Priority | High / Medium / Low | High / Medium / Low | Medium |
| Labels | backbone, release | invest, gherkin, release | backend, frontend, db, qa |
| Story Points | — | N | N (opcional) |
| Acceptance Criteria | — | Bloque Gherkin | — |
| Components | OKC-Core | OKC-Core | Backend / Frontend / Database / QA |

### 6.2 CSV para importación masiva

> Archivo complementario: `roadmap_jira_import_v1.csv`  
> Importar en Jira: **Settings → System → External System Import → CSV**

```csv
Issue Type,Summary,Description,Epic Link,Parent,Fix Version,Priority,Story Points,Labels,Acceptance Criteria,Components
Epic,[EPIC] Acceder y navegar,Orientarse en biblioteca personal y abrir contenido,,,MVP,High,,epic;mvp;backbone,,
Epic,[EPIC] Capturar contenido,Registrar ideas notas y enlaces rapidamente,,,MVP,High,,epic;mvp;backbone,,
Epic,[EPIC] Organizar con etiquetas,Clasificar conocimiento por contexto o tema,,,MVP,High,,epic;mvp;backbone,,
Epic,[EPIC] Recuperar informacion,Localizar notas mediante busqueda,,,MVP,High,,epic;mvp;backbone,,
Epic,[EPIC] Mantener el conocimiento,Actualizar o depurar notas obsoletas,,,MVP,High,,epic;mvp;backbone,,
Story,[US-001] Como usuario final quiero ver listado de notas,Como usuario final quiero ver un listado de todas mis notas para orientarme,EPIC-001,,MVP,High,3,invest;mvp;gherkin,"Feature: Listado de notas",OKC-Core
Task,[TASK] BE Endpoint GET /notas,,,US-001,MVP,Medium,2,backend;mvp,,Backend
```

> **Nota:** El CSV completo con las 90 filas (5 épicas + 17 historias + 68 tasks) está en `docs/product/roadmap/exports/roadmap-jira-import-v1.csv`.

### 6.3 Convenciones de nomenclatura

- **Epic:** `[EPIC] {nombre_fase_backbone}`
- **Story:** `[US-XXX] Como {persona}, quiero {acción}`
- **Task:** `[TASK] {BE|FE|DB|QA} — {acción técnica concreta}`
- **Release (Fix Version):** `MVP` | `V1` | `V2+`
- **Proyecto Jira:** `OKC`

---

## 7. Assumptions

- Un único usuario por instancia; sin autenticación en MVP (PRD §4).
- Interfaz en español y acceso vía navegador web moderno (PRD §4, RNF-007).
- Volumen de datos < 1 000 notas; búsqueda con mecanismo estándar de BD es suficiente (PRD §4).
- Los enlaces se almacenan como URL sin comprobar si el recurso remoto está activo (PRD §4).

---

## 8. Risks

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Scope creep: incluir backlinks o grafo en MVP | Retraso y sobreingeniería | Historias US-017 y V2+ explícitamente fuera del slice MVP; alineado con PRD §8 |
| Búsqueda insatisfactoria con SQL básico | Usuarios no recuperan notas | US-012/US-013 con criterios medibles; índices en título/contenido; evaluar full-text en V1 |
| MVP demasiado grande (10 historias) | Retraso en entrega | Slice vertical ya definido; historias INVEST y pequeñas; V1 para pulido UX |
| Confundir tareas técnicas con historias de usuario | Mapa poco útil para negocio | Todas las historias redactadas desde perspectiva del usuario final; tasks técnicas separadas |

---

*Generado con el agente Roadmap Generator a partir de `docs/product/user-story-map/user-story-map-v1.md` y `knowledge/templates/product/roadmap_template.md`.*
