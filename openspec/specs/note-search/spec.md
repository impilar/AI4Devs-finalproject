# note-search Specification

## Purpose
TBD - created by archiving change us-012-busqueda-ordenacion. Update Purpose after archive.
## Requirements
### Requirement: Search notes by text query (US-012)

The backend SHALL expose `GET /api/v1/buscar` accepting required query param `q` (trimmed, min 1 character). Search SHALL be case-insensitive on `title` and `content`, returning at most 50 `NotaResumen` items with envelope `{ data: NotaResumen[], meta: { q: string, total: number } }`.

#### Scenario: Match in title or content

- **WHEN** a note has title "Recetas" and another has "lista de la compra" in content
- **AND** client sends `GET /api/v1/buscar?q=compra`
- **THEN** response is 200 with the note containing "compra" in title or content
- **AND** `meta.q` is "compra"
- **AND** `meta.total` equals `data.length`

#### Scenario: Empty search term rejected

- **WHEN** client sends `GET /api/v1/buscar?q=` or `q` is whitespace only
- **THEN** response is 400 with validation error

#### Scenario: No matches

- **WHEN** client sends `GET /api/v1/buscar?q=xyznonexistent`
- **THEN** response is 200 with `data: []` and `meta.total: 0`

### Requirement: Search response time (US-012)

Search SHALL respond in under 300 ms with a dataset of 500 notes (RNF-002).

#### Scenario: Performance with 500 notes

- **WHEN** 500 notes exist in the database
- **AND** client sends a valid search query
- **THEN** server response time is under 300 ms

### Requirement: Search order by relevance or date (US-013)

The backend SHALL accept optional `order` on `GET /api/v1/buscar` with values `relevance` (default) or `date`.

#### Scenario: Order by relevance

- **WHEN** search term matches notes in title and notes with match only in content
- **AND** client sends `GET /api/v1/buscar?q=proyecto&order=relevance`
- **THEN** notes with title match appear before content-only matches

#### Scenario: Order by date

- **WHEN** multiple notes match the search term
- **AND** client sends `GET /api/v1/buscar?q=nota&order=date`
- **THEN** results are ordered by `updatedAt` descending (newest first)

### Requirement: SearchBar on home page (US-012)

The home page SHALL provide a search input with 300 ms debounce. While a non-empty search query is active, search results SHALL replace the normal note list.

#### Scenario: Live search results

- **WHEN** user types "compra" in `SearchBar`
- **THEN** after debounce matching notes appear in the list area

#### Scenario: Clear search restores list

- **WHEN** user clears the search input
- **THEN** the full note list is shown again

### Requirement: Search order selector (US-013)

When search is active, the UI SHALL offer relevance and date ordering options that re-fetch results with the same `q`.

#### Scenario: Switch to date order

- **WHEN** user has active search results
- **AND** user selects date ordering
- **THEN** results reorder with newest first
- **AND** search term is unchanged

#### Scenario: Switch to relevance order

- **WHEN** user selects relevance ordering
- **THEN** title matches appear before content-only matches

### Requirement: E2E coverage for US-012 and US-013

E2E tests SHALL validate text search and sort order per Gherkin scenarios in US-012 and US-013.

#### Scenario: E2E search by content

- **WHEN** E2E searches for a term present in note content
- **THEN** matching note is visible in results

#### Scenario: E2E order by date

- **WHEN** E2E searches and selects date order
- **THEN** results appear newest first

### Requirement: Spotlight-style search presentation

On the home route, the search input SHALL use a prominent “Spotlight” visual treatment: rounded 16px container, card background token, and refined focus ring using the primary accent color. The input SHALL retain `role="searchbox"` and accessible name “Buscar notas”.

#### Scenario: Search styling on home

- **WHEN** the user is on `/`
- **THEN** the search input is visually prominent in the main content area
- **AND** the accessible name remains “Buscar notas”

#### Scenario: Focus ring on search

- **WHEN** the user focuses the search input
- **THEN** a visible accent focus ring appears

### Requirement: Search term highlight on cards

When search is active on the home page, matching substrings in card titles and excerpts SHALL be visually highlighted.

#### Scenario: Highlight in search results

- **WHEN** the user searches for a term that appears in a note title
- **THEN** the matching portion of the title is highlighted in the result card

