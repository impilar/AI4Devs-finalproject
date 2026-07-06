# Delta for note-create (US-007)

## MODIFIED Requirements

### Requirement: Create note API (US-005)

The backend API SHALL expose `POST /api/v1/notas` accepting `{ title, content }` and returning HTTP 201 with `{ data: NotaDetail }` where `id`, `createdAt`, and `updatedAt` are generated server-side.

#### Scenario: Successful create

- **WHEN** a client sends `POST /api/v1/notas` with non-empty `title` and `content`
- **THEN** the response status is 201
- **AND** `data` includes `id` (UUID), `title`, `content`, `createdAt`, `updatedAt`
- **AND** `links` and `tags` are empty arrays

#### Scenario: Empty title rejected

- **WHEN** `title` is empty or whitespace only
- **THEN** the response status is 400
- **AND** `error.code` is `VALIDATION_ERROR`
- **AND** `error.details` contains `{ field: "title", message: "El título es obligatorio" }`

#### Scenario: Empty content rejected

- **WHEN** `content` is empty or whitespace only
- **THEN** the response status is 400
- **AND** `error.code` is `VALIDATION_ERROR`
- **AND** `error.details` contains `{ field: "content", message: "El contenido es obligatorio" }`

#### Scenario: Title too long

- **WHEN** `title` exceeds 500 characters
- **THEN** the response status is 400 with `VALIDATION_ERROR`

### Requirement: Create note form (US-005)

The frontend SHALL provide a create flow reachable from home in at most two interactions (RNF-003): click «Nueva nota», fill form, save.

#### Scenario: Two-interaction create

- **GIVEN** the user is on the home list
- **WHEN** the user clicks «Nueva nota», enters title and content, and saves
- **THEN** the user returns to the list
- **AND** the new note appears with generated dates

#### Scenario: Client validation blocks empty fields

- **GIVEN** the user is on the create form
- **WHEN** title or content is empty and the user attempts to save
- **THEN** validation feedback is shown next to the affected field
- **AND** no API call is made for client-side failures
- **AND** other field values already entered remain in the form

#### Scenario: Required field message beside title

- **GIVEN** the user entered content but left title empty
- **WHEN** the user attempts to save
- **THEN** the message «El título es obligatorio» is visible next to the title field
- **AND** the content field still shows the entered text

## ADDED Requirements

### Requirement: E2E coverage for US-007 (create form)

Automated E2E tests SHALL validate US-007 Gherkin for the create form: required-field messages and preservation of entered data.

#### Scenario: E2E title required with content preserved

- **GIVEN** the user is on `/notas/nueva`
- **WHEN** the user enters content without a title and clicks Guardar
- **THEN** «El título es obligatorio» is visible
- **AND** the content remains in the textarea

#### Scenario: E2E server validation details (integration fallback)

- **GIVEN** a client bypasses client validation or sends an invalid payload to `POST /api/v1/notas`
- **WHEN** the server responds with `400 VALIDATION_ERROR`
- **THEN** integration tests assert `error.details` with `field` and Spanish `message` per affected field
