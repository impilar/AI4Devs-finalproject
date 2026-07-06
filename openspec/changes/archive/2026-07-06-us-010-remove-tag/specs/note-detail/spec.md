# Delta for note-detail (US-010)

## MODIFIED Requirements

### Requirement: Note detail API (US-002)

The backend API SHALL expose `GET /api/v1/notas/:id` returning HTTP 200 with `{ data: NotaDetail }` including `id`, `title`, `content`, `createdAt`, `updatedAt`, `links`, and `tags`. Each tag in detail SHALL include `id` (etiqueta UUID) and `name` (string) to support tag removal (US-010). List/summary endpoints MAY continue exposing tag names only.

#### Scenario: Successful detail fetch

- **WHEN** a client requests an existing note by UUID
- **THEN** the response status is 200
- **AND** `data` includes all fields with camelCase dates
- **AND** each item in `data.tags` includes `id` and `name`

#### Scenario: Note not found

- **WHEN** a client requests a non-existent UUID
- **THEN** the response status is 404 with `NOT_FOUND`

## ADDED Requirements

### Requirement: Removable tags in note detail view (US-010)

The note detail read-only view SHALL render each tag as a removable chip with a control labeled to remove that tag (e.g. `aria-label="Quitar etiqueta {name}"`). Activating remove SHALL call `DELETE /api/v1/notas/:id/etiquetas/:etiquetaId` and update the UI on success without deleting the note.

#### Scenario: Remove tag from detail

- **GIVEN** the user views a note with tags "trabajo" and "urgente"
- **WHEN** the user removes "urgente"
- **THEN** "urgente" is no longer visible on the detail view
- **AND** the note title and content remain visible

#### Scenario: Remove is persisted via API

- **GIVEN** the user removed a tag from detail
- **WHEN** the user reloads the note detail
- **THEN** the removed tag is still absent

### Requirement: E2E coverage for US-010 (detail UI)

E2E tests SHALL validate both Gherkin scenarios from US-010 through the detail UI.

#### Scenario: E2E disassociate from detail

- **GIVEN** a seeded note with two tags
- **WHEN** E2E removes one tag from detail
- **THEN** the tag is not visible and the note content remains

#### Scenario: E2E shared tag on another note

- **GIVEN** two notes share tag "trabajo"
- **WHEN** E2E removes "trabajo" from one note only
- **THEN** the other note still shows "trabajo"
