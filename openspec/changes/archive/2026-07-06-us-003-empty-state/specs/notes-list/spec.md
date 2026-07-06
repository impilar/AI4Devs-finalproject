# Delta for notes-list (US-003)

## MODIFIED Requirements

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

## ADDED Requirements

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
