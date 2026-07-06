## ADDED Requirements

### Requirement: Immersive note detail layout

The note detail page at `/notas/:id` SHALL present content inside a card-styled document surface with MindVault tokens. The page SHALL show title as a prominent heading, relative update date, tags, links, and action buttons (Editar, Eliminar) in a horizontal action bar above the document body.

#### Scenario: Document surface on detail

- **WHEN** the user opens an existing note at `/notas/:id`
- **THEN** note content is displayed inside a rounded card surface
- **AND** edit and delete controls remain available

#### Scenario: Detail without related-notes rail

- **WHEN** the user views note detail
- **THEN** no “Notas relacionadas” sidebar rail is shown (deferred to V2+)
