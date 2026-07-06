# ADR-0002: PostgreSQL + Prisma como persistencia

- **Estado:** Aceptado
- **Fecha:** 2026-06-12

## Contexto

El modelo incluye relaciones M:N (notas ↔ etiquetas), unicidad de etiquetas, búsqueda en título/contenido y necesidad de migraciones versionadas.

## Decisión

Usar **PostgreSQL 16** con **Prisma 5** como ORM y sistema de migraciones.

## Consecuencias

**Positivas:**
- Tipado fuerte en TypeScript
- Migraciones versionadas y reproducibles
- ACID y soporte para índices de búsqueda

**Negativas:**
- Dependencia de runtime Node para acceso a datos
- Curva de aprendizaje de Prisma para el equipo

## Alternativas consideradas

- **SQLite:** descartado por limitaciones en concurrencia y tipos avanzados.
- **MongoDB:** descartado por relaciones M:N y necesidad de integridad referencial.
