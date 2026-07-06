# Delta for note-tags (US-010)

## ADDED Requirements

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

### Requirement: E2E coverage for US-010 (API)

Integration tests SHALL validate both Gherkin scenarios from US-010 at the API layer.

#### Scenario: Integration disassociate one tag

- **GIVEN** a note seeded with two tags
- **WHEN** integration DELETE removes one tag
- **THEN** GET detail shows only the remaining tag

#### Scenario: Integration shared tag unchanged on other note

- **GIVEN** two notes share a tag
- **WHEN** DELETE removes that tag from one note only
- **THEN** the other note's GET detail still includes the tag
