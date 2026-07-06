# Delta for notes-list

## MODIFIED Requirements

### Requirement: Home page note list (US-001)

The frontend application SHALL display a note list on the home route `/` without requiring additional navigation. Each list item SHALL link to `/notas/:id` for note detail (US-002). A tag filter panel SHALL allow filtering the list by tag (US-009). A search bar SHALL allow text search; while search is active, search results SHALL replace the filtered or full list (US-012).

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
