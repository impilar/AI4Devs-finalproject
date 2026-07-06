# Delta for note-detail

## ADDED Requirements

### Requirement: Note detail actions (US-015, US-016)

The note detail view SHALL expose edit and delete actions alongside read-only content (title, content, links, tags, timestamps).

#### Scenario: Actions visible on detail

- **GIVEN** the user views an existing note at `/notas/:id`
- **WHEN** the detail page loads successfully
- **THEN** edit and delete controls are available
- **AND** title, content, links, tags, and dates are displayed

#### Scenario: UpdatedAt visible after edit

- **WHEN** the user saves edits from detail
- **THEN** read-only detail shows the refreshed `updatedAt` value
