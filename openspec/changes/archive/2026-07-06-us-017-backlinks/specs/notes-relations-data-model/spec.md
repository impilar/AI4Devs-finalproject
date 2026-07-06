# Delta for notes-relations-data-model (US-017)

## ADDED Requirements

### Requirement: Nota_backlink table (US-017)

The system SHALL persist directed note-to-note relationships in table `nota_backlink` with columns `origen_id` and `destino_id` (both UUID FK → `notas.id` ON DELETE CASCADE), composite primary key `(origen_id, destino_id)`, and indexes `idx_nota_backlink_origen` on `origen_id` and `idx_nota_backlink_destino` on `destino_id`.

#### Scenario: Backlink row references two notes

- **WHEN** a row is inserted with valid `origen_id` and `destino_id`
- **THEN** both FK references exist in `notas`

#### Scenario: Backlinks cascade on note delete

- **WHEN** a note is deleted
- **THEN** all `nota_backlink` rows where that note is origin or destination are removed via CASCADE

#### Scenario: Indexes exist after migration

- **WHEN** the backlinks migration is applied
- **THEN** `idx_nota_backlink_origen` and `idx_nota_backlink_destino` exist in PostgreSQL
