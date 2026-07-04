# Estrategia de pruebas

> Documentación viva — `docs/qa/`

## Pirámide de tests

| Nivel | Herramienta | Ubicación | Alcance |
|-------|-------------|-----------|---------|
| Unitarios | Vitest | `src/**/*.test.ts` | Services, validadores Zod |
| Integración | Vitest + Supertest | `tests/integration/` | API + PostgreSQL |
| E2E | Playwright | `tests/e2e/` | Flujos Gherkin US-001–US-016 |
| Rendimiento | k6 | `tests/performance/` | Búsqueda < 300 ms / 500 notas |
| Contrato | *(futuro)* | `tests/contract/` | OpenAPI |

## Criterios de aceptación

Basados en escenarios Gherkin de `docs/product/roadmap/roadmap-v1.md`.

## Reglas

Ver `.cursor/rules/05-testing-rules.mdc`.

## Estado

Pendiente de implementación — generar casos al iniciar `src/`.
