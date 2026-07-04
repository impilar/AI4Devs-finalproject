# ADR-0001: Monolito modular en capas

- **Estado:** Aceptado
- **Fecha:** 2026-06-12

## Contexto

El MVP es una aplicación single-user con CRUD de notas, etiquetas y búsqueda simple. Se necesita un diseño que permita desarrollo rápido, despliegue simple y evolución futura sin reescritura del núcleo.

## Decisión

Adoptar un **monolito modular en capas** con patrón `routes → controllers → services → repositories → Prisma → PostgreSQL`.

## Consecuencias

**Positivas:**
- Un solo despliegue de backend
- Separación clara de responsabilidades
- Frontend desacoplado vía API REST

**Negativas:**
- Escalado horizontal limitado en MVP
- Sin aislamiento por dominio a nivel de proceso

## Alternativas consideradas

- **Microservicios:** descartados por overhead operativo injustificado para < 1 000 notas y un solo usuario.
