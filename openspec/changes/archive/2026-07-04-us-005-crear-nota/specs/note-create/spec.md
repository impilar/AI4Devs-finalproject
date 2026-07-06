# Delta for note-create

## ADDED Requirements

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

#### Scenario: Empty content rejected

- **WHEN** `content` is empty or whitespace only
- **THEN** the response status is 400
- **AND** `error.code` is `VALIDATION_ERROR`

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
- **THEN** validation feedback is shown
- **AND** no API call is made (or API returns 400 if bypassed)

### Requirement: E2E coverage for US-005

Automated E2E tests SHALL validate both Gherkin scenarios from US-005.

#### Scenario: E2E successful create

- **WHEN** E2E runs the create flow with valid title and content
- **THEN** the note appears in the list

#### Scenario: E2E validation rejection

- **WHEN** E2E attempts save with empty title or content
- **THEN** validation prevents creation
