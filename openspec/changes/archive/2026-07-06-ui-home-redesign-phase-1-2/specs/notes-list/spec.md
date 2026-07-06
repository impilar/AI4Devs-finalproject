## MODIFIED Requirements

### Requirement: List notes API endpoint

The backend API SHALL expose `GET /api/v1/notas` returning HTTP 200 with JSON envelope `{ data: NotaResumen[], meta: { total: number } }` where each `NotaResumen` includes `id`, `title`, `createdAt`, `updatedAt`, `excerpt`, and `tags` in camelCase. When query param `etiqueta` is provided, only notes with that tag SHALL be returned. The `excerpt` field SHALL contain up to 120 characters derived from note content (trimmed, with ellipsis when truncated). The `tags` field SHALL list tag names sorted alphabetically.

#### Scenario: List with existing notes

- **WHEN** a client sends `GET /api/v1/notas` and three notes exist
- **THEN** the response status is 200
- **AND** `data` contains three items each with `id`, `title`, `createdAt`, `updatedAt`, `excerpt`, and `tags`
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

The frontend application SHALL display a note list on the home route `/` inside the application shell, without requiring additional navigation. Each list item SHALL link to `/notas/:id` for note detail (US-002). A tag filter panel SHALL allow filtering the list by tag (US-009) from the sidebar. A search bar SHALL allow text search in the header area; while search is active, search results SHALL replace the filtered or full list (US-012). Notes SHALL be presented as cards in a responsive grid while preserving `ul` semantics with `aria-label` “Listado de notas”.

#### Scenario: User with existing notes sees the list on app open

- **WHEN** the user opens the application at `/`
- **THEN** a list of notes is visible without extra navigation

#### Scenario: List item navigates to detail

- **WHEN** the user clicks a note in the list
- **THEN** the application navigates to `/notas/:id`

#### Scenario: Tag filter visible on home page

- **WHEN** the user is on the home page
- **THEN** a tag filter panel is available

#### Scenario: Search bar visible on home page

- **WHEN** the user is on the home page
- **THEN** a search input is available

#### Scenario: Search results replace list

- **WHEN** the user enters a non-empty search query
- **THEN** search results are shown in the list area instead of the normal note list
