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

### Requirement: Remove tag association API (US-010)

The backend SHALL expose `DELETE /api/v1/notas/:id/etiquetas/:etiquetaId` to remove a single M:N association between a note and a tag. The operation SHALL delete only the `nota_etiqueta` row. The note row and the `etiquetas` row SHALL remain. If other notes reference the same tag, their associations SHALL be unaffected.

#### Scenario: Disassociate tag from note

- **GIVEN** note N has tags including tag T
- **WHEN** client sends `DELETE /api/v1/notas/N/etiquetas/T`
- **THEN** response status is 204 with no body
- **AND** `GET /api/v1/notas/N` no longer lists tag T
- **AND** the note title and content are unchanged

#### Scenario: Shared tag persists globally

- **GIVEN** tag T is associated with notes A and B
- **WHEN** client removes tag T from note A only
- **THEN** response status is 204
- **AND** the `etiquetas` row for T still exists
- **AND** note B still includes tag T in its detail

#### Scenario: Association not found

- **WHEN** client sends DELETE for a note-tag association that does not exist
- **THEN** response status is 404 with `NOT_FOUND`

#### Scenario: Note not found

- **WHEN** client sends DELETE for a non-existent note UUID
- **THEN** response status is 404 with `NOT_FOUND`

### Requirement: Integration coverage for US-010 (API)

Integration tests SHALL validate both Gherkin scenarios from US-010 at the API layer.

#### Scenario: Integration disassociate one tag

- **GIVEN** a note seeded with two tags
- **WHEN** integration DELETE removes one tag
- **THEN** GET detail shows only the remaining tag

#### Scenario: Integration shared tag unchanged on other note

- **GIVEN** two notes share a tag
- **WHEN** DELETE removes that tag from one note only
- **THEN** the other note's GET detail still includes the tag

### Requirement: Tag catalog API (US-011)

`GET /api/v1/etiquetas` SHALL return HTTP 200 with `{ data: EtiquetaCatalogItem[] }` where each item has `id` (UUID), `name` (string), and `count` (non-negative integer). Items SHALL be ordered alphabetically by `name`. Tags with zero associated notes SHALL be included with `count: 0`.

#### Scenario: Catalog with mixed counts

- **WHEN** tag "ideas" has 5 notes and "archivo" has 0
- **THEN** `GET /api/v1/etiquetas` includes `{ name: "ideas", count: 5 }` and `{ name: "archivo", count: 0 }`

### Requirement: TagCatalog sidebar (US-011)

The home page sidebar SHALL display all tags as `name (count)` buttons. Clicking a tag SHALL activate the same filter behavior as US-009 (`GET /notas?etiqueta=`). A control to clear the active filter SHALL remain available.

#### Scenario: Navigate to filter from catalog

- **GIVEN** the tag catalog shows "ideas (5)"
- **WHEN** the user clicks "ideas (5)"
- **THEN** the note list shows only notes tagged "ideas"

### Requirement: E2E coverage for US-011

E2E SHALL validate both Gherkin scenarios from US-011 with seeded counts.

#### Scenario: E2E catalog counts visible

- **GIVEN** seeded tags with known counts
- **WHEN** E2E opens `/`
- **THEN** buttons show expected `name (count)` labels

#### Scenario: E2E catalog filters list

- **WHEN** E2E clicks a catalog entry with count > 0
- **THEN** the filtered note list matches the tag
