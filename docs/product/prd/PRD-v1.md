# Organizador de Conocimiento (Notion Simplificado)

## 1. Resumen Ejecutivo

Aplicación web minimalista que permite a un usuario almacenar, organizar y recuperar información personal —notas, enlaces e ideas— mediante un conjunto reducido de funcionalidades: CRUD de notas, clasificación por etiquetas y búsqueda simple. El MVP prioriza simplicidad y velocidad de captura sobre funcionalidades avanzadas, con una arquitectura modular preparada para evolucionar sin reescritura del núcleo.

---

## 2. Contexto y Objetivos

### Contexto

Los usuarios dispersan información personal en múltiples herramientas (notas del móvil, marcadores, documentos sueltos) sin un sistema unificado y ligero para organizarla y recuperarla. Soluciones como Notion u Obsidian ofrecen potencia pero introducen complejidad innecesaria para quien solo necesita capturar conocimiento y encontrarlo rápidamente. Este producto cubre esa necesidad con un enfoque minimalista, centrado en notas, enlaces y etiquetas.

### Objetivos

- Entregar un MVP funcional con CRUD de notas, etiquetas y búsqueda simple que cumpla los criterios de aceptación definidos.
- Garantizar una experiencia de captura ágil: creación de nota en máximo 2 interacciones desde la pantalla principal.
- Diseñar una arquitectura modular (frontend/backend desacoplados, API REST, modelo extensible) que permita extensiones futuras sin modificaciones significativas del núcleo.

---

## 3. Usuarios y Casos de Uso

### 3.1 Roles y Usuarios

| Rol | Descripción |
|-----|------------|
| Usuario final | Persona que utiliza la aplicación de forma individual para capturar, organizar y recuperar notas, enlaces e ideas personales. |
| Administrador de instancia (futuro) | Rol no incluido en MVP; reservado para gestión de despliegue y configuración en iteraciones posteriores. |

---

### 3.2 Casos de Uso

| ID | Descripción | Flujo de Éxito | Flujo de Excepción |
|----|-------------|----------------|--------------------|
| CU-001 | Crear una nueva nota | Usuario pulsa "Nueva nota", introduce título y contenido (obligatorios), opcionalmente añade enlaces y etiquetas, guarda; el sistema persiste la nota con fechas de creación y actualización. | Título o contenido vacíos: el sistema muestra error de validación y no guarda. Error de persistencia: mensaje de error y nota no creada. |
| CU-002 | Editar una nota existente | Usuario abre el detalle, modifica campos deseados y guarda; el sistema actualiza la nota y refresca automáticamente la fecha de modificación. | Nota no encontrada: mensaje informativo. Error de validación o persistencia: cambios no guardados con feedback al usuario. |
| CU-003 | Eliminar una nota | Usuario selecciona eliminar desde el detalle o listado, confirma la acción; el sistema elimina la nota permanentemente y actualiza el listado. | Nota no encontrada: mensaje informativo. Error de persistencia: nota no eliminada, mensaje de error. |
| CU-004 | Asignar y filtrar por etiquetas | Usuario asigna una o más etiquetas a una nota (creación automática si no existen); posteriormente filtra el listado por una etiqueta y ve solo las notas asociadas. | Etiqueta duplicada con distinto formato: el sistema normaliza o rechaza según reglas de unicidad. Sin notas para la etiqueta: listado vacío con mensaje claro. |
| CU-005 | Buscar notas por texto | Usuario introduce un término en el buscador; el sistema busca en título y contenido y muestra resultados ordenables por relevancia o fecha. | Sin coincidencias: listado vacío con mensaje "sin resultados". Error de búsqueda: mensaje de error y reintento posible. |
| CU-006 | Navegar entre listado y detalle | Usuario accede al listado de notas, selecciona una y visualiza su contenido completo; puede volver al listado manteniendo filtros activos. | Nota eliminada concurrentemente: redirección al listado con aviso. |

---

## 4. Alcance y Supuestos

### Alcance

- CRUD completo de notas (título, contenido, enlaces opcionales, fechas automáticas).
- Gestión de etiquetas: creación automática al asignar, asociación many-to-many, filtrado por etiqueta.
- Búsqueda simple por término en título y contenido, con ordenación por relevancia o fecha.
- Navegación: listado de notas, vista de detalle y filtro por etiqueta.
- Persistencia permanente con consistencia tras recarga de la aplicación.
- Arquitectura frontend/backend separada con acceso a datos vía API.

### Supuestos

- MVP orientado a un único usuario por instancia (sin autenticación multi-usuario).
- Acceso mediante navegador web en entorno local o despliegue simple.
- Volumen de datos pequeño/mediano (< 1 000 notas); búsqueda con mecanismo estándar de base de datos es suficiente.
- Los enlaces se almacenan como URLs sin validación de disponibilidad del recurso remoto.
- Interfaz en español para el alcance del proyecto académico.

---

## 5. Requisitos Funcionales (RF)

