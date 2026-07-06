# ADR-0003: Sin autenticación en MVP

- **Estado:** Aceptado
- **Fecha:** 2026-06-12

## Contexto

El producto apunta a un usuario individual que gestiona conocimiento personal. El MVP debe priorizar captura rápida y simplicidad sobre gestión de identidades.

## Decisión

No implementar autenticación ni multi-usuario en el MVP. Cada instancia desplegada es single-user.

## Consecuencias

**Positivas:**
- Menor complejidad de desarrollo y despliegue
- Sin gestión de sesiones, tokens ni permisos

**Negativas:**
- No apto para uso compartido o multi-tenant
- Debe documentarse como limitación conocida

## Alternativas consideradas

- **Auth básica (JWT):** pospuesta a V2+ junto con multi-usuario.
