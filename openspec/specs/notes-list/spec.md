# notes-list Specification

## Purpose
TBD - created by archiving change us-001-listado-notas. Update Purpose after archive.
## Requirements
### Requirement: List notes API endpoint

The backend API SHALL expose `GET /api/v1/notas` returning HTTP 200 with JSON envelope `{ data: NotaResumen[], meta: { total: number } }` where each `NotaResumen` includes `id`, `title`, `createdAt`, `updatedAt`, `excerpt`, and `tags` in camelCase. When query param `etiqueta` is provided, only notes with that tag SHALL be returned. Optional query params `sort` (`created_at` \| `title`, default `created_at`) and `order` (`asc` \| `desc`, default `desc`) SHALL control list ordering. Invalid `sort` or `order` values SHALL return HTTP 400 with `VALIDATION_ERROR`. The `excerpt` field SHALL contain up to 120 characters derived from note content (trimmed, with ellipsis when truncated). The `tags` field SHALL list tag names sorted alphabetically.

#### Scenario: List with existing notes

- **WHEN** a client sends `GET /api/v1/notas` and three notes exist
- **THEN** the response status is 200
- **AND** `data` contains three items each with `id`, `title`, `createdAt`, `updatedAt`, `excerpt`, and `tags`
- **AND** `meta.total` is 3

#### Scenario: List ordered by creation date descending

- **WHEN** a client sends `GET /api/v1/notas` without sort parameters
- **THEN** notes in `data` are ordered by `createdAt` descending (newest first)

#### Scenario: List ordered by title ascending

- **WHEN** a client sends `GET /api/v1/notas?sort=title&order=asc` and notes titled "Zebra", "Alpha", and "Beta" exist
- **THEN** `data` titles appear in order Alpha, Beta, Zebra

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

The frontend application SHALL display a note list on the home route `/` without requiring additional navigation. Each list item SHALL link to `/notas/:id` for note detail (US-002). A tag filter panel SHALL allow filtering the list by tag (US-009). A search bar SHALL allow text search; while search is active, search results SHALL replace the filtered or full list (US-012). When search is not active, a sort selector SHALL allow ordering the list by date or title; the selection SHALL persist for the browser session via `sessionStorage` and SHALL be reapplied after navigating to note detail and back to the list (US-004).

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

#### Scenario: Sort selector on home list

- **WHEN** the user is on `/` and no search query is active
- **THEN** a sort selector is visible for the note list

#### Scenario: Sort persists after detail navigation

- **GIVEN** the user selected date descending sort on the home list
- **WHEN** the user opens a note detail and returns to the list
- **THEN** the list remains ordered by date descending

### Requirement: List loading and error states

The frontend SHALL show skeleton card placeholders while fetching notes and a non-blocking error message on network failure.

#### Scenario: Loading state

- **WHEN** the home page is mounting and notes are being fetched
- **THEN** skeleton card placeholders are visible in the list area

#### Scenario: Network error

- **WHEN** the notes API request fails due to network or server error
- **THEN** an error message is displayed
- **AND** the application does not crash

### Requirement: Dashboard home header

The home route `/` SHALL display a greeting header with the current date, a personalized greeting line, and the tagline “Tu conocimiento organizado y siempre accesible.”

#### Scenario: Greeting visible on home

- **WHEN** the user opens `/`
- **THEN** a greeting heading and inspirational tagline are visible above the search area

### Requirement: Home KPI cards

The home route SHALL display KPI cards computed from live data: total note count, total distinct tag count, and relative time since the most recently updated note.

#### Scenario: KPIs reflect loaded data

- **WHEN** three notes and two tags exist
- **THEN** the total notes KPI shows 3
- **AND** the tags KPI shows 2

### Requirement: Premium masonry note cards

The home note list SHALL display notes as premium cards in a masonry-style grid (two columns on viewports ≥ 768px, one column below). Each card SHALL show title, excerpt, colored tag pills when tags exist, and a relative update date as primary visible text. Cards SHALL have hover elevation and subtle glow transitions (200ms).

#### Scenario: Card shows excerpt and tags

- **WHEN** a note has content and tags and appears in the home list
- **THEN** excerpt text and tag pills are visible on the card

#### Scenario: Relative date on card

- **WHEN** a note was updated within the last seven days
- **THEN** the card shows a relative date phrase (e.g. “Hace 2 días”) as visible text
- **AND** an absolute ISO or locale date is available via `datetime` on a `time` element

### Requirement: Improved empty states (MindVault styling)

Empty states SHALL use MindVault card styling and encouraging copy. When the library has no notes and neither tag filter nor search is active, the home list area SHALL show a message indicating the user has no notes yet and a call-to-action link labeled **Crear nota** pointing to `/notas/nueva`. When a tag filter is active and yields no notes, a filter-specific message SHALL be shown. When a search query is active and yields no notes, a search-specific message SHALL be shown (US-014). The library empty state SHALL NOT be shown when filter or search is active.

#### Scenario: Empty library CTA

- **GIVEN** no notes exist in the database
- **AND** no tag filter is active
- **AND** no search query is active
- **WHEN** the user opens `/`
- **THEN** a message is visible indicating there are no notes yet
- **AND** a link or button labeled **Crear nota** is visible
- **AND** activating the CTA navigates to `/notas/nueva`

#### Scenario: Empty library is not a blank screen

- **GIVEN** the note list is empty
- **AND** no tag filter or search is active
- **WHEN** the home page loads
- **THEN** the list area shows explanatory content (message and/or icon)
- **AND** the viewport is not an empty white area without context

#### Scenario: Filter empty state unchanged

- **GIVEN** a tag filter is active
- **AND** no notes match the filter
- **WHEN** the home page displays the list area
- **THEN** the library empty state (Crear nota CTA) is NOT shown
- **AND** a filter-specific empty message is shown instead

### Requirement: E2E coverage for US-003

Automated E2E tests SHALL validate both Gherkin scenarios from US-003 against an environment with zero notes.

#### Scenario: E2E orienting message and CTA

- **GIVEN** the database has no notes
- **WHEN** E2E opens `/`
- **THEN** the test asserts an orienting no-notes message is visible
- **AND** **Crear nota** is visible
- **AND** clicking the CTA opens the create-note route

#### Scenario: E2E no blank screen

- **GIVEN** the database has no notes
- **WHEN** E2E loads the home page
- **THEN** the test asserts the list area contains visible text content
- **AND** no HTTP 500 occurs on the notes list API

### Requirement: E2E coverage for US-004

Automated E2E tests SHALL validate both Gherkin scenarios from US-004.

#### Scenario: E2E sort by title

- **GIVEN** notes "Zebra", "Alpha", and "Beta" exist
- **WHEN** E2E selects sort by title ascending on `/`
- **THEN** list items appear in order Alpha, Beta, Zebra

#### Scenario: E2E sort persists in session

- **GIVEN** the list is sorted by date descending
- **WHEN** E2E navigates to a note detail and back to `/`
- **THEN** the list order matches date descending

### Requirement: E2E coverage for US-001

Automated E2E tests SHALL validate both Gherkin scenarios from US-001 against a seeded environment.

#### Scenario: E2E passes with seeded data

- **WHEN** E2E suite runs with three seeded notes
- **THEN** tests assert list visibility, item count, title on `/`
- **AND** the visible application heading is “Organizador de Conocimiento”
- **AND** each list item includes a `time` element with `datetime` matching the note date

#### Scenario: E2E passes with empty database

- **WHEN** E2E runs against an empty notes table
- **THEN** the home page loads without server error (HTTP 500)

