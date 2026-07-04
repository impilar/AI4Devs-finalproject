# 🗄 Data Model — {{product_name}}

**Versión:** {{version}}  
**Fuente:** {{input_document}} (arquitectura / PRD)  
**Motor de BD:** {{database_engine}}  
**ORM:** {{orm_tool}}  
**Última actualización:** {{last_updated}}

---

## 0. Resumen del modelo

{{data_model_summary}}

| Métrica | Valor |
|---------|-------|
| Entidades MVP | {{mvp_entity_count}} |
| Tablas MVP | {{mvp_table_count}} |
| Relaciones | {{relationship_count}} |
| Índices | {{index_count}} |

**Convenciones de nomenclatura:**

- Tablas: `snake_case` en plural (`notas`, `etiquetas`)
- Columnas: `snake_case` (`created_at`, `nota_id`)
- PK: `id` UUID v4
- FK: `{entidad_singular}_id`
- Timestamps: `created_at`, `updated_at` (timestamptz UTC)

---

## 1. Diagrama del modelo de datos (Mermaid ER)

> Incluir PK, FK, UK y tipos en la sintaxis Mermaid cuando sea posible.

```mermaid
erDiagram
    {{entity_1_upper}} ||--o{ {{entity_2_upper}} : "{{relationship_1_label}}"
    {{entity_1_upper}} }o--o{ {{entity_3_upper}} : "{{relationship_2_label}}"

    {{entity_1_upper}} {
        uuid id PK
        {{entity_1_attr_1}}
        {{entity_1_attr_2}}
        timestamptz created_at
        timestamptz updated_at
    }

    {{entity_2_upper}} {
        uuid id PK
        uuid {{entity_1_lower}}_id FK
        {{entity_2_attr_1}}
    }

    {{entity_3_upper}} {
        uuid id PK
        string name UK
    }

    {{junction_table_upper}} {
        uuid {{entity_1_lower}}_id FK
        uuid {{entity_3_lower}}_id FK
    }

    {{entity_1_upper}} ||--o{ {{junction_table_upper}} : ""
    {{entity_3_upper}} ||--o{ {{junction_table_upper}} : ""
```

---

## 2. Diagrama lógico (relaciones)

```mermaid
flowchart LR
    subgraph Core["Núcleo MVP"]
        E1["{{entity_1}}"]
        E2["{{entity_2}}"]
        E3["{{entity_3}}"]
    end

    E1 -->|1:N| E2
    E1 -->|M:N vía {{junction_table}}| E3
```

---

## 3. Catálogo de entidades

### 3.1 {{entity_1}} (`{{table_1}}`)

**Descripción:** {{entity_1_description}}  
**Ámbito:** MVP  
**Trazabilidad PRD:** {{entity_1_prd_refs}}

| Atributo | Tipo SQL | Null | Default | Restricciones | Descripción |
|----------|----------|------|---------|---------------|-------------|
| `id` | UUID | NO | `gen_random_uuid()` | PK | Identificador único |
| {{attr_row_1}} | {{type_1}} | {{null_1}} | {{default_1}} | {{constraint_1}} | {{desc_1}} |
| {{attr_row_2}} | {{type_2}} | {{null_2}} | {{default_2}} | {{constraint_2}} | {{desc_2}} |
| `created_at` | TIMESTAMPTZ | NO | `now()` | — | Fecha de creación |
| `updated_at` | TIMESTAMPTZ | NO | `now()` | — | Última modificación |

**Relaciones:**

| Relación | Entidad destino | Tipo | FK | ON DELETE |
|----------|-----------------|------|-----|-----------|
| {{rel_1_name}} | {{rel_1_target}} | {{rel_1_type}} | {{rel_1_fk}} | {{rel_1_cascade}} |

**Índices:**

| Nombre | Columnas | Tipo | Propósito |
|--------|----------|------|-----------|
| {{index_1_name}} | {{index_1_cols}} | {{index_1_type}} | {{index_1_purpose}} |

---

### 3.2 {{entity_2}} (`{{table_2}}`)

*(Repetir estructura 3.1 para cada entidad)*

---

## 4. Tabla de relaciones consolidada

