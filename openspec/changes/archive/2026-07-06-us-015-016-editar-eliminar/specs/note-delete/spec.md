# Delta for note-delete

## ADDED Requirements

### Requirement: Delete note API (US-016)

The backend SHALL expose `DELETE /api/v1/notas/:id` that permanently removes the note and its related `enlaces` and `nota_etiqueta` rows via database CASCADE. The response SHALL be HTTP 204 with no body. No soft-delete or recovery mechanism SHALL exist in MVP.

#### Scenario: Successful delete

- **WHEN** client sends `DELETE /api/v1/notas/:id` for an existing note
- **THEN** response status is 204 with empty body
- **AND** subsequent `GET /api/v1/notas/:id` returns 404
- **AND** the note is absent from `GET /api/v1/notas`

#### Scenario: Cascade removes relations

- **WHEN** a note with links and tag associations is deleted
- **THEN** no `enlaces` or `nota_etiqueta` rows remain for that `nota_id`
- **AND** `etiquetas` rows used only by that note may remain (MVP acceptable)

#### Scenario: Note not found

- **WHEN** client sends `DELETE` for a non-existent UUID
- **THEN** response status is 404 with `NOT_FOUND`

#### Scenario: Invalid UUID

- **WHEN** `id` path param is not a valid UUID
- **THEN** response status is 400 with `VALIDATION_ERROR`

### Requirement: Delete confirmation in UI (US-016)

The note detail page SHALL show a delete action that opens a confirmation dialog before calling the API. Confirming SHALL delete the note and redirect to the home list. Cancelling SHALL leave the note unchanged.

#### Scenario: Delete with confirmation

- **GIVEN** the user is on note detail
- **WHEN** the user clicks delete and confirms in the dialog
- **THEN** the note disappears from the home list
- **AND** the note cannot be opened again

#### Scenario: Cancel delete

- **GIVEN** the user opened the delete confirmation dialog
- **WHEN** the user cancels
- **THEN** the note remains on detail view unchanged

### Requirement: E2E coverage for US-016

Automated E2E tests SHALL validate both Gherkin scenarios from US-016.

#### Scenario: E2E confirm delete

- **WHEN** E2E confirms deletion of a seeded note
- **THEN** home list no longer shows that note

#### Scenario: E2E cancel delete

- **WHEN** E2E opens delete dialog and cancels
- **THEN** note detail still shows the original note
