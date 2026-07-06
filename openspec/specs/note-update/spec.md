# note-update Specification

## Purpose
TBD - created by archiving change us-015-016-editar-eliminar. Update Purpose after archive.
## Requirements
### Requirement: Update note API (US-015)

The backend SHALL expose `PUT /api/v1/notas/:id` accepting `UpdateNotaDto` with at least one optional field among `title`, `content`, `links`, and `tags`. When present, fields SHALL use the same validation rules as `CreateNotaDto`. The response SHALL be HTTP 200 with `{ data: NotaDetail }` including a refreshed `updatedAt` later than before the update.

#### Scenario: Update all fields

- **WHEN** client sends `PUT /api/v1/notas/:id` with valid `title`, `content`, `links`, and `tags`
- **THEN** response status is 200
- **AND** `data` reflects all new values
- **AND** `data.updatedAt` is greater than the previous `updatedAt`

#### Scenario: Partial update

- **WHEN** client sends only `title` in the body
- **THEN** response status is 200
- **AND** only `title` changes; other fields remain unchanged

#### Scenario: Replace links and tags

- **WHEN** client sends `links` or `tags` arrays
- **THEN** existing links or tag associations for that note are fully replaced by the sent arrays

#### Scenario: Empty body rejected

- **WHEN** client sends `PUT` with no updatable fields
- **THEN** response status is 400 with `VALIDATION_ERROR`

#### Scenario: Note not found

- **WHEN** client sends `PUT` for a non-existent UUID
- **THEN** response status is 404 with `NOT_FOUND`

### Requirement: Update response time (US-015)

Update operations SHALL respond in under 2 seconds under normal conditions (RNF-001).

#### Scenario: Save within SLA

- **WHEN** client updates an existing note with typical field sizes
- **THEN** response completes in under 2 seconds

### Requirement: Edit mode in note detail (US-015)

The note detail page SHALL provide an edit action that shows `NoteForm` pre-filled with current title, content, links, and tags. On successful save, the UI SHALL return to read-only detail view showing updated content and `updatedAt`.

#### Scenario: Edit all fields and refresh timestamp

- **GIVEN** the user opens the detail of an existing note
- **WHEN** the user edits title, content, links, or tags and saves
- **THEN** the detail view shows the changes
- **AND** the last-updated date reflects the save

#### Scenario: Cancel edit

- **WHEN** the user enters edit mode and cancels without saving
- **THEN** the read-only detail shows the original values unchanged

### Requirement: E2E coverage for US-015

Automated E2E tests SHALL validate both Gherkin scenarios from US-015.

#### Scenario: E2E edit fields and updatedAt

- **WHEN** E2E edits a seeded note and saves
- **THEN** detail shows new values and updated timestamp

#### Scenario: E2E save response time

- **WHEN** E2E measures save duration
- **THEN** elapsed time is under 2 seconds

