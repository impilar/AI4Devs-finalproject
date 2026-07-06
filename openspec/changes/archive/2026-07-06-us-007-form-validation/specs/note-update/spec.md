# Delta for note-update (US-007)

## MODIFIED Requirements

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

#### Scenario: Empty title rejected on update

- **WHEN** client sends `PUT` with `title` empty or whitespace only
- **THEN** response status is 400 with `VALIDATION_ERROR`
- **AND** `error.details` contains `{ field: "title", message: "El título es obligatorio" }`

#### Scenario: Empty content rejected on update

- **WHEN** client sends `PUT` with `content` empty or whitespace only
- **THEN** response status is 400 with `VALIDATION_ERROR`
- **AND** `error.details` contains `{ field: "content", message: "El contenido es obligatorio" }`

#### Scenario: Note not found

- **WHEN** client sends `PUT` for a non-existent UUID
- **THEN** response status is 404 with `NOT_FOUND`

### Requirement: Edit mode in note detail (US-015)

The note detail page SHALL provide an edit action that shows `NoteForm` pre-filled with current title, content, links, and tags. On successful save, the UI SHALL return to read-only detail view showing updated content and `updatedAt`. Edit mode SHALL use the same MindVault editorial form styling as note create: large title input, card content surface, MindVault-colored tag chips in `TagInput`, and visibly spaced Guardar/Cancelar actions.

#### Scenario: Edit all fields and refresh timestamp

- **GIVEN** the user opens the detail of an existing note
- **WHEN** the user edits title, content, links, or tags and saves
- **THEN** the detail view shows the changes
- **AND** the last-updated date reflects the save

#### Scenario: Cancel edit

- **WHEN** the user enters edit mode and cancels without saving
- **THEN** the read-only detail shows the original values unchanged

#### Scenario: Validation preserves edit form data

- **GIVEN** the user is editing a note with content entered
- **WHEN** the user clears the title and attempts to save
- **THEN** «El título es obligatorio» is visible next to the title field
- **AND** the content field still shows the entered text
- **AND** the user remains in edit mode

## ADDED Requirements

### Requirement: E2E coverage for US-007 (edit form)

Automated tests SHALL validate that edit mode exhibits the same validation behavior as create for US-007.

#### Scenario: E2E edit title required with content preserved

- **GIVEN** a seeded note exists
- **WHEN** the user opens edit, clears the title, keeps content, and clicks Guardar
- **THEN** «El título es obligatorio» is visible
- **AND** the content remains in the textarea
