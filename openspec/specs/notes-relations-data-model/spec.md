# notes-relations-data-model Specification

## Purpose
TBD - created by archiving change us-002-detalle-nota. Update Purpose after archive.
## Requirements
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

### Requirement: Nota_backlink table (US-017)

The system SHALL persist directed note-to-note relationships in table `nota_backlink` with columns `origen_id` and `destino_id` (both UUID FK → `notas.id` ON DELETE CASCADE), composite primary key `(origen_id, destino_id)`, and indexes `idx_nota_backlink_origen` on `origen_id` and `idx_nota_backlink_destino` on `destino_id`.

#### Scenario: Backlink row references two notes

- **WHEN** a row is inserted with valid `origen_id` and `destino_id`
- **THEN** both FK references exist in `notas`

#### Scenario: Backlinks cascade on note delete

- **WHEN** a note is deleted
- **THEN** all `nota_backlink` rows where that note is origin or destination are removed via CASCADE

#### Scenario: Backlink indexes exist after migration

- **WHEN** the backlinks migration is applied
- **THEN** `idx_nota_backlink_origen` and `idx_nota_backlink_destino` exist in PostgreSQL

