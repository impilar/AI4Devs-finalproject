# note-backlinks Specification

## Purpose

Directed note-to-note backlinks with create API, edit picker, and bidirectional detail views (US-017, PHASE-003 V2+).

## Requirements

### Requirement: Create backlink API (US-017)

The backend SHALL expose `POST /api/v1/notas/:id/backlinks` accepting `{ destinoId: UUID }`. On success it SHALL return HTTP 201 with `{ data: { origenId, destinoId, destino: { id, title } } }`. The endpoint SHALL reject `origenId === destinoId` and duplicate `(origenId, destinoId)` pairs with `400 VALIDATION_ERROR`. Missing origin or destination note SHALL return `404 NOT_FOUND`.

#### Scenario: Create link between two notes

- **GIVEN** notes "Ideas de proyecto" and "Investigación de mercado" exist
- **WHEN** client sends `POST /api/v1/notas/{ideasId}/backlinks` with `destinoId` of mercado
- **THEN** response status is 201
- **AND** `data.destino.title` is "Investigación de mercado"

#### Scenario: Self-link rejected

- **WHEN** client sends `POST` with `destinoId` equal to the path `:id`
- **THEN** response status is 400 with `VALIDATION_ERROR`

#### Scenario: Duplicate link rejected

- **GIVEN** a backlink from A to B already exists
- **WHEN** client sends `POST` again from A to B
- **THEN** response status is 400 with `VALIDATION_ERROR`

### Requirement: List outgoing backlinks API (US-017)

The backend SHALL expose `GET /api/v1/notas/:id/backlinks/salientes` returning HTTP 200 with `{ data: NoteRef[] }` where each item has `id` and `title` of destination notes, ordered by destination title ascending.

#### Scenario: Salientes after create

- **GIVEN** note A links to note B
- **WHEN** client requests `GET /api/v1/notas/{A}/backlinks/salientes`
- **THEN** response includes B's `id` and `title`

### Requirement: List incoming backlinks API (US-017)

The backend SHALL expose `GET /api/v1/notas/:id/backlinks/entrantes` returning HTTP 200 with `{ data: NoteRef[] }` where each item has `id` and `title` of origin notes, ordered by origin title ascending.

#### Scenario: Entrantes on target note

- **GIVEN** note "Plan Q3" links to "Objetivos anuales"
- **WHEN** client requests `GET /api/v1/notas/{objetivosId}/backlinks/entrantes`
- **THEN** response includes `{ title: "Plan Q3" }`

### Requirement: NoteLinkPicker in edit mode (US-017)

The note edit form SHALL include a control to select another note as link destination, populated from `GET /api/v1/notas` excluding the current note. On save, if a destination is selected, the client SHALL call `POST /api/v1/notas/:id/backlinks` after a successful update.

#### Scenario: Add link while editing

- **GIVEN** the user edits note "Ideas de proyecto"
- **WHEN** the user selects "Investigación de mercado" and saves
- **THEN** the detail view shows a clickable link to "Investigación de mercado"

### Requirement: E2E coverage for US-017

E2E tests SHALL validate both Gherkin scenarios from US-017 with seeded notes.

#### Scenario: E2E create outgoing link from edit

- **GIVEN** seeded notes "Ideas de proyecto" and "Investigación de mercado"
- **WHEN** E2E edits the first, adds link to the second, and saves
- **THEN** detail shows clickable link to "Investigación de mercado"

#### Scenario: E2E incoming backlinks panel

- **GIVEN** "Plan Q3" links to "Objetivos anuales" (seed or API)
- **WHEN** E2E opens detail of "Objetivos anuales"
- **THEN** section «Notas que enlazan aquí» lists "Plan Q3"
