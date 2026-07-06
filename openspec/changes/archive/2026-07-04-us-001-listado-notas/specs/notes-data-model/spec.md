# Delta for notes-data-model

## ADDED Requirements

### Requirement: Notes table schema

The system SHALL persist notes in a PostgreSQL table `notas` with columns `id` (UUID PK), `title` (VARCHAR 500 NOT NULL), `content` (TEXT NOT NULL), `created_at` (TIMESTAMPTZ NOT NULL), and `updated_at` (TIMESTAMPTZ NOT NULL).

#### Scenario: Valid note persisted

- **WHEN** a note is inserted with non-empty trimmed `title` and `content`
- **THEN** the row is stored with a generated UUID `id`
- **AND** `created_at` and `updated_at` are set automatically

#### Scenario: Empty title rejected at database

- **WHEN** an insert is attempted with `title` that is empty or whitespace-only after trim
- **THEN** the database rejects the insert via CHECK constraint

#### Scenario: Empty content rejected at database

- **WHEN** an insert is attempted with `content` that is empty or whitespace-only after trim
- **THEN** the database rejects the insert via CHECK constraint

### Requirement: Listing index on created_at

The system SHALL maintain index `idx_notas_created_at` on `notas(created_at DESC)` to support efficient list ordering (RNF-001).

#### Scenario: Index exists after migration

- **WHEN** migration `init_mvp` is applied
- **THEN** index `idx_notas_created_at` exists on table `notas`

### Requirement: Automatic updated_at maintenance

The system SHALL update `updated_at` automatically on row modification via database trigger or Prisma `@updatedAt`.

#### Scenario: updated_at changes on update

- **WHEN** an existing note row is updated
- **THEN** `updated_at` reflects a timestamp later than or equal to the previous value

### Requirement: Development seed data

The system SHALL provide `prisma/seed.ts` with at least three sample notes for local development and E2E tests.

#### Scenario: Seed populates notes

- **WHEN** `npx prisma db seed` runs against an empty database
- **THEN** at least three notes with distinct titles exist in `notas`
