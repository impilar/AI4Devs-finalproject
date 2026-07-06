# Delta for notes-list

## MODIFIED Requirements

### Requirement: List notes API endpoint

The backend API SHALL expose `GET /api/v1/notas` returning HTTP 200 with JSON envelope `{ data: NotaResumen[], meta: { total: number } }` where each `NotaResumen` includes `id`, `title`, `createdAt`, and `updatedAt` in camelCase. When query param `etiqueta` is provided, only notes with that tag SHALL be returned.

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

#### Scenario: Filter by etiqueta query param

- **WHEN** a client sends `GET /api/v1/notas?etiqueta=trabajo`
- **THEN** only notes tagged "trabajo" are in `data`
- **AND** `meta.total` equals the filtered count

### Requirement: Home page note list (US-001)

The frontend application SHALL display a note list on the home route `/` without requiring additional navigation. Each list item SHALL link to `/notas/:id` for note detail (US-002). A tag filter panel SHALL allow filtering the list by tag (US-009).

#### Scenario: User with existing notes sees the list on app open

- **GIVEN** three saved notes with title and creation date exist
- **WHEN** the user opens the application at `/`
- **THEN** a list shows all three notes with title and formatted creation date for each

#### Scenario: List is the main screen on startup

- **GIVEN** the application is loaded
- **WHEN** the user accesses the main URL `/`
- **THEN** the note list is visible without additional navigation

#### Scenario: List item navigates to detail

- **GIVEN** a note exists in the list
- **WHEN** the user clicks the note item
- **THEN** the browser navigates to `/notas/{id}`
