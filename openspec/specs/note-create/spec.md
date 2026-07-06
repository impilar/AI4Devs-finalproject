# note-create Specification

## Purpose

Create notes with title and content via API and frontend form (US-005, PHASE-003).

## Requirements

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

### Requirement: Editorial create note layout

The create note page at `/notas/nueva` SHALL use an editorial layout: large title input with placeholder “¿Qué quieres recordar?”, content area inside a card-styled surface, and grouped actions for adding links and tags. Validation rules and save behavior SHALL remain unchanged from US-005, US-006, and US-008.

#### Scenario: Editorial title placeholder

- **WHEN** the user opens `/notas/nueva`
- **THEN** the title field shows placeholder “¿Qué quieres recordar?”

#### Scenario: Save behavior unchanged

- **WHEN** the user enters valid title and content and clicks “Guardar”
- **THEN** the note is created via `POST /api/v1/notas`
- **AND** the user is redirected to the home list with the new note visible

#### Scenario: No emoji or image blocks

- **WHEN** the user is on the create form
- **THEN** emoji picker and image upload blocks are not shown
