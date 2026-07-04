# 📋 Especificación de Requisitos
## Sistema: Organizador de Conocimiento (Notion Simplificado)

---

## 1. 🧾 Propósito del sistema

El sistema debe permitir a un usuario almacenar, organizar y recuperar información personal de forma eficiente mediante un conjunto mínimo de funcionalidades relacionadas con notas, enlaces e ideas.

---

## 2. 🧩 Alcance funcional

El sistema cubrirá las siguientes capacidades en su primera versión (MVP):
- Gestión de notas
- Clasificación mediante etiquetas
- Búsqueda simple de contenido

El sistema debe estar diseñado para permitir futuras extensiones sin modificaciones significativas en su arquitectura.

---

## 3. 📌 Entidades del sistema

### 3.1 Nota
Unidad principal de información.

Atributos obligatorios:
- Identificador único
- Título
- Contenido textual
- Fecha de creación
- Fecha de última actualización

Atributos opcionales:
- Lista de enlaces (URLs)
- Lista de etiquetas asociadas

---

### 3.2 Etiqueta (Tag)
Elemento de categorización.

Atributos:
- Identificador único
- Nombre

Restricciones:
- El nombre debe ser único por usuario

---

### 3.3 Relación Nota-Etiqueta
Relación many-to-many entre notas y etiquetas.

---

## 4. ⚙️ Requisitos funcionales

### 4.1 Gestión de notas (CRUD)

El sistema deberá permitir:

#### 4.1.1 Crear nota
- El usuario podrá crear una nota proporcionando:
  - título (obligatorio)
  - contenido (obligatorio)
  - etiquetas (opcional)
  - enlaces (opcional)

#### 4.1.2 Leer nota
- El usuario podrá visualizar el contenido completo de una nota

#### 4.1.3 Actualizar nota
- El usuario podrá modificar cualquiera de los campos
- La fecha de modificación debe actualizarse automáticamente

#### 4.1.4 Eliminar nota
- El usuario podrá eliminar una nota permanentemente

---

### 4.2 Gestión de etiquetas

El sistema deberá permitir:
- Crear etiquetas automáticamente al asignarlas
- Asociar múltiples etiquetas a una nota
- Eliminar asociaciones entre notas y etiquetas
- Consultar notas filtradas por etiqueta

---

### 4.3 Búsqueda

El sistema deberá permitir:

#### 4.3.1 Búsqueda por texto
- Buscar términos dentro del título
- Buscar términos dentro del contenido

#### 4.3.2 Resultados
- Mostrar lista de notas que coincidan
- Ordenar resultados por relevancia o fecha

---

### 4.4 Navegación

El sistema deberá proporcionar:
- Listado de notas
- Acceso a detalle de nota
- Filtro por etiqueta

---

## 5. 🚦 Requisitos no funcionales

### 5.1 Rendimiento
- Tiempo de respuesta inferior a 2 segundos en operaciones básicas
- Búsqueda ejecutada en menos de 300ms en colecciones pequeñas

### 5.2 Usabilidad
- Interfaz simple
- Flujo de creación de notas en máximo 2 interacciones

### 5.3 Persistencia
- Almacenamiento permanente de datos
- Consistencia tras recarga de la aplicación

### 5.4 Escalabilidad
- Separación frontend/backend
- Modelo de datos extensible

---

## 6. 🔮 Requisitos de evolución (no MVP)

El sistema deberá poder ampliarse con:

### 6.1 Backlinks
- Relacionar notas entre sí
- Navegación bidireccional

### 6.2 Grafo de conocimiento
- Representación visual de relaciones

### 6.3 Sistema de plugins
- Mecanismo para añadir funcionalidades sin modificar el núcleo

---

## 7. 📐 Restricciones técnicas

- Arquitectura modular
- Uso de API para acceso a datos
- Independencia de la capa de presentación

---

## 8. ✅ Criterios de aceptación

El sistema se considerará válido cuando:

- Se puedan crear, editar y eliminar notas correctamente
- Se puedan asignar y filtrar etiquetas
- La búsqueda devuelva resultados relevantes
- No existan errores críticos de funcionamiento

---

## 9. 🧠 Consideraciones de diseño

- Minimizar complejidad
- Priorizar claridad sobre flexibilidad excesiva
- Diseñar datos pensando en extensibilidad futura

---

## 10. 📎 Notas finales

Este documento define requisitos formales independientes de implementación. Su objetivo es servir como base para diseño técnico, PRD y desarrollo.