| Origen | Destino | Cardinalidad | Tabla / FK | Regla de integridad |
|--------|---------|--------------|------------|---------------------|
| {{rel_origin_1}} | {{rel_target_1}} | {{rel_card_1}} | {{rel_fk_1}} | {{rel_rule_1}} |
| {{rel_origin_2}} | {{rel_target_2}} | {{rel_card_2}} | {{rel_fk_2}} | {{rel_rule_2}} |

---

## 5. Restricciones de negocio (nivel datos)

| ID | Regla | Implementación | Fuente |
|----|-------|----------------|--------|
| BR-001 | {{business_rule_1}} | {{br_implementation_1}} | {{br_source_1}} |
| BR-002 | {{business_rule_2}} | {{br_implementation_2}} | {{br_source_2}} |

---

## 6. Esquema ORM ({{orm_tool}})

```prisma
// Fragmento representativo — schema.prisma

{{prisma_schema_fragment}}
```

---

## 7. DDL de referencia (SQL)

```sql
-- Migración inicial MVP

{{sql_ddl_fragment}}
```

---

## 8. Mapeo entidad → API DTO

| Entidad / Tabla | Campo BD | Campo API (JSON) | Transformación |
|-----------------|----------|------------------|----------------|
| {{map_entity_1}} | `created_at` | `createdAt` | snake_case → camelCase |
| {{map_entity_2}} | {{map_field_2}} | {{map_api_2}} | {{map_transform_2}} |

---

## 9. Consultas críticas

### 9.1 {{query_1_name}}

**Caso de uso:** {{query_1_use_case}}  
**RNF / SLA:** {{query_1_sla}}

```sql
{{query_1_sql}}
```

### 9.2 {{query_2_name}}

**Caso de uso:** {{query_2_use_case}}  
**RNF / SLA:** {{query_2_sla}}

```sql
{{query_2_sql}}
```

---

## 10. Datos semilla (seeds)

| Tabla | Registros de ejemplo | Propósito |
|-------|----------------------|-----------|
| {{seed_table_1}} | {{seed_count_1}} | {{seed_purpose_1}} |

```sql
{{seed_sql_fragment}}
```

---

## 11. MVP vs evolución futura

### 11.1 Entidades MVP

- {{mvp_entity_1}}
- {{mvp_entity_2}}

### 11.2 Entidades planificadas (no MVP)

| Entidad | Release | Propósito | Impacto en esquema actual |
|---------|---------|-----------|---------------------------|
| {{future_entity_1}} | V2+ | {{future_purpose_1}} | {{future_impact_1}} |
| {{future_entity_2}} | V2+ | {{future_purpose_2}} | {{future_impact_2}} |

---

## 12. Riesgos y decisiones de modelado

| Decisión / Riesgo | Alternativa | Decisión tomada | Motivo |
|-------------------|-------------|-----------------|--------|
| {{dm_decision_1}} | {{dm_alt_1}} | {{dm_choice_1}} | {{dm_reason_1}} |

---

## Guía para el agente generador

Al rellenar esta plantilla:

1. **Derivar de la arquitectura:** Usar entidades, relaciones e índices definidos en `architecture_v1.md`; no contradecir el stack (PostgreSQL + Prisma).
2. **Alineación PRD:** Cada entidad debe trazar a RF del PRD (notas, etiquetas, enlaces, búsqueda).
3. **Detalle máximo:** Todos los atributos con tipo SQL, nullability, defaults y restricciones (requisito readme §3.2).
4. **Mermaid ER:** Incluir PK, FK, UK en el diagrama.
5. **Prisma + SQL:** Incluir fragmentos ejecutables coherentes entre sí.
6. **Índices:** Documentar índices que soporten RNF-001 y RNF-002 (listado, búsqueda).
7. **MVP estricto:** Entidades futuras (backlinks, users) solo en sección 11; no en DDL MVP.
8. **Sin placeholders:** Sustituir todos los `{{...}}` antes de finalizar.
9. **No incluir esta sección** en el documento de salida (`data_model_v1.md`).

### Anti-patrones

- Tablas sin PK
- FK sin regla ON DELETE documentada
- Duplicar etiquetas por nota en lugar de M:N normalizado
- Almacenar arrays JSON de etiquetas en `notas` cuando el PRD exige entidad Etiqueta
- Omitir índices para consultas de búsqueda y filtrado
- Mezclar camelCase en nombres de columnas SQL
