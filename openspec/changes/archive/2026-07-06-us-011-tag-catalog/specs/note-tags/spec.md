# Delta for note-tags (US-011)

## ADDED Requirements

### Requirement: Tag catalog API (US-011)

`GET /api/v1/etiquetas` SHALL return HTTP 200 with `{ data: EtiquetaCatalogItem[] }` where each item has `id` (UUID), `name` (string), and `count` (non-negative integer). Items SHALL be ordered alphabetically by `name`. Tags with zero associated notes SHALL be included with `count: 0`.

#### Scenario: Catalog with mixed counts

- **WHEN** tag "ideas" has 5 notes and "archivo" has 0
- **THEN** `GET /api/v1/etiquetas` includes `{ name: "ideas", count: 5 }` and `{ name: "archivo", count: 0 }`

### Requirement: TagCatalog sidebar (US-011)

The home page sidebar SHALL display all tags as `name (count)` buttons. Clicking a tag SHALL activate the same filter behavior as US-009 (`GET /notas?etiqueta=`). A control to clear the active filter SHALL remain available.

#### Scenario: Navigate to filter from catalog

- **GIVEN** the tag catalog shows "ideas (5)"
- **WHEN** the user clicks "ideas (5)"
- **THEN** the note list shows only notes tagged "ideas"

### Requirement: E2E coverage for US-011

E2E SHALL validate both Gherkin scenarios from US-011 with seeded counts.

#### Scenario: E2E catalog counts visible

- **GIVEN** seeded tags with known counts
- **WHEN** E2E opens `/`
- **THEN** buttons show expected `name (count)` labels

#### Scenario: E2E catalog filters list

- **WHEN** E2E clicks a catalog entry with count > 0
- **THEN** the filtered note list matches the tag
