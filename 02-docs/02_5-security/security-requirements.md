# Requisitos de seguridad

> Documentación viva — `02-docs/02_5-security/`

## MVP (single-user)

| Control | Implementación | Estado |
|---------|----------------|--------|
| Autenticación | No implementada — ADR-003 | Documentado |
| Validación entrada | Zod + HTML5/JS | Planificado |
| XSS | React escape; sin `dangerouslySetInnerHTML` | Planificado |
| CORS | Por entorno | Planificado |
| HTTPS | Reverse proxy en prod | Recomendado |

## Fuera del MVP

- OAuth / SSO (V2+)
- Threat model formal (`threat-model.md`)
- Auditoría de dependencias (CI)

## Reglas

Ver `.cursor/rules/04-security-rules.mdc` y skill `security-review.md`.
