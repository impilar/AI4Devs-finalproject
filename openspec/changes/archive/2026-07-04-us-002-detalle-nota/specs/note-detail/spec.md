# Delta for note-detail

## ADDED Requirements

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
