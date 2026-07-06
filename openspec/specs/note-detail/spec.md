# note-detail Specification

## Purpose
TBD - created by archiving change us-002-detalle-nota. Update Purpose after archive.
## Requirements
### Requirement: Get note by id API

The backend API SHALL expose `GET /api/v1/notas/:id` returning HTTP 200 with `{ data: NotaDetail }` where `NotaDetail` includes `id`, `title`, `content`, `createdAt`, `updatedAt`, `links` (string[]), and `tags` (string[]).

#### Scenario: Detail with relations

- **WHEN** a client requests `GET /api/v1/notas/:id` for an existing note with links and tags
- **THEN** the response status is 200
- **AND** `data` includes `content`, `links`, and `tags` arrays

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

