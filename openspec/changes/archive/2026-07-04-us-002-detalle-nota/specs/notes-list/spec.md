# Delta for notes-list

## MODIFIED Requirements

### Requirement: Home page note list (US-001)

The frontend application SHALL display a note list on the home route `/` without requiring additional navigation. Each list item SHALL link to `/notas/:id` for note detail (US-002).

#### Scenario: User with existing notes sees the list on app open

- **GIVEN** three saved notes with title and creation date exist
- **WHEN** the user opens the application at `/`
- **THEN** a list shows all three notes with title and formatted creation date for each

#### Scenario: List is the main screen on startup

- **GIVEN** the application is loaded
- **WHEN** the user accesses the main URL `/`
- **THEN** the note list is visible without additional navigation

#### Scenario: List item navigates to detail

- **GIVEN** a note exists in the list
- **WHEN** the user clicks the note item
- **THEN** the browser navigates to `/notas/{id}`
