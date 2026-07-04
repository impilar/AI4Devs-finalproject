# Delta for notes-relations-data-model

## ADDED Requirements

### Requirement: Enlaces table

The system SHALL persist external URLs in table `enlaces` with columns `id` (UUID PK), `nota_id` (FK → `notas.id` ON DELETE CASCADE), `url` (VARCHAR 2048 NOT NULL), and `created_at` (TIMESTAMPTZ).

#### Scenario: Link associated with note

- **WHEN** a row is inserted in `enlaces` with valid `nota_id` and `url`
- **THEN** the link is stored and references an existing note

#### Scenario: Links cascade on note delete

- **WHEN** a note is deleted
- **THEN** all associated `enlaces` rows are removed via CASCADE

### Requirement: Etiquetas and nota_etiqueta tables

The system SHALL persist tags in `etiquetas` (`id`, `name` UNIQUE, `created_at`) and M:N associations in `nota_etiqueta` (`nota_id`, `etiqueta_id` composite PK, CASCADE FKs).

#### Scenario: Tag name uniqueness

- **WHEN** two rows are inserted with the same `name` in `etiquetas`
- **THEN** the second insert is rejected by UNIQUE constraint

#### Scenario: Note-tag association

- **WHEN** a row exists in `nota_etiqueta` linking a note and tag
- **THEN** both FK references must exist

### Requirement: Indexes for detail query

The system SHALL maintain `idx_enlaces_nota_id` on `enlaces(nota_id)` and `idx_nota_etiqueta_nota` on `nota_etiqueta(nota_id)` for efficient detail loads (RNF-001).

#### Scenario: Indexes exist after migration

- **WHEN** relations migration is applied
- **THEN** both indexes exist in PostgreSQL
