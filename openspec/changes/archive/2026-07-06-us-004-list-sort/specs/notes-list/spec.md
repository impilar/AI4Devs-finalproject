# Delta for notes-list (US-004)

## MODIFIED Requirements

### Requirement: List notes API endpoint

The backend API SHALL expose `GET /api/v1/notas` returning HTTP 200 with JSON envelope `{ data: NotaResumen[], meta: { total: number } }` where each `NotaResumen` includes `id`, `title`, `createdAt`, `updatedAt`, `excerpt`, and `tags` in camelCase. When query param `etiqueta` is provided, only notes with that tag SHALL be returned. Optional query params `sort` (`created_at` \| `title`, default `created_at`) and `order` (`asc` \| `desc`, default `desc`) SHALL control list ordering. Invalid `sort` or `order` values SHALL return HTTP 400 with `VALIDATION_ERROR`. The `excerpt` field SHALL contain up to 120 characters derived from note content (trimmed, with ellipsis when truncated). The `tags` field SHALL list tag names sorted alphabetically.

#### Scenario: List ordered by title ascending

- **WHEN** a client sends `GET /api/v1/notas?sort=title&order=asc` and notes titled "Zebra", "Alpha", and "Beta" exist
- **THEN** `data` titles appear in order Alpha, Beta, Zebra

#### Scenario: List ordered by creation date descending

- **WHEN** a client sends `GET /api/v1/notas` without sort parameters
- **THEN** notes in `data` are ordered by `createdAt` descending (newest first)

### Requirement: Home page note list (US-001)

The frontend application SHALL display a note list on the home route `/` without requiring additional navigation. Each list item SHALL link to `/notas/:id` for note detail (US-002). A tag filter panel SHALL allow filtering the list by tag (US-009). A search bar SHALL allow text search; while search is active, search results SHALL replace the filtered or full list (US-012). When search is not active, a sort selector SHALL allow ordering the list by date or title; the selection SHALL persist for the browser session via `sessionStorage` and SHALL be reapplied after navigating to note detail and back to the list (US-004).

#### Scenario: Sort selector on home list

- **WHEN** the user is on `/` and no search query is active
- **THEN** a sort selector is visible for the note list

#### Scenario: Sort persists after detail navigation

- **GIVEN** the user selected date descending sort on the home list
- **WHEN** the user opens a note detail and returns to the list
- **THEN** the list remains ordered by date descending

## ADDED Requirements

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
