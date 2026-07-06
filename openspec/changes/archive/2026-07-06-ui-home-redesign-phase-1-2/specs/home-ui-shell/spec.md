## ADDED Requirements

### Requirement: Application shell layout

The frontend SHALL render an application shell on all routes comprising: (1) a top header with the application title “Organizador de Conocimiento”, a link or button “Nueva nota” to `/notas/nueva`, and a slot for the home search bar; (2) a sidebar on the home route `/` containing the tag filter (`aria-label` “Filtro por etiqueta”) and a note count; (3) a main content area for route children.

#### Scenario: Header visible on home

- **WHEN** the user opens `/`
- **THEN** the heading “Organizador de Conocimiento” is visible
- **AND** a “Nueva nota” control is visible

#### Scenario: Sidebar tag filter on home

- **WHEN** the user is on `/` and tags exist
- **THEN** the tag filter is rendered in the sidebar
- **AND** the note count is displayed

#### Scenario: Shell on non-home routes

- **WHEN** the user navigates to `/notas/nueva` or `/notas/:id`
- **THEN** the header with application title remains visible
- **AND** the main area renders the page content

### Requirement: Design tokens and card grid

The home note list SHALL display notes as cards in a responsive grid (two columns on viewports ≥ 768px, one column below). Cards SHALL show title, excerpt, tags when present, and creation date. Cards SHALL use project design tokens (warm background, teal accent, Fraunces/DM Sans typography).

#### Scenario: Card shows excerpt

- **WHEN** a note has content and appears in the home list
- **THEN** a text excerpt derived from the note content is visible on the card

#### Scenario: Card shows tags

- **WHEN** a note has tags and appears in the home list
- **THEN** the tag names are visible on the card

### Requirement: Improved empty states

When the home list has no notes and no active filter or search, the UI SHALL show an encouraging empty message with a call-to-action to create a note. Filter and search empty states SHALL retain their existing specific messages.

#### Scenario: Empty library CTA

- **WHEN** no notes exist and no tag filter or search is active
- **THEN** a message invites the user to create their first note
- **AND** a link or button to `/notas/nueva` is visible

### Requirement: Responsive sidebar drawer

On viewports narrower than 768px, the sidebar SHALL be hidden by default and SHALL be openable via a control in the header.

#### Scenario: Mobile sidebar toggle

- **WHEN** the viewport width is below 768px and the user is on `/`
- **THEN** a control to open the tag sidebar is available
- **AND** activating it reveals the tag filter panel

### Requirement: Search term highlight on cards

When search is active on the home page, matching substrings in card titles and excerpts SHALL be visually highlighted.

#### Scenario: Highlight in search results

- **WHEN** the user searches for a term that appears in a note title
- **THEN** the matching portion of the title is highlighted in the result card