| ID | Descripción |
|----|-------------|
| RF-001 | El sistema debe permitir crear una nota con título (obligatorio) y contenido textual (obligatorio). |
| RF-002 | El sistema debe permitir añadir enlaces (URLs) y etiquetas opcionales al crear o editar una nota. |
| RF-003 | Cada nota debe tener un identificador único, fecha de creación y fecha de última actualización generadas automáticamente. |
| RF-004 | El usuario debe poder visualizar el contenido completo de una nota en vista de detalle. |
| RF-005 | El usuario debe poder modificar cualquier campo de una nota existente; la fecha de actualización se refresca automáticamente al guardar. |
| RF-006 | El usuario debe poder eliminar una nota de forma permanente. |
| RF-007 | El sistema debe crear etiquetas automáticamente cuando el usuario las asigna por primera vez. |
| RF-008 | Una nota puede tener múltiples etiquetas y una etiqueta puede asociarse a múltiples notas (relación many-to-many). |
| RF-009 | El nombre de cada etiqueta debe ser único por usuario. |
| RF-010 | El usuario debe poder eliminar la asociación entre una nota y una etiqueta. |
| RF-011 | El usuario debe poder consultar notas filtradas por una etiqueta concreta. |
| RF-012 | El sistema debe buscar términos dentro del título de las notas. |
| RF-013 | El sistema debe buscar términos dentro del contenido de las notas. |
| RF-014 | Los resultados de búsqueda deben mostrarse en lista y poder ordenarse por relevancia o por fecha. |
| RF-015 | El sistema debe mostrar un listado de todas las notas del usuario. |
| RF-016 | Desde el listado, el usuario debe poder acceder al detalle de cada nota. |
| RF-017 | El sistema debe ofrecer filtro por etiqueta desde la interfaz de navegación. |

---

## 6. Requisitos No Funcionales (RNF)

| ID | Descripción |
|----|-------------|
| RNF-001 | Las operaciones CRUD básicas deben responder en menos de 2 segundos en condiciones normales de uso. |
| RNF-002 | La búsqueda debe ejecutarse en menos de 300 ms en colecciones pequeñas (< 500 notas). |
| RNF-003 | La interfaz debe ser simple y permitir crear una nota en máximo 2 interacciones desde la pantalla principal. |
| RNF-004 | Los datos deben persistir de forma permanente y mantenerse consistentes tras recargar la aplicación. |
| RNF-005 | La arquitectura debe separar frontend y backend con modelo de datos extensible. |
| RNF-006 | El acceso a datos debe realizarse exclusivamente a través de una API, independiente de la capa de presentación. |
| RNF-007 | La aplicación debe ser compatible con navegadores modernos (Chrome, Firefox, Safari — últimas 2 versiones). |
| RNF-008 | El sistema debe validar entradas obligatorias (título y contenido no vacíos) y rechazar URLs con formato inválido. |

---

## 7. Arquitectura / Consideraciones Técnicas (Opcional)

- **Arquitectura modular:** Separación en capa de presentación (frontend), capa de API (backend) y capa de persistencia (base de datos).
- **API REST:** Endpoints para notas, etiquetas y búsqueda; contrato estable para desacoplar frontend y backend.
- **Modelo de datos extensible:** Entidades `Nota`, `Etiqueta` y relación `Nota-Etiqueta` (many-to-many) diseñadas para incorporar futuras entidades (backlinks, plugins) sin romper el esquema base.
- **Independencia de presentación:** El frontend consume la API sin acceso directo a la base de datos.
- **Principio de simplicidad:** Minimizar complejidad en MVP; priorizar claridad sobre flexibilidad excesiva en la capa de UI.

---

## 8. Roadmap / Evolución

### MVP

- CRUD de notas con título, contenido, enlaces y fechas automáticas.
- Etiquetas con creación automática, asociación many-to-many y filtrado.
- Búsqueda simple por texto en título y contenido con ordenación.
- Navegación: listado, detalle y filtro por etiqueta.
- Persistencia permanente y arquitectura frontend/backend con API.

### Futuro

- **Backlinks:** Relacionar notas entre sí con navegación bidireccional.
- **Grafo de conocimiento:** Representación visual de relaciones entre notas.
- **Sistema de plugins:** Mecanismo para añadir funcionalidades sin modificar el núcleo.
- Autenticación y soporte multi-usuario.
- Búsqueda full-text avanzada para colecciones grandes.
- Importación/exportación (Markdown, formatos externos).

---

## 9. Riesgos

- **Scope creep hacia funcionalidades futuras (backlinks, grafo):** Retraso del MVP y sobreingeniería. *Mitigación:* Delimitar estrictamente el alcance MVP; documentar evolución solo en sección Futuro.
- **Búsqueda insatisfactoria con mecanismos SQL básicos:** Usuarios no encuentran notas relevantes. *Mitigación:* Índices en título/contenido; casos de prueba con datos reales; evaluar full-text en v1.1.
- **Pérdida de datos por fallos de persistencia:** Pérdida de confianza del usuario. *Mitigación:* Tests de integración; transacciones en BD; estrategia de backup en despliegue.
- **Modelo de datos rígido:** Coste alto de extensión futura. *Mitigación:* Diseñar entidades desacopladas y API versionable desde el inicio.
- **Despliegue público sin autenticación:** Exposición de datos personales. *Mitigación:* Documentar como limitación del MVP; planificar auth en iteración posterior.

---

## 10. Métricas de Éxito

- **Criterio de aceptación funcional:** Crear, editar y eliminar notas correctamente; asignar y filtrar etiquetas; búsqueda con resultados relevantes; cero errores críticos en flujos principales.
- **Tiempo de respuesta CRUD:** < 2 segundos en el 95 % de las operaciones básicas medidas en entorno de prueba.
- **Tiempo de búsqueda:** < 300 ms en colecciones de hasta 500 notas.
- **Usabilidad de captura:** Creación de nota completada en ≤ 2 interacciones desde pantalla principal (validado en test de usabilidad).
- **Persistencia:** 0 pérdidas de datos tras recarga de aplicación o reinicio del servidor (validado con tests de integración).

---

*Generado con el agente PRD Generator a partir de `knowledge/business-context.md` y `knowledge/templates/product/prd_template.md`.*
