# note-detail Specification

## Purpose
TBD - created by archiving change us-002-detalle-nota. Update Purpose after archive.
## Requirements
### Requirement: Get note by id API

The backend API SHALL expose `GET /api/v1/notas/:id` returning HTTP 200 with `{ data: NotaDetail }` where `NotaDetail` includes `id`, `title`, `content`, `createdAt`, `updatedAt`, `links` (string[]), and `tags` (`{ id, name }[]`). Each tag in detail SHALL include `id` (etiqueta UUID) and `name` (string) to support tag removal (US-010). List/summary endpoints MAY continue exposing tag names only.

#### Scenario: Detail with relations

- **WHEN** a client requests `GET /api/v1/notas/:id` for an existing note with links and tags
- **THEN** the response status is 200
- **AND** `data` includes `content`, `links`, and `tags` arrays
- **AND** each item in `data.tags` includes `id` and `name`

#### Scenario: Detail with empty relations

- **WHEN** a note has no links or tags
- **THEN** `links` and `tags` are empty arrays (not null)

#### Scenario: Note not found

- **WHEN** a client requests a valid UUID that does not exist
- **THEN** the response status is 404
- **AND** `error.code` is `NOT_FOUND`

#### Scenario: Invalid UUID parameter

- **WHEN** `id` path param is not a valid UUID
- **THEN** the response status is 400 with `VALIDATION_ERROR`

### Requirement: Navigate from list to detail (US-002)

The frontend SHALL navigate from the home list to `/notas/:id` on item click and display full note content.

#### Scenario: Open detail from list

- **GIVEN** the user is on the note list
- **AND** a note titled "Ideas de proyecto" exists with content "Texto de la nota"
- **WHEN** the user clicks that note
- **THEN** the detail view shows title, content, links, and tags

#### Scenario: Not found returns to list

- **GIVEN** the user navigates to a deleted or non-existent note id
- **WHEN** the application loads the detail route
- **THEN** an informative message is shown
- **AND** the user can return to the home list at `/`

### Requirement: E2E coverage for US-002

Automated E2E tests SHALL validate both Gherkin scenarios from US-002.

#### Scenario: E2E list to detail flow

- **WHEN** E2E runs with seeded note "Ideas de proyecto"
- **THEN** clicking the list item shows detail with title and content

#### Scenario: E2E not found flow

- **WHEN** E2E navigates to a non-existent note UUID
- **THEN** not-found message appears and user can return to `/`

### Requirement: Note detail actions (US-015, US-016)

The note detail view SHALL expose edit and delete actions alongside read-only content (title, content, links, tags, timestamps).

#### Scenario: Actions visible on detail

- **GIVEN** the user views an existing note at `/notas/:id`
- **WHEN** the detail page loads successfully
- **THEN** edit and delete controls are available
- **AND** title, content, links, tags, and dates are displayed

#### Scenario: UpdatedAt visible after edit

- **WHEN** the user saves edits from detail
- **THEN** read-only detail shows the refreshed `updatedAt` value

### Requirement: Immersive note detail layout

The note detail page at `/notas/:id` SHALL present content inside a card-styled document surface with MindVault tokens. The page SHALL show title as a prominent heading, relative update date, tags, links, and action buttons (Editar, Eliminar) in a horizontal action bar above the document body.

#### Scenario: Document surface on detail

- **WHEN** the user opens an existing note at `/notas/:id`
- **THEN** note content is displayed inside a rounded card surface
- **AND** edit and delete controls remain available

#### Scenario: Detail without related-notes rail

- **WHEN** the user views note detail
- **THEN** no “Notas relacionadas” sidebar rail is shown (deferred to V2+)

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

### Requirement: Outgoing note backlinks in detail (US-017)

The note detail read-only view SHALL display outgoing note backlinks as a list of React Router links to `/notas/:id` with destination titles. The section SHALL be hidden when there are no outgoing backlinks. External URL links (`enlaces`) SHALL remain a separate section labeled for external URLs.

#### Scenario: Outgoing link visible on source note

- **GIVEN** note "Ideas de proyecto" links to "Investigación de mercado"
- **WHEN** the user opens detail of "Ideas de proyecto"
- **THEN** a clickable link to "Investigación de mercado" is visible

### Requirement: Incoming backlinks panel (US-017)

The note detail read-only view SHALL display a section titled «Notas que enlazan aquí» listing origin notes that link to the current note, each as a clickable link to `/notas/:id`. The section SHALL be hidden when there are no incoming backlinks.

#### Scenario: Incoming backlinks on target note

- **GIVEN** "Plan Q3" links to "Objetivos anuales"
- **WHEN** the user opens detail of "Objetivos anuales"
- **THEN** «Notas que enlazan aquí» includes "Plan Q3"

