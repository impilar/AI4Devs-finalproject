## ADDED Requirements

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

Empty states SHALL use MindVault card styling and encouraging copy with a CTA to `/notas/nueva` when the library is empty. Filter and search empty states SHALL retain their specific messages.

#### Scenario: Empty library CTA

- **WHEN** no notes exist and no filter or search is active
- **THEN** an empty-state message and link to create a note are visible

## MODIFIED Requirements

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
