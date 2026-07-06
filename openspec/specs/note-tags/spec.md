# note-tags Specification

## Purpose

Assign tags to notes on create/update with auto-create and M:N persistence (US-008, PHASE-004).

## Requirements

### Requirement: Tags on create and update (US-008)

The backend SHALL accept optional `tags: string[]` on `POST` and `PUT /api/v1/notas`, auto-create missing tag names, and persist M:N associations in `nota_etiqueta`.

#### Scenario: Auto-create tag on create

- **WHEN** `POST /api/v1/notas` includes `tags: ["productividad"]` and the tag does not exist
- **THEN** response is 201 with `data.tags` containing `"productividad"`
- **AND** the tag row exists for reuse on other notes

#### Scenario: Reuse existing tag

- **WHEN** a second note is created with the same tag name
- **THEN** no duplicate tag row is created (UNIQUE on `name`)

#### Scenario: Replace tags on update

- **WHEN** `PUT /api/v1/notas/:id` sends a new `tags` array
- **THEN** old associations for that note are replaced
- **AND** response reflects the new tag list alphabetically

### Requirement: TagInput in form (US-008)

The create/edit form SHALL allow entering multiple tags as chips with creation on save.

#### Scenario: Multiple tags visible in detail

- **WHEN** the user assigns multiple tags and saves
- **THEN** all tags appear in note detail

### Requirement: E2E coverage for US-008

E2E tests SHALL validate auto-create and multiple tags per note.

#### Scenario: E2E auto-create tag

- **WHEN** E2E creates a note with a new tag and a second note reuses it via suggestions
- **THEN** both notes show the tag in detail

#### Scenario: E2E multiple tags and deduplication

- **WHEN** E2E assigns multiple tags including a duplicate name in the form
- **THEN** only unique tags are saved and visible in detail
