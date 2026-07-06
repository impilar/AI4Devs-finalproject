# Secciones de enriquecimiento — User Story

> Plantilla de referencia para el agente `user-story-enricher`.  
> **No incluir este bloque introductorio** en el fichero enriquecido.

Añadir las siguientes secciones **después** de `## Tasks` (tabla resumen), conservando intacto el contenido original de la historia.

---

## INVEST

| Criterio | ✓ | Notas |
|----------|---|-------|
| **I**ndependiente | ☐/✓ | |
| **N**egociable | ☐/✓ | |
| **V**aliosa | ☐/✓ | |
| **E**stimable | ☐/✓ | |
| **S**mall | ☐/✓ | |
| **T**esteable | ☐/✓ | |

---

## Trazabilidad

| Tipo | Referencia |
|------|------------|
| Requisitos funcionales | RF-XXX |
| Requisitos no funcionales | RNF-XXX |
| LLD | §X.Y |
| Modelo de datos | entidad `tabla` |

---

## Detalle de implementación (historia)

### Resumen técnico

[1–3 frases: qué capas intervienen y flujo principal]

### API involucrada

| Método | Ruta | Uso en esta historia |
|--------|------|----------------------|
| GET | `/api/v1/...` | |

### Contratos (DTOs / campos)

| Campo JSON | Tipo | Obligatorio | Notas |
|------------|------|-------------|-------|
| `title` | string | sí | |

### Archivos principales (según LLD)

| Capa | Ruta |
|------|------|
| Backend | `src/backend/src/...` |
| Frontend | `src/frontend/src/...` |

### Requisitos no funcionales

| RNF | Requisito | Cómo se verifica en esta historia |
|-----|-----------|-----------------------------------|
| RNF-001 | CRUD < 2 s | |

### Definition of Done (historia)

- [ ] Criterios Gherkin pasan en E2E
- [ ] Tasks hijas en `done` en `status-v1.json`
- [ ] Sin regresiones en tests existentes

---

## Detalle por task

### TASK-NNN — [BE|FE|DB|QA] Título

| Campo | Valor |
|-------|-------|
| **Tipo** | Backend / Frontend / Database / QA |
| **Release** | MVP / V1 / V2+ |
| **Depende de** | TASK-XXX (si aplica) |

**Objetivo:** [una frase]

**Archivos a crear o modificar:**

- `ruta/archivo.ts` — [qué hacer]

**Pasos de implementación:**

1. …
2. …

**Criterios de done (verificables):**

- [ ] …
- [ ] …

**Tests:**

| Tipo | Ubicación | Qué valida |
|------|-----------|------------|
| Unitario / Integración / E2E | `tests/...` | |

**Notas técnicas:** [índices, Zod, Prisma, edge cases]

---

*(Repetir subsección `### TASK-NNN` por cada task de la tabla resumen)*
