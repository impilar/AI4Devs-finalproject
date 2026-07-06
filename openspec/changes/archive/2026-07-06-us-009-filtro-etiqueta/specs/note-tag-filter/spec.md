# Delta for note-tag-filter

## ADDED Requirements

### Requirement: Filter notes by tag query param (US-009)

The backend SHALL support optional `etiqueta` on `GET /api/v1/notas` returning only notes associated with that exact tag name (trimmed, case-sensitive).

#### Scenario: Filter by existing tag

- **WHEN** notes exist with tags "trabajo" and "personal"
- **AND** client sends `GET /api/v1/notas?etiqueta=trabajo`
- **THEN** response is 200 with only notes tagged "trabajo"
- **AND** `meta.total` matches `data.length`

#### Scenario: Filter with no matching notes

- **WHEN** tag "archivo" exists but has no associated notes
- **AND** client sends `GET /api/v1/notas?etiqueta=archivo`
- **THEN** response is 200 with `data: []` and `meta.total: 0`

#### Scenario: Filter with unknown tag name

- **WHEN** client sends `GET /api/v1/notas?etiqueta=inexistente`
- **THEN** response is 200 with `data: []` and `meta.total: 0`

### Requirement: Tag names list for filter UI (US-009)

The backend SHALL expose `GET /api/v1/etiquetas` returning HTTP 200 with `{ data: string[] }` of all tag names sorted alphabetically.

#### Scenario: List includes orphan tags

- **WHEN** tag "archivo" exists without note associations
- **THEN** `GET /api/v1/etiquetas` includes "archivo" in `data`

### Requirement: TagFilter on home page (US-009)

The home page SHALL show a tag filter panel. Selecting a tag filters the note list; clearing restores the full list.

#### Scenario: Filter by selected tag

- **WHEN** user clicks tag "trabajo" in `TagFilter`
- **THEN** only notes with tag "trabajo" are visible

#### Scenario: Empty filter result message

- **WHEN** user filters by tag "archivo" and no notes match
- **THEN** a message indicates no notes have that tag

#### Scenario: Clear active filter

- **WHEN** user clears the active filter
- **THEN** the full note list is shown again

### Requirement: E2E coverage for US-009

E2E tests SHALL validate filter by tag, empty filter result, and clearing the filter.

#### Scenario: E2E filter trabajo

- **WHEN** E2E selects "trabajo" in `TagFilter`
- **THEN** only trabajo-tagged notes are listed

#### Scenario: E2E filter archivo empty

- **WHEN** E2E selects orphan tag "archivo"
- **THEN** empty-state message is shown without server error

#### Scenario: E2E clear filter

- **WHEN** E2E clears filter after selecting a tag
- **THEN** note count matches unfiltered list
