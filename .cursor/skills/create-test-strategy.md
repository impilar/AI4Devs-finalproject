# Skill: create-test-strategy

Define la estrategia de pruebas del proyecto.

## Output

`docs/qa/test-strategy.md`

## Contenido mínimo

| Tipo | Herramienta | Alcance |
|------|-------------|---------|
| Unitarios | Vitest | Services, Zod |
| Integración | Vitest + Supertest | API + PostgreSQL |
| E2E | Playwright | Gherkin US-001–US-016 |
| Rendimiento | k6 | Búsqueda < 300 ms / 500 notas |

## Regla

Ver `.cursor/rules/05-testing-rules.mdc`.

## Agente

`.cursor/agents/qa-engineer.md` *(stub)*
