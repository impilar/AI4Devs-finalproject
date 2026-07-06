# Delta for note-search (US-014)

## MODIFIED Requirements

### Requirement: Search notes by text query (US-012)

The backend SHALL expose `GET /api/v1/buscar` accepting required query param `q` (trimmed, min 1 character). Search SHALL be case-insensitive on `title` and `content`, returning at most 50 `NotaResumen` items with envelope `{ data: NotaResumen[], meta: { q: string, total: number } }`. When no notes match, the response SHALL still be HTTP 200 with `data: []`, `meta.q` echoing the normalized (trimmed) search term, and `meta.total: 0` — never a 404 or 5xx for zero hits.

#### Scenario: No matches

- **WHEN** client sends `GET /api/v1/buscar?q=xyznonexistent`
- **THEN** response is 200 with `data: []` and `meta.total: 0`
- **AND** `meta.q` is `"xyznonexistent"`

## ADDED Requirements

### Requirement: Search empty state message (US-014)

When an active search returns zero notes, the home page SHALL display a contextual message **«Sin resultados para {término}»** where `{término}` is the current debounced search term. The UI SHALL NOT show a technical error message (`ErrorMessage`, HTTP codes, or stack traces) for this case. The `SearchBar` SHALL remain visible and editable so the user can change the term and retry.

#### Scenario: Clear message with no matches

- **GIVEN** no note matches the term `xyzabc`
- **WHEN** the user searches for `xyzabc`
- **THEN** the UI shows the text `Sin resultados para xyzabc`
- **AND** no technical error message is shown

#### Scenario: Search field stays editable

- **GIVEN** a search returned no results
- **WHEN** the user sees the empty-search message
- **THEN** the search input remains visible
- **AND** the user can modify the search term

### Requirement: E2E coverage for US-014

E2E tests SHALL validate both Gherkin scenarios from US-014.

#### Scenario: E2E no-match message

- **GIVEN** seeded notes that do not match `xyzabc`
- **WHEN** E2E searches for `xyzabc`
- **THEN** the page shows `Sin resultados para xyzabc`
- **AND** no error banner is visible

#### Scenario: E2E editable search after empty results

- **GIVEN** E2E searched `xyzabc` with no results
- **WHEN** the empty-search message is visible
- **THEN** the search input accepts a new value
