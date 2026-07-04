# notes-list Specification

## Purpose
TBD - created by archiving change us-001-listado-notas. Update Purpose after archive.
## Requirements
### Requirement: List notes API endpoint

The backend API SHALL expose `GET /api/v1/notas` returning HTTP 200 with JSON envelope `{ data: NotaResumen[], meta: { total: number } }` where each `NotaResumen` includes `id`, `title`, `createdAt`, and `updatedAt` in camelCase.

#### Scenario: List with existing notes

- **WHEN** a client sends `GET /api/v1/notas` and three notes exist
- **THEN** the response status is 200
- **AND** `data` contains three items each with `id`, `title`, `createdAt`, `updatedAt`
- **AND** `meta.total` is 3

#### Scenario: List ordered by creation date descending

- **WHEN** a client sends `GET /api/v1/notas` without query parameters
- **THEN** notes in `data` are ordered by `createdAt` descending (newest first)

#### Scenario: Empty list

- **WHEN** a client sends `GET /api/v1/notas` and no notes exist
- **THEN** the response status is 200
- **AND** `data` is an empty array
- **AND** `meta.total` is 0

### Requirement: Home page note list (US-001)

The frontend application SHALL display a note list on the home route `/` without requiring additional navigation.

#### Scenario: User with existing notes sees the list on app open

- **GIVEN** three saved notes with title and creation date exist
- **WHEN** the user opens the application at `/`
- **THEN** a list shows all three notes with title and formatted creation date for each

#### Scenario: List is the main screen on startup

- **GIVEN** the application is loaded
- **WHEN** the user accesses the main URL `/`
- **THEN** the note list is visible without additional navigation

### Requirement: List loading and error states

The frontend SHALL show a loading indicator while fetching notes and a non-blocking error message on network failure.

#### Scenario: Loading state

- **WHEN** the home page is mounting and notes are being fetched
- **THEN** a loading indicator is visible to the user

#### Scenario: Network error

- **WHEN** the notes API request fails due to network or server error
- **THEN** an error message is displayed
- **AND** the application does not crash

### Requirement: E2E coverage for US-001

Automated E2E tests SHALL validate both Gherkin scenarios from US-001 against a seeded environment.

#### Scenario: E2E passes with seeded data

- **WHEN** E2E suite runs with three seeded notes
- **THEN** tests assert list visibility, item count, title, and date on `/`

#### Scenario: E2E passes with empty database

- **WHEN** E2E runs against an empty notes table
- **THEN** the home page loads without server error (HTTP 500)

