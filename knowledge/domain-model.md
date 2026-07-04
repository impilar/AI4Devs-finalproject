# Modelo de dominio (conceptual)

Vista estática del dominio del Organizador de Conocimiento. Para el modelo lógico/físico versionado, ver [`docs/architecture/data-model/`](../docs/architecture/data-model/).

## Entidades

### Nota

Unidad principal de información personal.

| Atributo | Obligatorio | Descripción |
|----------|-------------|-------------|
| id | Sí | Identificador único |
| título | Sí | Texto breve para listados y búsqueda |
| contenido | Sí | Cuerpo de la nota |
| createdAt | Sí | Fecha de creación |
| updatedAt | Sí | Fecha de última modificación |
| enlaces | No | URLs asociadas |
| etiquetas | No | Clasificación temática |

### Etiqueta

Elemento de categorización many-to-many con notas.

| Atributo | Obligatorio | Descripción |
|----------|-------------|-------------|
| id | Sí | Identificador único |
| nombre | Sí | Único en el sistema (MVP single-user) |

### Enlace

URL asociada a una nota (1:N desde Nota).

## Relaciones

```
Nota 1 ──< Enlace
Nota >──< Etiqueta   (vía asociación Nota-Etiqueta)
```

## Fuera del MVP (evolución)

- **Backlink** — relación bidireccional entre notas
- **Nodo de grafo** — representación visual de relaciones
- **Plugin** — extensión del núcleo sin modificarlo
