## ADDED Requirements

### Requirement: Editorial create note layout

The create note page at `/notas/nueva` SHALL use an editorial layout: large title input with placeholder “¿Qué quieres recordar?”, content area inside a card-styled surface, and grouped actions for adding links and tags. Validation rules and save behavior SHALL remain unchanged from US-005, US-006, and US-008.

#### Scenario: Editorial title placeholder

- **WHEN** the user opens `/notas/nueva`
- **THEN** the title field shows placeholder “¿Qué quieres recordar?”

#### Scenario: Save behavior unchanged

- **WHEN** the user enters valid title and content and clicks “Guardar”
- **THEN** the note is created via `POST /api/v1/notas`
- **AND** the user is redirected to the home list with the new note visible

#### Scenario: No emoji or image blocks

- **WHEN** the user is on the create form
- **THEN** emoji picker and image upload blocks are not shown
